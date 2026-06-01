import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, addDoc, collection, query, limit, onSnapshot, serverTimestamp, getDocs, deleteDoc } from "firebase/firestore";
import { getDatabase, ref as rtdbRef, set as rtdbSet, push as rtdbPush, onChildAdded } from "firebase/database";

// ==========================================
// ⚡ CORE INFRASTRUCTURE CONFIGURATION
// ==========================================
const firebaseConfig = {
  apiKey: "AIzaSyDbt0ITM9G4LOZTlXuAGGvuO80uazFpZSs",
  authDomain: "sntlmoexclusivesportsgrid.firebaseapp.com",
  projectId: "sntlmoexclusivesportsgrid",
  storageBucket: "sntlmoexclusivesportsgrid.firebasestorage.app",
  messagingSenderId: "735791748207",
  appId: "1:735791748207:web:74fd6412684db238b6e99a",
  databaseURL: "https://sntlmoexclusivesportsgrid-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const rtdb = getDatabase(app);

// ==========================================
// 📡 APPLICATION STATE MEMORY
// ==========================================
let currentUser = null;
let currentProfile = null;
let allAthletesCache = [];
let selectedTierFilter = "all";
let selectedSubTierFilter = "all";

// ==========================================
// 🛠️ COMPACT UTILITY TOOLKIT
// ==========================================
const $ = (id) => document.getElementById(id);

function escapeHtml(v = "") { 
  return String(v).replace(/[&<>"\x27]/g, c => ({ 
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" 
  }[c] || c)); 
}

function show(id) { $(id)?.classList.remove("hidden"); }
function hide(id) { $(id)?.classList.add("hidden"); }

function safeNumber(v) { 
  const n = Number(v); 
  return Number.isFinite(n) ? n : 0; 
}

// ==========================================
// 🏆 ST. LOUIS BASELINE SPORTS SEEDS
// ==========================================
const ST_LOUIS_INITIAL_SEEDS = [
  { name: "Vashon Elite Squad", sport: "Basketball", tier: "highschool", subCategory: "phsl", scores: [95, 92, 94, 96, 98] },
  { name: "Soldan Prep Leader", sport: "Basketball", tier: "highschool", subCategory: "phsl", scores: [88, 85, 90, 89, 91] },
  { name: "CBC Cadet Core", sport: "Football", tier: "highschool", subCategory: "mcc", scores: [94, 96, 95, 93, 97] },
  { name: "SLUH Jr. Billikens", sport: "Track", tier: "highschool", subCategory: "mcc", scores: [89, 92, 91, 90, 94] },
  { name: "Macler Cody (Mac10)", sport: "Football", tier: "pro-players", subCategory: "pro-cfl-alt", scores: [98, 97, 99, 96, 98] },
  { name: "David Freese (Lafayette HS)", sport: "Baseball", tier: "pro-players", subCategory: "pro-major", scores: [95, 94, 96, 92, 95] },
  { name: "Pat Maroon (Oakville HS)", sport: "Soccer", tier: "pro-players", subCategory: "pro-major", scores: [93, 95, 94, 91, 96] },
  { name: "Bradley Beal (Chaminade)", sport: "Basketball", tier: "pro-players", subCategory: "pro-major", scores: [97, 98, 96, 95, 99] }
];

async function checkAndSeedDatabase() {
  if (allAthletesCache.length > 0) return;
  console.log("⚡ Database board blank. Deploying seeds...");
  const athletesRef = collection(db, "athletes");
  for (const titan of ST_LOUIS_INITIAL_SEEDS) {
    await addDoc(athletesRef, { ...titan, createdAt: serverTimestamp(), updatedAt: serverTimestamp(), createdBy: "auto_init" });
  } 
}

