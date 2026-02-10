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

// 1. OLYMPUS INITIALIZATION
// This uses the config provided by your Netlify/Window environment
const netlifyFirebaseConfig = window.NETLIFY_FIREBASE_CONFIG;
const app = initializeApp(netlifyFirebaseConfig);

// 2. SERVICE CONSTANTS (The "Connections")
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

// 4. ASCENSION LOGIC (The single, fixed Upgrade Function)
export async function upgradeUser() {
  if (!auth.currentUser) throw new Error("Mortal, you must be logged in to ascend.");

  // This points to the user's profile in your Firestore database
  const userDocRef = doc(db, `artifacts/${appId}/users/${auth.currentUser.uid}/profile`, "info");

  try {
    await setDoc(userDocRef, { 
      isPro: true, 
      upgradedAt: serverTimestamp() 
    }, { merge: true });

    console.log("⚡ ASCENSION COMPLETE: User is now PRO.");
    return true;
  } catch (error) {
    console.error("Ascension failed:", error);
    throw error;
  }
}