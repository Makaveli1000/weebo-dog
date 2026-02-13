import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signOut as firebaseSignOut, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider 
} from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// 1. OLYMPUS INITIALIZATION
// If you are using Netlify variables, use this. 
// If you have a local config, replace 'window.NETLIFY_FIREBASE_CONFIG' with your { apiKey: ... } object.
const firebaseConfig = window.NETLIFY_FIREBASE_CONFIG || {
    /* YOUR LOCAL CONFIG KEYS HERE IF NOT ON NETLIFY */
};

const app = initializeApp(firebaseConfig);

// 2. SERVICE EXPORTS
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const appId = "sntlmoexclusivesportsgrid";

// 3. AUTH EXPORTS (Sharing tools with app.js)
export { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  firebaseSignOut as signOut 
};

// 4. ASCENSION LOGIC
export async function upgradeUser() {
  if (!auth.currentUser) throw new Error("Mortal, you must be logged in to ascend!");
  const userDocRef = doc(db, `artifacts/${appId}/users/${auth.currentUser.uid}/profile`, "info");
  try {
    await setDoc(userDocRef, { isPro: true, upgradedAt: serverTimestamp() }, { merge: true });
    return true;
  } catch (error) {
    console.error("Ascension failed:", error);
    throw error;
  }
}