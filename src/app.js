// src/app.js - Final Master Logic
import { 
    auth, db, storage, appId, upgradeUser 
} from './index.js'; 

import { 
    onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut
} from 'firebase/auth';

import { 
    doc, getDoc, setDoc, onSnapshot, collection, addDoc, serverTimestamp, query, orderBy, limit 
} from 'firebase/firestore';

import { 
    ref as storageRef, uploadBytes, getDownloadURL 
} from 'firebase/storage';

const geminiApiKey = window.GEMINI_API_KEY;
let currentUser = null;
let currentUserID = null;
let userIsPro = false;

console.log("✅ App.js linked to initialized Firebase services.");

// --- UI Element References ---
const loadingOverlay = document.getElementById('loading-overlay');
const mainContent = document.getElementById('main-content');
const paywallContent = document.getElementById('paywall-content');
const loginModal = document.getElementById('login-modal');
const accountModal = document.getElementById('account-modal');
const headerAuthBtn = document.getElementById('header-auth-btn');
const accountBtn = document.getElementById('account-btn');
const accountPremiumStatus = document.getElementById('account-premium-status');
const lockerMediaDisplay = document.getElementById('locker-media-display');

// --- 5. Core Functions ---

function hideLoadingOverlayAndShowContent() {
    console.log("Attempting to hide loading overlay...");
    if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
        console.log("Loading overlay hidden.");
    }
    
    if (currentUser) {
        mainContent.classList.remove('hidden');
        paywallContent.classList.add('hidden');
    } else {
        mainContent.classList.add('hidden');
        paywallContent.classList.remove('hidden');
    }
}

// Safety fallback: If Firebase takes too long, hide the overlay anyway
setTimeout(() => {
    if (loadingOverlay && !loadingOverlay.classList.contains('hidden')) {
        console.warn("Firebase took too long. Forcing overlay hide.");
        hideLoadingOverlayAndShowContent();
    }
}, 5000);

window.toggleLoginModal = (show) => {
    if (loginModal) show ? loginModal.classList.remove('hidden') : loginModal.classList.add('hidden');
};

window.toggleAccountModal = (show) => {
    if (accountModal) show ? accountModal.classList.remove('hidden') : accountModal.classList.add('hidden');
};

window.logIn = async () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    try {
        await signInWithEmailAndPassword(auth, email, password);
        window.toggleLoginModal(false);
    } catch (error) {
        alert("Login failed: " + error.message);
    }
};

window.logOut = async () => {
    await signOut(auth);
    window.location.reload();
};

// --- 6. Auth Listener ---

onAuthStateChanged(auth, async (user) => {
    console.log("Auth State Changed. User:", user ? user.uid : "Logged Out");
    currentUser = user;
    currentUserID = user ? user.uid : null;

    if (user) {
        headerAuthBtn.classList.add('hidden');
        accountBtn.classList.remove('hidden');

        try {
            const userDocRef = doc(db, `artifacts/${appId}/users/${user.uid}/profile`, "info");
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists()) {
                userIsPro = docSnap.data().isPremium || false;
                if (accountPremiumStatus) {
                    accountPremiumStatus.textContent = userIsPro ? 'PRO Member' : 'Standard User';
                }
            }
        } catch (e) {
            console.error("Error fetching user profile:", e);
        }
    } else {
        headerAuthBtn.classList.remove('hidden');
        accountBtn.classList.add('hidden');
    }

    // Always hide the loading screen once we know the auth status
    hideLoadingOverlayAndShowContent();
});

// --- 7. DOM Content Loaded ---

document.addEventListener('DOMContentLoaded', () => {
    const upgradeBtn = document.getElementById('btn-upgrade-pro');
    if (upgradeBtn) {
        upgradeBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            upgradeBtn.disabled = true;
            upgradeBtn.innerText = "Upgrading...";
            try {
                await upgradeUser(); 
            } catch (err) {
                upgradeBtn.disabled = false;
                upgradeBtn.innerText = "Upgrade to PRO";
                alert("Upgrade error: " + err.message);
            }
        });
    }
});