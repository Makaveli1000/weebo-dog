import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, addDoc, collection, query, limit, onSnapshot, serverTimestamp } from "firebase/firestore";
import { getDatabase, ref as rtdbRef, set as rtdbSet } from "firebase/database";

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
    checkAndSeedDatabase().catch((e) => console.error(e)); 
  } else { 
    hide("admin-panel"); 
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
// 📊 RENDER ENGINE (SPORTS HUB MATRIX)
// ==========================================
function processAndRenderFilteredAthletes() {
  const gridBody = $("match-grid-body");
  if (!gridBody) return;
  
  if (!allAthletesCache.length) { 
    gridBody.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-gray-500">No athletes active.</td></tr>`; 
    return; 
  }
  
  gridBody.innerHTML = allAthletesCache.map(({ data }) => `
    <tr class="border-t border-gray-800">
      <td class="p-3 font-bold text-white">${escapeHtml(data.name)}</td>
      <td class="p-3 text-center text-gray-300">${safeNumber(data.scores?.[0])}</td>
      <td class="p-3 text-center text-gray-300">${safeNumber(data.scores?.[1])}</td>
      <td class="p-3 text-center font-black text-yellow-500">${athleteTotal(data)}</td>
      <td class="p-3 text-right"><span class="rounded border border-yellow-500/30 px-2 py-1 text-[10px] uppercase text-yellow-400">${escapeHtml(data.sport)}</span></td>
    </tr>
  `).join("");
}

function subscribeToAthletes() {
  onSnapshot(query(collection(db, "athletes"), limit(120)), (snap) => {
    allAthletesCache = snap.docs.map(d => ({ id: d.id, data: d.data() })).sort((a,b) => athleteTotal(b.data) - athleteTotal(a.data));
    processAndRenderFilteredAthletes();
  });
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
  } catch(err) { 
    console.error(err); 
  } finally { 
    hide("loading-overlay"); // Protective crash exit gate
  }
}

function handleSignedOutUser() {
  currentUser = null; 
  currentProfile = null;
  updateAccessUI(null); 
  subscribeToAthletes();
  hide("loading-overlay"); // Protective crash exit gate
}

// ==========================================
// 🎛️ EVENT LISTENERS MATRIX BOUNDS
// ==========================================
function bindEvents() {
  $("global-search-input")?.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      const qText = $("global-search-input").value.trim();
      if (!qText) return;
      
      $("global-search-status").textContent = "SCANNING WEB...";
      try {
        await fetch("/.netlify/functions/searchGlobalAthlete", { 
          method: "POST", 
          body: JSON.stringify({ athleteName: qText }) 
        });
      } catch (err) {
        console.error("Global search sweep failed:", err);
      } finally {
        $("global-search-status").textContent = "System Ready";
        $("global-search-input").value = "";
      }
    }
  });

  $("header-auth-btn")?.addEventListener("click", () => { 
    if (currentUser) signOut(auth); 
    else show("login-modal"); 
  });
}

// RUNTIME TRIGGER INITIATION
bindEvents();
onAuthStateChanged(auth, u => { if (u) handleSignedInUser(u); else handleSignedOutUser(); });

// Global namespace bridging triggers
window.appAuth = { 
  logIn: (e, p) => signInWithEmailAndPassword(auth, e, p), 
  logOut: () => signOut(auth) 
};