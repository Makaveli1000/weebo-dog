// src/index.js - Firebase Initialization and Service Exports

console.log("Hello from Firebase app! Initializing Firebase services...");

// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getRemoteConfig, fetchAndActivate, getValue } from "firebase/remote-config";

// 🔥 CRITICAL FIX: Read Firebase configuration from the window object
// that is populated by env-config.js, NOT hardcoded values.
const netlifyFirebaseConfig = window.NETLIFY_FIREBASE_CONFIG;
const netlifyAppId = window.__app_id;
const netlifyGeminiKey = window.GEMINI_API_KEY; // If GEMINI_API_KEY is also used here

// Validate that configuration is available before initializing
if (!netlifyFirebaseConfig || !netlifyFirebaseConfig.apiKey || !netlifyFirebaseConfig.projectId) {
  console.error("FATAL ERROR: Firebase configuration not found or is invalid from window.NETLIFY_FIREBASE_CONFIG. Cannot initialize Firebase in src/index.js.");
  // Handle gracefully, maybe prevent further execution or show a user-friendly error.
  throw new Error("Missing Firebase config in src/index.js"); // Stop the app from crashing later
}

const app = initializeApp(netlifyFirebaseConfig);
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

// Ensure fetchAndActivate is called, as before
fetchAndActivate(remoteConfig).then(() => {
    console.log("[RC] Remote Config fetched and activated in src/index.js.");
}).catch((err) => {
    console.error("[RC] Error fetching and activating Remote Config in src/index.js:", err);
});


// Export the initialized services and the now-correctly-declared appId
// Assuming appId is needed for other modules.
export const appId = netlifyAppId; // Use the appId from the window object
export const GEMINI_API_KEY = netlifyGeminiKey; // If Gemini key is needed here

export {
  auth,
  db,
  storage,
  remoteConfig,
  serverTimestamp
};
