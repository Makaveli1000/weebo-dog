// app.module.js - SNTLMO SportsGrid Main Application Logic

// Firebase SDK imports
import { initializeApp } from "firebase/app";
// ... (rest of your Firebase imports) ...

// --- CONFIGURATION AND GLOBALS (Read from window injected by env-config.js) ---
// CRITICAL FIX: Ensure these are ONLY read from the window object set by env-config.js
const appId = window.__app_id; // No more '|| default-app-id', it must come from env-config.js
console.log("appId (from window.__app_id):", appId); // DEBUG LOG

const rawFirebaseConfig = window.NETLIFY_FIREBASE_CONFIG; // This is the single source of truth
console.log("rawFirebaseConfig (from window):", rawFirebaseConfig); // DEBUG LOG

let firebaseConfig = null;
if (rawFirebaseConfig) {
    // CRITICAL FIX: Assuming env-config.js directly creates an object,
    // so no JSON.parse needed here if it's always an object.
    // However, keeping the JSON.parse check is safer if the script output might vary.
    if (typeof rawFirebaseConfig === 'string') {
        try {
            firebaseConfig = JSON.parse(rawFirebaseConfig);
        } catch (e) {
            console.error("Error parsing Firebase config string:", e);
        }
    } else {
        firebaseConfig = rawFirebaseConfig; // Use directly if it's already an object
    }
}
// CRITICAL FIX: Gemini API Key also comes from window
const GEMINI_API_KEY = window.GEMINI_API_KEY;

console.log("Parsed firebaseConfig:", firebaseConfig); // DEBUG LOG

// ... (rest of your app.module.js code) ...

// --- CORE FIREBASE/GLOBAL SETUP (Updated with Error Visibility) ---
let app = null;
let db = null;
let auth = null;
let storage = null;
let remoteConfig = null;
window.currentUserId = null;
window.isLoggedIn = false;
window.isPremium = false;
window.nickname = 'Guest';
window.lockerMediaCount = 0;
window.dbRef = {};

const errorDisplay = document.getElementById('firebase-init-error-display');
const errorText = document.getElementById('firebase-init-error-text');

// 🔥 CRITICAL FIX: Validate that essential configuration fields have non-empty values.
// If config is missing, this should now be a clear error path.
const isValidConfig = firebaseConfig &&
                        firebaseConfig.apiKey && firebaseConfig.apiKey.length > 5 &&
                        firebaseConfig.projectId && firebaseConfig.projectId.length > 0;

console.log("isValidConfig result:", isValidConfig); // DEBUG LOG

if (isValidConfig) {
    try {
        // ... (rest of your Firebase initialization logic) ...
        app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        auth = getAuth(app);
        storage = getStorage(app);
        remoteConfig = getRemoteConfig(app);
        // ... (Remote Config defaults and fetch/activate logic) ...
        window.serverTimestamp = serverTimestamp;
    } catch (e) {
        // ... (Error handling) ...
    }
} else {
    // ... (Error handling for missing config) ...
}

// ... (rest of app.module.js) ...

// --- TTS API IMPLEMENTATION ---
function checkTtsStatus() {
    const btn = document.getElementById('tts-button');
    const statusDiv = document.getElementById('tts-status');

    if (!btn || !statusDiv) {
        console.warn("TTS button or status display not found.");
        return;
    }

    // CRITICAL FIX: Check if GEMINI_API_KEY is available
    if (!GEMINI_API_KEY) {
        btn.disabled = true;
        btn.innerText = 'API Key Missing!';
        statusDiv.classList.remove('text-gray-500');
        statusDiv.classList.add('text-red-500', 'font-bold');
        statusDiv.textContent = 'Status: FATAL - GEMINI_API_KEY not found';
    } else {
        btn.disabled = false;
        btn.innerText = 'Announce Now!';
        statusDiv.classList.remove('text-red-500', 'font-bold');
        statusDiv.classList.add('text-green-600');
        statusDiv.textContent = 'Status: READY';
    }
}
async function generateAndSpeak(speechText) {
    console.log("TTS function called with:", speechText);
    if (!GEMINI_API_KEY) {
        alert("TTS Error: Gemini API Key is missing.");
        return;
    }
    if (speechText) alert(`[TTS SIMULATED]: ${speechText}`);
}
// ... (rest of app.module.js) ...
