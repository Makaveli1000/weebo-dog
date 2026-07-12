// ======================================================
// PAGE RENDER IMPORTS
// ======================================================
import { renderAdminPage } from "./pages/admin.js";
import { renderHomePage } from "./pages/home.js";
import { renderSportsFeedPage } from "./pages/feed.js";
import { initializeSportsFeed } from "./feed/feedController.js";
import { renderAthletesDirectory } from "./pages/athletes.js";
import { renderAthletePage } from "./pages/athlete.js";
import { renderHighlightFeed } from "./pages/highlights.js";
import { renderNationalDashboard } from "./pages/national-dashboard.js";
import { renderSchoolsPage } from "./pages/schools.js";
import { renderRankingsPage } from "./pages/rankings.js";
import { renderRecruitingPage } from "./pages/recruiting.js";
import { renderZeusAiPage } from "./pages/zeus-ai.js";
import { renderLiveGamesPage } from "./pages/live.js";
import { renderMarketplacePage } from "./pages/marketplace.js";
import { renderAccountSetupPage } from "./pages/account-setup.js";
import { registerAccountSetupHandlers } from "./controllers/accountSetupController.js";
import { registerZeusBrainHandlers } from "./controllers/zeusBrainController.js";
import { renderZeusDashboard } from "./pages/zeusDashboard.js";

// ======================================================
// FIREBASE IMPORTS
// ======================================================

import { initializeApp } from "firebase/app";

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  onSnapshot,
  serverTimestamp,
  deleteDoc,
  limit,
  arrayUnion,
  getDocs
} from "firebase/firestore";

import {
  getDatabase,
  ref as rtdbRef,
  push,
  onValue,
  serverTimestamp as rtdbServerTimestamp,
  query as rtdbQuery,
  limitToLast
} from "firebase/database";

import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";

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
const db = getFirestore(app, "(default)");
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

window.appState = {
  currentUser: null,
  currentProfile: null,
  athletes: [],
  activeAthleteId: null,
  activeAthlete: null,
  activeSchool: null,
  activeVideo: null,
  activeView: "home"
};

window.setActiveAthlete = function(id, athlete) {

  activeSelectedAthleteId = id;

  window.appState.activeAthleteId = id;

  window.appState.activeAthlete = {
    id,
    ...athlete
  };

  window.dispatchEvent(
    new CustomEvent("sntlmo:athlete-selected", {
      detail: window.appState.activeAthlete
    })
  );
};

// DRAFT BOARD ARRAYS MEMORY NODES
let squadA = [];
let squadB = [];
let squadC = [];

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
  const titleBadge = $("now-playing-title");
  if (!viewport || !placeholder) return;

  const videoList = athlete.videos || (athlete.highlightUrl ? [{ title: "Main Highlight", url: athlete.highlightUrl }] : []);
  if (videoList.length === 0) {
    viewport.innerHTML = "";
    placeholder.classList.remove("hidden");
    if (titleBadge) titleBadge.textContent = "Select a row to play";
    return;
  }
  placeholder.classList.add("hidden");

  window.switchVideo = (index) => {
    const v = videoList[index];
    const url = v.url;
    if (titleBadge) titleBadge.textContent = `Playing: ${v.title}`;

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

    const subLabel = $("upload-progress-sub");
    if (subLabel) subLabel.textContent = "UPLOADING MEDIA BLOCKS...";

    const storagePath = `highlights/${activeSelectedAthleteId}/${Date.now()}_${file.name}`;
    const uploadTask = uploadBytesResumable(storageRef(storage, storagePath), file);

    uploadTask.on('state_changed', null, 
      (error) => {
        console.error("Upload process rejected:", error);
        alert("Upload failed.");
      }, 
      async () => {
        try {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          const titanRef = doc(db, "athletes", activeSelectedAthleteId);
          
          await updateDoc(titanRef, { 
            highlightUrl: downloadUrl,
            videos: arrayUnion({
              title: file.name.split('.').slice(0, -1).join('.') || "Uploaded Video",
              url: downloadUrl,
              createdAt: new Date().toISOString()
            })
          });
          
          if (subLabel) subLabel.textContent = "UPLOAD MATRIX SECURE.";
          alert("Media permanently attached to athlete grid profiles.");
        } catch (err) {
          console.error("Failed to commit video data:", err);
        }
      }
    );
  });
}

// ==========================================
// ⚡ SCORING ENGINE
// ==========================================

function athleteTotal(athlete) {
  const scores = Array.isArray(athlete?.scores) ? athlete.scores : 
                 [athlete?.score0, athlete?.score1, athlete?.score2, athlete?.score3, athlete?.score4];
  return scores.reduce((sum, val) => sum + safeNumber(val), 0);
}

  function mergeRosterScores(athlete = {}) {
  const scores = Array.isArray(athlete.scores)
    ? athlete.scores
    : [
        athlete.score0,
        athlete.score1,
        athlete.score2,
        athlete.score3,
        athlete.score4
      ];

  return scores.reduce((sum, value) => sum + safeNumber(value), 0);
}

// ==========================================
// ⚡ LIVE WAR ROOM DRAFT BOARD INTERACTIVE MATRIX
// ==========================================
function calculateSquadAverages() {

  const calcAvg = (arr) =>
    arr.length
      ? Math.round(
          arr.reduce(
            (sum, player) => sum + athleteTotal(player),
            0
          ) / arr.length
        )
      : 0;

  setText("squad-a-rating", `AVG: ${calcAvg(squadA)}`);
  setText("squad-b-rating", `AVG: ${calcAvg(squadB)}`);
  setText("squad-c-rating", `AVG: ${calcAvg(squadC)}`);

}

function renderDraftBoards() {
  const slotA = $("squad-a-slots");
const slotB = $("squad-b-slots");
const slotC = $("squad-c-slots");
  
  if (slotA) {
    slotA.innerHTML = squadA.length === 0 
      ? `<div class="text-[11px] text-gray-600 font-mono italic text-center my-auto py-4">Roster vacant. Select an athlete above to draft.</div>`
      : squadA.map((p, idx) => `
          <div class="flex justify-between items-center bg-zeus-panel border border-zeus-border/40 p-2 rounded text-xs font-mono">
            <span class="text-white font-bold">${escapeHtml(p.name)}</span>
            <button onclick="window.dropFromSquad('A', ${idx})" class="text-red-400 hover:text-red-500 font-bold px-1">&times;</button>
          </div>
        `).join("");
  }
  
  if (slotB) {
    slotB.innerHTML = squadB.length === 0 
      ? `<div class="text-[11px] text-gray-600 font-mono italic text-center my-auto py-4">Roster vacant. Select an athlete above to draft.</div>`
      : squadB.map((p, idx) => `
          <div class="flex justify-between items-center bg-zeus-panel border border-zeus-border/40 p-2 rounded text-xs font-mono">
            <span class="text-gray-300">${escapeHtml(p.name)}</span>
            <button onclick="window.dropFromSquad('B', ${idx})" class="text-red-400 hover:text-red-500 font-bold px-1">&times;</button>
          </div>
        `).join("");
  }
  
if (slotC) {
  slotC.innerHTML = squadC.length === 0
    ? `
      <div class="text-sm text-gray-600 font-mono italic text-center my-auto py-8">
        Roster vacant. Select National from the athlete matrix.
      </div>
    `
    : squadC.map((player, index) => `
        <div class="flex justify-between items-center bg-zeus-panel border border-zeus-gold/20 p-2 rounded text-xs font-mono">

          <span class="text-zeus-gold font-bold">
            ${escapeHtml(player.name)}
          </span>

          <button
            onclick="window.dropFromSquad('C', ${index})"
            class="text-red-400 hover:text-red-500 font-bold px-1">

            &times;

          </button>

        </div>
      `).join("");
}

calculateSquadAverages();
}
window.renderDraftBoards = renderDraftBoards;
window.dropFromSquad = (squadType, index) => {
  if (squadType === "A") {
    squadA.splice(index, 1);
  } else if (squadType === "B") {
    squadB.splice(index, 1);
  } else if (squadType === "C") {
    squadC.splice(index, 1);
  }

  renderDraftBoards();
};

window.inlineDraftDispatch = (athleteId, targetSquadNum) => {
  const found = allAthletesCache.find(item => item.id === athleteId);

  if (!found) return;

  if (targetSquadNum === 1) {
    if (squadA.some(player => player.name === found.data.name)) {
      return alert("Athlete already selected for Team St. Louis Elite.");
    }

    squadA.push(found.data);
  } else if (targetSquadNum === 2) {
    if (squadB.some(player => player.name === found.data.name)) {
      return alert("Athlete already selected for Regional Challengers.");
    }

    squadB.push(found.data);
  } else if (targetSquadNum === 3) {
    if (squadC.some(player => player.name === found.data.name)) {
      return alert("Athlete already selected for National Select.");
    }

    squadC.push(found.data);
  }

  renderDraftBoards();
};

