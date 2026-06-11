import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, addDoc, collection, query, limit, onSnapshot, serverTimestamp, getDocs, deleteDoc } from "firebase/firestore";
import { getDatabase, ref as rtdbRef, push, onValue, serverTimestamp as rtdbServerTimestamp, query as rtdbQuery, limitToLast } from "firebase/database";

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
// APPLICATION GLOBAL STATE MEMORY
// ==========================================
let currentUser = null;
let currentProfile = null;
let allAthletesCache = [];
let unsubscribeAthletes = null;
let unsubscribeChat = null;

// DRAFT BOARD ARRAYS MEMORY NODES
let squadA = [];
let squadB = [];

// ==========================================
// COMPACT UTILITY TOOLKIT
// ==========================================
const $ = (id) => document.getElementById(id);

function escapeHtml(v = "") {
  return String(v).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c] || c));
}

function show(id) { $(id)?.classList.remove("hidden"); }
function hide(id) { $(id)?.classList.add("hidden"); }
function safeNumber(v) { const n = Number(v); return Number.isFinite(n) ? n : 0; }
function isAdminProfile(profile) { return profile?.role === "admin" || profile?.role === "editor"; }
function hasMainAccess(profile) { return isAdminProfile(profile) || profile?.isPro === true; }
function setText(id, text) { const el = $(id); if (el) el.textContent = text; }

window.show = show;
window.hide = hide;

// ==========================================
// 🎥 VIDEO URL HELPERS & THEATER ENGINE
// ==========================================
function toEmbedUrl(url = "") {
  const raw = String(url).trim();
  if (!raw) return "";
  try {
    const parsed = new URL(raw);
    if (parsed.hostname.includes("youtube.com")) {
      const videoId = parsed.searchParams.get("v");
      if (videoId) return `https://www.youtube.com/embed/${encodeURIComponent(videoId)}`;
      if (parsed.pathname.startsWith("/shorts/")) {
        const shortsId = parsed.pathname.split("/").filter(Boolean)[1];
        if (shortsId) return `https://www.youtube.com/embed/${encodeURIComponent(shortsId)}`;
      }
      if (parsed.pathname.startsWith("/embed/")) return raw;
    }
    if (parsed.hostname.includes("youtu.be")) {
      const videoId = parsed.pathname.replace("/", "");
      if (videoId) return `https://www.youtube.com/embed/${encodeURIComponent(videoId)}`;
    }
    if (parsed.hostname.includes("vimeo.com")) {
      const videoId = parsed.pathname.split("/").filter(Boolean)[0];
      if (videoId) return `https://player.vimeo.com/video/${encodeURIComponent(videoId)}`;
    }
    return raw;
  } catch { return ""; }
}

function playHighlight(athlete) {
  const iframe = $("theater-iframe");
  const placeholder = $("video-placeholder");
  const title = $("now-playing-title");
  if (!iframe || !placeholder) return;

  const embedUrl = toEmbedUrl(athlete?.highlightUrl || athlete?.highlight || "");
  if (!embedUrl) {
    iframe.src = "";
    iframe.classList.add("hidden");
    placeholder.classList.remove("hidden", "opacity-0", "pointer-events-none");
    if (title) title.textContent = `${athlete?.name || "Titan"}: No highlight attached`;
    return;
  }

  iframe.src = embedUrl;
  iframe.classList.remove("hidden");
  placeholder.classList.add("hidden", "opacity-0", "pointer-events-none");
  if (title) title.textContent = `Now Playing: ${athlete?.name || "Titan Highlight"}`;
}

// ==========================================
// ⚜️ LIVE WAR ROOM DRAFT BOARD MATH & RENDERING ENGINE
// ==========================================
function calculateSquadAverages() {
  const calcAvg = (arr) => arr.length ? Math.round(arr.reduce((sum, p) => sum + athleteTotal(p), 0) / arr.length) : 0;
  setText("squad-a-rating", `AVG: ${calcAvg(squadA)}`);
  setText("squad-b-rating", `AVG: ${calcAvg(squadB)}`);
}

