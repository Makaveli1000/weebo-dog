// ============================================================================
// ⚡ OLYMPUS PROTOCOL: EMERGENCY LOADER FAILSAFE
// ============================================================================
setTimeout(() => {
    const loader = document.getElementById('loading-overlay');
    if (loader && !loader.classList.contains('hidden')) {
        console.warn("⚠️ Firebase/Script hang detected. Forcing entry.");
        loader.style.opacity = '0';
        setTimeout(() => loader.classList.add('hidden'), 500);

        document.getElementById('paywall-content')?.classList.remove('hidden');
        document.getElementById('header-auth-btn')?.classList.remove('hidden');
    }
}, 4000);


// ============================================================================
// ⚡ ZEUS BOOT SEQUENCE — CINEMATIC STARTUP
// ============================================================================
function runZeusBootSequence() {
    const boot = document.getElementById('zeus-boot');
    if (!boot) return;

    const l1 = document.getElementById('boot-line-1');
    const l2 = document.getElementById('boot-line-2');
    const l3 = document.getElementById('boot-line-3');

    // Line 1
    setTimeout(() => {
        l1.classList.add('boot-fade-in');
        zeusLog('BOOT_SEQUENCE_STEP', { step: 'OLYMPUS_SYSTEMS' });
    }, 300);

    // Line 2
    setTimeout(() => {
        l2.classList.add('boot-fade-in');
        zeusLog('BOOT_SEQUENCE_STEP', { step: 'SUMMONING_ORACLE' });
    }, 1100);

    // Line 3
    setTimeout(() => {
        l3.classList.add('boot-fade-in');
        zeusLog('BOOT_SEQUENCE_STEP', { step: 'ACCESS_GRANTED' });
    }, 1900);

    // Lightning flash
    setTimeout(() => {
        boot.classList.add('boot-flash');
        zeusLog('BOOT_SEQUENCE_LIGHTNING');
    }, 2600);

    // Fade out
    setTimeout(() => {
        boot.style.opacity = '0';
        boot.style.pointerEvents = 'none';
    }, 3000);

    // Remove from DOM
    setTimeout(() => {
        boot.remove();
        zeusLog('BOOT_SEQUENCE_COMPLETE');
    }, 3800);
}

document.addEventListener('DOMContentLoaded', runZeusBootSequence);


// ============================================================================
// ⚡ OLYMPUS IMPORT GATEWAY
// ============================================================================
import { auth, db, appId, upgradeUser } from './index.js';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';


// ============================================================================
// ⚡ DIVINE STATE REGISTRY
// ============================================================================
let currentUser = null;
let userIsPro = false;
let mortalTimerInterval = null;


// ============================================================================
// ⚡ ZEUS OBSERVATORY — LOGGING SYSTEM
// ============================================================================
const ZEUS_LOG_MAX = 20;
const zeusLogBuffer = [];

function zeusLog(event, detail = {}) {
    const timestamp = new Date().toISOString().split('T')[1].replace('Z', '');
    const entry = { timestamp, event, detail };

    zeusLogBuffer.unshift(entry);
    if (zeusLogBuffer.length > ZEUS_LOG_MAX) zeusLogBuffer.pop();

    console.log(
        `%c⚡ ZEUS LOG [%c${timestamp}%c] %c${event}`,
        'color:#eab308;font-weight:bold;',
        'color:#38bdf8;',
        'color:#eab308;',
        'color:#fff;font-weight:bold;',
        detail
    );

    const feed = document.getElementById('zeus-log-feed');
    if (feed) {
        feed.innerHTML = zeusLogBuffer
            .map(e => `<div class="text-[10px] text-gray-400 font-mono">
                <span class="text-yellow-500">${e.timestamp}</span> — ${e.event}
            </div>`)
            .join('');
    }
}


// ============================================================================
// ⚡ ASCENSION RITUAL — PRO-ONLY ANIMATION
// ============================================================================
function runAscensionAnimation() {
    const header = document.querySelector('header');
    const status = document.getElementById('user-status');
    const accountCard = document.querySelector('#account-modal .bg-gray-900');

    [header, status, accountCard].forEach(el => {
        if (!el) return;
        el.classList.add('ascend-pulse');
        setTimeout(() => el.classList.remove('ascend-pulse'), 1300);
    });

    zeusLog('ASCENSION_ANIMATION_TRIGGERED');
}


// ============================================================================
// ⚡ ZEUS ORACLE ENGINE — NARRATION + MORTAL TIMER
// ============================================================================
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

// ============================================================================
// ⚡ VOICE ENGINE READINESS FAILSAFE
// ============================================================================
window.speechSynthesis.onvoiceschanged = () => {
    if (currentUser !== null) {
        triggerZeusNarration(userIsPro);
        zeusLog('VOICE_ENGINE_READY');
    }
};

function startMortalTimer() {
    if (mortalTimerInterval) return; // ✅ Double-start guard

    zeusLog('MORTAL_TIMER_STARTED');

    let timeLeft = 600;
    const timerElement = document.getElementById('zeus-timer');
    const timerContainer = document.getElementById('mortal-timer-container');

    timerContainer?.classList.remove('hidden');

    mortalTimerInterval = setInterval(() => {
        timeLeft--;

        if (timerElement) {
            const mins = Math.floor(timeLeft / 60);
            const secs = (timeLeft % 60).toString().padStart(2, '0');
            timerElement.innerText = `${mins}:${secs}`;
        }

        if (timeLeft <= 0) {
            zeusLog('MORTAL_TIMER_EXPIRED');

            clearInterval(mortalTimerInterval);
            mortalTimerInterval = null; // ✅ allow re-start after expiry if needed
            document.getElementById('main-content')?.classList.add('hidden');
            document.getElementById('paywall-content')?.classList.remove('hidden');
            window.speechSynthesis.speak(new SpeechSynthesisUtterance("Your time has vanished, Mortal."));
        }
    }, 1000);
}


