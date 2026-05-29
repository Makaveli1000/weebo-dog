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

    // NEW DROPDOWN DOM ELEMENT LINKS MAPPED HERE
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

// NEW FILTER PROCESSOR: Triggers automatically on dropdown selections
function processAndRenderFilteredAthletes() {
  if (!els.matchGridBody) return;

  const tier = els.mainTierFilter?.value || "all";
  const subCat = els.subCategoryFilter?.value || "all-sub";

  // Filter our cached array pool locally
  let filtered = allAthletesCache.filter(({ data }) => {
    // 1. Evaluate Main Tier matching
    if (tier !== "all" && data.tier !== tier) return false;

    // 2. Evaluate Specific Sub-category matching
    if (subCat !== "all-sub" && !subCat.startsWith("all-")) {
      if (data.subCategory !== subCat) return false;
    }
    return true;
  });

  // Calculate top predator based on current filtered view results
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
      // Parse data and cache the global array internally sorted by raw totals
      allAthletesCache = snapshot.docs
        .map((d) => ({ id: d.id, data: d.data() }))
        .sort((a, b) => athleteTotal(b.data) - athleteTotal(a.data));
      
      // Fire renderer logic
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

// ENHANCED FORM DISPATCHER: Automatically checks for active tags or extracts generic defaults
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

  // REASONING: Fallbacks cleanly back to generic highschool/mcc bucket parameters 
  // if no deep entry adjustments exist inside your Admin Command panel view yet
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
function renderLiveFeed(docs) {
  if (els.latestData) {
    if (!docs.length) {
      els.latestData.textContent = "No live data available.";
    } else {
      const latest = docs[0].data;
      els.latestData.textContent =
        latest.title || latest.headline || latest.content || "Live update";
    }
  }

  if (!els.dataStream) return;

  if (!docs.length) {
    els.dataStream.textContent = "Waiting for updates...";
    return;
  }

  els.dataStream.textContent = docs
    .map(({ data }) => {
      const title = data.title || data.headline || "Update";
      const body = data.content || data.summary || "";
      return `${title}\n${body}`;
    })
    .join("\n\n");
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
   SPORTS DATA
------------------------------------------------- */
function renderSportsData(docs) {
  if (!els.sportsDataDisplay) return;

  if (!docs.length) {
    els.sportsDataDisplay.innerHTML = `
      <p class="text-sm text-gray-500">No sports data submitted yet.</p>
    `;
    return;
  }

  els.sportsDataDisplay.innerHTML = docs
    .map(({ data }) => {
      const title = data.title || data.label || data.metric || "Sports Data";
      const value = data.value ?? data.stat ?? data.content ?? "";
      const meta = data.subtitle || data.description || "";

      return `
        <div class="rounded-xl border border-gray-800 bg-black/20 p-4">
          <div class="text-xs uppercase tracking-wider text-gray-500">${escapeHtml(title)}</div>
          <div class="mt-1 text-lg font-bold text-white">${escapeHtml(value)}</div>
          ${meta ? `<div class="mt-1 text-sm text-gray-300">${escapeHtml(meta)}</div>` : ""}
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
        <p class="text-sm text-red-400">Failed to load sports data.</p>
      `;
    }
  );

  addUnsubscriber(unsub);
}

/* -------------------------------------------------
   MEDIA LOCKER
------------------------------------------------- */
function renderLockerPrompt() {
  if (els.lockerMediaDisplay) {
    els.lockerMediaDisplay.innerHTML = `
      <p class="col-span-full text-center text-sm text-gray-500">
        Log in to view your media.
      </p>
    `;
  }

  if (els.lockerStatusText) {
    els.lockerStatusText.textContent = "Capacity: Log in to see status.";
  }

  if (els.uploadCounterDisplay) {
    els.uploadCounterDisplay.textContent = "Uploads: 0";
  }

  if (els.uploadProgressBar) {
    els.uploadProgressBar.style.width = "0%";
  }
}

function renderUserMedia(docs) {
  if (!els.lockerMediaDisplay) return;

  if (els.uploadCounterDisplay) {
    els.uploadCounterDisplay.textContent = `Uploads: ${docs.length}`;
  }

  if (!docs.length) {
    els.lockerMediaDisplay.innerHTML = `
      <p class="col-span-full text-center text-sm text-gray-500">
        No media uploaded yet.
      </p>
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
        <div class="overflow-hidden rounded-xl border border-gray-800 bg-black/20">
          ${
            isImage
              ? `<img src="${escapeHtml(url)}" alt="${escapeHtml(name)}" class="h-40 w-full object-cover" />`
              : isVideo
              ? `<video src="${escapeHtml(url)}" controls class="h-40 w-full bg-black object-cover"></video>`
              : ""
          }
          <div class="p-3">
            <div class="text-sm font-bold text-white">${escapeHtml(name)}</div>
            <div class="mt-1 text-xs text-gray-500">${escapeHtml(type || "file")}</div>
            <a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" class="mt-3 inline-block rounded border border-yellow-500/30 px-3 py-2 text-xs uppercase tracking-wider text-yellow-400 hover:bg-yellow-500/10">
              Open File
            </a>
          </div>
        </div>
      `;
    })
    .join("");
}

function subscribeToUserMedia(uid) {
  if (!els.lockerMediaDisplay || !uid || !currentUser) return;

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
        <p class="col-span-full text-center text-sm text-red-400">
          Failed to load media.
        </p>
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
   AUTH FLOW
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
    updateSignedInFeatureUI(true);

    if (els.accountEmailDisplay) {
      els.accountEmailDisplay.textContent = profile.email || user.email || "N/A";
    }

    if (els.nicknameInput) {
      els.nicknameInput.value = profile.nickname || "";
    }

    toggleLoginModal(false);

    subscribeToAthletes();
    subscribeToLiveFeed();
    subscribeToSportsData();
    subscribeToChat();
    subscribeToPresence();
    subscribeToUserMedia(user.uid);

    await markPresence(true);
    startPresenceHeartbeat();
  } catch (error) {
    console.error("Failed to initialize signed-in user:", error);
     SheltonHandlersCleanedFallBack();
  } finally {
    finishBootSequence();
  }
}