/* ==========================================
   LIVE GAMES PAGE
========================================== */

function renderLiveGames() {
  const container = document.getElementById("live-root");
  if (!container) return;

  container.innerHTML = renderLiveGamesPage();
}

/* ==========================================
   MARKETPLACE PAGE
========================================== */

function renderMarketplace() {
  const container = document.getElementById("marketplace-root");
  if (!container) return;

  container.innerHTML = renderMarketplacePage();
}

function renderZeusAI() {
  const container = document.getElementById("zeus-ai-root");
  if (!container) return;

  container.innerHTML = renderZeusAiPage();
}

// ==========================================
// ADMIN FUNCTIONS
// ==========================================

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

window.handleAdminAddVideo = async () => {
  const titleEl = $("new-vid-title");
  const urlEl = $("new-vid-url");
  const title = titleEl?.value.trim();
  const url = urlEl?.value.trim();

  if (!activeSelectedAthleteId) return alert("Select an athlete profile row first from the matrix.");
  if (!title || !url) return alert("Please specify both a valid title and URL string.");

  await addVideoToTitan(activeSelectedAthleteId, title, url);
  titleEl.value = "";
  urlEl.value = "";
  alert("Video payload successfully committed to user array.");
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

  if (hasMainAccess(profile)) {
    hide("paywall-content");
    show("main-content");
  } else {
    show("paywall-content");
    hide("main-content");
  }

  if (isAdminProfile(profile)) {
    show("admin-panel");
    show("admin-purge-btn");
    checkAndSeedDatabase().catch(e => console.error(e));
  } else {
    hide("admin-panel");
    hide("admin-purge-btn");
  }

  if (profile) {
    setText("user-status", `Admin: ${profile.nickname || profile.email || "Authorized"}`);
    if (loginBtn) loginBtn.textContent = "Logout";
  } else {
    setText("user-status", "The Home of Every Athlete");
    if (loginBtn) loginBtn.textContent = "Login";
  }

  processAndRenderFilteredAthletes();
}

function openAthleteProfile(id, athlete) {
  const modal = document.getElementById("athlete-profile-modal");
  const content = document.getElementById("athlete-profile-content");

  if (!modal || !content) return;

  const activeAthlete = {
  id,
  ...athlete
};

window.activeAthlete = activeAthlete;

  content.innerHTML = `
  <div class="recruiter-profile-layout">

    <div class="recruiter-profile-main">
      ${renderAthletePage(activeAthlete)}
    </div>

    <aside class="recruiter-zeus-sidebar">
      ${buildZeusScoutingReport(activeAthlete)}
      ${renderZeusDashboard(activeAthlete)}
    </aside>

  </div>
`;

  modal.classList.remove("hidden");
}

window.openAthleteFromDirectory = function(id) {
  const found = allAthletesCache.find(item => item.id === id);

  if (!found) {
    alert("Athlete profile not found yet.");
    return;
  }

  window.setActiveAthlete(found.id, found.data);
  openAthleteProfile(found.id, found.data);
}; 

// ==========================================
// PAGE RENDERERS
// ==========================================

function renderSportsFeed() {
  const container = document.getElementById("home-root");

  if (!container) return;

  container.innerHTML =
    renderSportsFeedPage(allAthletesCache);

  initializeSportsFeed();
}

function renderHome() {
  const container = document.getElementById("home-root");
  if (!container) return;

  container.innerHTML = renderHomePage(allAthletesCache);

  initializeHomeSportFilters();

  const overlay = document.getElementById("zeus-intro-overlay");
  const skipBtn = document.getElementById("skip-zeus-intro");
  const line = document.getElementById("zeus-intro-line");
  const skipBtnInline = document.getElementById("skip-zeus-intro-inline");
  
const lines = [
    "Welcome to Snt.L.Mo. Sports Network...",
    "The home of every athlete...",
    "Every school...",
    "Every coach...",
    "Every recruiter...",
    "Every fan...",
    "Discover athletes from every city...",
    "Watch highlights from around the country...",
    "Explore school programs...",
    "Track national rankings...",
    "Connect through recruiting...",
    "Shop exclusive team gear...",
    "And let Zeus AI analyze the future of sports...",
    "Greatness is not born...",
    "It is discovered...",
    "Now... let's discover the next generation of greatness."
  ];

  let index = 0;
  let timer = null;

  const thunder = new Audio("audio/thunder.mp3");
  const voice = new Audio("audio/zeus-intro.mp3");
  const music = new Audio("audio/ambient.mp3");

  function closeIntro() {
    overlay?.classList.add("hidden");

    thunder.pause();
    voice.pause();
    music.pause();

    if (timer) clearInterval(timer);

    animateHomeCounters();
  }

  skipBtn?.addEventListener("click", closeIntro);
  skipBtnInline?.addEventListener("click", closeIntro);
  
if (overlay) {
    thunder.volume = 0.6;
    voice.volume = 0.95;
    music.volume = 0.25;

    thunder.play().catch(() => {});
    voice.play().catch(() => {});
    music.play().catch(() => {});

    timer = setInterval(() => {
      index += 1;

      if (line && lines[index]) {
        line.textContent = lines[index];
      }

      if (index >= lines.length - 1) {
        setTimeout(closeIntro, 4500);
      }
    }, 2800);
  }

setTimeout(() => {
    animateHomeCounters();
  }, 900);
}

function animateHomeCounters() {
  document.querySelectorAll(".count-up").forEach((el) => {
    const target = Number(el.dataset.target || 0);
    let current = 0;
    const step = Math.max(1, Math.floor(target / 80));

    const interval = setInterval(() => {
      current += step;

      if (current >= target) {
        current = target;
        clearInterval(interval);
      }

      el.textContent = current.toLocaleString();
    }, 25);
  });
}

// ==========================================
// ACCOUNT SETUP PAGE
// ==========================================

function renderAccountSetup() {
  const container = document.getElementById("account-setup-root");
  if (!container) return;

  container.innerHTML = renderAccountSetupPage();
}

function renderAthleteDirectoryPage() {
  const container = document.getElementById("athlete-directory-page");
  if (!container) return;

  container.innerHTML = renderAthletesDirectory(allAthletesCache);

  const search = document.getElementById("athlete-directory-search");
  const sport = document.getElementById("athlete-directory-sport");

  function filterDirectory() {
    const q = (search?.value || "").toLowerCase();
    const selectedSport = sport?.value || "all";

    document.querySelectorAll(".athlete-directory-card").forEach(card => {
      const matchesSearch = card.dataset.search.includes(q);
      const matchesSport = selectedSport === "all" || card.dataset.sport === selectedSport;

      card.style.display = matchesSearch && matchesSport ? "block" : "none";
    });
  }

  search?.addEventListener("input", filterDirectory);
  sport?.addEventListener("change", filterDirectory);
}

function renderHighlightFeedPage() {
  const container = document.getElementById("highlights-root");
  if (!container) return;

  container.innerHTML = renderHighlightFeed(allAthletesCache);

  initializeHighlightAutoplay();
}

function renderSchools() {
  const container = document.getElementById("schools-root");
  if (!container) return;

  container.innerHTML = renderSchoolsPage();
}

function renderRankings() {
  const container = document.getElementById("rankings-root");
  if (!container) return;

  container.innerHTML = renderRankingsPage(allAthletesCache);
}

function renderRecruiting() {
  const container = document.getElementById("recruiting-root");
  if (!container) return;

  container.innerHTML = renderRecruitingPage();
}

