// ============================================================================
// ⚡ OLYMPUS ENGINE (FIREBASE INITIALIZATION)
// ============================================================================
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut 
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  collection, 
  serverTimestamp 
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

// 1. Initialize using Netlify/Window Config
const netlifyFirebaseConfig = window.NETLIFY_FIREBASE_CONFIG;
const app = initializeApp(netlifyFirebaseConfig);

// 2. Export Service Constants (Single Source of Truth)
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const appId = "sntlmoexclusivesportsgrid"; // Cleaned up the extra string error here

// 3. Export Auth Observer & SignOut
export { onAuthStateChanged, firebaseSignOut };

// 4. ASCENSION LOGIC (The Upgrade Function)
export async function upgradeUser() {
  if (!auth.currentUser) throw new Error("Mortal, you must be logged in to ascend.");
  
  try {
    const userRef = doc(db, `artifacts/${appId}/users/${auth.currentUser.uid}/profile`, "info");
    await setDoc(userRef, { 
      isPro: true, 
      isPremium: true,
      ascensionDate: serverTimestamp() 
    }, { merge: true });
    
    alert("Congratulations! You have ascended to PRO Status.");
    return true;
  } catch (error) {
    console.error("Ascension Error:", error);
    throw error;
  }
}

// ============================================================================
// 🔐 GLOBAL AUTH GATEWAY (For HTML Buttons)
// ============================================================================

// GOOGLE SIGN-IN (Recommended)
window.logInGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
    if (window.toggleLoginModal) window.toggleLoginModal(false);
  } catch (error) {
    alert("Google Sign-In Failed: " + error.message);
  }
};

// EMAIL/PASSWORD SIGN-IN (Your original form logic)
window.logIn = async () => {
  const email = document.getElementById("login-email")?.value;
  const password = document.getElementById("login-password")?.value;
  const btn = document.getElementById("login-submit-btn");

  if (!email || !password) return alert("Credentials required, Mortal.");

  if (btn) { btn.disabled = true; btn.innerText = "AUTHENTICATING..."; }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    if (window.toggleLoginModal) window.toggleLoginModal(false);
  } catch (error) {
    alert("Login Error: " + error.message);
  } finally {
    if (btn) { btn.disabled = false; btn.innerText = "SIGN IN"; }
  }
};

window.logOut = async () => {
  try {
    await firebaseSignOut(auth);
    if (window.toggleAccountModal) window.toggleAccountModal(false);
  } catch (error) {
    console.error("Logout Error:", error);
  }
};

// ============================================================================
// 🚀 BOOT APP LOGIC
// ============================================================================
import './app.js';