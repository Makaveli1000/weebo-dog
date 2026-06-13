import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, addDoc, updateDoc, collection, query, onSnapshot, serverTimestamp, deleteDoc, limit, arrayUnion } from "firebase/firestore";
import { getDatabase, ref as rtdbRef, push, onValue, serverTimestamp as rtdbServerTimestamp, query as rtdbQuery, limitToLast } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
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
const storage = getStorage(app);

// ==========================================
// APPLICATION GLOBAL STATE MEMORY
// ==========================================
let currentUser = null;
let currentProfile = null;
let allAthletesCache = [];
let unsubscribeAthletes = null;
let unsubscribeChat = null;
let activeSelectedAthleteId = null; 
let totalSuccessfulUploads = 0;

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
const isFirebaseStorageUrl = (url) => url.includes("firebasestorage") || url.includes(".appspot.com");

window.show = show;
window.hide = hide;

// ==========================================
// 🎥 DUAL-VIEW PORT MEDIA THEATER CONTROLLER
// ==========================================
function getEmbedUrl(url) {
  if (url.includes("youtube.com/watch?v=")) return url.replace("watch?v=", "embed/");
  if (url.includes("youtu.be/")) return url.replace("youtu.be/", "youtube.com/embed/");
  return url;
}

function playHighlight(athlete) {
  const viewport = $("theater-media-viewport");
  const placeholder = $("video-placeholder");
  if (!viewport || !placeholder) return;

  const videoList = athlete.videos || (athlete.highlightUrl ? [{ title: "Main Highlight", url: athlete.highlightUrl }] : []);
  if (videoList.length === 0) {
    viewport.innerHTML = "";
    placeholder.classList.remove("hidden");
    return;
  }
  placeholder.classList.add("hidden");

  window.switchVideo = (index) => {
    const v = videoList[index];
    const url = v.url;
    let menuHtml = videoList.length > 1 ? `
      <div class="absolute top-0 left-0 w-full bg-zeus-panel/90 p-2 flex space-x-2 overflow-x-auto z-20">
        ${videoList.map((item, i) => `
          <button onclick="window.switchVideo(${i})" class="text-[9px] ${i === index ? 'bg-zeus-gold text-black' : 'bg-gray-800 text-white'} px-2 py-1 rounded font-bold uppercase whitespace-nowrap">
            ${item.title}
          </button>
        `).join("")}
      </div>
    ` : "";

    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      let videoId = url.split("v=")[1] || url.split("/").pop();
      if (videoId.includes("?")) videoId = videoId.split("?")[0];
      viewport.innerHTML = menuHtml + `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1" class="w-full h-full" allowfullscreen></iframe>`;
    } else {
      viewport.innerHTML = menuHtml + `<video src="${url}" controls autoplay muted playsinline class="w-full h-full bg-black"></video>`;
    }
  };
  window.switchVideo(0);
}

// ==========================================
// 📥 CLOUD STORAGE RAW MEDIA LOCKER DISPATCHER
// ==========================================
function initializeMediaLockerEngine() {
  const fileInput = $("media-locker-file-input");
  if (!fileInput) return;

  fileInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!isAdminProfile(currentProfile)) return alert("Admin access denied.");
    if (!activeSelectedAthleteId) return alert("Select an athlete row first.");

    const storagePath = `highlights/${activeSelectedAthleteId}/${file.name}`;
    const uploadTask = uploadBytesResumable(storageRef(storage, storagePath), file);

    uploadTask.on('state_changed', null, null, async () => {
      const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
      await updateDoc(doc(db, "athletes", activeSelectedAthleteId), { highlightUrl: downloadUrl });
      alert("Upload complete.");
    });
  });
}

// ==========================================
// ⚡ SCORING ENGINE
// ==========================================
function athleteTotal(athlete) {
  // Handles both the new 'scores' array format and the old individual 'scoreX' format
  const scores = Array.isArray(athlete?.scores) ? athlete.scores : 
                 [athlete?.score0, athlete?.score1, athlete?.score2, athlete?.score3, athlete?.score4];
  return scores.reduce((sum, val) => sum + safeNumber(val), 0);
}

