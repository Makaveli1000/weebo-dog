// ============================================================================
// ⚡ ZEUS SYSTEM & OLYMPUS GATEWAY
// ============================================================================
// ⚡ WORLD 1: ZEUS SYSTEM (Keep these as they are)
import { narrateFirestoreEvent } from "./zeus/firestoreNarration.js";
import { thunder, lightning } from "./zeus/fx.js";
import { speak } from "./zeus/speech.js";
import { zeusUpsell } from "./zeus/upsell.js";
import { oracleSpeak } from "./zeus/oracle.js";
import { toggleZeusDebug } from "./zeus/debug.js";
import { injectOracleOverlay } from "./zeus/oracleOverlay.js";
import { zeusPredict } from "./zeus/prediction.js";

// ⚡ WORLD 2: OLYMPUS CONNECTIONS
// Removed the duplicate 'onAuthStateChanged' from here
import { auth, db, appId, storage, upgradeUser, signOut } from "./index.js";

// ⚡ WORLD 3: OLYMPUS TOOLS
import { onAuthStateChanged } from "firebase/auth"; 
import { 
  doc, getDoc, collection, addDoc, serverTimestamp, query, where, 
  orderBy, onSnapshot, deleteDoc, limit, updateDoc, increment, getDocs, setDoc 
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
// ⚡ GLOBAL UI GATEWAY

window.toggleLoginModal = (isOpen) => {

  const modal = document.getElementById("login-modal");

  if (!modal) return;

  isOpen ? modal.classList.remove("hidden") : modal.classList.add("hidden");

  zeusLog(isOpen ? "LOGIN_MODAL_OPENED" : "LOGIN_MODAL_CLOSED");

};
// ============================================================================
// ⚡ DIVINE STATE REGISTRY
// ============================================================================
let currentUser = null;
let userIsPro = false;
let currentSportFilter = "All";
let currentSearchQuery = "";
let mortalTimerInterval = null;

// ============================================================================
// ⚡ ZEUS OBSERVATORY — LOGGING SYSTEM
// ============================================================================
const ZEUS_LOG_MAX = 20;
const zeusLogBuffer = [];

function zeusLog(event, detail = {}) {
  const timestamp = new Date().toISOString().split("T")[1].replace("Z", "");
  const entry = { timestamp, event, detail };
  zeusLogBuffer.unshift(entry);
  if (zeusLogBuffer.length > ZEUS_LOG_MAX) zeusLogBuffer.pop();

  const feed = document.getElementById("zeus-log-feed");
  if (feed) {
    feed.innerHTML = zeusLogBuffer.map(e => `
      <div class="text-[10px] text-gray-400 font-mono">
        <span class="text-yellow-500">${e.timestamp}</span> — ${e.event}
      </div>`).join("");
  }
}

// =============================================================================
// ⚡ LEADERBOARD ENGINE
// ============================================================================
function setupPlayersListener() {
  const q = query(
    collection(db, "artifacts", appId, "public", "data", "players"), 
    where("stLouisConnection.isFromSTL", "==", true)
  );

  onSnapshot(q, (snapshot) => {
    const gridBody = document.getElementById("match-grid-body");
    const topAthleteDisplay = document.getElementById("top-athlete-display");
    
    if (!gridBody) return;
    gridBody.innerHTML = ""; 

    let players = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      const name = (data.name || "").toLowerCase();
      const matchesSport = currentSportFilter === "All" || data.sport === currentSportFilter;
      const matchesSearch = name.includes(currentSearchQuery);

      if (!matchesSport || !matchesSearch) return; 

      const total = (Number(data.score0)||0) + (Number(data.score1)||0) + (Number(data.score2)||0) + (Number(data.score3)||0) + (Number(data.score4)||0);
      players.push({ id: doc.id, ...data, total });
    });

    players.sort((a, b) => b.total - a.total);

    if (topAthleteDisplay && players.length > 0) {
      topAthleteDisplay.innerText = `${getSportIcon(players[0].sport)} ${players[0].name} — ${players[0].total} PTS`;
    }

    players.forEach((player, index) => {
      const isAdmin = auth.currentUser?.uid === "cEQQHNVXPQfXFhOzO1xBXWZcGy52";
      const row = document.createElement("tr");
      row.className = "border-b border-gray-800 hover:bg-yellow-500/5 transition-all duration-500 opacity-0 group";
      setTimeout(() => row.classList.remove('opacity-0'), index * 50);

      row.innerHTML = `
        <td class="p-3 font-bold text-white">${index === 0 ? "👑 " : ""}${player.name}</td>
        <td class="p-3 text-center text-gray-400">${player.score0 || 0}</td>
        <td class="p-3 text-center text-gray-400">${player.score1 || 0}</td>
        <td class="p-3 text-center text-gray-400">${player.score2 || 0}</td>
        <td class="p-3 text-center text-gray-400">${player.score3 || 0}</td>
        <td class="p-3 text-center text-gray-400">${player.score4 || 0}</td>
        <td class="p-3 text-center font-black text-yellow-500 bg-yellow-500/10">${player.total}</td>
        <td class="p-3 text-right">
          ${isAdmin ? `<button data-id="${player.id}" class="delete-player-btn text-red-500 text-[10px] font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity">Delete</button>` : ''}
        </td>`;
      gridBody.appendChild(row);
    });
    attachDeletePlayerListeners();
  });
} // <--- This is line 191. It now has a function to close! ============================================================================
// ⚡ EVENT BINDINGS (DOMContentLoaded)
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  // 1. Search Bar
  const searchInput = document.getElementById("athlete-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearchQuery = e.target.value.toLowerCase();
      setupPlayersListener();
    });
  }

  // 2. Sport Filters
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active-filter', 'bg-yellow-500', 'text-black'));
      e.target.classList.add('active-filter', 'bg-yellow-500', 'text-black');
      currentSportFilter = e.target.dataset.sport;
      setupPlayersListener();
    });
  });

  // 3. Deployment Form
  const deployBtn = document.getElementById("deploy-athlete-btn");
  if (deployBtn) {
    deployBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      const name = document.getElementById("player-name").value;
      const sport = document.getElementById("player-sport").value;
      if (!name) return alert("Mortal, the Athlete needs a name!");
      try {
        await addDoc(collection(db, "artifacts", appId, "public", "data", "players"), {
          name, sport,
          score0: parseInt(document.getElementById("score0").value) || 0,
          score1: parseInt(document.getElementById("score1").value) || 0,
          score2: parseInt(document.getElementById("score2").value) || 0,
          score3: parseInt(document.getElementById("score3").value) || 0,
          score4: parseInt(document.getElementById("score4").value) || 0,
          stLouisConnection: { isFromSTL: true },
          timestamp: serverTimestamp()
        });
        document.getElementById("add-athlete-form").reset();
        zeusLog("ATHLETE_DEPLOYED", { name });
      } catch (err) { console.error(err); }
    });
  }

  // 4. Reset Grid
  const resetBtn = document.getElementById("reset-grid-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", async () => {
      if (!confirm("Master, clear the entire roster?")) return;
      const snap = await getDocs(collection(db, "artifacts", appId, "public", "data", "players"));
      await Promise.all(snap.docs.map(d => deleteDoc(d.ref)));
      zeusLog("GRID_RESET");
    });
  }

  // 5. Chat Input
  const chatBtn = document.getElementById("send-chat-message-btn");
  const chatInput = document.getElementById("chat-message-input");
  if (chatBtn && chatInput) {
    chatBtn.addEventListener("click", async () => {
      const text = chatInput.value.trim();
      if (!text) return;
      await addDoc(collection(db, "artifacts", appId, "public", "data", "messages"), {
        userId: auth.currentUser.uid,
        content: text,
        timestamp: serverTimestamp(),
        author: auth.currentUser.email.split('@')[0]
      });
      chatInput.value = "";
    });
    chatInput.addEventListener("keydown", (e) => { if (e.key === "Enter") chatBtn.click(); });
  }

  // 6. Media and Calls
  document.getElementById('start-call-btn')?.addEventListener('click', startCall);
  document.getElementById('hang-up-btn')?.addEventListener('click', hangUpCall);
  document.getElementById("upload-media-btn")?.addEventListener("click", uploadPersonalMedia);
});

