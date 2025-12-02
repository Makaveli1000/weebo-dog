// app.module.js - SNTLMO SportsGrid Main Application Logic

// Firebase SDK imports - CORRECTED TO USE NPM MODULES
import { initializeApp } from "firebase/app";
// ... (rest of your Firebase imports) ...

// --- CONFIGURATION AND GLOBALS (Read from window injected by env-config.js) ---
const appId = window.__app_id || 'default-app-id'; // This line is correct and uses the Firebase Web App ID
console.log("appId (from window.__app_id):", appId); // DEBUG LOG

// 🔥 CRITICAL FIX: Type check and fallback pattern to prevent JSON.parse() errors.
// Assumes env-config.js now primarily uses window.NETLIFY_FIREBASE_CONFIG
const rawFirebaseConfig = window.NETLIFY_FIREBASE_CONFIG; // No longer needs `|| window.__firebase_config` fallback, it's defined
console.log("rawFirebaseConfig (from window):", rawFirebaseConfig); // DEBUG LOG

let firebaseConfig = null;
if (rawFirebaseConfig) {
    if (typeof rawFirebaseConfig === 'string') {
        // If it's a string (standard output from our shell script), parse it.
        try {
            firebaseConfig = JSON.parse(rawFirebaseConfig); // This should now work if the script passed a string
        } catch (e) {
            console.error("Error parsing Firebase config string:", e);
            // On parse failure, config remains null.
        }
    } else {
        // If it's already an object (e.g., from local env-config.js), use it directly.
        firebaseConfig = rawFirebaseConfig; // This path should be taken if script directly assigned an object
    }
}
console.log("Parsed firebaseConfig:", firebaseConfig); // DEBUG LOG

// ... (rest of your app.module.js code) ...
