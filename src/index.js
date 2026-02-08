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
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut // Rename signOut to avoid conflict with window.logOut
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
export const appId = '1:735791748207:web:74fd6412684db238b6e99a'; // Your Firebase Web App ID

// Define and export upgradeUser function
export async function upgradeUser() {
  if (!auth.currentUser) {
    throw new Error("User must be logged in to upgrade.");
  }
  try {
    const userProfileRef = doc(db, `artifacts/${appId}/users/${auth.currentUser.uid}/profile/info`);
    await updateDoc(userProfileRef, {
      isPro: true,
      isPremium: true // Also update isPremium as used in your checks
    });
    alert("Congratulations! You are now a PRO Member.");
  } catch (error) {
    console.error("Error upgrading user:", error);
    throw new Error("Failed to upgrade to PRO: " + error.message);
  }
}

// ============================================================================
// 🔐 GLOBAL AUTH FUNCTIONS FOR HTML BUTTONS
// These are exposed to the window object to be called directly from HTML onclick.
// ============================================================================
window.logIn = async () => {
  const emailInput = document.getElementById("login-email");
  const passwordInput = document.getElementById("login-password");
  const loginSubmitBtn = document.getElementById("login-submit-btn");

  if (!emailInput || !passwordInput || !loginSubmitBtn) {
    console.error("Login form elements not found.");
    alert("Login form is not available.");
    return;
  }

  const email = emailInput.value;
  const password = passwordInput.value;

  loginSubmitBtn.disabled = true;
  loginSubmitBtn.innerText = "AUTHENTICATING...";

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Signed in successfully!");
    // Close modal if successful
    if (window.toggleLoginModal) window.toggleLoginModal(false);
  } catch (error) {
    console.error("Login Error:", error.message);
    alert("Login failed: " + error.message);
  } finally {
    loginSubmitBtn.disabled = false;
    loginSubmitBtn.innerText = "SIGN IN";
  }
};

window.logOut = async () => {
  try {
    await firebaseSignOut(auth); // Use the aliased signOut
    alert("Signed out successfully!");
    // Close account modal if open
    if (window.toggleAccountModal) window.toggleAccountModal(false);
  } catch (error) {
    console.error("Logout Error:", error.message);
    alert("Logout failed: " + error.message);
  }
};


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
// ============================================================================
// All core Firebase services and global functions needed by app.js or directly by HTML
// are now explicitly exported or assigned to window.
export { auth, db, storage, appId, upgradeUser };

// ============================================================================
// 🚀 MAIN APPLICATION ENTRY POINT
// Import all main application logic from app.js
// ============================================================================
import './app.js'; // <--- CRITICAL ADDITION: Import your main app logic