function renderDraftBoards() {
  const slotA = $("squad-a-slots");
  const slotB = $("squad-b-slots");
  
  const rowMarkup = (p, index, squadType) => `
    <div class="flex items-center justify-between bg-zeus-panel border border-zeus-border/80 rounded px-2.5 py-1.5 text-xs font-mono animate-feed-slide">
      <div class="truncate max-w-[180px]">
        <span class="font-bold text-white">${escapeHtml(p.name)}</span>
        <span class="text-[9px] text-gray-500 block uppercase">${escapeHtml(p.sport)}</span>
      </div>
      <div class="flex items-center space-x-2">
        <span class="font-black text-zeus-gold">${athleteTotal(p)}</span>
        <button onclick="window.dropFromSquad('${squadType}', ${index})" class="text-gray-600 hover:text-zeus-red font-bold text-sm px-1">&times;</button>
      </div>
    </div>`;

  if (slotA) {
    slotA.innerHTML = squadA.length 
      ? squadA.map((p, i) => rowMarkup(p, i, 'A')).join("")
      : `<div class="text-[11px] text-gray-600 font-mono italic text-center my-auto py-4">Roster vacant. Click an athlete above to draft.</div>`;
  }
  if (slotB) {
    slotB.innerHTML = squadB.length 
      ? squadB.map((p, i) => rowMarkup(p, i, 'B')).join("")
      : `<div class="text-[11px] text-gray-600 font-mono italic text-center my-auto py-4">Roster vacant. Click an athlete above to draft.</div>`;
  }
  calculateSquadAverages();
}

window.dropFromSquad = (squadType, index) => {
  if (squadType === 'A') squadA.splice(index, 1);
  else squadB.splice(index, 1);
  renderDraftBoards();
};

// EXPOSE SINGLE-TITAN DIRECT PURGE HOOK TO THE DOM MATRIX
window.directPurgeRow = async (e, id, name) => {
  e.stopPropagation(); // Prevents prompt script collision!
  if (!isAdminProfile(currentProfile)) return;
  if (confirm(`Are you sure you want to permanently erase ${name} from the database?`)) {
    try {
      await deleteDoc(doc(db, "athletes", id));
    } catch (err) {
      console.error("Purge system rejected:", err);
    }
  }
};

// ==========================================
// ST. LOUIS BASELINE SPORTS SEEDS
// ==========================================
const ST_LOUIS_INITIAL_SEEDS = [
  { name: "Vashon Elite Squad", sport: "Basketball", tier: "highschool", subCategory: "phsl", scores: [95, 92, 94, 96, 98], highlightUrl: "https://www.youtube.com/watch?v=ifiFShFX5Pg" },
  { name: "Soldan Prep Leader", sport: "Basketball", tier: "highschool", subCategory: "phsl", scores: [88, 85, 90, 89, 91], highlightUrl: "" },
  { name: "CBC Cadet Core", sport: "Football", tier: "highschool", subCategory: "mcc", scores: [94, 96, 95, 93, 97], highlightUrl: "" },
  { name: "SLUH Jr. Billikens", sport: "Track", tier: "highschool", subCategory: "mcc", scores: [89, 92, 91, 90, 94], highlightUrl: "" },
  { name: "Macler Cody (Mac10)", sport: "Football", tier: "pro-players", subCategory: "pro-cfl-alt", scores: [98, 97, 99, 96, 98], highlightUrl: "" },
  { name: "David Freese (Lafayette HS)", sport: "Baseball", tier: "pro-players", subCategory: "pro-major", scores: [95, 94, 96, 92, 95], highlightUrl: "" },
  { name: "Pat Maroon (Oakville HS)", sport: "Hockey", tier: "pro-players", subCategory: "pro-major", scores: [93, 95, 94, 91, 96], highlightUrl: "" },
  { name: "Bradley Beal (Chaminade)", sport: "Basketball", tier: "pro-players", subCategory: "pro-major", scores: [97, 98, 96, 95, 99], highlightUrl: "" }
];

async function checkAndSeedDatabase() {
  const existingSnap = await getDocs(query(collection(db, "athletes"), limit(1)));
  if (!existingSnap.empty) return;
  const athletesRef = collection(db, "athletes");
  for (const titan of ST_LOUIS_INITIAL_SEEDS) {
    await addDoc(athletesRef, { ...titan, createdAt: serverTimestamp(), updatedAt: serverTimestamp(), createdBy: "auto_init" });
  }
}

