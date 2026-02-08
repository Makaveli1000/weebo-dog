// ============================================================================
// ⚡ ZEUS SYSTEM IMPORTS
// ============================================================================
import { handleTimerTick, resetTimerNarration } from "./zeus/timer.js";
import { speak } from "./zeus/speech.js";

// ============================================================================
// 🔥 FIREBASE INITIALIZATION
// ============================================================================
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  serverTimestamp
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getRemoteConfig } from "firebase/remote-config";

// Firebase config from Netlify
const netlifyFirebaseConfig = window.NETLIFY_FIREBASE_CONFIG;
const app = initializeApp(netlifyFirebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const remoteConfig = getRemoteConfig(app);

// ============================================================================
// ⚡ ZEUS BOOT CONFIRMATION
// ============================================================================
window.addEventListener("DOMContentLoaded", () => {
  speak("Zeus is awake.");
});

// ============================================================================
// 🔐 AUTH RECEIVER (HTML → FIREBASE)
// ============================================================================
document.addEventListener("trigger-auth", async (event) => {
  const { email, pass, isSignUp } = event.detail;

  try {
    let userCredential;

    if (isSignUp) {
      userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      speak("A new mortal is forged.");
    } else {
      userCredential = await signInWithEmailAndPassword(auth, email, pass);
      speak("A mortal ascends. The grid awakens.");
    }

    document.dispatchEvent(new CustomEvent("firebase-auth-ready", {
      detail: { user: userCredential.user }
    }));

  } catch (error) {
    console.error("Auth Error:", error.message);
    speak("The gates remain closed.");

    document.dispatchEvent(new CustomEvent("auth-error", {
      detail: { message: error.message }
    }));

    alert("Ascension Failed: " + error.message);
  }
});

// ============================================================================
// 📊 GRID SYNC LOGIC
// ============================================================================
const gridBody = document.getElementById("match-grid-body");

const syncGrid = () => {
  const q = query(collection(db, "athletes"), orderBy("score0", "desc"));

  onSnapshot(q, (snapshot) => {
    if (!gridBody) return;

    gridBody.innerHTML = "";
    snapshot.forEach(doc => {
      const athlete = doc.data();
      const row = document.createElement("tr");
      row.className = "hover:bg-yellow-500/5 border-b border-gray-800";

      row.innerHTML = `
        <td class="p-3 text-yellow-500 font-bold">${athlete.name}</td>
        <td class="p-3 text-center font-mono">${athlete.score0}</td>
        <td class="p-3 text-center text-gray-400">${athlete.score1}</td>
        <td class="p-3 text-center text-gray-400">${athlete.score2}</td>
        <td class="p-3 text-center text-gray-400">${athlete.score3}</td>
        <td class="p-3 text-center text-gray-400">${athlete.score4}</td>
      `;

      gridBody.appendChild(row);
    });

    speak("The grid has been refreshed.", { interrupt: false });
  });
};

// ============================================================================
// 🛠 ADMIN DEPLOY ENGINE
// ============================================================================
const athleteForm = document.getElementById("add-athlete-form");

if (athleteForm) {
  athleteForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(athleteForm);

    try {
      await addDoc(collection(db, "athletes"), {
        name: formData.get("name"),
        score0: Number(formData.get("score0")),
        score1: Number(formData.get("score1")),
        score2: Number(formData.get("score2")),
        score3: Number(formData.get("score3")),
        score4: Number(formData.get("score4")),
        timestamp: serverTimestamp()
      });

      athleteForm.reset();
      speak("Titan deployed successfully.");

    } catch (error) {
      console.error("Deploy failed:", error);
      speak("Deployment failed.");
      alert("Error: " + error.message);
    }
  });
}

// ============================================================================
// 👁 AUTH OBSERVER
// ============================================================================
onAuthStateChanged(auth, (user) => {
  const mainContent = document.getElementById("main-content");
  const paywall = document.getElementById("paywall-content");
  const adminPanel = document.getElementById("admin-panel");
  const statusText = document.getElementById("user-status");

  if (user) {
    mainContent?.classList.remove("hidden");
    paywall?.classList.add("hidden");

    if (user.uid === "cEQQHNVXPQfXFhOzO1xBXWZcGy52") {
      adminPanel?.classList.remove("hidden");
      if (statusText) {
        statusText.innerText = "Status: Titan Vision (Admin)";
        statusText.className =
          "text-[9px] uppercase tracking-widest text-yellow-500 font-bold";
      }
      speak("Titan Vision granted.");
    } else {
      if (statusText) statusText.innerText = "Status: Pro Vision";
      speak("Pro Vision granted.");
    }

    syncGrid();
  }
});

// ============================================================================
// 📦 EXPORTS
// ============================================================================
export { auth, db, storage };
