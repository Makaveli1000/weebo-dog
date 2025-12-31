// src/app.js - Final Master Logic with Zeus Narration
import { 
    auth, db, storage, appId, upgradeUser 
} from './index.js'; 

import { 
    onAuthStateChanged, signInWithEmailAndPassword, signOut
} from 'firebase/auth';

import { 
    doc, getDoc 
} from 'firebase/firestore';

let currentUser = null;
let currentUserID = null;
let userIsPro = false;
let mortalTimerInterval = null; 

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

// --- Zeus Narration Logic ---

function triggerZeusNarration(isPro) {
    window.speechSynthesis.cancel(); 

    const mortalScript = `Mortal, you stand at the threshold of greatness, yet you walk in shadow. You have entered the gates of Olympus, and for ten fleeting minutes, the grid shall reveal its secrets to you. Beyond those clouds lie the Divine Analytics, tools forged in the fires of the Titans to predict the tides of the arena with terrifying precision. Deep within the Locker of the Gods, your own legends can be stored, archived for eternity in high-definition glory. You currently see only the surface; but the PRO athlete sees the heartbeat of the game. The clock of destiny is ticking. What is your move?`;

    const proScript = `Behold! The clouds part for a true Champion. You have gained the Sight of the All-Father—our Live Grid, tracking every movement in the arena in real-time. Your Vault of Eternity, the Locker, is now open to store your legends forever. And the Oracle’s Whisper, our Analytics, will now predict the tides of battle for you. Olympus is yours.`;

    const msg = new SpeechSynthesisUtterance(isPro ? proScript : mortalScript);
    const voices = window.speechSynthesis.getVoices();
    
    msg.voice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Male')) || voices[0];
    msg.pitch = 0.5; 
    msg.rate = 0.85; 

    window.speechSynthesis.speak(msg);
}

function startMortalTimer() {
    if (mortalTimerInterval) clearInterval(mortalTimerInterval);
    
    let timeLeft = 600; 
    const timerElement = document.getElementById('zeus-timer');
    const timerContainer = document.getElementById('mortal-timer-container');

    if (timerContainer) timerContainer.classList.remove('hidden');

    mortalTimerInterval = setInterval(() => {
        timeLeft--;
        if (timerElement) {
            const mins = Math.floor(timeLeft / 60);
            const secs = (timeLeft % 60).toString().padStart(2, '0');
            timerElement.innerText = `${mins}:${secs}`;
        }

        if (timeLeft <= 0) {
            clearInterval(mortalTimerInterval);
            mainContent.classList.add('hidden');
            paywallContent.classList.remove('hidden');
            window.speechSynthesis.speak(new SpeechSynthesisUtterance("Your time has vanished, Mortal. Return to the shadows or ascend to PRO."));
        }
    }, 1000);
}

// --- Core UI Functions ---

function hideLoadingOverlayAndShowContent() {
    if (loadingOverlay) loadingOverlay.classList.add('hidden');
    
    if (currentUser) {
        mainContent.classList.remove('hidden');
        paywallContent.classList.add('hidden');
    } else {
        mainContent.classList.add('hidden');
        paywallContent.classList.remove('hidden');
    }
}

setTimeout(() => {
    if (loadingOverlay && !loadingOverlay.classList.contains('hidden')) {
        hideLoadingOverlayAndShowContent();
    }
}, 5000);

// --- Window-Scoped Functions ---

window.toggleLoginModal = (show) => {
    if (loginModal) {
        show ? loginModal.classList.remove('hidden') : loginModal.classList.add('hidden');
    }
};

window.toggleAccountModal = (show) => {
    if (accountModal) {
        show ? accountModal.classList.remove('hidden') : accountModal.classList.add('hidden');
    }
};

window.logIn = async () => {
    const emailField = document.getElementById('login-email');
    const passwordField = document.getElementById('login-password');
    
    if (!emailField || !passwordField) return;

    try {
        await signInWithEmailAndPassword(auth, emailField.value, passwordField.value);
        window.toggleLoginModal(false);
    } catch (error) {
        alert("Login failed: " + error.message);
    }
};

window.logOut = async () => {
    window.speechSynthesis.cancel();
    if (mortalTimerInterval) clearInterval(mortalTimerInterval);
    await signOut(auth);
    window.location.reload();
};

// --- Auth Listener ---

onAuthStateChanged(auth, async (user) => {
    currentUser = user;
    currentUserID = user ? user.uid : null;

    if (user) {
        if (headerAuthBtn) headerAuthBtn.classList.add('hidden');
        if (accountBtn) accountBtn.classList.remove('hidden');

        try {
            const userDocRef = doc(db, `artifacts/${appId}/users/${user.uid}/profile`, "info");
            const docSnap = await getDoc(userDocRef);
            
            if (docSnap.exists()) {
                const userData = docSnap.data();
                userIsPro = userData.isPremium || userData.isPro || false;
                if (accountPremiumStatus) {
                    accountPremiumStatus.textContent = userIsPro ? 'PRO Member' : 'Standard User';
                }
            }

            triggerZeusNarration(userIsPro);
            
            if (!userIsPro) {
                startMortalTimer();
            }

        } catch (e) {
            console.error("Error fetching user profile:", e);
        }
    } else {
        if (headerAuthBtn) headerAuthBtn.classList.remove('hidden');
        if (accountBtn) accountBtn.classList.add('hidden');
        window.speechSynthesis.cancel();
    }

    hideLoadingOverlayAndShowContent();
});

// --- Button & Form Listeners ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Handle Login Form (Enter Key Support)
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Stop page refresh
            const submitBtn = document.getElementById('login-submit-btn');
            
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerText = "AUTHENTICATING...";
            }

            await window.logIn();

            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerText = "SIGN IN";
            }
        });
    }

    // 2. Handle Upgrade Button
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