// ============================================================================
// ⚡ HELPERS & MEDIA
// ============================================================================
function getSportIcon(sport) {
  const icons = { "Football": "🏈", "Baseball": "⚾", "Hockey": "🏒", "Basketball": "🏀", "Track & Field": "👟", "Boys Soccer": "⚽♂️", "Girls Soccer": "⚽♀️" };
  return icons[sport] || "🏆";
}

function startMortalTimer() {
  if (mortalTimerInterval) return;
  let timeLeft = 600;
  const timerElement = document.getElementById("zeus-timer");
  document.getElementById("mortal-timer-container")?.classList.remove("hidden");
  mortalTimerInterval = setInterval(() => {
    timeLeft--;
    const mins = Math.floor(timeLeft / 60);
    const secs = (timeLeft % 60).toString().padStart(2, "0");
    if (timerElement) timerElement.innerText = `${mins}:${secs}`;
    if (timeLeft <= 0) {
      clearInterval(mortalTimerInterval);
      document.getElementById("main-content")?.classList.add("hidden");
      document.getElementById("paywall-content")?.classList.remove("hidden");
    }
  }, 1000);
}

function setupChatListener() {
  const chatContainer = document.getElementById("chat-messages");
  if (!chatContainer) return;
  const q = query(collection(db, "artifacts", appId, "public", "data", "messages"), orderBy("timestamp", "asc"), limit(50));
  onSnapshot(q, (snapshot) => {
    chatContainer.innerHTML = "";
    snapshot.forEach(doc => {
      const msg = doc.data();
      const time = msg.timestamp ? msg.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "";
      const div = document.createElement("div");
      div.className = "p-2 mb-2 bg-gray-800/50 rounded border-l-2 border-yellow-500";
      div.innerHTML = `<div class="flex justify-between text-[9px] text-yellow-500 font-bold uppercase"><span>${msg.author}</span><span>${time}</span></div><div class="text-sm text-gray-200">${msg.content}</div>`;
      chatContainer.appendChild(div);
    });
    chatContainer.scrollTop = chatContainer.scrollHeight;
  });
}

