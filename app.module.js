// app.module.js (or your main application JavaScript file before bundling)

// =======================================================================
// --- ADD ALL IMPORTS HERE AT THE VERY TOP OF THE FILE ---
// =======================================================================
import { initializeApp } from 'firebase/app';
// IMPORTANT: Import 'getFirestore' and 'serverTimestamp' from 'firebase/firestore'
// I've aliased 'serverTimestamp' as 'firestoreServerTimestamp' to avoid any potential naming conflicts
// with a local variable you might have intended named 'serverTimestamp' previously.
import { getFirestore, serverTimestamp as firestoreServerTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getRemoteConfig } from 'firebase/remote-config';

// =======================================================================
// --- START: DEBUGGING CONSOLE LOGS INTEGRATED INTO YOUR APP LOGIC ---
// =======================================================================

// --- General App Flow Logging ---
console.log("APP START: app.module.js is running.");

// --- Firebase Configuration Loading (from window.NETLIFY_FIREBASE_CONFIG and window.GEMINI_API_KEY) ---
// These variables (D, h, Rn, Xt) are inferred from your bundle.js structure
const Xt = window.__app_id; // Your app ID from env-config.js
const D = window.NETLIFY_FIREBASE_CONFIG; // Your Firebase config object from env-config.js
let h = null; // Variable to hold the parsed Firebase config
const Rn = window.GEMINI_API_KEY; // Your Gemini API Key from env-config.js

console.log("appId (from window.__app_id):", Xt);
console.log("rawFirebaseConfig (from window):", D);

// Attempt to parse the Firebase config if it's a string
if (D) {
    if (typeof D === "string") {
        try {
            h = JSON.parse(D);
            console.log("Firebase config string successfully parsed.");
        } catch (t) {
            console.error("Error parsing Firebase config string:", t);
            // This error would be caught by the outer try-catch for Firebase init
        }
    } else {
        h = D; // Config is already an object
    }
}
console.log("Parsed firebaseConfig (h):", h);
console.log("Gemini API Key (Rn):", Rn);

// --- Global Window Variable Assignments (from your bundle.js structure) ---
window.currentUserId = null;
window.isLoggedIn = false;
window.isPremium = false;
window.nickname = "Guest";
window.lockerMediaCount = 0;
window.dbRef = {}; // This is probably a placeholder for your Firestore reference

// --- DOM Elements for Error Display ---
const Ln = document.getElementById("firebase-init-error-display");
const kn = document.getElementById("firebase-init-error-text");

// --- Firebase Configuration Validation ---
// 'Be' checks if essential Firebase config properties exist and are valid
const Be = h && h.apiKey && h.apiKey.length > 5 && h.projectId && h.projectId.length > 0;
console.log("isValidConfig result (Be):", Be);


// --- Firebase Initialization Block ---
let I, Qt, en, tn, nn; // Variables for Firebase App and service instances
// Removed 'let serverTimestamp;' as it will now be imported and used directly.

if (Be) {
    console.log("Firebase config is valid. Attempting to initialize Firebase app and services...");
    try {
        // Initialize Firebase App
        I = initializeApp(h); // This is correct, assuming 'h' holds your Firebase config
        console.log("Firebase app initialized successfully (I).");

        // Initialize Firebase Services
        Qt = getFirestore(I); // Firestore is initialized here!
        console.log("Firestore initialized (Qt).");
        
        // =======================================================================
        // --- THIS IS WHERE YOU SHOULD PLACE THE window.serverTimestamp ASSIGNMENT ---
        // It must be *after* getFirestore(I) has been called.
        // =======================================================================
        window.serverTimestamp = firestoreServerTimestamp; // Assign the *imported serverTimestamp function itself*
        console.log("window.serverTimestamp assigned.");
        // =======================================================================

        en = getAuth(I);
        console.log("Auth initialized (en).");
        tn = getStorage(I);
        console.log("Storage initialized (tn).");
        nn = getRemoteConfig(I);
        console.log("Remote Config initialized (nn).");

        console.log("All Firebase services appear to be initialized.");

        // --- LOADING OVERLAY MANAGEMENT ---
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            console.log("Attempting to hide loading overlay...");
            loadingOverlay.classList.add('hidden'); // Assuming this is your method
            console.log("Loading overlay hide attempt completed.");
        } else {
            console.warn("Loading overlay element with ID 'loading-overlay' not found. Cannot hide it.");
        }
        // --- END LOADING OVERLAY MANAGEMENT ---

        // --- Optional: Debugging Firebase Auth State Changes ---
        // This is a very common place for an app to "start" displaying content.
        // If your app displays content based on user login status, ensure you log inside this.
        /*
        // Assuming 'onAuthStateChanged' is imported/available
        onAuthStateChanged(en, (user) => {
            console.log("Auth state changed:", user ? user.uid : "Logged out");
            // If your main content is revealed here, add a log
            // const mainContent = document.getElementById('main-content');
            // if (mainContent && user) { // Example: only show main content if logged in
            //    mainContent.classList.remove('hidden');
            //    console.log("Main content displayed after auth state change.");
            // }
            // If there's any other loading indicator that gets hidden here, log it too.
        });
        */

    } catch (t) {
        console.error("Firebase initialization failed with error:", t);
        if (kn && Ln) {
            kn.textContent = t.message;
            Ln.classList.remove('hidden'); // Show the Firebase init error message
        }
        console.log("Displayed Firebase initialization error message.");

        // IMPORTANT: If Firebase init fails, ensure the loading overlay is still hidden
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            console.log("Hiding loading overlay after Firebase init error.");
            loadingOverlay.classList.add('hidden');
        }
    }
} else {
    // --- Invalid Firebase Config Error Handling ---
    console.error("Invalid Firebase configuration. Displaying error message.");
    if (kn && Ln) {
        kn.textContent = "Invalid Firebase configuration. Please check your environment variables.";
        Ln.classList.remove('hidden'); // Show config validation error message
    }
    // IMPORTANT: If config is invalid, ensure the loading overlay is hidden
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        console.log("Hiding loading overlay due to invalid Firebase config.");
        loadingOverlay.classList.add('hidden');
    }
}

console.log("APP END: app.module.js execution finished.");

// =======================================================================
// --- END: DEBUGGING CONSOLE LOGS INTEGRATED INTO YOUR APP LOGIC ---
// =======================================================================


// --- The rest of your app.module.js logic (event listeners, functions, etc.) would follow here ---
// ... (your existing application logic) ...