// ==========================================
// ⚡ LIVE WAR ROOM DRAFT BOARD INTERACTIVE MATRIX
// ==========================================
function calculateSquadAverages() {
  const calcAvg = (arr) => arr.length ? Math.round(arr.reduce((sum, p) => sum + athleteTotal(p), 0) / arr.length) : 0;
  setText("squad-a-rating", `AVG: ${calcAvg(squadA)}`);
  setText("squad-b-rating", `AVG: ${calcAvg(squadB)}`);
}

window.dropFromSquad = (squadType, index) => {
  if (squadType === 'A') squadA.splice(index, 1);
  else squadB.splice(index, 1);
  renderDraftBoards();
};

window.inlineDraftDispatch = (athleteId, targetSquadNum) => {
  const found = allAthletesCache.find(item => item.id === athleteId);
  if (!found) return;

  if (targetSquadNum === 1) {
    if (squadA.some(p => p.name === found.data.name)) return alert("Athlete already locked onto Roster A.");
    squadA.push(found.data);
    renderDraftBoards();
  } else if (targetSquadNum === 2) {
    if (squadB.some(p => p.name === found.data.name)) return alert("Athlete already locked onto Roster B.");
    squadB.push(found.data);
    renderDraftBoards();
  }
};

window.directPurgeRow = async (e, id, name) => {
  e.stopPropagation();
  if (!isAdminProfile(currentProfile)) return;
  if (confirm(`Are you sure you want to permanently erase ${name} from the database?`)) {
    try {
      await deleteDoc(doc(db, "athletes", id));
      if (activeSelectedAthleteId === id) activeSelectedAthleteId = null;
    } catch (err) {
      console.error("Purge system rejected:", err);
    }
  }
};

// ==========================================
// ST. LOUIS BASELINE INITIALIZATION SEEDS
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
// ACCESSIBILITY INTERFACE HANDLERS
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
  processAndRenderFilteredAthletes();
}

