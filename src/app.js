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
  where,
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
   FIREBASE
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

// Track the active pool of downloaded athletes to allow instant front-end filtering
let allAthletesCache = []; 

let zeusIntroStarted = false;
let zeusIntroFinished = false;
let zeusSpeechUtterance = null;

const ZEUS_INTRO_SCRIPT =
  "Welcome to the S N T L M O Exclusive Sports Grid. This is the pulse of St. Louis sports — where rising names earn their place, the city speaks, and every level of the game lives on one board. Enter the Grid. Watch closely. The next titan is already here.";

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

function show(el) {
  el?.classList.remove("hidden");
}

function hide(el) {
  el?.classList.add("hidden");
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

function safeNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function setStatus(text) {
  if (els.userStatus) els.userStatus.textContent = text;
}

function setLoading(isLoading, message = "⚡ CONNECTING...") {
  if (!els.loadingOverlay) return;
  const textEl = els.loadingOverlay.querySelector("[data-loading-text]");
  if (textEl) textEl.textContent = message;

  if (isLoading) show(els.loadingOverlay);
  else hide(els.loadingOverlay);
}

/* -------------------------------------------------
   DOM
------------------------------------------------- */
function getEls() {
  return {
    loadingOverlay: $("loading-overlay"),
    introScreen: $("intro-screen"),
    enterSiteBtn: $("enter-site-btn"),
    skipIntroBtn: $("skip-intro-btn"),
    zeusIntroAudio: $("zeus-intro-audio"),
    zeusIntroCopy: $("zeus-intro-copy"),

    headerAuthBtn: $("header-auth-btn"),
    accountBtn: $("account-btn"),
    userStatus: $("user-status"),

    paywallContent: $("paywall-content"),
    mainContent: $("main-content"),
    adminPanel: $("admin-panel"),

    // DROPDOWN DOM SELECTORS
    mainTierFilter: $("main-tier-filter"),
    subCategoryFilter: $("sub-category-filter"),

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

const els = getEls();

/* -------------------------------------------------
   ZEUS INTRO
------------------------------------------------- */
function stopZeusVoice() {
  try {
    if (els.zeusIntroAudio) {
      els.zeusIntroAudio.pause();
      els.zeusIntroAudio.currentTime = 0;
    }
  } catch (err) {
    console.warn("Failed to stop Zeus audio:", err);
  }

  try {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  } catch (err) {
    console.warn("Failed to stop Zeus TTS:", err);
  }
}

function showIntroScreen() {
  if (!els.introScreen || zeusIntroFinished) return;

  show(els.introScreen);

  window.requestAnimationFrame(() => {
    els.introScreen.classList.add("active");
  });
}

function hideIntroScreen() {
  if (!els.introScreen) return;

  els.introScreen.classList.remove("active");
  els.introScreen.classList.add("exit");

  window.setTimeout(() => {
    hide(els.introScreen);
    els.introScreen.classList.remove("exit");
    zeusIntroFinished = true;
  }, 700);
}

function speakZeusFallback(text) {
  return new Promise((resolve, reject) => {
    if (!("speechSynthesis" in window)) {
      reject(new Error("speechSynthesis not supported"));
      return;
    }

    try {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      zeusSpeechUtterance = utterance;
      utterance.rate = 0.93;
      utterance.pitch = 0.82;
      utterance.volume = 1;

      const voices = window.speechSynthesis.getVoices();
      const preferredVoice =
        voices.find((v) => /david|male|google us english/i.test(v.name)) ||
        voices.find((v) => /english/i.test(v.lang || ""));

      if (preferredVoice) utterance.voice = preferredVoice;

      utterance.onend = () => resolve();
      utterance.onerror = (event) =>
        reject(new Error(event?.error || "Speech synthesis failed"));

      window.speechSynthesis.speak(utterance);
    } catch (error) {
      reject(error);
    }
  });
}

async function playZeusIntroVoice() {
  if (els.zeusIntroAudio) {
    try {
      els.zeusIntroAudio.currentTime = 0;
      els.zeusIntroAudio.volume = 1;
      await els.zeusIntroAudio.play();
      return "audio";
    } catch (error) {
      console.warn("Zeus MP3 unavailable, falling back to TTS:", error);
    }
  }

  try {
    await speakZeusFallback(ZEUS_INTRO_SCRIPT);
    return "tts";
  } catch (error) {
    console.warn("Zeus TTS fallback failed:", error);
    return "none";
  }
}

async function handleEnterSiteIntro() {
  if (zeusIntroStarted) return;
  zeusIntroStarted = true;

  if (els.enterSiteBtn) {
    els.enterSiteBtn.disabled = true;
    els.enterSiteBtn.textContent = "Entering...";
    els.enterSiteBtn.classList.add("opacity-70", "cursor-not-allowed");
  }

  if (els.skipIntroBtn) {
    els.skipIntroBtn.disabled = true;
    els.skipIntroBtn.classList.add("opacity-70", "cursor-not-allowed");
  }

  if (els.zeusIntroCopy) {
    els.zeusIntroCopy.textContent =
      "Zeus is speaking... welcome to the Grid.";
  }

  playZeusIntroVoice().catch((error) => {
    console.warn("Zeus intro playback failed:", error);
  });

  window.setTimeout(() => {
    hideIntroScreen();
  }, 1200);
}

function handleSkipIntro() {
  stopZeusVoice();
  hideIntroScreen();
}

function finishBootSequence() {
  setLoading(false);

  if (!zeusIntroFinished) {
    window.setTimeout(() => {
      showIntroScreen();
    }, 220);
  }
}

/* -------------------------------------------------
   ACCESS
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
    setStatus("Status: Mortal Vision");
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

function updateSignedInFeatureUI(isSignedIn) {
  if (els.chatMessageInput) {
    els.chatMessageInput.disabled = !isSignedIn;
    els.chatMessageInput.placeholder = isSignedIn
      ? "Enter message..."
      : "Log in to chat...";
  }

  if (els.sendChatMessageBtn) {
    els.sendChatMessageBtn.disabled = !isSignedIn;
    if (isSignedIn) {
      els.sendChatMessageBtn.classList.remove("opacity-50", "cursor-not-allowed");
    } else {
      els.sendChatMessageBtn.classList.add("opacity-50", "cursor-not-allowed");
    }
  }

  if (els.lockerUploadBtn) {
    els.lockerUploadBtn.disabled = !isSignedIn;
    if (isSignedIn) {
      els.lockerUploadBtn.classList.remove("opacity-50", "cursor-not-allowed");
    } else {
      els.lockerUploadBtn.classList.add("opacity-50", "cursor-not-allowed");
    }
  }

  if (els.mediaFileInput) {
    els.mediaFileInput.disabled = !isSignedIn;
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
        currentProfile?.email || currentUser?.email || "N/A";
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

  updateAccessUI(currentProfile);
  toggleAccountModal(false);
}

async function changePasswordAction() {
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
   ATHLETES (WITH COMPREHENSIVE FILTER SYSTEM REWRITES)
------------------------------------------------- */
function athleteTotal(data) {
  const scores = Array.isArray(data.scores)
    ? data.scores
    : [
        data.score0 ?? 0,
        data.score1 ?? 0,
        data.score2 ?? 0,
        data.score3 ?? 0,
        data.score4 ?? 0
      ];

  return scores.reduce((sum, value) => sum + safeNumber(value), 0);
}

function processAndRenderFilteredAthletes() {
  if (!els.matchGridBody) return;

  const tier = els.mainTierFilter?.value || "all";
  const subCat = els.subCategoryFilter?.value || "all-sub";

  let filtered = allAthletesCache.filter(({ data }) => {
    if (tier !== "all" && data.tier !== tier) return false;
    if (subCat !== "all-sub" && !subCat.startsWith("all-")) {
      if (data.subCategory !== subCat) return false;
    }
    return true;
  });

  if (els.topAthleteDisplay) {
    if (!filtered.length) {
      els.topAthleteDisplay.textContent = "No grid assets match this criteria.";
    } else {
      const top = filtered[0].data;
      els.topAthleteDisplay.textContent = `${top.name || "Unknown"} • ${athleteTotal(top)}`;
    }
  }

  if (!filtered.length) {
    els.matchGridBody.innerHTML = `
      <tr>
        <td colspan="5" class="p-4 text-center text-gray-500">
          No athletes active in this section of the grid.
        </td>
      </tr>
    `;
    return;
  }

  els.matchGridBody.innerHTML = filtered
    .map(({ id, data }) => {
      const scores = Array.isArray(data.scores)
        ? data.scores
        : [data.score0 ?? "", data.score1 ?? "", data.score2 ?? "", data.score3 ?? "", data.score4 ?? ""];

      const total = athleteTotal(data);

      return `
        <tr class="border-t border-gray-800">
          <td class="p-3 font-bold text-white">${escapeHtml(data.name || "Unknown")}</td>
          <td class="p-3 text-center text-gray-300">${escapeHtml(scores[0] ?? "")}</td>
          <td class="p-3 text-center text-gray-300">${escapeHtml(scores[1] ?? "")}</td>
          <td class="p-3 text-center font-black text-yellow-500">${escapeHtml(total)}</td>
          <td class="p-3 text-right">
            <span class="inline-block rounded border border-yellow-500/30 px-2 py-1 text-[10px] uppercase tracking-wider text-yellow-400">
              ${escapeHtml(data.sport || "Athlete")}
            </span>
          </td>
        </tr>
      `;
    })
    .join("");
}

function subscribeToAthletes() {
  if (!els.matchGridBody && !els.topAthleteDisplay) return;

  const q = query(collection(db, "athletes"), limit(120));
  const unsub = onSnapshot(
    q,
    (snapshot) => {
      allAthletesCache = snapshot.docs
        .map((d) => ({ id: d.id, data: d.data() }))
        .sort((a, b) => athleteTotal(b.data) - athleteTotal(a.data));
      
      processAndRenderFilteredAthletes();
    },
    (error) => {
      console.error("Athletes listener error:", error);
      if (els.matchGridBody) {
        els.matchGridBody.innerHTML = `
          <tr>
            <td colspan="5" class="p-4 text-center text-red-400">
              Failed to load grid athletes.
            </td>
          </tr>
        `;
      }
    }
  );

  addUnsubscriber(unsub);
}

async function createAthleteFromForm() {
  if (!currentUser || !isAdminUser(currentProfile)) {
    alert("Only admin/editor can add athletes.");
    return;
  }

  const name = els.playerName?.value?.trim() || "";
  const sport = els.playerSport?.value?.trim() || "";
  const scores = [
    els.score0?.value?.trim() || 0,
    els.score1?.value?.trim() || 0,
    els.score2?.value?.trim() || 0,
    els.score3?.value?.trim() || 0,
    els.score4?.value?.trim() || 0
  ];

  if (!name) {
    alert("Player name is required.");
    return;
  }

  const tier = els.mainTierFilter?.value !== "all" ? els.mainTierFilter.value : "highschool";
  const subCategory = els.subCategoryFilter?.value !== "all-sub" ? els.subCategoryFilter.value : "mcc";

  await addDoc(collection(db, "athletes"), {
    name,
    sport,
    scores,
    tier,
    subCategory,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: currentUser.uid
  });

  els.addAthleteForm?.reset();
}

/* -------------------------------------------------
   CHAT
------------------------------------------------- */
function renderChatPrompt() {
  if (!els.chatMessages) return;

  els.chatMessages.innerHTML = `
    <div class="text-center text-sm text-gray-500 py-6">
      Log in to enter War Room Chat.
    </div>
  `;
}

function renderChatMessages(docs) {
  if (!els.chatMessages) return;

  if (!docs.length) {
    els.chatMessages.innerHTML = `
      <div class="text-center text-sm text-gray-500 py-6">
        No messages yet.
      </div>
    `;
    return;
  }

  els.chatMessages.innerHTML = docs
    .map(({ data }) => {
      const isMine = data.uid === currentUser?.uid;
      const who = data.nickname || data.email || "Member";
      const when = formatDateTime(data.createdAt);

      return `
        <div class="rounded-xl border ${isMine ? "border-yellow-500/30 bg-yellow-500/10" : "border-gray-800 bg-black/20"} p-3">
          <div class="mb-1 flex items-center justify-between gap-3">
            <span class="text-sm font-bold text-white">${escapeHtml(who)}</span>
            <span class="text-[10px] uppercase tracking-wider text-gray-500">${escapeHtml(when)}</span>
          </div>
          <p class="text-sm text-gray-200">${escapeHtml(data.text || "")}</p>
        </div>
      `;
    })
    .join("");

  els.chatMessages.scrollTop = els.chatMessages.scrollHeight;
}

function subscribeToChat() {
  if (!els.chatMessages || !currentUser) return;

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
        <div class="text-center text-sm text-red-400 py-6">
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

  await addDoc(collection(db, "chatMessages"), {
    uid: currentUser.uid,
    email: currentUser.email || "",
    nickname:
      currentProfile?.nickname || currentUser.displayName || "Member",
    text,
    createdAt: serverTimestamp()
  });

  els.chatMessageInput.value = "";
}

/* -------------------------------------------------
   PRESENCE LIST
------------------------------------------------- */
function renderPresencePrompt() {
  if (!els.activeUsersList) return;

  els.activeUsersList.innerHTML = `
    <li class="text-sm text-gray-500">Log in to view active users.</li>
  `;
}

function renderPresence(docs) {
  if (!els.activeUsersList) return;

  if (!docs.length) {
    els.activeUsersList.innerHTML = `
      <li class="text-sm text-gray-500">No active users yet.</li>
    `;
    return;
  }

  els.activeUsersList.innerHTML = docs
    .map(({ data }) => {
      const online = !!data.online;
      return `
        <li class="flex items-center justify-between rounded-lg border border-gray-800 bg-black/20 px-3 py-2">
          <div class="flex items-center gap-2">
            <span class="inline-block h-2.5 w-2.5 rounded-full ${online ? "bg-green-400" : "bg-gray-500"}"></span>
            <span class="text-sm text-white">${escapeHtml(data.nickname || data.email || "Member")}</span>
          </div>
          <span class="text-[10px] uppercase tracking-wider text-gray-500">
            ${online ? "Online" : escapeHtml(formatDateTime(data.lastSeen) || "Offline")}
          </span>
        </li>
      `;
    })
    .join("");
}

function subscribeToPresence() {
  if (!els.activeUsersList || !currentUser) return;

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
        <li class="text-sm text-red-400">Unable to load active users.</li>
      `;
    }
  );

  addUnsubscriber(unsub);
}

/* -------------------------------------------------
   LIVE FEED
------------------------------------------------- */