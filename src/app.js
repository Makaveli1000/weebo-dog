// src/app.js - Final Merged Logic (Zeus + UI + Emergency Fixes)
import { 
    auth, db, appId, upgradeUser 
} from './index.js'; 

import { 
    onAuthStateChanged, signInWithEmailAndPassword, signOut
} from 'firebase/auth';

import { 
    doc, getDoc 
} from 'firebase/firestore';

// --- 1. EMERGENCY LOADER KILL SWITCH ---
// If Firebase hangs, this forces the site to show after 4 seconds
setTimeout(() => {
    const loader = document.getElementById('loading-overlay');
    if (loader && !loader.classList.contains('hidden')) {
        console.warn("⚠️ Loader hung. Forcing entry.");
        loader.classList.add('hidden');
        document.getElementById('paywall-content')?.classList.remove('hidden');
        document.getElementById('header-auth-btn')?.classList.remove('hidden');
    }
}, 4000);

let currentUser = null;
let userIsPro = false;
let mortalTimerInterval = null; 

// --- 2. ZEUS NARRATION & TIMER LOGIC ---

function triggerZeusNarration(isPro) {
    window.speechSynthesis.cancel(); 
    const mortalScript = `Mortal, you stand at the threshold of greatness. You have ten fleeting minutes. The clock of destiny is ticking. What is your move?`;
    const proScript = `Behold! The clouds part for a true Champion. Olympus is yours.`;

    const msg = new SpeechSynthesisUtterance(isPro ? proScript : mortalScript);
    const voices = window.speechSynthesis.getVoices();
    msg.voice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Male')) || voices[0];
    msg.pitch = 0.5; 
    msg.rate = 0.85; 
    window.speechSynthesis.speak(msg);
}

function startMortalTimer() {
    if (mortalTimerInterval) clearInterval(mortalTimerInterval);
    let timeLeft = 600; // 10 Minutes
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
            document.getElementById('main-content')?.classList.add('hidden');
            document.getElementById('paywall-content')?.classList.remove('hidden');
            window.speechSynthesis.speak(new SpeechSynthesisUtterance("Your time has vanished, Mortal."));
        }
    }, 1000);
}

// --- 3. AUTH STATE LOGIC ---

onAuthStateChanged(auth, async (user) => {
    currentUser = user;
    const loader = document.getElementById('loading-overlay');
    const main = document.getElementById('main-content');
    const paywall = document.getElementById('paywall-content');
    const loginBtn = document.getElementById('header-auth-btn');
    const accountBtn = document.getElementById('account-btn');
    const premiumStatus = document.getElementById('account-premium-status');

    loader?.classList.add('hidden');

    if (user) {
        loginBtn?.classList.add('hidden');
        accountBtn?.classList.remove('hidden');
        
        // Fetch PRO Status from Firestore
        try {
            const userDocRef = doc(db, `artifacts/${appId}/users/${user.uid}/profile`, "info");
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists()) {
                const userData = docSnap.data();
                userIsPro = userData.isPremium || userData.isPro || false;
                if (premiumStatus) premiumStatus.textContent = userIsPro ? 'PRO Member' : 'Mortal';
            }
            
            triggerZeusNarration(userIsPro);
            if (!userIsPro) startMortalTimer();
            
            main?.classList.remove('hidden');
            paywall?.classList.add('hidden');
        } catch (e) {
            console.error("Profile Fetch Error:", e);
        }
    } else {
        loginBtn?.classList.remove('hidden');
        accountBtn?.classList.add('hidden');
        main?.classList.add('hidden');
        paywall?.classList.remove('hidden');
        window.speechSynthesis.cancel();
    }
});

// --- 4. GLOBAL WINDOW FUNCTIONS ---

window.toggleLoginModal = (show) => {
    const modal = document.getElementById('login-modal');
    show ? modal?.classList.remove('hidden') : modal?.classList.add('hidden');
};

window.toggleAccountModal = (show) => {
    const modal = document.getElementById('account-modal');
    show ? modal?.classList.remove('hidden') : modal?.classList.add('hidden');
};

window.logIn = async () => {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-password').value;
    const submitBtn = document.getElementById('login-submit-btn');

    try {
        if (submitBtn) { submitBtn.disabled = true; submitBtn.innerText = "VERIFYING..."; }
        await signInWithEmailAndPassword(auth, email, pass);
        window.toggleLoginModal(false);
    } catch (e) { 
        alert("Login Error: " + e.message); 
    } finally {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.innerText = "SIGN IN"; }
    }
};

window.logOut = async () => {
    window.speechSynthesis.cancel();
    if (mortalTimerInterval) clearInterval(mortalTimerInterval);
    await signOut(auth);
    window.location.reload();
};

// --- 5. EVENT LISTENERS ---

document.addEventListener('DOMContentLoaded', () => {
    // Form Listener for Enter Key
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            window.logIn();
        });
    }

    // Upgrade Button Listener
    const upgradeBtn = document.getElementById('btn-upgrade-pro');
    if (upgradeBtn) {
        upgradeBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            upgradeBtn.disabled = true;
            upgradeBtn.innerText = "ASCENDING...";
            try {
                await upgradeUser(); 
            } catch (err) {
                upgradeBtn.disabled = false;
                upgradeBtn.innerText = "UPGRADE TO PRO";
                alert(err.message);
            }
        });
    }
});