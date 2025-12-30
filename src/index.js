// src/index.js - Firebase Initialization and Service Exports
console.log("Hello from Firebase app! Initializing Firebase services...");

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getRemoteConfig, fetchAndActivate } from "firebase/remote-config";
import { getFunctions } from "firebase/functions"; // Added this

const netlifyFirebaseConfig = window.NETLIFY_FIREBASE_CONFIG;
const netlifyGeminiKey = window.GEMINI_API_KEY;

// Validate configuration
if (!netlifyFirebaseConfig || !netlifyFirebaseConfig.apiKey || !netlifyFirebaseConfig.projectId) {
  console.error("FATAL ERROR: Firebase configuration not found in window.NETLIFY_FIREBASE_CONFIG.");
  throw new Error("Missing Firebase config in src/index.js");
}

const app = initializeApp(netlifyFirebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const remoteConfig = getRemoteConfig(app);
const functions = getFunctions(app); // Initialize Functions

remoteConfig.defaultConfig = {
    free_access_duration_minutes: "10",
    zeus_narration_start_minutes: "2",
    zeus_upgrade_message_1: "Psst! Your no-cost access is almost up!",
    zeus_upgrade_message_2: "Don't miss out on PRO features!"
};

fetchAndActivate(remoteConfig).then(() => {
    console.log("[RC] Remote Config activated.");
}).catch((err) => {
    console.error("[RC] Remote Config error:", err);
});

// Sync appId with the config object to ensure it matches the backend
export const appId = netlifyFirebaseConfig.appId; 
export const GEMINI_API_KEY = netlifyGeminiKey;

export {
  auth,
  db,
  storage,
  remoteConfig,
  functions,
  serverTimestamp
};