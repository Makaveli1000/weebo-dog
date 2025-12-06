// app.module.js (or your main application JavaScript file before bundling)

// =======================================================================
// --- ADD ALL IMPORTS HERE AT THE VERY TOP OF THE FILE ---
// =======================================================================
import { initializeApp } from 'firebase/app';
// IMPORTANT: Import 'getFirestore' and 'serverTimestamp' from 'firebase/firestore'
// I've aliased 'serverTimestamp' as 'firestoreServerTimestamp' to avoid any potential naming conflicts
// with a local variable you might have intended named 'serverTimestamp' previously.
import { getFirestore, serverTimestamp as firestoreServerTimestamp } from 'firebase/firestore';
// Import signInWithEmailAndPassword and onAuthStateChanged for authentication
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'; // Added signInWithEmailAndPassword and onAuthStateChanged
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

// --- Declare Firebase service instances at a higher scope for accessibility ---
let I; // Firebase App instance
let Qt; // Firestore instance
let en; // Auth instance
let tn; // Storage instance
let nn; // Remote Config instance
// Removed 'let serverTimestamp;' as it will now be imported and used directly.

// --- DOM Elements for Error Display ---
const Ln = document.getElementById("firebase-init-error-display");
const kn = document.getElementById("firebase-init-error-text");

// --- Firebase Configuration Validation ---
// 'Be' checks if essential Firebase config properties exist and are valid
const Be = h && h.apiKey && h.apiKey.length > 5 && h.projectId && h.projectId.length > 0;
console.log("isValidConfig result (Be):", Be);


// --- Firebase Initialization Block ---
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
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    // It's also good practice to get the email and password inputs here
    const loginEmailInput = document.getElementById('login-email');
    const loginPasswordInput = document.getElementById('login-password');
    const loginErrorDisplay = document.getElementById('login-error'); // Assuming you want to display errors here

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => { // Use async for Firebase calls
            event.preventDefault(); // IMPORTANT: This stops the page from reloading!
            console.log("Login form submitted via JavaScript, default browser action prevented.");

            // Clear previous errors
            if (loginErrorDisplay) {
                loginErrorDisplay.textContent = '';
            }

            const email = loginEmailInput.value;
            const password = loginPasswordInput.value;

            // Basic validation (you might have more robust validation elsewhere)
            if (!email || !password) {
                if (loginErrorDisplay) {
                    loginErrorDisplay.textContent = 'Please enter both email and password.';
                }
                return;
            }

            // Your Firebase Authentication login logic
            try {
                // Use the 'en' instance (Firebase Auth) directly with signInWithEmailAndPassword
                const userCredential = await signInWithEmailAndPassword(en, email, password);
                const user = userCredential.user;
                console.log("User logged in:", user.uid);
                // Handle successful login: Close modal, update UI, redirect, etc.
                const loginModal = document.getElementById('login-modal');
                if (loginModal) loginModal.classList.add('hidden'); // Hide the modal
                // Update header status, main content visibility, etc.
                window.isLoggedIn = true; // Update global state
                window.currentUserId = user.uid; // Update global state
                // Potentially trigger a UI update function if you have one
                // updateUIForAuthState(user);
            } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error("Login failed:", errorCode, errorMessage);
                if (loginErrorDisplay) {
                    loginErrorDisplay.textContent = `Login failed: ${errorMessage}`;
                }
            }
        });
    }

    // You might still have a click listener for the 'header-auth-btn'
    // that simply *opens* the login modal, but the actual login action
    // would be handled by the form's submit listener.
    const headerAuthBtn = document.getElementById('header-auth-btn');
    if (headerAuthBtn) {
        headerAuthBtn.addEventListener('click', () => {
            const loginModal = document.getElementById('login-modal');
            if (loginModal) loginModal.classList.remove('hidden'); // Show the modal
            // Ensure email/password fields are clear when opening the modal
            if (loginEmailInput) loginEmailInput.value = '';
            if (loginPasswordInput) loginPasswordInput.value = '';
            if (loginErrorDisplay) loginErrorDisplay.textContent = ''; // Clear previous errors
        });
    }

    // And a click listener for the register button (since it's type="button")
    const registerAuthBtn = document.getElementById('register-auth-btn');
    if (registerAuthBtn) {
        registerAuthBtn.addEventListener('click', () => {
            // Your Firebase Registration logic here, e.g.,
            // Maybe you open a different registration modal or handle it directly
            console.log("Register button clicked. Initiating registration process.");
            // You could potentially create a createUserWithEmailAndPassword flow here
            // or show a dedicated registration modal.
        });
    }

    // Your existing close button listener
    const closeLoginModalBtn = document.getElementById('close-login-modal-btn');
    if (closeLoginModalBtn) {
        closeLoginModalBtn.addEventListener('click', () => {
            const loginModal = document.getElementById('login-modal');
            if (loginModal) loginModal.classList.add('hidden');
            // Clear any error messages when closing
            if (loginErrorDisplay) {
                loginErrorDisplay.textContent = '';
            }
            // Clear input fields for next time
            if (loginEmailInput) loginEmailInput.value = '';
            if (loginPasswordInput) loginPasswordInput.value = '';
        });
    }

    // ... any other event listeners or application logic that needs to run after DOM is ready
});
