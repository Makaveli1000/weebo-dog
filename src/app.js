import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updatePassword
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  addDoc,
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";

/* -------------------------------------------------
   FIREBASE INIT
------------------------------------------------- */
const firebaseConfig =
  window.NETLIFY_FIREBASE_CONFIG || window.__firebase_config;

if (!firebaseConfig) {
  throw new Error("Missing Firebase config. Check env-config.js.");
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

/* -------------------------------------------------
   STATE
------------------------------------------------- */
let currentUser = null;
let currentProfile = null;
let unsubscribers = [];
let presenceHeartbeat = null;

/* -------------------------------------------------
   HELPERS
------------------------------------------------- */
const $ = (id) => document.getElementById(id);

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    return map[char] || char;
  });
}

function getMillis(value) {
  if (!value) return 0;
  if (typeof value?.toMillis === "function") return value.toMillis();
  if (typeof value?.seconds === "number") return value.seconds * 1000;
  const parsed = new Date(value).getTime();
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatDateTime(value) {
  const ms = getMillis(value);
  if (!ms) return "";
  return new Date(ms).toLocaleString();
}

function show(el) {
  el?.classList.remove("hidden");
}

function hide(el) {
  el?.classList.add("hidden");
}

function setStatus(text) {
  const el = $("user-status");
  if (el) el.textContent = text;
}

function setLoading(isLoading, message = "⚡ CONNECTING...") {
  const overlay = $("loading-overlay");
  if (!overlay) return;
  const textEl = overlay.querySelector("[data-loading-text]");
  if (textEl) textEl.textContent = message;
  if (isLoading) show(overlay);
  else hide(overlay);
}

/* -------------------------------------------------
   DYNAMIC UI SAFETY NETS
------------------------------------------------- */
function ensureLoginErrorElement() {
  const form = $("login-form");
  if (!form) return;
  if ($("login-error")) return;

  const submitBtn = $("login-submit-btn");
  const errorEl = document.createElement("p");
  errorEl.id = "login-error";
  errorEl.className = "text-xs text-red-500 font-bold mt-2";
  errorEl.textContent = "";

  if (submitBtn?.parentNode) {
    submitBtn.parentNode.insertBefore(errorEl, submitBtn);
  } else {
    form.appendChild(errorEl);
  }
}

function ensureAccountModal() {
  if ($("account-modal")) return;

  const modal = document.createElement("div");
  modal.id = "account-modal";
  modal.className =
    "hidden fixed inset-0 z-50 bg-black/70 items-center justify-center p-4";
  modal.innerHTML = `
    <div class="w-full max-w-md rounded-2xl border border-white/10 bg-[#111] p-5 shadow-2xl">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-xl font-bold text-white">Account</h2>
        <button id="account-close-btn" type="button" class="rounded bg-white/10 px-3 py-1 text-sm text-white hover:bg-white/20">Close</button>
      </div>

      <div class="space-y-4">
        <div>
          <p class="text-xs uppercase tracking-wide text-zinc-400">Email</p>
          <p id="account-email-display" class="mt-1 text-sm font-semibold text-white"></p>
        </div>

        <div>
          <label for="nickname-input" class="mb-1 block text-xs uppercase tracking-wide text-zinc-400">Nickname</label>
          <input id="nickname-input" type="text" class="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white outline-none" placeholder="Enter nickname" />
          <button id="save-nickname-btn" type="button" class="mt-2 rounded-lg bg-yellow-500 px-4 py-2 text-sm font-bold text-black hover:bg-yellow-400">Save Nickname</button>
        </div>

        <div>
          <label for="new-password-input" class="mb-1 block text-xs uppercase tracking-wide text-zinc-400">New Password</label>
          <input id="new-password-input" type="password" class="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-white outline-none" placeholder="New password" />
          <button id="update-password-btn" type="button" class="mt-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-bold text-white hover:bg-white/20">Update Password</button>
        </div>

        <div class="flex justify-end">
          <button id="logout-btn" type="button" class="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-500">Logout</button>
        </div>
      </div>
    </div>
  `;

  modal.style.display = "none";
  modal.classList.add("items-center", "justify-center");
  document.body.appendChild(modal);
}

function ensureOptionalMessages() {
  const chatBox = $("chat-messages");
  if (chatBox && !chatBox.dataset.emptyText) {
    chatBox.dataset.emptyText = "No messages yet.";
  }

  const usersBox = $("active-users-list");
  if (usersBox && !usersBox.dataset.emptyText) {
    usersBox.dataset.emptyText = "No active users yet.";
  }
}

/* -------------------------------------------------
   DOM CACHE
------------------------------------------------- */
function getEls() {
  return {
    loadingOverlay: $("loading-overlay"),
    headerAuthBtn: $("header-auth-btn"),
    accountBtn: $("account-btn"),

    paywallContent: $("paywall-content"),
    mainContent: $("main-content"),
    adminPanel: $("admin-panel"),

    loginModal: $("login-modal"),
    loginForm: $("login-form"),
    loginEmail: $("login-email"),
    loginPassword: $("login-password"),
    loginSubmitBtn: $("login-submit-btn"),
    loginError: $("login-error"),

    accountModal: $("account-modal"),
    accountEmailDisplay: $("account-email-display"),
    nicknameInput: $("nickname-input"),
    saveNicknameBtn: $("save-nickname-btn"),
    newPasswordInput: $("new-password-input"),
    updatePasswordBtn: $("update-password-btn"),
    logoutBtn: $("logout-btn"),
    accountCloseBtn: $("account-close-btn"),

    userStatus: $("user-status"),

    addAthleteForm: $("add-athlete-form"),
    playerName: $("player-name"),
    playerSport: $("player-sport"),
    score0: $("score0"),
    score1: $("score1"),
    score2: $("score2"),
    score3: $("score3"),
    score4: $("score4"),
    topAthleteDisplay: $("top-athlete-display"),
    matchGridBody: $("match-grid-body"),

    chatMessages: $("chat-messages"),
    chatMessageInput: $("chat-message-input"),
    sendChatMessageBtn: $("send-chat-message-btn"),

    latestData: $("latest-data"),
    dataStream: $("data-stream"),
    activeUsersList: $("active-users-list"),
    sportsDataDisplay: $("sports-data-display"),

    mediaFileInput: $("media-file-input"),
    lockerUploadBtn: $("locker-upload-btn"),
    lockerMediaDisplay: $("locker-media-display"),
    lockerStatusText: $("locker-status-text"),
    uploadCounterDisplay: $("upload-counter-display"),
    uploadProgressBar: $("upload-progress-bar")
  };
}

ensureLoginErrorElement();
ensureAccountModal();
ensureOptionalMessages();

const els = getEls();

/* -------------------------------------------------
   ACCESS CONTROL
------------------------------------------------- */
function canAccessApp(profile) {
  return (
    profile?.role === "admin" ||
    profile?.role === "editor" ||
    profile?.isPro === true
  );
}

function isAdminUser(profile) {
  return profile?.role === "admin" || profile?.role === "editor";
}

function updateAccessUI(profile) {
  const allowed = canAccessApp(profile);
  const adminAllowed = isAdminUser(profile);

  if (allowed) {
    hide(els.paywallContent);
    show(els.mainContent);
  } else {
    show(els.paywallContent);
    hide(els.mainContent);
  }

  if (adminAllowed) show(els.adminPanel);
  else hide(els.adminPanel);

  if (!profile) {
    setStatus("Guest");
    return;
  }

  if (profile.role === "admin") {
    setStatus(`Admin: ${profile.nickname || profile.email || "User"}`);
  } else if (profile.role === "editor") {
    setStatus(`Editor: ${profile.nickname || profile.email || "User"}`);
  } else if (profile.isPro) {
    setStatus(`Pro: ${profile.nickname || profile.email || "User"}`);
  } else {
    setStatus(profile.nickname || profile.email || "Member");
  }
}

function updateHeaderButtons(isSignedIn) {
  if (els.headerAuthBtn) {
    els.headerAuthBtn.textContent = isSignedIn ? "LOGOUT" : "LOGIN";
  }

  if (els.accountBtn) {
    if (isSignedIn) show(els.accountBtn);
    else hide(els.accountBtn);
  }
}

/* -------------------------------------------------
   MODALS
------------------------------------------------- */
function toggleLoginModal(force) {
  if (!els.loginModal) return;
  const shouldOpen =
    typeof force === "boolean"
      ? force
      : els.loginModal.style.display !== "flex";

  if (shouldOpen) {
    els.loginModal.style.display = "flex";
    show(els.loginModal);
  } else {
    els.loginModal.style.display = "none";
    hide(els.loginModal);
  }
}

function toggleAccountModal(force) {
  if (!els.accountModal) return;
  const shouldOpen =
    typeof force === "boolean"
      ? force
      : els.accountModal.style.display !== "flex";

  if (shouldOpen) {
    els.accountModal.style.display = "flex";
    show(els.accountModal);
    if (els.accountEmailDisplay) {
      els.accountEmailDisplay.textContent =
        currentProfile?.email || currentUser?.email || "";
    }
    if (els.nicknameInput) {
      els.nicknameInput.value = currentProfile?.nickname || "";
    }
  } else {
    els.accountModal.style.display = "none";
    hide(els.accountModal);
  }
}

window.toggleLoginModal = toggleLoginModal;
window.toggleAccountModal = toggleAccountModal;

/* -------------------------------------------------
   PROFILE
------------------------------------------------- */
async function loadOrCreateUserProfile(user) {
  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  if (snap.exists()) {
    return snap.data();
  }

  const starterProfile = {
    uid: user.uid,
    email: user.email || "",
    nickname: user.displayName || "Member",
    role: "user",
    isPro: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  await setDoc(userRef, starterProfile, { merge: true });
  return starterProfile;
}

async function saveNickname() {
  if (!currentUser || !els.nicknameInput) return;
  const nickname = els.nicknameInput.value.trim();
  if (!nickname) return;

  await updateDoc(doc(db, "users", currentUser.uid), {
    nickname,
    updatedAt: serverTimestamp()
  });

  currentProfile = {
    ...(currentProfile || {}),
    nickname
  };

  if (currentUser) {
    await setDoc(
      doc(db, "presence", currentUser.uid),
      {
        uid: currentUser.uid,
        email: currentUser.email || "",
        nickname,
        online: true,
        lastSeen: serverTimestamp()
      },
      { merge: true }
    );
  }

  updateAccessUI(currentProfile);
  toggleAccountModal(false);
}

async function changePassword() {
  if (!auth.currentUser || !els.newPasswordInput) return;
  const newPassword = els.newPasswordInput.value.trim();

  if (newPassword.length < 6) {
    alert("Password must be at least 6 characters.");
    return;
  }

  await updatePassword(auth.currentUser, newPassword);
  els.newPasswordInput.value = "";
  alert("Password updated successfully.");
}

/* -------------------------------------------------
   LISTENER CONTROL
------------------------------------------------- */
function addUnsubscriber(unsub) {
  if (typeof unsub === "function") {
    unsubscribers.push(unsub);
  }
}

function clearAllListeners() {
  unsubscribers.forEach((unsub) => {
    try {
      unsub();
    } catch (err) {
      console.warn("Unsubscribe error:", err);
    }
  });
  unsubscribers = [];
}

function startPresenceHeartbeat() {
  stopPresenceHeartbeat();
  presenceHeartbeat = window.setInterval(() => {
    if (currentUser) {
      markPresence(true).catch((err) =>
        console.warn("Presence heartbeat failed:", err)
      );
    }
  }, 60000);
}

function stopPresenceHeartbeat() {
  if (presenceHeartbeat) {
    clearInterval(presenceHeartbeat);
    presenceHeartbeat = null;
  }
}

/* -------------------------------------------------
   PRESENCE
------------------------------------------------- */
async function markPresence(isOnline) {
  if (!currentUser) return;
  await setDoc(
    doc(db, "presence", currentUser.uid),
    {
      uid: currentUser.uid,
      email: currentUser.email || "",
      nickname:
        currentProfile?.nickname || currentUser.displayName || "Member",
      online: !!isOnline,
      lastSeen: serverTimestamp()
    },
    { merge: true }
  );
}

/* -------------------------------------------------
   RENDER: ATHLETES
------------------------------------------------- */
function renderAthletes(docs) {
  if (els.matchGridBody) {
    if (!docs.length) {
      els.matchGridBody.innerHTML = `
        <tr>
          <td colspan="7" class="px-4 py-6 text-center text-zinc-400">
            No athletes available yet.
          </td>
        </tr>
      `;
    } else {
      els.matchGridBody.innerHTML = docs
        .map(({ id, data }) => {
          const scores = Array.isArray(data.scores)
            ? data.scores
            : [
                data.score0 ?? "",
                data.score1 ?? "",
                data.score2 ?? "",
                data.score3 ?? "",
                data.score4 ?? ""
              ];

          return `
            <tr class="border-b border-white/10">
              <td class="px-3 py-3 font-semibold text-white">${escapeHtml(
                data.name || "Unknown"
              )}</td>
              <td class="px-3 py-3 text-zinc-300">${escapeHtml(
                data.sport || "—"
              )}</td>
              <td class="px-3 py-3 text-zinc-300">${escapeHtml(
                scores[0] ?? ""
              )}</td>
              <td class="px-3 py-3 text-zinc-300">${escapeHtml(
                scores[1] ?? ""
              )}</td>
              <td class="px-3 py-3 text-zinc-300">${escapeHtml(
                scores[2] ?? ""
              )}</td>
              <td class="px-3 py-3 text-zinc-300">${escapeHtml(
                scores[3] ?? ""
              )}</td>
              <td class="px-3 py-3 text-zinc-300">${escapeHtml(
                scores[4] ?? ""
              )}</td>
            </tr>
          `;
        })
        .join("");
    }
  }

  if (els.topAthleteDisplay) {
    if (!docs.length) {
      els.topAthleteDisplay.textContent = "No featured athlete yet.";
    } else {
      const top = docs[0].data;
      const name = top.name || "Unknown";
      const sport = top.sport ? ` • ${top.sport}` : "";
      els.topAthleteDisplay.textContent = `${name}${sport}`;
    }
  }
}

function subscribeToAthletes() {
  if (!els.matchGridBody && !els.topAthleteDisplay) return;

  const q = query(collection(db, "athletes"), limit(100));
  const unsub = onSnapshot(
    q,
    (snapshot) => {
      const docs = snapshot.docs
        .map((d) => ({ id: d.id, data: d.data() }))
        .sort(
          (a, b) =>
            getMillis(b.data.updatedAt || b.data.createdAt) -
            getMillis(a.data.updatedAt || a.data.createdAt)
        );

      renderAthletes(docs);
    },
    (error) => {
      console.error("Athletes listener error:", error);
      if (els.matchGridBody) {
        els.matchGridBody.innerHTML = `
          <tr>
            <td colspan="7" class="px-4 py-6 text-center text-red-400">
              Failed to load athletes.
            </td>
          </tr>
        `;
      }
    }
  );

  addUnsubscriber(unsub);
}

/* -------------------------------------------------
   RENDER: CHAT
------------------------------------------------- */
function renderChatPrompt() {
  if (!els.chatMessages) return;
  els.chatMessages.innerHTML = `
    <div class="rounded-lg border border-white/10 bg-black/30 p-4 text-sm text-zinc-400">
      Log in to enter War Room Chat.
    </div>
  `;
}

function renderChatMessages(docs) {
  if (!els.chatMessages) return;

  if (!docs.length) {
    els.chatMessages.innerHTML = `
      <div class="rounded-lg border border-white/10 bg-black/30 p-4 text-sm text-zinc-400">
        ${escapeHtml(els.chatMessages.dataset.emptyText || "No messages yet.")}
      </div>
    `;
    return;
  }

  els.chatMessages.innerHTML = docs
    .map(({ data }) => {
      const isMine = data.uid && data.uid === currentUser?.uid;
      const who = data.nickname || data.email || "Member";
      const when = formatDateTime(data.createdAt);

      return `
        <div class="mb-3 rounded-xl border ${
          isMine ? "border-yellow-500/30 bg-yellow-500/10" : "border-white/10 bg-black/30"
        } p-3">
          <div class="mb-1 flex items-center justify-between gap-3">
            <span class="text-sm font-bold text-white">${escapeHtml(who)}</span>
            <span class="text-[10px] uppercase tracking-wide text-zinc-500">${escapeHtml(
              when
            )}</span>
          </div>
          <p class="text-sm text-zinc-200">${escapeHtml(data.text || "")}</p>
        </div>
      `;
    })
    .join("");

  els.chatMessages.scrollTop = els.chatMessages.scrollHeight;
}

function subscribeToChat() {
  if (!els.chatMessages) return;
  if (!currentUser) return;

  const q = query(
    collection(db, "chatMessages"),
    orderBy("createdAt", "asc"),
    limit(100)
  );

  const unsub = onSnapshot(
    q,
    (snapshot) => {
      const docs = snapshot.docs.map((d) => ({ id: d.id, data: d.data() }));
      renderChatMessages(docs);
    },
    (error) => {
      console.error("Chat listener error:", error);
      els.chatMessages.innerHTML = `
        <div class="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
          Unable to load chat.
        </div>
      `;
    }
  );

  addUnsubscriber(unsub);
}

async function sendChatMessage() {
  if (!currentUser || !els.chatMessageInput) return;
  const text = els.chatMessageInput.value.trim();
  if (!text) return;

  const payload = {
    uid: currentUser.uid,
    email: currentUser.email || "",
    nickname:
      currentProfile?.nickname || currentUser.displayName || "Member",
    text,
    createdAt: serverTimestamp()
  };

  await addDoc(collection(db, "chatMessages"), payload);
  els.chatMessageInput.value = "";
}

/* -------------------------------------------------
   RENDER: PRESENCE
------------------------------------------------- */
function renderPresencePrompt() {
  if (!els.activeUsersList) return;
  els.activeUsersList.innerHTML = `
    <div class="rounded-lg border border-white/10 bg-black/30 p-4 text-sm text-zinc-400">
      Log in to view active users.
    </div>
  `;
}

function renderPresence(docs) {
  if (!els.activeUsersList) return;

  if (!docs.length) {
    els.activeUsersList.innerHTML = `
      <div class="rounded-lg border border-white/10 bg-black/30 p-4 text-sm text-zinc-400">
        ${escapeHtml(els.activeUsersList.dataset.emptyText || "No active users yet.")}
      </div>
    `;
    return;
  }

  els.activeUsersList.innerHTML = docs
    .map(({ data }) => {
      const online = !!data.online;
      return `
        <div class="mb-2 flex items-center justify-between rounded-lg border border-white/10 bg-black/30 px-3 py-2">
          <div class="flex items-center gap-2">
            <span class="inline-block h-2.5 w-2.5 rounded-full ${
              online ? "bg-green-400" : "bg-zinc-500"
            }"></span>
            <span class="text-sm font-medium text-white">${escapeHtml(
              data.nickname || data.email || "Member"
            )}</span>
          </div>
          <span class="text-[10px] uppercase tracking-wide text-zinc-500">
            ${online ? "Online" : escapeHtml(formatDateTime(data.lastSeen) || "Offline")}
          </span>
        </div>
      `;
    })
    .join("");
}

function subscribeToPresence() {
  if (!els.activeUsersList) return;
  if (!currentUser) return;

  const q = query(
    collection(db, "presence"),
    orderBy("lastSeen", "desc"),
    limit(50)
  );

  const unsub = onSnapshot(
    q,
    (snapshot) => {
      const docs = snapshot.docs
        .map((d) => ({ id: d.id, data: d.data() }))
        .sort((a, b) => {
          const onlineDiff = Number(b.data.online) - Number(a.data.online);
          if (onlineDiff !== 0) return onlineDiff;
          return getMillis(b.data.lastSeen) - getMillis(a.data.lastSeen);
        });

      renderPresence(docs);
    },
    (error) => {
      console.error("Presence listener error:", error);
      els.activeUsersList.innerHTML = `
        <div class="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
          Unable to load active users.
        </div>
      `;
    }
  );

  addUnsubscriber(unsub);
}

/* -------------------------------------------------
   RENDER: LIVE FEED
------------------------------------------------- */
function renderLiveFeed(docs) {
  const items = docs.length
    ? docs
    : [{ id: "empty", data: { title: "No live updates yet." } }];

  if (els.latestData) {
    const latest = items[0].data;
    els.latestData.innerHTML = `
      <div class="rounded-xl border border-white/10 bg-black/30 p-4">
        <p class="text-sm font-bold text-white">${escapeHtml(
          latest.title || latest.headline || "Live Update"
        )}</p>
        <p class="mt-2 text-sm text-zinc-300">${escapeHtml(
          latest.content || latest.summary || ""
        )}</p>
      </div>
    `;
  }

  if (els.dataStream) {
    els.dataStream.innerHTML = items
      .map(({ data }) => {
        const title = data.title || data.headline || "Update";
        const body = data.content || data.summary || "";
        const when = formatDateTime(data.createdAt || data.updatedAt);
        return `
          <div class="mb-3 rounded-xl border border-white/10 bg-black/30 p-4">
            <div class="mb-1 flex items-center justify-between gap-3">
              <h4 class="text-sm font-bold text-white">${escapeHtml(title)}</h4>
              <span class="text-[10px] uppercase tracking-wide text-zinc-500">${escapeHtml(
                when
              )}</span>
            </div>
            <p class="text-sm text-zinc-300">${escapeHtml(body)}</p>
          </div>
        `;
      })
      .join("");
  }
}

function subscribeToLiveFeed() {
  if (!els.latestData && !els.dataStream) return;

  const q = query(collection(db, "liveFeed"), limit(50));
  const unsub = onSnapshot(
    q,
    (snapshot) => {
      const docs = snapshot.docs
        .map((d) => ({ id: d.id, data: d.data() }))
        .sort(
          (a, b) =>
            getMillis(b.data.createdAt || b.data.updatedAt) -
            getMillis(a.data.createdAt || a.data.updatedAt)
        );

      renderLiveFeed(docs);
    },
    (error) => {
      console.error("Live feed listener error:", error);
    }
  );

  addUnsubscriber(unsub);
}

/* -------------------------------------------------
   RENDER: SPORTS DATA
------------------------------------------------- */
function renderSportsData(docs) {
  if (!els.sportsDataDisplay) return;

  if (!docs.length) {
    els.sportsDataDisplay.innerHTML = `
      <div class="rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-zinc-400">
        No sports data available yet.
      </div>
    `;
    return;
  }

  els.sportsDataDisplay.innerHTML = docs
    .map(({ data }) => {
      const title = data.title || data.label || data.metric || "Sports Data";
      const value = data.value ?? data.stat ?? data.content ?? "";
      const meta = data.subtitle || data.description || "";
      return `
        <div class="mb-3 rounded-xl border border-white/10 bg-black/30 p-4">
          <div class="text-xs uppercase tracking-wide text-zinc-500">${escapeHtml(
            title
          )}</div>
          <div class="mt-1 text-lg font-bold text-white">${escapeHtml(value)}</div>
          ${
            meta
              ? `<div class="mt-1 text-sm text-zinc-300">${escapeHtml(meta)}</div>`
              : ""
          }
        </div>
      `;
    })
    .join("");
}

function subscribeToSportsData() {
  if (!els.sportsDataDisplay) return;

  const q = query(collection(db, "sportsData"), limit(50));
  const unsub = onSnapshot(
    q,
    (snapshot) => {
      const docs = snapshot.docs
        .map((d) => ({ id: d.id, data: d.data() }))
        .sort(
          (a, b) =>
            getMillis(b.data.createdAt || b.data.updatedAt) -
            getMillis(a.data.createdAt || a.data.updatedAt)
        );

      renderSportsData(docs);
    },
    (error) => {
      console.error("Sports data listener error:", error);
      els.sportsDataDisplay.innerHTML = `
        <div class="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
          Failed to load sports data.
        </div>
      `;
    }
  );

  addUnsubscriber(unsub);
}

/* -------------------------------------------------
   USER MEDIA LOCKER
------------------------------------------------- */
function renderLockerPrompt() {
  if (!els.lockerMediaDisplay) return;
  els.lockerMediaDisplay.innerHTML = `
    <div class="rounded-lg border border-white/10 bg-black/30 p-4 text-sm text-zinc-400">
      Log in to access your media locker.
    </div>
  `;
  if (els.lockerStatusText) {
    els.lockerStatusText.textContent = "Sign in to upload media.";
  }
}

function renderUserMedia(docs) {
  if (!els.lockerMediaDisplay) return;

  if (els.uploadCounterDisplay) {
    els.uploadCounterDisplay.textContent = `${docs.length} item${
      docs.length === 1 ? "" : "s"
    }`;
  }

  if (!docs.length) {
    els.lockerMediaDisplay.innerHTML = `
      <div class="rounded-lg border border-white/10 bg-black/30 p-4 text-sm text-zinc-400">
        No media uploaded yet.
      </div>
    `;
    return;
  }

  els.lockerMediaDisplay.innerHTML = docs
    .map(({ data }) => {
      const name = data.name || "File";
      const type = data.contentType || "";
      const url = data.downloadURL || "#";
      const isImage = type.startsWith("image/");
      const isVideo = type.startsWith("video/");

      return `
        <div class="mb-4 overflow-hidden rounded-xl border border-white/10 bg-black/30">
          ${
            isImage
              ? `<img src="${escapeHtml(url)}" alt="${escapeHtml(
                  name
                )}" class="h-48 w-full object-cover" />`
              : isVideo
              ? `<video src="${escapeHtml(
                  url
                )}" controls class="h-48 w-full bg-black object-cover"></video>`
              : ""
          }
          <div class="p-4">
            <div class="text-sm font-bold text-white">${escapeHtml(name)}</div>
            <div class="mt-1 text-xs text-zinc-400">${escapeHtml(type || "file")}</div>
            <a href="${escapeHtml(
              url
            )}" target="_blank" rel="noopener noreferrer" class="mt-3 inline-block rounded bg-white/10 px-3 py-2 text-xs font-semibold text-white hover:bg-white/20">
              Open File
            </a>
          </div>
        </div>
      `;
    })
    .join("");
}

function subscribeToUserMedia(uid) {
  if (!els.lockerMediaDisplay || !uid) return;
  if (!currentUser) return;

  const q = query(
    collection(db, "users", uid, "media"),
    orderBy("createdAt", "desc"),
    limit(50)
  );

  const unsub = onSnapshot(
    q,
    (snapshot) => {
      const docs = snapshot.docs.map((d) => ({ id: d.id, data: d.data() }));
      renderUserMedia(docs);
    },
    (error) => {
      console.error("User media listener error:", error);
      els.lockerMediaDisplay.innerHTML = `
        <div class="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
          Failed to load media locker.
        </div>
      `;
    }
  );

  addUnsubscriber(unsub);
}

async function uploadSelectedMedia() {
  if (!currentUser) {
    alert("Please sign in first.");
    return;
  }

  const file = els.mediaFileInput?.files?.[0];
  if (!file) {
    alert("Please choose a file first.");
    return;
  }

  const path = `user_media/${currentUser.uid}/${Date.now()}-${file.name}`;
  const storageRef = ref(storage, path);
  const uploadTask = uploadBytesResumable(storageRef, file);

  if (els.lockerStatusText) {
    els.lockerStatusText.textContent = `Uploading ${file.name}...`;
  }

  if (els.uploadProgressBar) {
    els.uploadProgressBar.style.width = "0%";
  }

  await new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        if (els.uploadProgressBar) {
          els.uploadProgressBar.style.width = `${progress}%`;
        }
        if (els.lockerStatusText) {
          els.lockerStatusText.textContent = `Uploading ${file.name}... ${progress}%`;
        }
      },
      (error) => reject(error),
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          await addDoc(collection(db, "users", currentUser.uid, "media"), {
            uid: currentUser.uid,
            name: file.name,
            contentType: file.type || "application/octet-stream",
            size: file.size || 0,
            storagePath: path,
            downloadURL,
            createdAt: serverTimestamp()
          });

          if (els.mediaFileInput) {
            els.mediaFileInput.value = "";
          }
          if (els.lockerStatusText) {
            els.lockerStatusText.textContent = `${file.name} uploaded successfully.`;
          }
          if (els.uploadProgressBar) {
            els.uploadProgressBar.style.width = "100%";
          }
          resolve();
        } catch (err) {
          reject(err);
        }
      }
    );
  });
}

/* -------------------------------------------------
   ADMIN: ADD ATHLETE
------------------------------------------------- */
async function createAthleteFromForm() {
  if (!currentUser || !isAdminUser(currentProfile)) {
    alert("Only admin/editor can add athletes.");
    return;
  }

  const name = els.playerName?.value?.trim() || "";
  const sport = els.playerSport?.value?.trim() || "";
  const scores = [
    els.score0?.value?.trim() || "",
    els.score1?.value?.trim() || "",
    els.score2?.value?.trim() || "",
    els.score3?.value?.trim() || "",
    els.score4?.value?.trim() || ""
  ];

  if (!name) {
    alert("Player name is required.");
    return;
  }

  await addDoc(collection(db, "athletes"), {
    name,
    sport,
    scores,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: currentUser.uid
  });

  els.addAthleteForm?.reset();
}

/* -------------------------------------------------
   AUTH
------------------------------------------------- */
async function logIn(email, password) {
  await signInWithEmailAndPassword(auth, email, password);
}

async function register(email, password, nickname = "Member") {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(
    doc(db, "users", cred.user.uid),
    {
      uid: cred.user.uid,
      email: cred.user.email || email,
      nickname,
      role: "user",
      isPro: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    },
    { merge: true }
  );
}

async function logOut() {
  try {
    if (currentUser) {
      await markPresence(false);
    }
  } catch (err) {
    console.warn("Failed to mark offline before logout:", err);
  }

  await signOut(auth);
}

/* -------------------------------------------------
   SIGNED-IN / SIGNED-OUT FLOWS
------------------------------------------------- */
async function handleSignedInUser(user) {
  clearAllListeners();
  stopPresenceHeartbeat();

  currentUser = user;

  try {
    const profile = await loadOrCreateUserProfile(user);
    currentProfile = profile;

    updateAccessUI(profile);
    updateHeaderButtons(true);

    if (els.accountEmailDisplay) {
      els.accountEmailDisplay.textContent =
        profile.email || user.email || "";
    }
    if (els.nicknameInput) {
      els.nicknameInput.value = profile.nickname || "";
    }

    toggleLoginModal(false);

    // Public reads
    subscribeToAthletes();
    subscribeToLiveFeed();
    subscribeToSportsData();

    // Signed-in-only reads
    subscribeToChat();
    subscribeToPresence();
    subscribeToUserMedia(user.uid);

    await markPresence(true);
    startPresenceHeartbeat();
  } catch (error) {
    console.error("Failed to initialize signed-in user:", error);
    currentProfile = null;
    updateAccessUI(null);
    updateHeaderButtons(false);
    renderChatPrompt();
    renderPresencePrompt();
    renderLockerPrompt();
  } finally {
    setLoading(false);
  }
}

function handleSignedOutUser() {
  clearAllListeners();
  stopPresenceHeartbeat();

  currentUser = null;
  currentProfile = null;

  updateAccessUI(null);
  updateHeaderButtons(false);

  // Public listeners remain active
  subscribeToAthletes();
  subscribeToLiveFeed();
  subscribeToSportsData();

  // Signed-out placeholders
  renderChatPrompt();
  renderPresencePrompt();
  renderLockerPrompt();

  setLoading(false);
}

/* -------------------------------------------------
   EVENT BINDINGS
------------------------------------------------- */
function bindEvents() {
  if (els.headerAuthBtn) {
    els.headerAuthBtn.addEventListener("click", async () => {
      if (currentUser) {
        try {
          setLoading(true, "Signing out...");
          await logOut();
        } catch (error) {
          console.error("Logout failed:", error);
          alert("Logout failed.");
        } finally {
          setLoading(false);
        }
      } else {
        toggleLoginModal(true);
      }
    });
  }

  if (els.accountBtn) {
    els.accountBtn.addEventListener("click", () => toggleAccountModal(true));
  }

  if (els.accountCloseBtn) {
    els.accountCloseBtn.addEventListener("click", () =>
      toggleAccountModal(false)
    );
  }

  if (els.logoutBtn) {
    els.logoutBtn.addEventListener("click", async () => {
      toggleAccountModal(false);
      await logOut();
    });
  }

  if (els.saveNicknameBtn) {
    els.saveNicknameBtn.addEventListener("click", async () => {
      try {
        await saveNickname();
      } catch (error) {
        console.error("Save nickname failed:", error);
        alert("Failed to save nickname.");
      }
    });
  }

  if (els.updatePasswordBtn) {
    els.updatePasswordBtn.addEventListener("click", async () => {
      try {
        await changePassword();
      } catch (error) {
        console.error("Password update failed:", error);
        alert("Failed to update password. You may need to sign in again.");
      }
    });
  }

  if (els.loginModal) {
    els.loginModal.addEventListener("click", (event) => {
      if (event.target === els.loginModal) {
        toggleLoginModal(false);
      }
    });
  }

  if (els.accountModal) {
    els.accountModal.addEventListener("click", (event) => {
      if (event.target === els.accountModal) {
        toggleAccountModal(false);
      }
    });
  }

  if (els.loginForm) {
    els.loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const email = els.loginEmail?.value?.trim() || "";
      const password = els.loginPassword?.value || "";

      if (els.loginError) els.loginError.textContent = "";

      if (!email || !password) {
        if (els.loginError) els.loginError.textContent = "Enter email and password.";
        return;
      }

      try {
        setLoading(true, "Signing in...");
        await logIn(email, password);
        if (els.loginPassword) els.loginPassword.value = "";
      } catch (error) {
        console.error("Login failed:", error);
        if (els.loginError) {
          els.loginError.textContent = "Login failed. Check your email and password.";
        }
      } finally {
        setLoading(false);
      }
    });
  }

  if (els.sendChatMessageBtn) {
    els.sendChatMessageBtn.addEventListener("click", async () => {
      try {
        await sendChatMessage();
      } catch (error) {
        console.error("Send chat failed:", error);
        alert("Failed to send message.");
      }
    });
  }

  if (els.chatMessageInput) {
    els.chatMessageInput.addEventListener("keydown", async (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        try {
          await sendChatMessage();
        } catch (error) {
          console.error("Enter-to-send failed:", error);
        }
      }
    });
  }

  if (els.addAthleteForm) {
    els.addAthleteForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      try {
        await createAthleteFromForm();
      } catch (error) {
        console.error("Create athlete failed:", error);
        alert("Failed to add athlete.");
      }
    });
  }

  if (els.lockerUploadBtn) {
    els.lockerUploadBtn.addEventListener("click", async () => {
      try {
        await uploadSelectedMedia();
      } catch (error) {
        console.error("Upload failed:", error);
        alert("Upload failed.");
        if (els.lockerStatusText) {
          els.lockerStatusText.textContent = "Upload failed.";
        }
      }
    });
  }

  window.addEventListener("beforeunload", () => {
    if (currentUser) {
      markPresence(false).catch(() => {});
    }
  });
}

/* -------------------------------------------------
   INIT
------------------------------------------------- */
function init() {
  bindEvents();
  setLoading(true, "⚡ CONNECTING...");

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      await handleSignedInUser(user);
    } else {
      handleSignedOutUser();
    }
  });
}

init();

/* -------------------------------------------------
   OPTIONAL GLOBAL API
------------------------------------------------- */
window.appAuth = {
  logIn,
  register,
  logOut
};