function SheltonHandlersCleanedFallBack() {
  currentProfile = null;
  updateAccessUI(null);
  updateHeaderButtons(false);
  updateSignedInFeatureUI(false);
  renderChatPrompt();
  renderPresencePrompt();
  renderLockerPrompt();
}

function handleSignedOutUser() {
  clearAllListeners();
  stopPresenceHeartbeat();

  currentUser = null;
  currentProfile = null;

  updateAccessUI(null);
  updateHeaderButtons(false);
  updateSignedInFeatureUI(false);

  subscribeToAthletes();
  subscribeToLiveFeed();
  subscribeToSportsData();

  renderChatPrompt();
  renderPresencePrompt();
  renderLockerPrompt();

  finishBootSequence();
}

/* -------------------------------------------------
   EVENTS
------------------------------------------------- */
function bindEvents() {
  if (els.headerAuthBtn) {
    els.headerAuthBtn.removeAttribute("onclick");
    els.headerAuthBtn.addEventListener("click", async () => {
      if (currentUser) {
        try {
          setLoading(true, "Signing out...");
          await logOut();
        } catch (error) {
          console.error("Logout failed:", error);
          alert("Logout failed.");
          setLoading(false);
        }
      } else {
        toggleLoginModal(true);
      }
    });
  }

  // NEW EVENT LISTENERS: Listen to dropdown updates and run filtering instantly
  if (els.mainTierFilter) {
    els.mainTierFilter.addEventListener("change", () => {
      processAndRenderFilteredAthletes();
    });
  }

  if (els.subCategoryFilter) {
    els.subCategoryFilter.addEventListener("change", () => {
      processAndRenderFilteredAthletes();
    });
  }

  if (els.accountBtn) {
    els.accountBtn.removeAttribute("onclick");
    els.accountBtn.addEventListener("click", () => toggleAccountModal(true));
  }

  if (els.enterSiteBtn) {
    els.enterSiteBtn.addEventListener("click", async () => {
      try {
        await handleEnterSiteIntro();
      } catch (error) {
        console.error("Enter Site intro failed:", error);
        hideIntroScreen();
      }
    });
  }

  if (els.skipIntroBtn) {
    els.skipIntroBtn.addEventListener("click", () => {
      handleSkipIntro();
    });
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
        await changePasswordAction();
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
        if (els.loginError) {
          els.loginError.textContent = "Enter email and password.";
        }
        return;
      }

      try {
        setLoading(true, "Signing in...");
        await logIn(email, password);
        if (els.loginPassword) els.loginPassword.value = "";
      } catch (error) {
        console.error("Login failed:", error);
        if (els.loginError) {
          els.loginError.textContent =
            error?.code === "auth/invalid-credential"
              ? "Invalid email or password."
              : "Login failed. Check your email and password.";
        }
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
    stopZeusVoice();
  });
}

/* -------------------------------------------------
   INIT
------------------------------------------------- */
function init() {
  bindEvents();
  setLoading(true, "⚡ SUMMONING ZEUS...");

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