// ==========================================
// 🛡️ ACCESSIBILITY AND INTERACTION HANDLERS
// ==========================================
function updateAccessUI(profile) {
  if (profile?.role === "admin" || profile?.role === "editor" || profile?.isPro) { 
    hide("paywall-content"); 
    show("main-content"); 
  } else { 
    show("paywall-content"); 
    hide("main-content"); 
  }
  
  if (profile?.role === "admin" || profile?.role === "editor") { 
    show("admin-panel"); 
    show("admin-purge-btn"); 
    checkAndSeedDatabase().catch((e) => console.error(e)); 
  } else { 
    hide("admin-panel"); 
    hide("admin-purge-btn"); 
  }
  
  const statusEl = $("user-status");
  if (statusEl) {
    statusEl.textContent = profile ? `Admin: ${profile.nickname || profile.email}` : "Status: Mortal Vision";
  }
}

function athleteTotal(d) { 
  return (Array.isArray(d.scores) ? d.scores : [d.score0, d.score1, d.score2, d.score3, d.score4]).reduce((s, v) => s + safeNumber(v), 0); 
}

// ==========================================
// 📊 RENDER ENGINE WITH ACTIVE DYNAMIC FILTERING
// ==========================================
function processAndRenderFilteredAthletes() {
  const gridBody = $("match-grid-body");
  if (!gridBody) return;
  
  // Apply our user-selected filter parameters on the client array
  const filteredData = allAthletesCache.filter(({ data }) => {
    const matchTier = (selectedTierFilter === "all" || data.tier === selectedTierFilter);
    const matchSub = (selectedSubTierFilter === "all" || data.subCategory === selectedSubTierFilter);
    return matchTier && matchSub;
  });

  if (!filteredData.length) { 
    gridBody.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-gray-500">No athletes active match this criteria.</td></tr>`; 
    return; 
  }
  
  gridBody.innerHTML = filteredData.map(({ data }) => `
    <tr class="border-t border-gray-800 hover:bg-gray-950/40 transition">
      <td class="p-3 font-bold text-white">${escapeHtml(data.name)}</td>
      <td class="p-3 text-center text-gray-300">${safeNumber(data.scores?.[0])}</td>
      <td class="p-3 text-center text-gray-300">${safeNumber(data.scores?.[1])}</td>
      <td class="p-3 text-center font-black text-yellow-500">${athleteTotal(data)}</td>
      <td class="p-3 text-right"><span class="rounded border border-yellow-500/30 px-2 py-1 text-[10px] uppercase text-yellow-400">${escapeHtml(data.sport)}</span></td>
    </tr>
  `).join("");

  // Keep Global Apex Display anchored to absolute top overall performer
  if (allAthletesCache.length > 0) {
    const leader = allAthletesCache[0].data;
    if ($("apex-predator-name")) $("apex-predator-name").textContent = leader.name;
    if ($("apex-predator-score")) $("apex-predator-score").textContent = athleteTotal(leader);
  }
  if ($("grid-count-badge")) $("grid-count-badge").textContent = `${filteredData.length} Shown`;
}

function subscribeToAthletes() {
  onSnapshot(query(collection(db, "athletes"), limit(120)), (snap) => {
    allAthletesCache = snap.docs.map(d => ({ id: d.id, data: d.data() })).sort((a,b) => athleteTotal(b.data) - athleteTotal(a.data));
    processAndRenderFilteredAthletes();
  });
}

// ==========================================
// 📡 REAL-TIME WAR ROOM TERMINAL CHAT ENGINE
// ==========================================
function initWarRoomChat() {
  const chatDisplay = $("chat-box-display");
  if (!chatDisplay) return;

  const chatRef = rtdbRef(rtdb, "war_room_messages");
  
  // Realtime structural listening thread
  onChildAdded(chatRef, (snapshot) => {
    const data = snapshot.val();
    const msgDiv = document.createElement("div");
    msgDiv.className = "py-0.5 border-b border-gray-900/40";
    msgDiv.innerHTML = `<span class="text-yellow-500 font-bold">${escapeHtml(data.user)}:</span> <span class="text-gray-200">${escapeHtml(data.text)}</span>`;
    chatDisplay.appendChild(msgDiv);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
  });
}

