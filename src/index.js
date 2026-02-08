// ============================================================================
// ⚡ ZEUS SYSTEM IMPORTS (From src/zeus directory)
// These are now handled within src/app.js where they are actually used.
// ============================================================================
// import { handleTimerTick, resetTimerNarration } from "./zeus/timer.js";
// import { speak } from "./zeus/speech.js";


// ============================================================================
// 🔥 FIREBASE INITIALIZATION & EXPORTS
// This file primarily handles Firebase initialization and exposes core services.
// ============================================================================
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged, // Keep this here for the initial auth listener
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import {
  getFirestore,
  collection,
  onSnapshot, // Keep this for any initial global listener like admin panel setup
  query,
  orderBy,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getRemoteConfig } from "firebase/remote-config";

// Firebase config from env-config.js (loaded in index.html)
const netlifyFirebaseConfig = window.NETLIFY_FIREBASE_CONFIG;
const app = initializeApp(netlifyFirebaseConfig);
export const auth = getAuth(app); // Export directly here
export const db = getFirestore(app); // Export directly here
export const storage = getStorage(app); // Export directly here
export const remoteConfig = getRemoteConfig(app);

// Define and export appId
export const appId = '1:735791148207:web:74fd6412684db238b6e99a'; // Your Firebase Web App ID

// Define and export upgradeUser function
export async function upgradeUser() {
  if (!auth.currentUser) {
    throw new Error("User must be logged in to upgrade.");
  }
  try {
    const userProfileRef = doc(db, `artifacts/${appId}/users/${auth.currentUser.uid}/profile/info`);
    await updateDoc(userProfileRef, {
      isPro: true,
      isPremium: true
    });
    alert("Congratulations! You are now a PRO Member.");
  } catch (error) {
    console.error("Error upgrading user:", error);
    throw new Error("Failed to upgrade to PRO: " + error.message);
  }
}

// ============================================================================
// ⚡ ZEUS BOOT CONFIRMATION (Removed from here, now in app.js where speak is used)
// ============================================================================
// window.addEventListener("DOMContentLoaded", () => {
//   speak("Zeus is awake.");
// });

// ============================================================================
// 🔐 AUTH RECEIVER (HTML → FIREBASE) (Removed from here, now in app.js)
// ============================================================================
// document.addEventListener("trigger-auth", async (event) => { /* ... */ });

// ============================================================================
// 📊 GRID SYNC LOGIC (Removed from here, now in app.js)
// ============================================================================
// const gridBody = document.getElementById("match-grid-body");
// const syncGrid = () => { /* ... */ };

// ============================================================================
// 🛠 ADMIN DEPLOY ENGINE (Removed from here, now in app.js)
// ============================================================================
// const athleteForm = document.getElementById("add-athlete-form");
// if (athleteForm) { /* ... */ }

// ============================================================================
// 👁 AUTH OBSERVER (Removed from here, now in app.js)
// ============================================================================
// onAuthStateChanged(auth, (user) => { /* ... */ });


// ============================================================================
// 📦 EXPORTS
// This file exports the core Firebase services and global app variables.
// All other application logic is imported from app.js.
// ============================================================================
// Removed the aggregate export statement as 'export' is used inline for clarity
// export { auth, db, storage, appId, upgradeUser }; // This was causing the duplicate export error

// ============================================================================
// 🚀 MAIN APPLICATION ENTRY POINT
// Import all main application logic from app.js
// ============================================================================
import './app.js'; // <--- CRITICAL ADDITION: Import your main app logic