function bindEvents() {
  $("tier-select")?.addEventListener("change", () => { refreshSubTierOptions(); processAndRenderFilteredAthletes(); });
  $("sub-tier-select")?.addEventListener("change", processAndRenderFilteredAthletes);
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

// ==========================================
// RENDER ENGINE (DYNAMIC DECOUPLED MATRIX GENERATOR)
// ==========================================

function getFilteredAthletes() {

  const tier =
    $("tier-select")?.value || "all";

  const subTier =
    $("sub-tier-select")?.value || "all";

  return allAthletesCache.filter(({ data }) => {

    return (
      (tier === "all" || data.tier === tier) &&
      (subTier === "all" || data.subCategory === subTier)
    );

  });

}

function processAndRenderFilteredAthletes() {
  const gridBody = $("match-grid-body");
  if (!gridBody) return;
  const filteredAthletes = getFilteredAthletes();

  if (!filteredAthletes.length) {
    gridBody.innerHTML = `<tr><td colspan="6" class="p-4 text-center text-gray-500">No athletes active for this filter.</td></tr>`;
    setText("apex-predator-name", "No Apex Selected"); setText("apex-predator-score", "---"); setText("grid-count-badge", "0 Active");
    return;
  }

  gridBody.innerHTML = filteredAthletes.map(({ id, data }) => {
    const hasHighlight = Boolean((data.videos && data.videos.length > 0) || data.highlightUrl || data.highlight);
    const isSelected = activeSelectedAthleteId === id;
    const trackingClass = isSelected ? "bg-zeus-gold/10 border-l-2 border-zeus-gold" : "border-t border-zeus-border";
    
    return `
      <tr class="${trackingClass} hover:bg-zeus-gold/5 cursor-pointer transition" data-athlete-id="${escapeHtml(id)}">
        <td class="p-3 font-bold text-white whitespace-nowrap">
          <div class="flex items-center space-x-2">
            <span>${escapeHtml(data.name)}</span>
            ${hasHighlight ? `<span class="bg-zeus-goldSoft text-zeus-gold text-[9px] px-1.5 py-0.5 rounded border border-zeus-gold/20 font-bold uppercase tracking-wider shrink-0">Video</span>` : ""}
          </div>
        </td>
        <td class="p-3 text-center text-gray-300">${safeNumber(data.scores?.[0])}</td>
        <td class="p-3 text-center text-gray-300">${safeNumber(data.scores?.[1])}</td>
        <td class="p-3 text-center font-black text-zeus-gold">${mergeRosterScores(data)}</td>
        <td class="p-3 text-center text-gray-400 uppercase text-xs">${escapeHtml(data.sport)}</td>
        <td class="p-3 text-right" onclick="event.stopPropagation()">
          <div class="flex items-center justify-end space-x-1">
            <button onclick="window.inlineDraftDispatch('${escapeHtml(id)}', 1)" class="bg-zeus-goldSoft text-zeus-gold border border-zeus-gold/20 hover:bg-zeus-gold hover:text-black font-mono text-[9px] px-1.5 py-0.5 rounded uppercase font-bold transition">Draft A</button>
            <button onclick="window.inlineDraftDispatch('${escapeHtml(id)}', 2)" class="bg-gray-900 text-gray-400 border border-zeus-border hover:bg-gray-700 hover:text-white font-mono text-[9px] px-1.5 py-0.5 rounded uppercase font-bold transition">Draft B</button>
            <button
  onclick="window.inlineDraftDispatch('${escapeHtml(id)}', 3)"
  class="bg-zeus-gold text-black border border-zeus-gold hover:bg-yellow-400 font-mono text-[9px] px-1.5 py-0.5 rounded uppercase font-bold transition">

  National

</button>
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

      const uploadBadge = $("upload-count-badge");
      if (uploadBadge) {
        uploadBadge.textContent = `Uploads: ${found.data.videos ? found.data.videos.length : 0}`;
      }

window.setActiveAthlete(found.id, found.data);
 
playHighlight(found.data);
openAthleteProfile(found.id, found.data);

    });
  });
}         

// ==========================================
// 📱 TIKTOK HIGHLIGHT FEED AUTOPLAY
// ==========================================

function initializeHighlightAutoplay() {
  const videos = document.querySelectorAll(".highlight-reel-video");

  if (!videos.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;

        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    {
      threshold: 0.65
    }
  );

  videos.forEach((video) => observer.observe(video));
}

function subscribeToAthletes() {
  if (unsubscribeAthletes) return;
  unsubscribeAthletes = onSnapshot(query(collection(db, "athletes"), limit(120)), (snap) => {
    allAthletesCache = snap.docs
  .map(d => ({ id: d.id, data: d.data() }))
  .sort((a, b) => mergeRosterScores(b.data) - mergeRosterScores(a.data));

window.appState.athletes = allAthletesCache.map(item => ({
  id: item.id,
  ...item.data
}));

setText("athlete-count", allAthletesCache.length);

updateAdminAnalytics();

console.log("ATHLETES LOADED:", allAthletesCache);
console.log("FILTER VALUES:", $("tier-select")?.value, $("sub-tier-select")?.value);

processAndRenderFilteredAthletes();

initializeHighlightAutoplay();

renderAthleteDirectoryPage();
renderHighlightFeedPage();
renderRankings();
renderSchools();
renderRecruiting();
renderLiveGames();
renderMarketplace();
renderZeusAI();

if (activeSelectedAthleteId) {
  const currentSelected = allAthletesCache.find(item => item.id === activeSelectedAthleteId);

  if (currentSelected) {
    const uploadBadge = $("upload-count-badge");

    if (uploadBadge) {
      uploadBadge.textContent =
        `Uploads: ${currentSelected.data.videos ? currentSelected.data.videos.length : 0}`;
    }
  }
}

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
        createdAt: new Date().toISOString()
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
  window.appState.currentUser = user; try {
    const snap = await getDoc(doc(db, "users", user.uid));
    currentProfile = snap.exists() ? { uid: user.uid, email: user.email, ...snap.data() } : { uid: user.uid, email: user.email, role: "admin", nickname: "Mac10" };
    window.appState.currentProfile = currentProfile; updateAccessUI(currentProfile); 
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
// 📡 REAL-TIME SPORTS TICKER ENGINE
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
    if (container.children.length > 20) { container.removeChild(container.firstChild); }
  }, 3000); 
}

// ==========================================
// ⚙️ UNIFIED DYNAMIC MARKETPLACE GRID GENERATOR (THEMED FIX)
// ==========================================

function renderGlobalGearMarketplace(products) {
  const container = document.getElementById('gear-grid-container');
  if (!container) return;
  
  container.innerHTML = ''; // This safely clears out your hardcoded backup hoodies!

  products.forEach(product => {
    const isAffiliate = product.isExternal === true;
    const productString = JSON.stringify(product).replace(/"/g, '&quot;');
    
    // Formats price safely whether it's stored as a double or text string
    const priceFormatted = !isNaN(product.price) ? Number(product.price).toFixed(2) : "0.00";
    
    const cardHtml = `
      <div class="border border-zeus-border bg-zeus-black/60 rounded-xl p-3 flex flex-col justify-between group hover:border-zeus-gold/30 transition">
        <div>
          <div class="flex items-center justify-between gap-2 mb-2">
            <span class="text-[8px] text-gray-500 font-mono uppercase tracking-wider">${product.location || 'US Shipping'}</span>
            <span class="px-2 py-0.5 text-[8px] font-mono font-bold rounded bg-zeus-goldSoft text-zeus-gold border border-zeus-gold/20 uppercase tracking-wide">
              ${isAffiliate ? product.storeName : "Snt.L.Mo. Exclusive"}
            </span>
          </div>
          
          <div class="w-full aspect-square bg-zeus-panel rounded border border-zeus-border flex items-center justify-center p-2 overflow-hidden relative">
            <img src="${product.image}" alt="${product.name || product.title}" class="w-full h-full object-cover absolute inset-0" />
          </div>
          
          <div class="mt-2">
            <h3 class="text-[10px] font-bold text-white tracking-tight truncate" title="${product.name || product.title}">
              ${product.name || product.title}
            </h3>
            <p class="text-zeus-gold font-mono font-black text-xs mt-0.5">$${priceFormatted}</p>
          </div>
        </div>

        <button 
          onclick="openGearLightbox(${productString})"
          class="w-full mt-3 bg-zeus-panel hover:bg-zeus-gold text-gray-400 hover:text-black font-mono text-[9px] font-bold uppercase px-2 py-1.5 rounded transition border border-zeus-border"
        >
          View Details
        </button>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', cardHtml);
  });
}

// ==========================================
// 🧥 APPAREL LIGHTBOX MODAL MAPPING INTERFACE ENGINE
// ==========================================

function openGearLightbox(product) {
  const modal = $("gear-lightbox-modal");
  if (!modal) return;

  const productName = product.name || product.title;
  const productPrice = typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : product.price;
  
  setText("lightbox-title", productName);
  setText("lightbox-price", productPrice);
  
  const subText = product.isExternal 
    ? `Available via ${product.storeName} (${product.location || 'Global'})` 
    : (product.sub || '"Dominate Today" Edition');
  setText("lightbox-sub", subText);
  
  const iconEl = $("lightbox-icon");
  if (iconEl) {
    iconEl.textContent = product.isExternal ? "👟" : (product.icon || "🧥");
  }

  const checkoutBtn = $("lightbox-checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.dataset.productPayload = JSON.stringify(product);
    
    if (product.isExternal) {
      checkoutBtn.textContent = `Buy via ${product.storeName}`;
      checkoutBtn.className = "w-full py-3 rounded-lg bg-white text-black font-black uppercase tracking-wider text-xs transition-all cursor-pointer text-center block";
    } else {
      checkoutBtn.textContent = "Secure Local Checkout";
      checkoutBtn.className = "w-full py-3 rounded-lg bg-gold text-black font-black uppercase tracking-wider text-xs transition-all hover:bg-amber-400 cursor-pointer text-center block";
    }
  }

  modal.classList.remove("hidden");
}

function initializeGearLightbox() {
  $("gear-view-tee")?.addEventListener("click", () => {
    openGearLightbox({ name: "Wolverines Premium Tee", sub: '"Outwork Yesterday" Edition', price: 30.00, isExternal: false, stripePriceId: "price_tee_123", icon: "👕" });
  });

  $("gear-view-hoodie")?.addEventListener("click", () => {
    openGearLightbox({ name: "Snt.L.Mo Elite Hoodie", sub: '"Dominate Today" Heavyweight', price: 65.00, isExternal: false, stripePriceId: "price_1QxXYZ123456", icon: "🧥" });
  });

  const closeBtn = $("gear-lightbox-close");
  closeBtn?.addEventListener("click", () => {
    $("gear-lightbox-modal")?.classList.add("hidden");
  });

  $("lightbox-checkout-btn")?.addEventListener("click", (e) => {
    const payloadRaw = e.currentTarget.dataset.productPayload;
    if (!payloadRaw) return;

    const product = JSON.parse(payloadRaw);

    if (product.isExternal) {
      window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer');
    } else {
      if (typeof redirectToStripeCheckout === 'function') {
        redirectToStripeCheckout(product.stripePriceId);
      } else {
        alert(`Launching checkout node for ${product.name || product.title}...`);
      }
    }
  });
}

// ==========================================
// 📡 CLOUD INVENTORY SYNC TERMINAL ENGINE (UPDATED)
// ==========================================

function loadLiveGearMarketplace() {
  const merchandiseRef = collection(db, "merchandise");
  
  onSnapshot(merchandiseRef, (snapshot) => {
    const productsArray = [];
    
    snapshot.forEach((doc) => {
      productsArray.push({ id: doc.id, ...doc.data() });
    });

    if (productsArray.length > 0) {
      renderGlobalGearMarketplace(productsArray);
    }
  }, (error) => {
    console.error("Firestore synchronizer pipeline blocked:", error);
  });
}

// ==========================================
// EVENT LISTENERS MATRIX BOUNDS
// ==========================================

function renderAdmin() {
  const root = document.getElementById("admin-platform");
  if (!root) return;

  root.innerHTML = renderAdminPage();

  updateAdminAnalytics();
}

 function updateAdminAnalytics() {

  const athletes = allAthletesCache.map(item => item.data || {});

  // ==========================================
  // TOTAL ATHLETES
  // ==========================================

  const totalAthletes = athletes.length;

  // ==========================================
  // UNIQUE SCHOOLS
  // ==========================================

  const schools = new Set(
    athletes
      .map(athlete =>
        String(
          athlete.school ||
          athlete.schoolName ||
          athlete["school name"] ||
          ""
        )
          .trim()
          .toLowerCase()
      )
      .filter(Boolean)
  );

  // ==========================================
  // UNIQUE STATES
  // ==========================================

  const states = new Set(
    athletes
      .map(athlete =>
        String(athlete.state || "")
          .trim()
          .toUpperCase()
      )
      .filter(Boolean)
  );

  // ==========================================
  // TOTAL VIDEOS
  // ==========================================

  const totalVideos = athletes.reduce((total, athlete) => {
    const videos = Array.isArray(athlete.videos)
      ? athlete.videos.length
      : 0;

    const hasFallbackHighlight =
      !videos &&
      Boolean(athlete.highlightUrl || athlete.highlight);

    return total + videos + (hasFallbackHighlight ? 1 : 0);
  }, 0);

    // ==========================================
  // TOTAL LIKES
  // ==========================================

  const totalLikes = athletes.reduce((total, athlete) => {

    if (!Array.isArray(athlete.videos)) return total;

    return total + athlete.videos.reduce(
      (sum, video) => sum + Number(video.likes || 0),
      0
    );

  }, 0);

  // ==========================================
  // TOTAL VIEWS
  // ==========================================

  const totalViews = athletes.reduce((total, athlete) => {

    if (!Array.isArray(athlete.videos)) return total;

    return total + athlete.videos.reduce(
      (sum, video) => sum + Number(video.views || 0),
      0
    );

  }, 0);

  // ==========================================
  // RECRUITERS WATCHING
  // (temporary until recruiter accounts exist)
  // ==========================================

  const recruiterCount = Math.max(
    Math.round(totalAthletes * 0.35),
    0
  );

  // ==========================================
  // ZEUS REPORTS GENERATED
  // (temporary until AI reports are stored)
  // ==========================================

 const reportCount = Math.round(
  totalVideos * 1.4
);

// ==========================================
// PLATFORM LEADERS
// ==========================================

// Fastest Growing Sport
const sportTotals = {};

athletes.forEach((athlete) => {
  const sport = athlete.sport || "Unknown";

  sportTotals[sport] = (sportTotals[sport] || 0) + 1;
});

const fastestSport =
  Object.entries(sportTotals)
    .sort((a, b) => b[1] - a[1])[0] || ["None", 0];

// Trending Athlete
let trendingAthlete = {
  name: "None",
  score: 0,
  sport: ""
};

athletes.forEach((athlete) => {
  const videos = Array.isArray(athlete.videos)
    ? athlete.videos
    : [];

  const likes = videos.reduce(
    (sum, video) => sum + Number(video.likes || 0),
    0
  );

  const views = videos.reduce(
    (sum, video) => sum + Number(video.views || 0),
    0
  );

  const zeus = Number(
    athlete.zeusRating ||
    athlete.total ||
    mergeRosterScores(athlete) ||
    0
  );

  const score =
    zeus +
    likes +
    Math.floor(views / 100);

  if (score > trendingAthlete.score) {
    trendingAthlete = {
      name: athlete.name || "Unknown Athlete",
      sport: athlete.sport || "Sport",
      score
    };
  }
});

// Top School
const schoolTotals = {};

athletes.forEach((athlete) => {
  const school =
    athlete.school ||
    athlete.schoolName ||
    athlete["school name"] ||
    "";

  if (!school.trim()) return;

  schoolTotals[school] =
    (schoolTotals[school] || 0) + 1;
});

const topSchool =
  Object.entries(schoolTotals)
    .sort((a, b) => b[1] - a[1])[0] || ["None", 0];

// ==========================================
// UPDATE ANALYTICS CARDS
// ==========================================

  

  // ==========================================
  // UPDATE ANALYTICS CARDS
  // ==========================================

setText("admin-athlete-count", totalAthletes.toLocaleString());

setText("admin-school-count", schools.size.toLocaleString());

setText("admin-state-count", states.size.toLocaleString());

setText("admin-video-count", totalVideos.toLocaleString());

setText("admin-like-count", totalLikes.toLocaleString());

setText("admin-view-count", totalViews.toLocaleString());

setText("admin-recruiter-count", recruiterCount.toLocaleString());

setText("admin-report-count", reportCount.toLocaleString());

setText("admin-map-state-count", states.size.toLocaleString());

setText(
  "admin-fastest-sport",
  fastestSport[0]
);

setText(
  "admin-fastest-sport-detail",
  `${fastestSport[1]} athletes represented`
);

setText(
  "admin-trending-athlete",
  trendingAthlete.name
);

setText(
  "admin-trending-athlete-detail",
  `${trendingAthlete.sport} • Trend score ${trendingAthlete.score}`
);

setText(
  "admin-top-school",
  topSchool[0]
);

setText(
  "admin-top-school-detail",
  `${topSchool[1]} athletes represented`
);

renderAdminStateDistribution(athletes);
}

function renderAdminStateDistribution(athletes = []) {
  const mapRoot = $("admin-us-map");
  const breakdownRoot = $("admin-state-breakdown");

  if (!mapRoot || !breakdownRoot) return;

  // Converts full state names and abbreviations
  // into a consistent two-letter abbreviation.
  const stateAliases = {
    alabama: "AL",
    alaska: "AK",
    arizona: "AZ",
    arkansas: "AR",
    california: "CA",
    colorado: "CO",
    connecticut: "CT",
    delaware: "DE",
    florida: "FL",
    georgia: "GA",
    hawaii: "HI",
    idaho: "ID",
    illinois: "IL",
    indiana: "IN",
    iowa: "IA",
    kansas: "KS",
    kentucky: "KY",
    louisiana: "LA",
    maine: "ME",
    maryland: "MD",
    massachusetts: "MA",
    michigan: "MI",
    minnesota: "MN",
    mississippi: "MS",
    missouri: "MO",
    montana: "MT",
    nebraska: "NE",
    nevada: "NV",
    "new hampshire": "NH",
    "new jersey": "NJ",
    "new mexico": "NM",
    "new york": "NY",
    "north carolina": "NC",
    "north dakota": "ND",
    ohio: "OH",
    oklahoma: "OK",
    oregon: "OR",
    pennsylvania: "PA",
    "rhode island": "RI",
    "south carolina": "SC",
    "south dakota": "SD",
    tennessee: "TN",
    texas: "TX",
    utah: "UT",
    vermont: "VT",
    virginia: "VA",
    washington: "WA",
    "west virginia": "WV",
    wisconsin: "WI",
    wyoming: "WY",
    "district of columbia": "DC"
  };

  const normalizeState = (value = "") => {
    const cleaned = String(value).trim();

    if (!cleaned) return "";

    if (cleaned.length === 2) {
      return cleaned.toUpperCase();
    }

    return stateAliases[cleaned.toLowerCase()] || cleaned.toUpperCase();
  };

  const stateTotals = {};

  athletes.forEach((athlete) => {
    const state = normalizeState(athlete.state);

    if (!state) return;

    stateTotals[state] = (stateTotals[state] || 0) + 1;
  });

  const stateEntries = Object.entries(stateTotals)
    .sort((a, b) => b[1] - a[1]);

  const athletesWithStates = stateEntries.reduce(
    (total, [, count]) => total + count,
    0
  );

  if (!stateEntries.length) {
    mapRoot.innerHTML = `
      <div class="admin-map-placeholder">

        <span>🇺🇸</span>

        <strong>No State Data Yet</strong>

        <p>
          Add state information to athlete profiles
          to activate the national distribution dashboard.
        </p>

      </div>
    `;

    breakdownRoot.innerHTML = `
      <div class="admin-empty-analytics">
        No state data available yet.
      </div>
    `;

    return;
  }

  const highestStateCount = stateEntries[0][1];

  mapRoot.innerHTML = `
    <div class="admin-state-map-grid">

      ${stateEntries.map(([state, count], index) => {
        const strength = highestStateCount
          ? Math.max(0.2, count / highestStateCount)
          : 0.2;

        const percentage = athletesWithStates
          ? Math.round((count / athletesWithStates) * 100)
          : 0;

        return `
          <button
            type="button"
            class="admin-state-map-tile"
            style="--state-strength:${strength}"
            onclick="window.openAdminStateDetails('${state}')">

            <span class="admin-state-rank">
              #${index + 1}
            </span>

            <strong>
              ${state}
            </strong>

            <small>
              ${count} Athlete${count === 1 ? "" : "s"}
            </small>

            <em>
              ${percentage}%
            </em>

          </button>
        `;
      }).join("")}

    </div>
  `;

  breakdownRoot.innerHTML = stateEntries.map(
    ([state, count], index) => {
      const percentage = athletesWithStates
        ? Math.round((count / athletesWithStates) * 100)
        : 0;

      return `
        <div class="admin-state-breakdown-row">

          <div class="admin-state-breakdown-rank">
            ${index + 1}
          </div>

          <div class="admin-state-breakdown-name">

            <strong>
              ${state}
            </strong>

            <span>
              ${count} athlete${count === 1 ? "" : "s"}
            </span>

          </div>

          <div class="admin-state-breakdown-bar">

            <i style="width:${percentage}%"></i>

          </div>

          <div class="admin-state-breakdown-percent">
            ${percentage}%
          </div>

        </div>
      `;
    }
  ).join("");

}
  
window.openAdminStateDetails = function(state) {
  const athletesInState = allAthletesCache.filter(({ data }) => {
    const athleteState = String(data.state || "")
      .trim()
      .toUpperCase();

    return athleteState === state;
  });

  if (!athletesInState.length) {
    alert(`No athlete profiles found for ${state}.`);
    return;
  }

  const names = athletesInState
    .slice(0, 12)
    .map(({ data }) => `• ${data.name || "Unknown Athlete"}`)
    .join("\n");

  const remaining = athletesInState.length - 12;

  alert(
    `${state} Athlete Distribution\n\n` +
    names +
    (remaining > 0
      ? `\n\n+ ${remaining} more athlete${remaining === 1 ? "" : "s"}`
      : "")
  );
};



  function initializeAdminEvents() {

$("reset-draft-btn")?.addEventListener("click", () => {

  squadA = [];
  squadB = [];
  squadC = [];

  renderDraftBoards();

});

 const scores = [
  safeNumber($("score-0")?.value || 90),
  safeNumber($("score-1")?.value || 90),
  safeNumber($("score-2")?.value || 90),
  safeNumber($("score-3")?.value || 90),
  safeNumber($("score-4")?.value || 90)
];

  $("athlete-form")?.addEventListener("submit", async (e) => {
const zeusRating = Math.round(
  scores.reduce((sum, value) => sum + value, 0) / scores.length
);

  const newTitan = {
    name: nameIn.value.trim(),
    sport: sportSel?.value || "Football",
    tier: "pro-players",
    subCategory: "pro-major",
    scores: [
      safeNumber($("score-0")?.value || 90),
      safeNumber($("score-1")?.value || 90),
      safeNumber($("score-2")?.value || 90),
      safeNumber($("score-3")?.value || 90),
      safeNumber($("score-4")?.value || 90)
    ],
    highlightUrl: hlIn?.value.trim() || "",
    videos: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: currentUser?.uid || "unknown"
  };

  try {
    await addDoc(collection(db, "athletes"), newTitan);
    alert("Athlete added to grid.");

    nameIn.value = "";
    if (hlIn) hlIn.value = "";
    ["score-0", "score-1", "score-2", "score-3", "score-4"].forEach(id => {
      const el = $(id);
      if (el) el.value = "";
    });
  } catch (err) {
    console.error("Athlete save failed:", err);
    alert("Athlete did not save. Check browser console.");
  }
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

const nationalDashboardRoot = document.getElementById("national-dashboard-root");

if (nationalDashboardRoot) {
  nationalDashboardRoot.innerHTML = renderNationalDashboard();
}

// ==========================================
// TIKTOK FEED ACTIONS
// ==========================================

window.likeHighlight = function(id) {
  const el = document.getElementById(`likes-${id}`);
  if (!el) return;

  let total = parseInt(el.innerText) || 0;
  el.innerText = total + 1;
};

window.shareHighlight = function(id) {
  navigator.clipboard.writeText(
    window.location.origin + "/?highlight=" + id
  );

  alert("Highlight link copied!");
};

window.zeusAnalyze = function(id) {
  window.generateZeusScoutingReport();
};

window.toggleReelSound = function(button) {
  const card = button.closest(".reel-card");
  const video = card?.querySelector("video");

  if (!video) return;

  video.muted = !video.muted;
  button.textContent = video.muted ? "🔇" : "🔊";
};

// ==========================================
// BOOT
// ==========================================

refreshSubTierOptions();
bindEvents();
show("main-content");
hide("paywall-content");
hide("loading-overlay");

registerAccountSetupHandlers(auth, db);
registerZeusBrainHandlers(db);
renderHome();
renderAthleteDirectoryPage();
renderSchools();
renderRankings();
renderRecruiting();
renderHighlightFeedPage();
renderLiveGames();
renderMarketplace();
renderZeusAI();
renderAdmin();
initializeAdminEvents();

initializeLiveSportsTicker();
initializeGearLightbox();
initializeMediaLockerEngine();
loadLiveGearMarketplace();

onAuthStateChanged(auth, async (user) => {

  renderAdmin();

const adminPlatform =
document.getElementById("admin-platform");
  if (user) {
    await handleSignedInUser(user);

    if (adminPlatform) {
      adminPlatform.style.display = isAdminProfile(currentProfile)
        ? "block"
        : "none";
    }
  } else {
    updateAccessUI(null);
    hide("loading-overlay");

    if (adminPlatform) {
      adminPlatform.style.display = "none";
    }
  }
});

window.appAuth = {
  logIn: (e, p) => signInWithEmailAndPassword(auth, e, p),
  logOut: () => signOut(auth)
};

window.show = show;
window.hide = hide; 

// ==========================================
// HIGHLIGHT FILM CENTER CONTROLS
// ==========================================

window.selectFilm = function(videoId) {

  const athlete = window.appState.activeAthlete;

  if (!athlete) return;

  const videos = athlete.videos || [];

  let selected = null;

  if (videoId.includes("-main")) {

    selected = {
      title: "Main Highlight",
      url: athlete.highlightUrl
    };

  } else {

    const index = Number(videoId.split("-").pop());

    selected = videos[index];

  }

  if (!selected) return;

  window.appState.activeVideo = selected;

  renderHighlightFeedPage();

};

window.likeHighlight = function(id) {

  alert("👍 Likes will be connected to Firestore next.");

};

window.askZeusScout = function (presetQuestion = "") {

  const input = document.getElementById("zeus-scout-question");
  const output = document.getElementById("zeus-scout-chat-output");

  if (!output) return;

  const question =
    presetQuestion ||
    input?.value ||
    "";

  const athlete =
    window.activeAthlete ||
    window.currentAthlete ||
    {};

  const name = athlete.name || "This athlete";
  const position = athlete.position || athlete.posion || "ATH";
  const school =
    athlete.school ||
    athlete.schoolName ||
    athlete["school name"] ||
    "Unknown School";

  const score =
    athlete.zeusRating ||
    athlete.total ||
    90;

  let answer = "";

  if (/30|summary|summarize/i.test(question)) {

    answer =
`${name} projects as a high-upside ${position} from ${school}. Zeus currently grades this athlete at ${score}. The profile shows strong athletic traits, verified film, and continued development potential. Recommended recruiting level: Power Conference / National Prospect.`;

  }

  else if (/strength/i.test(question)) {

    answer =
`Primary strengths include athletic ability, competitiveness, positional upside, and coachability. Zeus recommends continuing to add verified film, measurable testing, and seasonal production.`;

  }

  else if (/college|fit/i.test(question)) {

    answer =
`Best current program matches include Missouri, Memphis, Illinois, Kansas State, and Notre Dame based on athletic profile, projected development, and recruiting fit.`;

  }

  else if (/compare/i.test(question)) {

    answer =
`Zeus comparison mode is coming next. Soon recruiters will compare this athlete against any athlete on the network using Zeus ratings, testing, production, and film analysis.`;

  }

  else {

    answer =
`Zeus understands your question and will soon answer using full AI scouting analysis, film review, statistics, and athlete comparisons.`;

  }

  output.innerHTML = `
    <strong>Zeus AI:</strong><br><br>
    ${answer}
  `;

  if (input) input.value = "";

};

window.shareHighlight = function(id) {

  navigator.clipboard.writeText(location.href);

  alert("🔗 Link copied.");

};

// ==========================================
// GLOBAL CLICK HELPERS
// ==========================================

window.comingSoon = function (feature = "This feature") {
  alert(`${feature} is coming soon in the next Snt.L.Mo. update.`);
};

window.scrollToSection = function (sectionId) {
  const el = document.getElementById(sectionId);
  if (!el) {
    window.comingSoon(sectionId);
    return;
  }

  el.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
};

window.openFirstAthleteProfile = function () {
  const first = window.appState?.athletes?.[0];

  if (!first) {
    window.comingSoon("Athlete profiles");
    return;
  }

  window.setActiveAthlete(first.id, first);
  window.openAthleteFromDirectory(first.id);
};

window.watchFeaturedHighlight = function () {
  const firstWithFilm =
    (window.appState?.athletes || []).find(a =>
      a.highlightUrl ||
      a.highlight ||
      (Array.isArray(a.videos) && a.videos.length)
    );

  if (!firstWithFilm) {
    window.comingSoon("Highlight film");
    return;
  }

  window.scrollToSection("highlights-root");
};

window.openGearVault = function () {
  const modal = document.getElementById("gear-lightbox-modal");

  if (modal) {
    modal.classList.remove("hidden");
    return;
  }

  window.scrollToSection("marketplace-root");
};

// ==========================================
// PLATFORM BUTTON ACTION SYSTEM
// ==========================================

window.platformAction = function (action = "", label = "This feature") {
  switch (action) {
    case "home":
      renderHome();
      window.scrollToSection("home-root");
      break;

    case "feed":
      renderSportsFeed();
      window.scrollToSection("home-root");
      break;

    case "athletes":
      window.scrollToSection("athlete-directory-page");
      break;

    case "schools":
      window.scrollToSection("schools-root");
      break;

    case "rankings":
      window.scrollToSection("rankings-root");
      break;

    case "highlights":
      window.scrollToSection("highlights-root");
      break;

    case "recruiting":
      window.scrollToSection("recruiting-root");
      break;

    case "marketplace":
      window.scrollToSection("marketplace-root");
      break;

    case "zeus":
      window.scrollToSection("zeus-ai-root");
      break;

    case "search":
      window.focusGlobalSearch?.();
      break;

    default:
      window.comingSoon(label);
  }
};

// ==========================================
// RECRUITER WORKFLOW
// ==========================================

window.recruiterWatchlist =
  JSON.parse(localStorage.getItem("sntlmoRecruiterWatchlist") || "[]");

window.saveAthleteToWatchlist = function () {
  const athlete = window.activeAthlete || window.appState?.activeAthlete;

  if (!athlete) {
    window.comingSoon("Save Athlete");
    return;
  }

  const exists = window.recruiterWatchlist.some(a => a.id === athlete.id);

  if (!exists) {
    window.recruiterWatchlist.push({
      id: athlete.id,
      name: athlete.name,
      sport: athlete.sport,
      position: athlete.position || athlete.posion || "ATH",
      school: athlete.school || athlete.schoolName || "School N/A",
      rating: athlete.zeusRating || athlete.total || "N/A"
    });

    localStorage.setItem(
      "sntlmoRecruiterWatchlist",
      JSON.stringify(window.recruiterWatchlist)
    );
  }

  alert(`${athlete.name || "Athlete"} saved to recruiter watchlist.`);
};

window.openContactCoach = function () {
  const athlete = window.activeAthlete || window.appState?.activeAthlete;

  if (!athlete) {
    window.comingSoon("Contact Coach");
    return;
  }

  const coachEmail = athlete.coachEmail || "";

  if (coachEmail) {
    window.location.href = `mailto:${coachEmail}?subject=Recruiting Interest: ${athlete.name || "Athlete"}`;
  } else {
    alert("Coach contact is not available yet for this athlete.");
  }
};

window.openRecruiterNotes = function () {
  const athlete = window.activeAthlete || window.appState?.activeAthlete;

  if (!athlete) {
    window.comingSoon("Recruiter Notes");
    return;
  }

  const modal = document.getElementById("recruiter-notes-modal");

  if (!modal) return;

  modal.classList.remove("hidden");

  window.renderRecruiterNotesBoard();
};

window.saveRecruiterNote2 = function () {
  const athlete = window.activeAthlete || window.appState?.activeAthlete;

  if (!athlete) {
    alert("Select an athlete first.");
    return;
  }

  const board = JSON.parse(localStorage.getItem("sntlmoRecruiterBoard") || "[]");

  board.push({
    athleteId: athlete.id,
    athleteName: athlete.name || "Unknown Athlete",
    sport: athlete.sport || "Sport",
    position: athlete.position || athlete.posion || "ATH",
    school: athlete.school || athlete.schoolName || "School N/A",
    rating: document.getElementById("notes-rating")?.value || "★★★",
    priority: document.getElementById("notes-priority")?.value || "Medium",
    status: document.getElementById("notes-status")?.value || "Not Contacted",
    note: document.getElementById("notes-text")?.value || "",
    createdAt: new Date().toLocaleString()
  });

  localStorage.setItem("sntlmoRecruiterBoard", JSON.stringify(board));

  const noteBox = document.getElementById("notes-text");
  if (noteBox) noteBox.value = "";

  window.renderRecruiterNotesBoard();

  alert("Recruiter note saved.");
};

window.renderRecruiterNotesBoard = function () {
  const results = document.getElementById("recruiter-notes-results");
  const filter = document.getElementById("notes-filter")?.value || "all";

  if (!results) return;

  let board = JSON.parse(localStorage.getItem("sntlmoRecruiterBoard") || "[]");

  if (filter !== "all") {
    board = board.filter(item => item.priority === filter);
  }

  if (!board.length) {
    results.innerHTML = `
      <div class="empty-watchlist">
        <h3>No Recruiter Notes Yet</h3>
        <p>Save notes from athlete profiles to build your scouting board.</p>
      </div>
    `;
    return;
  }

  results.innerHTML = board.map(item => `
    <div class="recruiter-note-card">

      <div>
        <h3>${item.athleteName}</h3>
        <p>${item.position} • ${item.sport} • ${item.school}</p>
        <small>${item.createdAt}</small>
      </div>

      <div class="note-tags">
        <span>${item.rating}</span>
        <span>${item.priority}</span>
        <span>${item.status}</span>
      </div>

      <p class="note-body">${item.note || "No note text added."}</p>

    </div>
  `).join("");
};

window.exportRecruiterBoard = function () {
  const board = JSON.parse(localStorage.getItem("sntlmoRecruiterBoard") || "[]");

  if (!board.length) {
    alert("No recruiter board data to export.");
    return;
  }

  const rows = [
    ["Athlete", "Sport", "Position", "School", "Rating", "Priority", "Status", "Note", "Created"],
    ...board.map(item => [
      item.athleteName,
      item.sport,
      item.position,
      item.school,
      item.rating,
      item.priority,
      item.status,
      item.note,
      item.createdAt
    ])
  ];

  const csv = rows.map(row =>
    row.map(cell => `"${String(cell || "").replace(/"/g, '""')}"`).join(",")
  ).join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "sntlmo-recruiter-board.csv";
  a.click();

  URL.revokeObjectURL(url);
};

// ==========================================
// GLOBAL SEARCH
// ==========================================

window.runGlobalSearch = function (query = "") {
  const box = document.getElementById("global-search-results");
  if (!box) return;

  const q = query.trim().toLowerCase();

  if (!q) {
    box.classList.add("hidden");
    box.innerHTML = "";
    return;
  }

  const athletes = (window.appState?.athletes || [])
    .filter(a => {
      const searchable = `
        ${a.name || ""}
        ${a.school || a.schoolName || a["school name"] || ""}
        ${a.sport || ""}
        ${a.position || a.posion || ""}
        ${a.city || ""}
        ${a.state || ""}
      `.toLowerCase();

      return searchable.includes(q);
    })
    .slice(0, 8);

  if (!athletes.length) {
    box.innerHTML = `
      <div class="global-search-empty">
        No results found for <strong>${query}</strong>.
      </div>
    `;
    box.classList.remove("hidden");
    return;
  }

  box.innerHTML = athletes.map(a => `
    <button
      class="global-search-result"
      onclick="
        window.openAthleteFromDirectory('${a.id}');
        document.getElementById('global-search-results').classList.add('hidden');
        document.getElementById('global-search-input').value='';
      ">

      <span>👤</span>

      <div>
        <strong>${a.name || "Unknown Athlete"}</strong>
        <small>
          ${a.sport || "Sport"} •
          ${a.position || a.posion || "ATH"} •
          ${a.school || a.schoolName || a["school name"] || "School N/A"}
        </small>
      </div>

    </button>
  `).join("");

  box.classList.remove("hidden");
};

window.openGlobalSearchResults = function (query = "") {
  if (!query.trim()) return;
  window.platformAction("athletes");
};

// ==========================================
// ZEUS COMPARE
// ==========================================

window.openZeusCompare = function () {

    const modal = document.getElementById("zeus-compare-modal");
    const select = document.getElementById("zeus-compare-select");

    if (!modal || !select) return;

    select.innerHTML = "";

    (window.appState.athletes || []).forEach(a => {

        if (a.id === window.activeAthlete?.id) return;

        select.innerHTML += `
            <option value="${a.id}">
                ${a.name}
            </option>
        `;

    });

    modal.classList.remove("hidden");

};

window.runZeusComparison = function () {

    const id =
        document.getElementById("zeus-compare-select").value;

    const opponent =
        (window.appState.athletes || [])
            .find(a => a.id === id);

    const current = window.activeAthlete;

    if (!current || !opponent) return;

    const currentRating =
        current.zeusRating ||
        current.total ||
        mergeRosterScores(current);

    const opponentRating =
        opponent.zeusRating ||
        opponent.total ||
        mergeRosterScores(opponent);

    const winner =
        Number(currentRating) >= Number(opponentRating)
            ? current.name
            : opponent.name;

    document.getElementById("zeus-compare-results").innerHTML = `

<div class="zeus-verdict-card">

<h3>⚡ Zeus Verdict</h3>

<p>
<b>${winner}</b> currently projects as the stronger prospect
based on Zeus Rating, production, verified film,
and overall recruiting projection.
</p>

</div>

<table class="zeus-compare-table">

<tr>
<th>Category</th>
<th>${current.name}</th>
<th>${opponent.name}</th>
</tr>

<tr>
<td>Zeus Rating</td>
<td>${currentRating}</td>
<td>${opponentRating}</td>
</tr>

<tr>
<td>Position</td>
<td>${current.position || "ATH"}</td>
<td>${opponent.position || "ATH"}</td>
</tr>

<tr>
<td>School</td>
<td>${current.school || "N/A"}</td>
<td>${opponent.school || "N/A"}</td>
</tr>

<tr>
<td>Sport</td>
<td>${current.sport || "N/A"}</td>
<td>${opponent.sport || "N/A"}</td>
</tr>

</table>

`;

};

window.zeusAnalyze = function(id) {

  const response = document.getElementById("zeus2-response");

  if (!response) return;

  const athlete = window.appState.activeAthlete;

  response.innerHTML = `
    <h3 class="text-zeus-gold text-xl font-bold">
      Zeus Film Analysis
    </h3>

    <p class="mt-3">

      Athlete:
      <strong>${athlete.name}</strong>

    </p>

    <p>

      Speed ★★★★★

    </p>

    <p>

      Technique ★★★★☆

    </p>

    <p>

      Explosiveness ★★★★★

    </p>

    <p>

      College Projection:
      High-Level Prospect

    </p>
  `;
  
   response.innerHTML += renderZeusDashboard(athlete);

};

window.addEventListener("sntlmo:athlete-selected", (e) => {
  const athlete = e.detail;

  console.log("Zeus Active Athlete:", athlete.name);

  const response = document.getElementById("zeus2-response");

  if (response) {
    response.innerHTML = `
<h3 class="text-zeus-gold font-bold text-lg">
${athlete.name}
</h3>

<div>${athlete.position || "ATH"} • ${athlete.school || "Unknown School"}</div>

<div class="mt-2">
⚡ Zeus Rating: ${mergeRosterScores(athlete)}
</div>

<div class="text-gray-400 mt-2">
Ready for film analysis.
</div>
`;  
   
   }
}); 

// ==========================================
// ZEUS SCOUTING CENTER
// ==========================================

function buildZeusScoutingReport(athlete = {}) {
  const scores = Array.isArray(athlete.scores)
    ? athlete.scores
    : [
        athlete.score0 || 0,
        athlete.score1 || 0,
        athlete.score2 || 0,
        athlete.score3 || 0,
        athlete.score4 || 0
      ];

  const total = scores.reduce((sum, v) => sum + (Number(v) || 0), 0);
  const average = scores.length ? Math.round(total / scores.length) : 0;

  const projection =
    average >= 95 ? "★★★★★ National Power Prospect" :
    average >= 90 ? "★★★★ High-Level College Prospect" :
    average >= 85 ? "★★★ Regional College Prospect" :
    average >= 75 ? "Developmental College Prospect" :
    "Emerging Prospect";

  return `
    <div class="zeus-scouting-report">

  <div class="zeus-report-avatar-row">
    <img src="zeus-avatar.png" alt="Zeus Avatar" class="zeus-report-avatar">
    <div>
      <h3>⚡ ZEUS SCOUTING REPORT</h3>
      <p>AI scouting intelligence powered by Zeus.</p>
    </div>
  </div>

      <div class="zeus-scouting-header">
        <strong>${athlete.name || "Unknown Athlete"}</strong>
        <span>${athlete.position || "ATH"} • ${athlete.school || "Unknown School"} • ${athlete.sport || "Sport"}</span>
      </div>

      <div class="zeus-score-grid">
        <div><span>Speed</span><strong>${scores[0] || "--"}</strong></div>
        <div><span>Power</span><strong>${scores[1] || "--"}</strong></div>
        <div><span>IQ</span><strong>${scores[2] || "--"}</strong></div>
        <div><span>Technique</span><strong>${scores[3] || "--"}</strong></div>
        <div><span>Impact</span><strong>${scores[4] || "--"}</strong></div>
      </div>

      <div class="zeus-projection-box">
        <span>Projection</span>
        <strong>${projection}</strong>
      </div>

      <div class="zeus-report-section">
        <h4>Strengths</h4>
        <p>
          ${athlete.name || "This athlete"} shows strong competitive traits,
          verified performance upside, and profile momentum through film,
          rankings, and development tracking.
        </p>
      </div>

      <div class="zeus-report-section">
        <h4>Development Plan</h4>
        <ul>
          <li>Continue building verified highlight film.</li>
          <li>Track measurable stats by season.</li>
          <li>Add coach/recruiter notes to strengthen profile credibility.</li>
          <li>Update offers, achievements, and academic profile.</li>
        </ul>
      </div>

      <div class="zeus-report-section">
        <h4>Recruiting Fit</h4>
        <p>
          Current projection: ${projection}. Zeus recommends continued exposure,
          updated film, verified stats, and recruiter engagement.
        </p>
      </div>
    </div>
  `;
}

// ==========================================
// CLOSE SEARCH WHEN CLICKING AWAY
// ==========================================

document.addEventListener("click", e => {

  const search =
    document.querySelector(".national-search-wrapper");

  const results =
    document.getElementById("global-search-results");

  if (!search || !results) return;

  if (!search.contains(e.target)) {

    results.classList.add("hidden");

  }

});

window.generateZeusScoutingReport = function() {
  const athlete = window.appState?.activeAthlete;

  if (!athlete) {
    alert("Select an athlete first.");
    return;
  }

  const response = document.getElementById("zeus2-response");

  if (response) {
    response.innerHTML = buildZeusScoutingReport(athlete);
    response.innerHTML += renderZeusDashboard(athlete);
  }
};

// ==========================================
// NATIONAL ZEUS AI CENTER
// ==========================================

window.runZeusCenterTool = function (tool = "scout") {
  const output = document.getElementById("zeus-center-output");
  const prompt = document.getElementById("zeus-center-prompt")?.value || "";
  const athlete = window.activeAthlete || window.appState?.activeAthlete || {};

  if (!output) return;

  const name = athlete.name || "Selected Athlete";
  const sport = athlete.sport || "Sport";
  const position = athlete.position || athlete.posion || "ATH";
  const school = athlete.school || athlete.schoolName || "School N/A";
  const rating =
    athlete.zeusRating ||
    athlete.total ||
    mergeRosterScores?.(athlete) ||
    "N/A";

  let title = "⚡ Zeus Scout";
  let body = "";

  if (tool === "scout") {
    title = "🤖 Zeus Scout";
    body = `
      <p><strong>${name}</strong> profiles as a ${position} in ${sport} from ${school}.</p>
      <p>Zeus currently grades this prospect at <strong>${rating}</strong>.</p>
      <p>${prompt || "Zeus recommends continued film updates, verified measurements, coach notes, and active recruiting exposure."}</p>
    `;
  }

  if (tool === "film") {
    title = "🎥 AI Film Breakdown";
    body = `
      <p>Zeus film review focuses on burst, speed, physicality, decision-making, body control, effort, and repeatable impact plays.</p>
      <ul>
        <li>Explosiveness: High upside</li>
        <li>Technique: Developing toward verified elite traits</li>
        <li>Game Impact: Strong profile momentum</li>
        <li>Next Step: Add full-game clips and verified timestamps</li>
      </ul>
    `;
  }

  if (tool === "projection") {
    title = "📊 Recruiting Projection";
    body = `
      <p><strong>${name}</strong> projects as a recruitable prospect with continued exposure.</p>
      <p>Current Zeus tier: <strong>${rating}</strong></p>
      <p>Recommended recruiting path: camps, updated verified film, coach references, academic profile, and target-school outreach.</p>
    `;
  }

  if (tool === "compare") {
    title = "🏆 National Player Comparison";
    body = `
      <p>Use the athlete profile comparison engine to compare Zeus Rating, school, sport, position, film, testing, and recruiting projection.</p>
      <button class="zeus-action-btn" onclick="window.openZeusCompare()">Open Zeus Compare</button>
    `;
  }

  if (tool === "nil") {
    title = "📈 NIL Projection";
    body = `
      <p>NIL outlook is based on profile visibility, highlight engagement, local market strength, school brand, athlete story, and social reach.</p>
      <p>Zeus recommendation: build athlete merch, short-form highlights, verified bio, and sponsor-ready media kit.</p>
    `;
  }

  if (tool === "college") {
    title = "🎓 College Fit Predictor";
    body = `
      <p>Best-fit schools should match position need, region, playing style, academic fit, culture, and development path.</p>
      <p>Starter fit examples: Missouri, Memphis, Illinois, Kansas State, Notre Dame.</p>
    `;
  }

  if (tool === "strengths") {
    title = "🧠 Strengths & Weaknesses";
    body = `
      <p><strong>Strengths:</strong> athletic upside, competitiveness, film potential, impact profile, coachability.</p>
      <p><strong>Development Areas:</strong> verified testing, updated stats, academic profile, full-game film, recruiter notes.</p>
    `;
  }

  if (tool === "pdf") {
    title = "📄 AI Scouting Report PDF";
    body = `
      <p>Preparing printable recruiter report for <strong>${name}</strong>.</p>
      <p>Use the browser print window to save as PDF.</p>
    `;

    setTimeout(() => window.print(), 500);
  }

  output.innerHTML = `
    <h3>${title}</h3>
    ${body}
  `;
};

window.selectAthleteProfileFilm = function(encodedUrl, encodedTitle) {
  const url = decodeURIComponent(encodedUrl || "");
  const title = decodeURIComponent(encodedTitle || "Highlight Film");

  const player = document.getElementById("athlete-featured-player");
  const titleElement = document.getElementById("athlete-featured-film-title");

  if (!player || !url) return;

  let playerHtml = "";

  if (
    url.includes("youtube.com") ||
    url.includes("youtu.be")
  ) {
    let videoId = "";

    if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1]?.split("&")[0] || "";
    } else {
      videoId = url.split("youtu.be/")[1]?.split("?")[0] || "";
    }

    playerHtml = `
      <iframe
        src="https://www.youtube.com/embed/${videoId}"
        title="${title}"
        allowfullscreen>
      </iframe>
    `;
  } else {
    playerHtml = `
      <video
        src="${url}"
        controls
        autoplay
        playsinline>
      </video>
    `;
  }

  player.innerHTML = playerHtml;

  if (titleElement) {
    titleElement.textContent = title;
  }
};

window.filterAthleteFilm = function(category) {
  document
    .querySelectorAll(".athlete-film-category-tabs button")
    .forEach(button => {
      button.classList.toggle(
        "active",
        button.textContent.trim() === category
      );
    });

  document
    .querySelectorAll(".athlete-film-card")
    .forEach(card => {
      const cardCategory =
        card.dataset.filmCategory || "Featured";

      const shouldShow =
        category === "Featured" ||
        cardCategory === category;

      card.style.display = shouldShow
        ? "block"
        : "none";
    });
};

window.shareAthleteProfile = function() {
  navigator.clipboard
    .writeText(window.location.href)
    .then(() => {
      alert("Athlete profile link copied.");
    })
    .catch(() => {
      alert("Unable to copy the profile link.");
    });
};

function normalizeHomeSport(value = "") {
  const cleanedSport = String(value)
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, " ");

  const sportAliases = {
    football: "football",

    "girls flag": "girls flag football",
    "girl flag football": "girls flag football",
    "girls flag football": "girls flag football",
    "flag football": "girls flag football",

    basketball: "basketball",

    baseball: "baseball",

    softball: "softball",

    soccer: "soccer",

    volleyball: "volleyball",

    track: "track and field",
    "track field": "track and field",
    "track and field": "track and field",

    wrestling: "wrestling",

    boxing: "boxing",

    hockey: "hockey",

    swimming: "swimming",
    swim: "swimming",

    golf: "golf",

    lacrosse: "lacrosse",

    cheer: "cheer",
    cheerleading: "cheer",

    dance: "dance",

    "all sports": "all sports",
    all: "all sports"
  };

  return sportAliases[cleanedSport] || cleanedSport;
}

function initializeHomeSportFilters() {
  const tabBar = document.getElementById("home-sports-tabs");

  if (!tabBar) return;

  const buttons = Array.from(
    tabBar.querySelectorAll("[data-sport]")
  );

  const athleteCards = Array.from(
    document.querySelectorAll("[data-athlete-card]")
  );

  const emptyMessage = document.getElementById(
    "home-athlete-filter-empty"
  );

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedSport =
        button.dataset.sport || "All Sports";

      const normalizedSelected =
        normalizeHomeSport(selectedSport);

      let visibleCount = 0;

      buttons.forEach((item) => {
        item.classList.toggle(
          "active",
          item === button
        );
      });

      athleteCards.forEach((card) => {
        const athleteSport =
          normalizeHomeSport(
            card.dataset.athleteSport || ""
          );

        const showCard =
          normalizedSelected === "all sports" ||
          athleteSport === normalizedSelected;

        card.hidden = !showCard;

        if (showCard) {
          visibleCount += 1;
        }
      });

      if (emptyMessage) {
        emptyMessage.classList.toggle(
          "hidden",
          visibleCount > 0
        );
      }
    });
  });
}

window.initializeHomeSportFilters =
  initializeHomeSportFilters;