async function sendWarRoomBroadcast() {
  const inputEl = $("chat-message-input");
  const text = inputEl?.value.trim();
  if (!text) return;

  const userHandle = currentProfile?.nickname || currentProfile?.email || "Mortal Node";
  try {
    const chatRef = rtdbRef(rtdb, "war_room_messages");
    const newMsgRef = rtdbPush(chatRef);
    await rtdbSet(newMsgRef, {
      user: userHandle,
      text: text,
      timestamp: Date.now()
    });
    if (inputEl) inputEl.value = "";
  } catch (err) {
    console.error("Transmission breakdown:", err);
  }
}

// ==========================================
// 📡 LIVE STREAM BROADCAST EVENT SIMULATOR
// ==========================================
function startLiveBroadcastTicker() {
  const liveFeedContainer = $("live-feed-container");
  if (!liveFeedContainer) return;

  const dynamicBroadcastAlerts = [
    "🔥 [TRAINING]: Vashon Wolverines working out. 'Outwork Yesterday. Dominate Today.'",
    "🚀 [PRO MATRIX]: Jayson Tatum attribute tracking metrics initialized.",
    "🏟️ [UFL]: Battlehawks attendance projecting maximum capacity limits.",
    "⚡ [APEX SHIFT]: Recruiting analysis engines syncing high school score arrays.",
    "📣 [GEAR VAULT]: Premium Drop 01 Apparel allocation active inside warehouse hooks."
  ];

  setInterval(() => {
    if (allAthletesCache.length === 0) return;
    
    // Pick a random system alert or random premium athlete metric stream
    let notificationText = "";
    if (Math.random() > 0.4) {
      const luckyPick = allAthletesCache[Math.floor(Math.random() * allAthletesCache.length)].data;
      notificationText = `📈 [EVALUATION MATRIX]: ${luckyPick.name} tracking total composite score of ${athleteTotal(luckyPick)} in disciplines.`;
    } else {
      notificationText = dynamicBroadcastAlerts[Math.floor(Math.random() * dynamicBroadcastAlerts.length)];
    }

    const reportLine = document.createElement("div");
    reportLine.className = "text-yellow-400/90 font-mono animate-fade-in";
    reportLine.textContent = `📡 ${new Date().toLocaleTimeString()} - ${notificationText}`;
    
    liveFeedContainer.prepend(reportLine);
    if (liveFeedContainer.children.length > 25) {
      liveFeedContainer.removeChild(liveFeedContainer.lastChild);
    }
  }, 9000); // Emits structural telemetry updates every 9 seconds
}

// ==========================================
// 🧹 AUTHENTICATED ADMINISTRATIVE PURGE ENGINE
// ==========================================
async function purgeGridDuplicates() {
  const statusEl = $("user-status");
  const oldText = statusEl ? statusEl.textContent : "";
  if (statusEl) statusEl.textContent = "Purging Extras...";
  
  try {
    const querySnapshot = await getDocs(collection(db, "athletes"));
    const seen = new Set();
    let deletedCount = 0;
    
    for (const document of querySnapshot.docs) {
      const name = document.data().name;
      if (seen.has(name)) {
        await deleteDoc(doc(db, "athletes", document.id));
        deletedCount++;
      } else {
        seen.add(name);
      }
    }
    if (statusEl) statusEl.textContent = "Admin: Mac10 (Cleaned!)";
    setTimeout(() => { if (statusEl) statusEl.textContent = oldText; }, 3000);
  } catch (err) {
    console.error("Purge operation stalled:", err);
  }
}

// ==========================================
// 🔐 CORE BOOT SEQUENCE & AUTH LIFECYCLE
// ==========================================
async function handleSignedInUser(user) {
  currentUser = user;
  try {
    const snap = await getDoc(doc(db, "users", user.uid));
    currentProfile = snap.exists() ? snap.data() : { uid: user.uid, email: user.email, role: "admin", nickname: "Mac10" };
    updateAccessUI(currentProfile);
    subscribeToAthletes();
    initWarRoomChat();
    startLiveBroadcastTicker();
  } catch(err) { 
    console.error(err); 
  } finally { 
    hide("loading-overlay"); 
  }
}

function handleSignedOutUser() {
  currentUser = null; 
  currentProfile = null;
  updateAccessUI(null); 
  subscribeToAthletes();
  hide("loading-overlay"); 
}