function mergeRosterScores(d) {
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
// RENDER ENGINE (DYNAMIC DECOUPLED MATRIX GENERATOR)
// ==========================================
function processAndRenderFilteredAthletes() {
  const gridBody = $("match-grid-body");
  if (!gridBody) return;
  const filteredAthletes = getFilteredAthletes();

  if (!filteredAthletes.length) {
    gridBody.innerHTML = `<tr><td colspan="6" class="p-4 text-center text-gray-500">No athletes active for this filter.</td></tr>`;
    setText("apex-predator-name", "No Apex Selected"); setText("apex-predator-score", "---"); setText("grid-count-badge", "0 Active");
    return;
  }

  // Fixed column matching parameters: mapped every property <td> directly to its matching <th> column header slot
  gridBody.innerHTML = filteredAthletes.map(({ id, data }) => {
    const hasHighlight = Boolean(data.highlightUrl || data.highlight);
    const isSelected = activeSelectedAthleteId === id;
    const trackingClass = isSelected ? "bg-zeus-gold/10 border-l-2 border-zeus-gold" : "border-t border-zeus-border";
    
    return `
      <tr class="${trackingClass} hover:bg-zeus-gold/5 cursor-pointer transition" data-athlete-id="${escapeHtml(id)}">
        <!-- Col 1: Name -->
        <td class="p-3 font-bold text-white max-w-[200px] truncate">
          <div class="flex items-center space-x-2">
            <span>${escapeHtml(data.name)}</span>
            ${hasHighlight ? `<span class="bg-zeus-goldSoft text-zeus-gold text-[9px] px-1.5 py-0.5 rounded border border-zeus-gold/20 font-bold uppercase tracking-wider shrink-0">Video</span>` : ""}
          </div>
        </td>
        <!-- Col 2: Primary Attribute (Score 0) -->
        <td class="p-3 text-center text-gray-300">${safeNumber(data.scores?.[0])}</td>
        <!-- Col 3: Performance Tier (Score 1) -->
        <td class="p-3 text-center text-gray-300">${safeNumber(data.scores?.[1])}</td>
        <!-- Col 4: Total Composite -->
        <td class="p-3 text-center font-black text-zeus-gold">${mergeRosterScores(data)}</td>
        <!-- Col 5: Discipline (Sport) -->
        <td class="p-3 text-center text-gray-400 uppercase text-xs">${escapeHtml(data.sport)}</td>
        <!-- Col 6: Roster Actions (Bypasses row tracking) -->
        <td class="p-3 text-right" onclick="event.stopPropagation()">
          <div class="flex items-center justify-end space-x-1">
            <button onclick="window.inlineDraftDispatch('${escapeHtml(id)}', 1)" class="bg-zeus-goldSoft text-zeus-gold border border-zeus-gold/20 hover:bg-zeus-gold hover:text-black font-mono text-[9px] px-1.5 py-0.5 rounded uppercase font-bold transition">Draft A</button>
            <button onclick="window.inlineDraftDispatch('${escapeHtml(id)}', 2)" class="bg-gray-900 text-gray-400 border border-zeus-border hover:bg-gray-700 hover:text-white font-mono text-[9px] px-1.5 py-0.5 rounded uppercase font-bold transition">Draft B</button>
            ${isAdminProfile(currentProfile) ? `<button onclick="window.directPurgeRow(event, '${escapeHtml(id)}', '${escapeHtml(data.name.replace(/'/g, "\\'"))}')" class="text-gray-600 hover:text-red-500 text-xs px-1 font-bold transition select-none" title="Instant Delete">🗑️</button>` : ""}
          </div>
        </td>
      </tr>`;
  }).join("");

  const leader = filteredAthletes[0].data;
  setText("apex-predator-name", leader.name || "Unknown Titan");
  setText("apex-predator-score", mergeRosterScores(leader));
  setText("grid-count-badge", `${filteredAthletes.length} Active`);

  gridBody.querySelectorAll("tr[data-athlete-id]").forEach((row) => {
    row.addEventListener("click", () => {
      const id = row.getAttribute("data-athlete-id");
      const found = allAthletesCache.find(item => item.id === id);
      if (!found) return;

      activeSelectedAthleteId = id;
      
      gridBody.querySelectorAll("tr").forEach(tr => tr.classList.remove("bg-zeus-gold/10", "border-l-2", "border-zeus-gold"));
      row.classList.add("bg-zeus-gold/10", "border-l-2", "border-zeus-gold");

      setText("upload-progress-sub", `BOUNDING TARGET: ${found.data.name.substring(0, 15)}...`);
      $("media-locker-container")?.classList.add("border-zeus-gold", "shadow-[0_0_15px_rgba(212,175,55,0.15)]");

      playHighlight(found.data);
    });
  });
}

function subscribeToAthletes() {
  if (unsubscribeAthletes) return;
  unsubscribeAthletes = onSnapshot(query(collection(db, "athletes"), limit(120)), (snap) => {
    allAthletesCache = snap.docs.map(d => ({ id: d.id, data: d.data() })).sort((a, b) => mergeRosterScores(b.data) - mergeRosterScores(a.data));
    processAndRenderFilteredAthletes();
  }, e => console.error(e));
}
// ==========================================
// ADMINISTRATIVE UTILITY: VIDEO MANAGEMENT
// ==========================================
async function addVideoToTitan(athleteId, videoTitle, videoUrl) {
  if (!isAdminProfile(currentProfile)) {
    console.error("Access Denied: Only Admins can append video data.");
    return;
  }

  const titanRef = doc(db, "athletes", athleteId);
  try {
    await updateDoc(titanRef, {
      videos: arrayUnion({
        title: videoTitle,
        url: videoUrl,
        createdAt: serverTimestamp()
      })
    });
    console.log("Video bound to Titan successfully.");
  } catch (err) {
    console.error("Titan binding failed:", err);
  }
}

// ==========================================
// CORE BOOT SEQUENCE & AUTH LIFECYCLE
// ==========================================
async function handleSignedInUser(user) {
  currentUser = user;
  try {
    const snap = await getDoc(doc(db, "users", user.uid));
    currentProfile = snap.exists() ? { uid: user.uid, email: user.email, ...snap.data() } : { uid: user.uid, email: user.email, role: "admin", nickname: "Mac10" };
    updateAccessUI(currentProfile); 
    subscribeToAthletes(); 
    subscribeToChat();
  } catch { 
    updateAccessUI(null); 
  } finally { 
    hide("loading-overlay"); 
  }
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
// 📡 UPDATED REAL-TIME SPORTS TICKER ENGINE
// ==========================================
const ST_LOUIS_TICKER_ALERTS = [
  { prefix: "🏈 [NFL]", text: "Mini-camp intensity spiking; veteran defensive sets showing +12% efficiency.", color: "text-zeus-gold" },
  { prefix: "🏀 [NBA]", text: "Finals series intensity reaching apex levels; court-side telemetry data locked.", color: "text-white" },
  { prefix: "⚾ [MLB]", text: "Mid-season pitching rotation adjusted for high-heat summer weather.", color: "text-gray-300" },
  { prefix: "🏒 [NHL]", text: "Stanley Cup playoffs entering high-stakes overtime simulation mode.", color: "text-white" },
  { prefix: "⚽ [MLS]", text: "CITY SC maintaining aggressive high-press transition against defensive lines.", color: "text-zeus-gold" },
  { prefix: "🎾 [ATP/WTA]", text: "Grand Slam circuit updates: baseline rally duration trending upwards.", color: "text-gray-400" },
  { prefix: "🎓 [COLLEGE]", text: "Spring camp drills concluding; incoming roster depth charts finalized.", color: "text-zeus-gold" },
  { prefix: "🦅 [CFL]", text: "Pre-season training camp coverage hitting peak operational velocity.", color: "text-zeus-gold" },
  { prefix: "🚨 [SYSTEM]", text: "Cross-league data ingestion: All global sports tickers synchronized.", color: "text-red-400" }
];

function initializeLiveSportsTicker() {
  const container = $("live-feed-container");
  if (!container) return;
  container.innerHTML = `<div class="text-zeus-gold/80 animate-feed-slide">🛰️ [SYSTEM]: Global Feed Sync active...</div>`;

  // Increased speed: Alerts now fire every 3 seconds instead of 4.5
  setInterval(() => {
    const alert = ST_LOUIS_TICKER_ALERTS[Math.floor(Math.random() * ST_LOUIS_TICKER_ALERTS.length)];
    const alertRow = document.createElement("div");
    alertRow.className = `animate-feed-slide pt-1 font-mono text-xs border-t border-zeus-border/40 mt-1 flex flex-col sm:flex-row sm:space-x-2 ${alert.color}`;
    alertRow.innerHTML = `
      <span class="font-bold shrink-0">${alert.prefix}</span>
      <span class="text-gray-300">${alert.text}</span>
    `;
    container.appendChild(alertRow);
    container.scrollTop = container.scrollHeight;
    // Keeps the feed tidy by limiting lines
    if (container.children.length > 20) { container.removeChild(container.firstChild); }
  }, 3000); 
}

// ==========================================
// 🧥 APPAREL LIGHTBOX MODAL MAPPING INTERFACE ENGINE
// ==========================================
function openGearLightbox(product) {
  const modal = $("gear-lightbox-modal");
  if (!modal) return;

  setText("lightbox-title", product.title);
  setText("lightbox-sub", product.sub);
  setText("lightbox-price", product.price);
  
  const iconEl = $("lightbox-icon");
  if (iconEl) iconEl.textContent = product.icon;

  modal.classList.remove("hidden");
}

function initializeGearLightbox() {
  $("gear-view-tee")?.addEventListener("click", () => {
    openGearLightbox({ title: "Wolverines Premium Tee", sub: '"Outwork Yesterday" Edition', price: "$30", icon: "👕" });
  });

  $("gear-view-hoodie")?.addEventListener("click", () => {
    openGearLightbox({ title: "Snt.L.Mo Elite Hoodie", sub: '"Dominate Today" Heavyweight', price: "$65", icon: "🧥" });
  });

  const closeBtn = $("gear-lightbox-close");
  closeBtn?.addEventListener("click", () => {
    $("gear-lightbox-modal")?.classList.add("hidden");
  });

  $("lightbox-checkout-btn")?.addEventListener("click", () => {
    alert("Stripe initialization active. Launching outer checkout terminal connection node...");
  });
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
initializeGearLightbox();
initializeMediaLockerEngine();

onAuthStateChanged(auth, (user) => {
  if (user) {
    handleSignedInUser(user);
  } else {
    updateAccessUI(null);
    hide("loading-overlay");
  }
});

window.appAuth = { logIn: (e, p) => signInWithEmailAndPassword(auth, e, p), logOut: () => signOut(auth) };