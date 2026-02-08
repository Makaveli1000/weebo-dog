// ============================================================================
// ⚡ ZEUS SYSTEM IMPORTS (From src/zeus directory)
// These are now handled within src/app.js where they are actually used.
// ============================================================================
// import { handleTimerTick, resetTimerNarration } from "./zeus/timer.js";
// import { speak } from "./zeus/speech.js";
// At the top of src/index.js
import { getAuth, onAuthStateChanged, ... } from "firebase/auth";

// ... initialization logic ...

export { auth, db, storage, appId, upgradeUser, onAuthStateChanged };

// ============================================================================
// 🔥 FIREBASE INITIALIZATION & EXPORTS
// This file primarily handles Firebase initialization and exposes core services.
// ============================================================================
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut 
} from "firebase/auth";
import {
  getFirestore,
  collection,
  onSnapshot, 
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

// ⚡ These inline exports are sufficient; esbuild will use these.
export const auth = getAuth(app); 
export const db = getFirestore(app); 
export const storage = getStorage(app); 
export const remoteConfig = getRemoteConfig(app);

// Define and export appId
export const appId = '1:735791748207:web:74fd6412684db238b6e99a'; 

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
// 🔐 GLOBAL AUTH FUNCTIONS FOR HTML BUTTONS
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
    await firebaseSignOut(auth); 
    alert("Signed out successfully!");
    if (window.toggleAccountModal) window.toggleAccountModal(false);
  } catch (error) {
    console.error("Logout Error:", error.message);
    alert("Logout failed: " + error.message);
  }
};

// ============================================================================
// 🚀 MAIN APPLICATION ENTRY POINT
// ============================================================================
import './app.js';