// ==========================================
// ACCESSIBILITY AND INTERACTION HANDLERS
// ==========================================
function updateAccessUI(profile) {
  const loginBtn = $("header-auth-btn");
  if (hasMainAccess(profile)) { hide("paywall-content"); show("main-content"); } 
  else { show("paywall-content"); hide("main-content"); }

  if (isAdminProfile(profile)) { show("admin-panel"); show("admin-purge-btn"); checkAndSeedDatabase().catch(e => console.error(e)); } 
  else { hide("admin-panel"); hide("admin-purge-btn"); }

  if (profile) {
    setText("user-status", `Admin: ${profile.nickname || profile.email || "Authorized"}`);
    if (loginBtn) loginBtn.textContent = "Logout";
  } else {
    setText("user-status", "Status: Mortal Vision");
    if (loginBtn) loginBtn.textContent = "Login";
  }
  // Re-trigger render loop to toggle administrative row components cleanly
  processAndRenderFilteredAthletes();
}

function athleteTotal(d) {
  const scores = Array.isArray(d?.scores) ? d.scores : [d?.score0, d?.score1, d?.score2, d?.score3, d?.score4];
  return scores.reduce((sum, value) => sum + safeNumber(value), 0);
}

// ==========================================
// FILTER MATRIX CONTROLLER
// ==========================================
const SUB_TIER_OPTIONS = {
  all: [["all", "All Sub-Categories"]],
  highschool: [["all", "All St. Louis High Schools"], ["phsl", "Public High League"], ["mcc", "Metro Catholic Conference"], ["suburban", "Suburban Programs"], ["independent", "Independent Programs"]],
  college: [["all", "All Colleges"], ["local-college", "Local Colleges"], ["national-college", "National Colleges"]],
  "pro-teams": [["all", "All St. Louis Home Pro Teams"], ["mlb", "Cardinals / MLB"], ["nhl", "Blues / NHL"], ["mls", "CITY SC / MLS"], ["ufl", "Battlehawks / UFL"]],
  "pro-players": [["all", "All Locals in the Pros"], ["pro-major", "Major Pro Leagues"], ["pro-cfl-alt", "CFL / Alt Pro"], ["pro-global", "Global Pros"]]
};

function refreshSubTierOptions() {
  const tierSelect = $("tier-select");
  const subTierSelect = $("sub-tier-select");
  if (!tierSelect || !subTierSelect) return;
  const selectedTier = tierSelect.value || "all";
  const options = SUB_TIER_OPTIONS[selectedTier] || SUB_TIER_OPTIONS.all;
  subTierSelect.innerHTML = options.map(([v, l]) => `<option value="${escapeHtml(v)}">${escapeHtml(l)}</option>`).join("");
}

function getFilteredAthletes() {
  const tier = $("tier-select")?.value || "all";
  const subTier = $("sub-tier-select")?.value || "all";
  return allAthletesCache.filter(({ data }) => {
    return (tier === "all" || data.tier === tier) && (subTier === "all" || data.subCategory === subTier);
  });
}

