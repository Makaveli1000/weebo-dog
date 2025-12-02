// src/index.js - Firebase Initialization and Service Exports

console.log("Hello from Firebase app! Initializing Firebase services...");

// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getRemoteConfig, fetchAndActivate, getValue } from "firebase/remote-config";

const firebaseConfig = {
  apiKey: "AIzaSyDbt0ITM9G4LOZTlXuAGGvuO80uazFpZSs",
  authDomain: "sntlmoexclusivesportsgrid.firebaseapp.com",
  projectId: "sntlmoexclusivesportsgrid",
  storageBucket: "sntlmoexclusivesportsgrid.appspot.com",
  messagingSenderId: "735791748207",
  appId: "1:735791748207:web:74fd6412684db238b6e99a", // This is your Firebase Web App ID
  measurementId: "G-509374407"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const remoteConfig = getRemoteConfig(app);

remoteConfig.defaultConfig = {
    free_access_duration_minutes: "10",
    zeus_narration_start_minutes: "2",
    zeus_upgrade_message_1: "Psst! Your no-cost access is almost up! Upgrade now for unlimited play.",
    zeus_upgrade_message_2: "Don't miss out on PRO features: exclusive insights, advanced stats, and more!"
};

// ✨ CRITICAL FIX CONFIRMED: This line exports the actual `firebaseConfig.appId` value
// under the name `appId` in a syntactically correct way for ES modules.
export const appId = firebaseConfig.appId;

// Export the initialized services and the now-correctly-declared appId
export {
  auth,
  db,
  storage,
  remoteConfig,
  serverTimestamp
};