// ============================================================================
// ⚡ ASCENSION WATCHTOWER — AUTH STATE HANDLER
// ============================================================================
onAuthStateChanged(auth, async (user) => {
    zeusLog('AUTH_STATE_CHANGED', { uid: user?.uid || null });

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

        document.getElementById('account-email').textContent = user.email;

        try {
            const userDocRef = doc(db, `artifacts/${appId}/users/${user.uid}/profile`, "info");
            const docSnap = await getDoc(userDocRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                const wasPro = userIsPro;

                userIsPro = userData.isPremium || userData.isPro || false;

                zeusLog('USER_PROFILE_LOADED', { isPro: userIsPro });

                document.getElementById('user-status').textContent =
                    userIsPro ? "Status: PRO Vision" : "Status: Mortal Vision";

                if (premiumStatus) premiumStatus.textContent = userIsPro ? 'PRO Member' : 'Mortal';

                document.getElementById('btn-upgrade-pro')?.classList.toggle('hidden', userIsPro);

                if (userIsPro) {
                    document.getElementById('mortal-timer-container')?.classList.add('hidden');
                }

                if (!wasPro && userIsPro) {
                    runAscensionAnimation();
                    zeusLog('USER_ASCENDED_TO_PRO', { uid: user.uid });

                    const header = document.querySelector('header');
                    const oracle = document.getElementById('zeus-oracle');

                    [header, oracle].forEach(el => {
                        if (!el) return;
                        el.classList.add('lightning-strike');
                        setTimeout(() => el.classList.remove('lightning-strike'), 600);
                    });
                }
            }

            triggerZeusNarration(userIsPro);
            if (!userIsPro) startMortalTimer();

            main?.classList.remove('hidden');
            paywall?.classList.add('hidden');

        } catch (e) {
            console.error("Profile Fetch Error:", e);

            // ✅ Fail closed, not frozen
            zeusLog('PROFILE_FETCH_FAILED', { error: e.message });

            userIsPro = false;
            triggerZeusNarration(false);
            startMortalTimer();

            main?.classList.remove('hidden');
            paywall?.classList.add('hidden');
        }

    } else {
        loginBtn?.classList.remove('hidden');
        accountBtn?.classList.add('hidden');
        main?.classList.add('hidden');
        paywall?.classList.remove('hidden');
        window.speechSynthesis.cancel();

        if (mortalTimerInterval) clearInterval(mortalTimerInterval);
        mortalTimerInterval = null; // ✅ keep timer state clean on logout
    }
});


// ============================================================================
// ⚡ MORTAL INTERFACE CONTROLS — MODALS + AUTH ACTIONS
// ============================================================================
// LOGIN MODAL
function toggleLoginModal(show) {
    const modal = document.getElementById('login-modal');
    if (!modal) return;

    if (show) {
        modal.classList.remove('hidden');
    } else {
        modal.classList.add('hidden');
    }
}
window.toggleLoginModal = toggleLoginModal;


// ACCOUNT MODAL
function toggleAccountModal(show) {
    const modal = document.getElementById('account-modal');
    if (!modal) return;

    if (show) {
        modal.classList.remove('hidden');
    } else {
        modal.classList.add('hidden');
    }
}
window.toggleAccountModal = toggleAccountModal;


// LOGIN
async function logIn() {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-password').value;
    const submitBtn = document.getElementById('login-submit-btn');

    try {
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerText = "VERIFYING...";
        }

        await signInWithEmailAndPassword(auth, email, pass);
        toggleLoginModal(false);

    } catch (e) {
        alert("Login Error: " + e.message);
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = "SIGN IN";
        }
    }
}
window.logIn = logIn;


// LOGOUT
async function logOut() {
    zeusLog('LOGOUT');

    window.speechSynthesis.cancel();
    if (mortalTimerInterval) clearInterval(mortalTimerInterval);
    mortalTimerInterval = null; // ✅ keep timer state clean on logout

    toggleAccountModal(false);

    await signOut(auth);
    window.location.reload();
}
window.logOut = logOut;


// ============================================================================
// ⚡ WAR ROOM EVENT BINDINGS
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            logIn();
        });
    }

    const upgradeBtn = document.getElementById('btn-upgrade-pro');
    if (upgradeBtn) {
        upgradeBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            upgradeBtn.disabled = true;
            upgradeBtn.innerText = "ASCENDING...";

            zeusLog('UPGRADE_CLICKED');

            try {
                await upgradeUser();
                zeusLog('UPGRADE_SUCCESS');

                // ✅ UX closure after success
                upgradeBtn.disabled = false;
                upgradeBtn.innerText = "PRO UNLOCKED";
                upgradeBtn.classList.add('opacity-60', 'cursor-default');

            } catch (err) {
                upgradeBtn.disabled = false;
                upgradeBtn.innerText = "UPGRADE TO PRO";
                zeusLog('UPGRADE_FAILED', { error: err.message });
                alert(err.message);
            }
        });
    }

    const debugToggle = document.getElementById('zeus-debug-toggle');
    const logPanel = document.getElementById('zeus-log-panel');
    if (debugToggle && logPanel) {
        debugToggle.addEventListener('click', () => {
            const isHidden = logPanel.classList.contains('hidden-panel');
            if (isHidden) {
                logPanel.classList.remove('hidden-panel');
                zeusLog('DEBUG_CONSOLE_OPENED');
            } else {
                logPanel.classList.add('hidden-panel');
                zeusLog('DEBUG_CONSOLE_CLOSED');
            }
        });
    }
});