// ==========================================
// RENDER ENGINE (DYNAMIC ROW INJECTION & LISTENERS)
// ==========================================
function processAndRenderFilteredAthletes() {
  const gridBody = $("match-grid-body");
  if (!gridBody) return;
  const filteredAthletes = getFilteredAthletes();

  if (!filteredAthletes.length) {
    gridBody.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-gray-500">No athletes active for this filter.</td></tr>`;
    setText("apex-predator-name", "No Apex Selected"); setText("apex-predator-score", "---"); setText("grid-count-badge", "0 Active");
    return;
  }

  const activeAdmin = isAdminProfile(currentProfile);

  gridBody.innerHTML = filteredAthletes.map(({ id, data }) => {
    const hasHighlight = Boolean(data.highlightUrl || data.highlight);
    return `
      <tr class="border-t border-zeus-border hover:bg-zeus-gold/5 cursor-pointer transition animate-feed-slide" data-athlete-id="${escapeHtml(id)}">
        <td class="p-3 font-bold text-white flex items-center justify-between">
          <div class="flex items-center">
            ${escapeHtml(data.name)}
            ${hasHighlight ? `<span class="ml-2 bg-zeus-goldSoft text-zeus-gold text-[9px] px-1.5 py-0.5 rounded border border-zeus-gold/20 font-bold uppercase tracking-wider font-sans">Video</span>` : ""}
          </div>
          ${activeAdmin ? `<button onclick="window.directPurgeRow(event, '${escapeHtml(id)}', '${escapeHtml(data.name.replace(/'/g, "\\'"))}')" class="text-gray-600 hover:text-red-500 text-xs px-2 py-0.5 font-bold transition font-sans select-none" title="Instant Delete">🗑️</button>` : ""}
        </td>
        <td class="p-3 text-center text-gray-300">${safeNumber(data.scores?.[0])}</td>
        <td class="p-3 text-center text-gray-300">${safeNumber(data.scores?.[1])}</td>
        <td class="p-3 text-center font-black text-zeus-gold">${athleteTotal(data)}</td>
        <td class="p-3 text-right"><span class="rounded border border-zeus-gold/30 px-2 py-1 text-[10px] uppercase text-zeus-gold">${escapeHtml(data.sport)}</span></td>
      </tr>`;
  }).join("");

  const leader = filteredAthletes[0].data;
  setText("apex-predator-name", leader.name || "Unknown Titan");
  setText("apex-predator-score", athleteTotal(leader));
  setText("grid-count-badge", `${filteredAthletes.length} Active`);

  gridBody.querySelectorAll("tr[data-athlete-id]").forEach((row) => {
    row.addEventListener("click", () => {
      const id = row.getAttribute("data-athlete-id");
      const found = allAthletesCache.find(item => item.id === id);
      if (!found) return;

      // 1. Play headline track highlight video natively
      playHighlight(found.data);

      // 2. Assign to Custom War Room Draft Boards
      const targetSquad = prompt(`Draft ${found.data.name} to which War Room Roster?\nType '1' for Team St. Louis Elite\nType '2' for Regional Challengers\nHit cancel or leave blank to close.`);
      
      if (targetSquad === "1") {
        if (squadA.some(p => p.name === found.data.name)) return alert("Athlete already locked onto Roster A.");
        squadA.push(found.data);
        renderDraftBoards();
      } else if (targetSquad === "2") {
        if (squadB.some(p => p.name === found.data.name)) return alert("Athlete already locked onto Roster B.");
        squadB.push(found.data);
        renderDraftBoards();
      }
    });
  });
}

function subscribeToAthletes() {
  if (unsubscribeAthletes) return;
  unsubscribeAthletes = onSnapshot(query(collection(db, "athletes"), limit(120)), (snap) => {
    allAthletesCache = snap.docs.map(d => ({ id: d.id, data: d.data() })).sort((a, b) => athleteTotal(b.data) - athleteTotal(a.data));
    processAndRenderFilteredAthletes();
  }, e => console.error(e));
}

// ==========================================
// ADMINISTRATIVE PURGE ENGINE
// ==========================================
async function purgeGridDuplicates() {
  if (!isAdminProfile(currentProfile)) return;
  const statusEl = $("user-status"); const oldText = statusEl?.textContent || "";
  if (statusEl) statusEl.textContent = "Purging Extras...";
  try {
    const snap = await getDocs(collection(db, "athletes"));
    const seen = new Set(); let deletedCount = 0;
    for (const d of snap.docs) {
      const n = String(d.data().name || "").trim().toLowerCase();
      if (!n) continue;
      if (seen.has(n)) { await deleteDoc(doc(db, "athletes", d.id)); deletedCount++; } 
      else seen.add(n);
    }
    if (statusEl) statusEl.textContent = `Cleaned ${deletedCount} rows`;
    setTimeout(() => { if (statusEl) statusEl.textContent = oldText; }, 3000);
  } catch (e) { console.error(e); }
}

// ==========================================
// WAR ROOM CHAT ENGINE
// ==========================================
function renderChatMessage(message) {
  const display = $("chat-box-display"); if (!display) return;
  const row = document.createElement("div");
  row.className = "text-gray-300 text-[11px] font-mono leading-relaxed animate-feed-slide";
  row.innerHTML = `<span class="text-zeus-gold font-bold">[${escapeHtml(message.nickname || message.email || "User")}]:</span> <span>${escapeHtml(message.text || "")}</span>`;
  display.appendChild(row); display.scrollTop = display.scrollHeight;
}

function subscribeToChat() {
  if (unsubscribeChat) return;
  unsubscribeChat = onValue(rtdbQuery(rtdbRef(rtdb, "warRoomMessages"), limitToLast(40)), (snap) => {
    const display = $("chat-box-display"); if (!display) return;
    display.innerHTML = `<div class="text-gray-600">[System]: Connection secure. Welcome to the Admin War Room.</div>`;
    snap.forEach(child => { renderChatMessage(child.val()); });
  }, e => console.error(e));
}

async function sendChatMessage() {
  const input = $("chat-message-input"); const text = input?.value.trim();
  if (!text || !currentUser || !currentProfile) return;
  try {
    await push(rtdbRef(rtdb, "warRoomMessages"), { text, uid: currentUser.uid, email: currentUser.email || "", nickname: currentProfile.nickname || currentProfile.email || "User", createdAt: rtdbServerTimestamp() });
    input.value = "";
  } catch (e) { console.error(e); }
}

// ==========================================
// 📡 REAL-TIME SPORTS TICKER SIMULATION ENGINE
// ==========================================
const ST_LOUIS_TICKER_ALERTS = [
  { prefix: "🛰️ [PHSL]", text: "Vashon Wolverines defensive press forces 4 consecutive turnovers in 3rd quarter run.", color: "text-zeus-gold" },
  { prefix: "🏈 [MCC]", text: "CBC Cadet backcourt and vertical pass game charting a massive +14 separation margin.", color: "text-white" },
  { prefix: "🐯 [MIZZOU]", text: "Luther Burden III clocked at a split-second acceleration burst in open-field camp reps.", color: "text-zeus-gold" },
  { prefix: "⚾ [MLB]", text: "Cardinals bullpen registers optimal spin rates on closing strikeout sequences down at Busch Stadium.", color: "text-gray-300" },
  { prefix: "🚨 [SYSTEM]", text: "Metric Matrix updated. 4 new regional player profiles pushed to primary database storage node.", color: "text-red-400" },
  { prefix: "╚► [MLS]", text: "CITY SC pressuring structural defensive lines early with aggressive high-counter transitions.", color: "text-white" },
  { prefix: "🏀 [PHSL]", text: "Soldan Prep lighting up the perimeter, shooting a blistering 54% from deep in early scrimmage.", color: "text-gray-400" },
  { prefix: "🦅 [CFL]", text: "Macler Cody (Mac10) breaks another perimeter coverage tracking matrix, clearing a 40-yard gain.", color: "text-zeus-gold" },
  { prefix: "👟 [TRACK]", text: "Lincoln High relay squad shatters regional meet floor times, setting a brand new record.", color: "text-white" },
  { prefix: "⚡ [WAR ROOM]", text: "Admin Node 'Mac10' successfully verified authorization protocols. Live telemetry active.", color: "text-zeus-gold" }
];

function initializeLiveSportsTicker() {
  const container = $("live-feed-container");
  if (!container) return;
  container.innerHTML = `<div class="text-zeus-gold/80 animate-feed-slide">🛰️ [SYSTEM]: Grid Synchronization fully active. Telemetry rolling...</div>`;

  setInterval(() => {
    const alert = ST_LOUIS_TICKER_ALERTS[Math.floor(Math.random() * ST_LOUIS_TICKER_ALERTS.length)];
    const alertRow = document.createElement("div");
    alertRow.className = `animate-feed-slide pt-1 font-mono text-xs border-t border-zeus-border/40 mt-1 flex flex-col sm:flex-row sm:space-x-2 ${alert.color}`;
    alertRow.innerHTML = `
      <span class="font-bold shrink-0">${escapeHtml(alert.prefix)}</span>
      <span class="text-gray-300">${escapeHtml(alert.text)}</span>
    `;
    container.appendChild(alertRow);
    container.scrollTop = container.scrollHeight;
    if (container.children.length > 25) { container.removeChild(container.firstChild); }
  }, 4500);
}

// ==========================================
// CORE BOOT SEQUENCE & AUTH LIFECYCLE
// ==========================================
async function handleSignedInUser(user) {
  currentUser = user;
  try {
    const snap = await getDoc(doc(db, "users", user.uid));
    currentProfile = snap.exists() ? { uid: user.uid, email: user.email, ...snap.data() } : { uid: user.uid, email: user.email, role: "admin", nickname: "Mac10" };
    updateAccessUI(currentProfile); subscribeToAthletes(); subscribeToChat();
  } catch { updateAccessUI(null); } finally { hide("loading-overlay"); }
}

function handleSignedOutUser() {
  currentUser = null; currentProfile = null;
  updateAccessUI(null); subscribeToAthletes(); hide("loading-overlay");
}

// ==========================================
// EVENT LISTENERS MATRIX BOUNDS
// ==========================================
function bindEvents() {
  $("tier-select")?.addEventListener("change", () => { refreshSubTierOptions(); processAndRenderFilteredAthletes(); });
  $("sub-tier-select")?.addEventListener("change", processAndRenderFilteredAthletes);

  $("reset-draft-btn")?.addEventListener("click", () => {
    squadA = []; squadB = [];
    renderDraftBoards();
  });

  $("athlete-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!isAdminProfile(currentProfile)) return;
    const nameIn = $("athlete-name"); const sportSel = $("athlete-sport"); const hlIn = $("athlete-highlight");
    if (!nameIn?.value.trim()) return;

    const tier = $("tier-select")?.value; const sub = $("sub-tier-select")?.value;
    const newTitan = {
      name: nameIn.value.trim(), sport: sportSel?.value || "Football",
      tier: tier !== "all" ? tier : "pro-players", subCategory: sub !== "all" ? sub : "pro-major",
      scores: [safeNumber($("score-0")?.value||90), safeNumber($("score-1")?.value||90), safeNumber($("score-2")?.value||90), safeNumber($("score-3")?.value||90), safeNumber($("score-4")?.value||90)],
      highlightUrl: hlIn?.value.trim() || "", createdAt: serverTimestamp(), updatedAt: serverTimestamp(), createdBy: currentUser?.uid || "unknown"
    };

    try {
      await addDoc(collection(db, "athletes"), newTitan);
      nameIn.value = ""; if (hlIn) hlIn.value = "";
      ["score-0", "score-1", "score-2", "score-3", "score-4"].forEach(id => { const el = $(id); if (el) el.value = ""; });
    } catch (err) { console.error(err); }
  });

  $("admin-purge-btn")?.addEventListener("click", async () => {
    if (confirm("Clean all duplicate entries off the St. Louis scoreboard?")) await purgeGridDuplicates();
  });
  $("header-auth-btn")?.addEventListener("click", async () => { if (currentUser) await signOut(auth); else show("login-modal"); });
  $("modal-submit-login")?.addEventListener("click", async () => {
    const e = $("login-email")?.value.trim(); const p = $("login-pass")?.value.trim();
    if (!e || !p) return;
    try { await signInWithEmailAndPassword(auth, e, p); hide("login-modal"); } catch { alert("Authorization Denied"); }
  });
  $("login-pass")?.addEventListener("keydown", async (e) => { if (e.key === "Enter") $("modal-submit-login")?.click(); });
  $("send-chat-btn")?.addEventListener("click", sendChatMessage);
  $("chat-message-input")?.addEventListener("keydown", async (e) => { if (e.key === "Enter") await sendChatMessage(); });
}

// ==========================================
// RUNTIME TRIGGER INITIATION
// ==========================================
refreshSubTierOptions();
bindEvents();
initializeLiveSportsTicker();

onAuthStateChanged(auth, u => { if (u) handleSignedInUser(u); else handleSignedOutUser(); });

window.appAuth = { logIn: (e, p) => signInWithEmailAndPassword(auth, e, p), logOut: () => signOut(auth) };