function attachDeletePlayerListeners() {
  document.querySelectorAll('.delete-player-btn').forEach(btn => {
    btn.onclick = async (e) => {
      if (confirm("Master, are you sure?")) {
        await deleteDoc(doc(db, "artifacts", appId, "public", "data", "players", e.target.dataset.id));
        zeusLog("ATHLETE_REMOVED");
      }
    };
  });
}

function attachDeleteListeners() {
  document.querySelectorAll('.delete-media-btn').forEach(button => {
    button.onclick = async (e) => {
      const docId = e.currentTarget.dataset.docId;
      const storagePath = e.currentTarget.dataset.storagePath;
      if (docId && storagePath) await deletePersonalMedia(docId, storagePath);
    };
  });
}

async function uploadPersonalMedia() {
  const fileInput = document.getElementById("media-file-input");
  if (!auth.currentUser || !fileInput.files[0]) return;
  const file = fileInput.files[0];
  const filePath = `users/${auth.currentUser.uid}/media/${file.name}`;
  const uploadTask = uploadBytesResumable(ref(storage, filePath), file);

  uploadTask.on('state_changed', 
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      const bar = document.querySelector("#upload-progress div");
      if (bar) bar.style.width = `${progress}%`;
    }, 
    null, 
    async () => {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      await addDoc(collection(db, `users/${auth.currentUser.uid}/personalMedia`), {
        userId: auth.currentUser.uid, downloadURL, storagePath: filePath, timestamp: serverTimestamp(), cheers: 0
      });
    }
  );
}

// Stubs
async function deletePersonalMedia(docId, storagePath) {
  await deleteObject(ref(storage, storagePath));
  await deleteDoc(doc(db, `users/${auth.currentUser.uid}/personalMedia`, docId));
}
async function startCall() { zeusLog("CALL_START"); }
async function hangUpCall() { zeusLog("CALL_HANGUP"); }
async function listenForIncomingCalls() { zeusLog("LISTENING_FOR_CALLS"); } function setupMediaListener() {
  console.log("⚡ MEDIA_WATCH_ACTIVE");
  // This is a placeholder so the code doesn't crash
} // ============================================================================
// ⚡ OLYMPUS AUTHENTICATION LOGIC
// ============================================================================

// 1. Watch for Auth Changes (The UI Switcher)
onAuthStateChanged(auth, async (user) => {
  zeusLog("AUTH_STATE_CHANGED", { uid: user?.uid || null });
  currentUser = user;

  const loader = document.getElementById("loading-overlay");
  const main = document.getElementById("main-content");
  const paywall = document.getElementById("paywall-content");
  const userStatusText = document.getElementById('user-status');
  const headerAuthBtn = document.getElementById('header-auth-btn');

  // Hide loader immediately
  if (loader) loader.classList.add("hidden");

  if (!user) {
    // ☁️ MORTAL MODE
    main?.classList.add("hidden");
    paywall?.classList.remove("hidden");
    if (userStatusText) userStatusText.innerText = "Status: Mortal Vision";
    if (headerAuthBtn) headerAuthBtn.innerText = "LOGIN";
    if (mortalTimerInterval) clearInterval(mortalTimerInterval);
    return;
  }

  // ⚡ TITAN MODE (LOGGED IN)
  main?.classList.remove("hidden");
  paywall?.classList.add("hidden");
  if (userStatusText) userStatusText.innerText = "Status: Titan Access";
  if (headerAuthBtn) headerAuthBtn.innerText = "LOGOUT";

  // Check for Pro status
  const userDocRef = doc(db, `artifacts/${appId}/users/${user.uid}/profile`, "info");
  const docSnap = await getDoc(userDocRef);
  userIsPro = docSnap.exists() && (docSnap.data().isPro || docSnap.data().isPremium);

  if (userIsPro) {
    document.querySelector("header")?.classList.add("ascend-pulse");
  } else {
    startMortalTimer();
  }

  // Activate Zeus Systems
  thunder();
  speak("Welcome to the Grid.");
  setupPlayersListener(); 
  setupChatListener();
  setupMediaListener();
});

// 2. Handle the Login Form Submission
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // STOP page refresh
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            // We use the auth tool from our imports
            const { signInWithEmailAndPassword } = await import("firebase/auth");
            await signInWithEmailAndPassword(auth, email, password);
            
            // Close modal manually on success
            window.toggleLoginModal(false);
            zeusLog("LOGIN_SUCCESS", { email });
        } catch (error) {
            console.error("Ascension Error:", error);
            zeusLog("AUTH_FAILED", { error: error.message });
            alert("Ascension Denied: " + error.message);
        }
    });
} 