// ==========================================
// 🎛️ SYSTEM CONTROLLER EVENT LISTENERS MATRIX
// ==========================================
function bindEvents() {
  // 1. DYNAMIC DROPDOWN INTERCEPT CONDITIONAL MATRIX (SORTING LAYOUTS)
  $("tier-select")?.addEventListener("change", (e) => {
    selectedTierFilter = e.target.value;
    const subSelect = $("sub-tier-select");
    if (!subSelect) return;

    // Dynamically re-populate secondary sub-tier items to map clean choices
    if (selectedTierFilter === "highschool") {
      subSelect.innerHTML = `
        <option value="all">All High Schools</option>
        <option value="phsl">Public High School League (Vashon, Soldan...)</option>
        <option value="mcc">Metro Catholic (CBC, SLUH...)</option>
      `;
    } else if (selectedTierFilter === "pro-players") {
      subSelect.innerHTML = `
        <option value="all">All Pro Players</option>
        <option value="pro-major">Major US Leagues (NFL, NBA, MLB)</option>
        <option value="pro-cfl-alt">Alternative Pro (CFL, Arena)</option>
      `;
    } else {
      subSelect.innerHTML = `<option value="all">All Sub-Categories</option>`;
    }
    selectedSubTierFilter = "all";
    processAndRenderFilteredAthletes();
  });

  $("sub-tier-select")?.addEventListener("change", (e) => {
    selectedSubTierFilter = e.target.value;
    processAndRenderFilteredAthletes();
  });

  // 2. WAR ROOM TRANSMISSION BROADCAST HOOKS
  $("send-chat-btn")?.addEventListener("click", sendWarRoomBroadcast);
  $("chat-message-input")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendWarRoomBroadcast();
  });

  // 3. LIVE DEPLOY TITAN FORM INTERCEPTOR
  const deployForm = $("athlete-form") || document.querySelector("form");
  deployForm?.addEventListener("submit", async (e) => {
    e.preventDefault(); 
    const nameInput = $("athlete-name");
    const sportSelect = $("athlete-sport");
    
    if (!nameInput || !nameInput.value.trim()) return alert("Enter Titan Name!");

    const newTitan = {
      name: nameInput.value.trim(),
      sport: sportSelect ? sportSelect.value : "Football",
      tier: selectedTierFilter === "all" ? "pro-players" : selectedTierFilter, 
      subCategory: selectedSubTierFilter === "all" ? "pro-major" : selectedSubTierFilter,
      scores: [
        safeNumber($("score-0")?.value || 90),
        safeNumber($("score-1")?.value || 90),
        safeNumber($("score-2")?.value || 90),
        safeNumber($("score-3")?.value || 90),
        safeNumber($("score-4")?.value || 90)
      ],
      createdAt: new Date().toISOString()
    };

    try {
      await addDoc(collection(db, "athletes"), newTitan);
      nameInput.value = "";
      ["score-0", "score-1", "score-2", "score-3", "score-4"].forEach(id => { if($(id)) $(id).value = ""; });
    } catch (err) { console.error(err); }
  });

  // 4. PHYSICAL SCRUB TRIGGER & AUTH MANAGEMENT
  $("admin-purge-btn")?.addEventListener("click", async () => {
    if (confirm("Clean all duplicate entries off the St. Louis scoreboard?")) await purgeGridDuplicates();
  });
  $("header-auth-btn")?.addEventListener("click", () => { if (currentUser) signOut(auth); else show("login-modal"); });
  
  $("modal-submit-login")?.addEventListener("click", async () => {
    const email = $("login-email")?.value.trim();
    const pass = $("login-pass")?.value.trim();
    if (!email || !pass) return;
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      hide("login-modal");
    } catch (err) { alert("Authorization Denied."); }
  });
}

// RUNTIME TRIGGER INITIATION
bindEvents();
onAuthStateChanged(auth, u => { if (u) handleSignedInUser(u); else handleSignedOutUser(); });

window.appAuth = { logIn: (e, p) => signInWithEmailAndPassword(auth, e, p), logOut: () => signOut(auth) };
window.runGridPurge = purgeGridDuplicates;