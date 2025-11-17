// app.js - SNTLMO SportsGrid Main Application Logic

// Firebase SDK imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updatePassword } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, onSnapshot, collection, query, orderBy, limit, addDoc, serverTimestamp, where, increment, getDocs, deleteDoc, setLogLevel } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";

// --- CONFIGURATION AND GLOBALS (Read from window injected by env-config.js) ---
const appId = window.__app_id || 'default-app-id';

// 🔥 CRITICAL FIX 3: Type check and fallback pattern to prevent JSON.parse() errors.
const rawFirebaseConfig = window.NETLIFY_FIREBASE_CONFIG || window.__firebase_config;

let firebaseConfig = null;
if (rawFirebaseConfig) {
    if (typeof rawFirebaseConfig === 'string') {
        // If it's a string (standard output from our shell script), parse it.
        try {
            firebaseConfig = JSON.parse(rawFirebaseConfig);
        } catch (e) {
            console.error("Error parsing Firebase config string:", e);
            // On parse failure, config remains null.
        }
    } else {
        // If it's already an object, use it directly.
        firebaseConfig = rawFirebaseConfig;
    }
}

const initialAuthToken = window.__initial_auth_token || null; 
const GEMINI_API_KEY = window.GEMINI_API_KEY || '';

// --- ADMIN SECURITY CONFIGURATION (CRUCIAL) ---
const ADMIN_USER_ID = "05806734626095127961"; 
// --- END ADMIN CONFIG ---

// --- TTS LONG MOTIVATIONAL SPEECH ---
const LONG_MOTIVATIONAL_SPEECH = "Champions rise and fall not on game day, but in the relentless, grinding hours of preparation. This is the truth of the arena. Every repetition, every drop of sweat, every moment of self-doubt conquered builds the fortress of your dominance. The clock is ticking on yesterday's efforts, and today demands more. Today, the world is watching, waiting for the thunder of your excellence. Do not give them average. Give them relentless. Give them legendary. You have the heart of a champion, the spirit of St. Louis, and the will of Zeus. Now, go seize your moment! The legacy is yours for the taking. Remember why you started this journey and finish the fight. You are the exclusive few. You are the best of Missouri. Finish strong, finish loud, and leave no doubt! You are the final countdown to victory, make this moment count!";

// --- ZEUS RANDOM PHRASES & SCHOOL MASCOT ICONS ---
const ZEUS_PHRASES = [
    "Great choice! Now you're cooking.", "Big time! Lets get that data recorded.", "Zeus approves! The hub gets stronger.", "Thats how champions move. Data collected.", 
    "Strike hard! Mission accomplished.", "A move worthy of the Thunder God! Excellent.", "Feel the lightning! Youre making history.", "Unstoppable! Carry on, champion.",
    "A stroke of genius! The Gods demand excellence.", "By Olympus! That data is gold.", "Feel the force of the Thunder God! Progress secured.", "The lightning never misses. Great input.",
    "Thats a championship move, right there!", "Lock it in! Focus and finish.", "Level up the whole damn team! Fantastic work.", "We call that dominance! Keep the scores coming.",
    "BOOM! Data locked.", "Money time! Solid effort.", "All business. Move quick.", "Executed! Nothing else matters.",
    "Your command is absolute! Proceeding with access.", 
    "Account secured. Let the games begin!" 
];
function getRandomPhrase() { return ZEUS_PHRASES[Math.floor(Math.random() * ZEUS_PHRASES.length)]; }

const SCHOOL_ICONS = { "VASHON": "🐺", "SUMNER": "🐶", "SOLDAN": "🐅", "MCKINLEY": "🐞", "ROOSEVELT": "🐎", "OTHER": "🏆" };
// --- END ZEUS PHRASES / ICONS ---

// --- WEB AUDIO API SETUP ---
let audioContext; 
let thunderSource = null;
let cheerSource = null;
let cheerGain = null;

function createNoiseSource(volume) {
    // ... (Noise Source Generation Logic - Placeholder for detailed implementation)
    const bufferSize = 2 * (audioContext?.sampleRate || 44100);
    const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1; 
    }
    const source = audioContext.createBufferSource();
    source.buffer = noiseBuffer;
    source.loop = true;
    const gainNode = audioContext.createGain();
    gainNode.gain.value = volume;
    source.connect(gainNode);
    return { source, gainNode };
}

function stopSFX() {
    if (thunderSource) { try { thunderSource.stop(); } catch(e) {} thunderSource = null; }
    if (cheerSource) { try { cheerSource.stop(); } catch(e) {} cheerSource = null; }
    if (cheerGain) { try { cheerGain.disconnect(); } catch(e) {} cheerGain = null; }
}
// --- END WEB AUDIO API SETUP ---

// --- CORE FIREBASE/GLOBAL SETUP ---
let app = null;
let db = null;
let auth = null;
let storage = null;
window.currentUserId = null;
window.isLoggedIn = false;
window.isPremium = false; 
window.nickname = 'Guest';
window.lockerMediaCount = 0;
window.dbRef = {}; 

// 🔥 CRITICAL FIX 4: Validate that essential configuration fields have non-empty values.
const isValidConfig = firebaseConfig && 
                      firebaseConfig.apiKey && firebaseConfig.apiKey.length > 5 &&
                      firebaseConfig.projectId && firebaseConfig.projectId.length > 0;

if (isValidConfig) { 
    try {
        setLogLevel('Debug');
        app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        auth = getAuth(app);
        storage = getStorage(app);
        window.serverTimestamp = serverTimestamp; 
    } catch (e) {
        console.error("Error initializing Firebase:", e);
        // If Firebase fails to initialize, db is set to null.
        db = null;
    }
} else {
    console.error("Firebase config is invalid or missing critical fields (apiKey/projectId).");
    db = null;
}
// --- END CORE FIREBASE/GLOBAL SETUP ---

// --- DOM ELEMENTS (For local use in JS) ---
const loadingOverlay = document.getElementById('loading-overlay');
const paywallContent = document.getElementById('paywall-content');
const mainContent = document.getElementById('main-content');
const headerAuthBtn = document.getElementById('header-auth-btn');
const accountBtn = document.getElementById('account-btn');
const adminBtn = document.getElementById('admin-btn');
const loginModal = document.getElementById('login-modal');
const accountModal = document.getElementById('account-modal');
const cashappModal = document.getElementById('cashapp-modal');
const sportsDataModal = document.getElementById('sports-data-modal');
const adminModal = document.getElementById('admin-modal');
const cheerleaderModal = document.getElementById('cheerleader-upload-modal');
const qrcodeContainer = document.getElementById('qrcode-container');


// --- MODAL UTILITIES (Simplified/Unified for listeners) ---
function toggleModal(element, show) {
    if (show) {
        element.classList.remove('hidden');
    } else {
        element.classList.add('hidden');
    }
}
function generateCashAppQR() {
    const cashappQrDiv = document.getElementById('cashapp-qrcode');
    cashappQrDiv.innerHTML = '';
    const cashTag = '$Mac100dime';
    const amount = '10.00';
    const cashAppUrl = `https://cash.app/$${cashTag}/${amount}`; 
    // Uses the global QRCode library loaded in index.html
    if (window.QRCode) new QRCode(cashappQrDiv, { text: cashAppUrl, width: 180, height: 180 });
}

function generateLoginQR() {
    const loginQrDiv = document.getElementById('login-qrcode');
    loginQrDiv.innerHTML = '';
    const uid = window.currentUserId || 'N/A';
    // Uses the global QRCode library loaded in index.html
    if (window.QRCode) new QRCode(loginQrDiv, { text: uid, width: 100, height: 100 });
    document.getElementById('login-qr-id-input').value = uid.substring(0, 16) + (uid.length > 16 ? '...' : '');
}

// --- AUTHENTICATION & STATE MANAGEMENT ---

async function authenticate() {
    // 🔥 If DB is null (because config failed), skip auth and show paywall
    if (!db) {
        toggleModal(loadingOverlay, false);
        toggleModal(paywallContent, true);
        return;
    }
    
    try {
        if (initialAuthToken) {
            await signInWithCustomToken(auth, initialAuthToken);
        } else {
            await signInAnonymously(auth); 
        }
    } catch (error) {
        console.error("Authentication failed during auto-sign-in:", error);
        toggleModal(loadingOverlay, false);
        toggleModal(paywallContent, true);
    }
}

// 🔥 CRITICAL FIX 2: Only register the listener if the 'auth' object was successfully initialized.
if (auth) {
    onAuthStateChanged(auth, (user) => {
        // Hide the loader as soon as auth state is known
        toggleModal(loadingOverlay, false); 

        if (user) {
            window.currentUserId = user.uid;
            window.isLoggedIn = true;
            
            toggleModal(loginModal, false);
            toggleModal(headerAuthBtn, false);
            toggleModal(accountBtn, true); 
            toggleModal(adminBtn, user.uid === ADMIN_USER_ID);
            
            if (db) { 
                window.dbRef = {
                    users: (uid) => doc(db, `artifacts/${appId}/users/${uid}/profile/info`),
                    allUsersCollection: collection(db, `artifacts/${appId}/users`), 
                    publicMessages: collection(db, `artifacts/${appId}/public/data/messages`),
                    activeUsersCollection: collection(db, `artifacts/${appId}/public/data/active_users`),
                    sportsData: collection(db, `artifacts/${appId}/public/data/sports_data`),
                    leaderboard: collection(db, `artifacts/${appId}/public/data/leaderboard`),
                    mediaLocker: (uid) => collection(db, `artifacts/${appId}/users/${uid}/media_locker`),
                    cheerSquad: collection(db, `artifacts/${appId}/public/data/cheerleader_squads`), 
                };
            }
            
            loadUserStatusAndContent(); 

        } else {
            window.currentUserId = null;
            window.isLoggedIn = false;
            window.isPremium = false;
            toggleModal(mainContent, false); 
            toggleModal(paywallContent, true); 
            
            toggleModal(headerAuthBtn, true); 
            toggleModal(accountBtn, false); 
            toggleModal(adminBtn, false);

            generateLoginQR(); 
            renderUserStatus({});
        }
    });
} else {
    // If Firebase initialization failed completely (auth is null), 
    // we must manually clear the loading screen and show the paywall/login prompt.
    toggleModal(loadingOverlay, false);
    toggleModal(paywallContent, true); 
    toggleModal(headerAuthBtn, true); 
    generateLoginQR();
}

async function loadUserStatusAndContent() {
    let isExpired = false;

    try {
        if (db && window.dbRef.users) { 
            const docSnap = await getDoc(window.dbRef.users(window.currentUserId));
            if (docSnap.exists()) {
                const userData = docSnap.data();
                window.nickname = userData.nickname || 'Guest';
                
                if (userData.premiumExpires?.toDate) {
                    const expirationDate = userData.premiumExpires.toDate();
                    if (expirationDate < new Date()) {
                        isExpired = true;
                    }
                }
                
                window.isPremium = (userData.isPremium && !isExpired) || false;

                renderUserStatus(userData); 

                if (window.isPremium) {
                    toggleModal(mainContent, true);
                    toggleModal(paywallContent, false);
                    
                    // Initialize Data Listeners for PRO content
                    startPresenceTracking(window.currentUserId);
                    setupChatListener();
                    setupSportsDataListener();
                    setupLeaderboardListener(); 
                    setupLockerRoomListener(); 
                    setupCheerleaderListener(); 
                    
                    if (!userData.tourCompleted) {
                        toggleModal(document.getElementById('narrator-launch-btn'), true);
                    } else {
                        toggleModal(document.getElementById('narrator-launch-btn'), false);
                        startIdleNarrator();
                    }

                } else {
                    toggleModal(mainContent, false);
                    toggleModal(paywallContent, true);
                    setupLockerRoomListener(); 
                }
            } else {
                   // Profile document doesn't exist, create it as a standard user
                   await setDoc(window.dbRef.users(window.currentUserId), {
                       uid: window.currentUserId,
                       nickname: 'NewUser',
                       isPremium: false,
                       tourCompleted: false,
                       createdAt: serverTimestamp()
                   });
                   // Recursive call to reload with new profile data
                   loadUserStatusAndContent(); 
            }
        } 
    } catch (error) {
        console.error("Error loading user status:", error);
    }
}

// --- UX FUNCTION: Renders Nickname, Status, and Expiration ---
function renderUserStatus(userData) {
    const statusDisplay = document.getElementById('user-status-display');
    const idDisplay = document.getElementById('user-id-display');
    const expiry = userData.premiumExpires?.toDate ? userData.premiumExpires.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A';
    
    idDisplay.innerText = window.currentUserId ? window.currentUserId.substring(0, 8) + '...' : '';
    idDisplay.title = window.currentUserId || '';
    
    let html = `<span class="font-bold text-metro-accent mr-2" id="nickname-display">${window.nickname}</span>`;
    if (window.isPremium) {
        html += `<span class="text-xs font-bold text-white bg-green-600 px-2 py-0.5 rounded-full mr-3">⭐ PRO MEMBER</span>`;
        html += `<span class="text-xs text-gray-500">Expires: ${expiry}</span>`;
    } else if (window.isLoggedIn) {
        html += `<span class="text-xs font-bold text-white bg-red-500 px-2 py-0.5 rounded-full">STANDARD</span>`;
    } else {
        html = 'Logged Out';
    }

    statusDisplay.innerHTML = html;
    
    // Update Account Modal
    document.getElementById('account-uid').innerText = window.currentUserId || 'N/A';
    document.getElementById('account-nickname').value = window.nickname;
    document.getElementById('account-premium-status').innerText = window.isPremium ? `Active (Expires ${expiry})` : 'Inactive';
    document.getElementById('account-premium-status').className = window.isPremium ? 'text-green-600 font-bold' : 'text-red-500 font-bold';

    // Update debug info on every status change
    document.getElementById('debug-app-id').querySelector('span').textContent = appId || 'N/A';
    document.getElementById('debug-firebase-config').querySelector('span').textContent = firebaseConfig ? 'LOADED' : 'MISSING';
    document.getElementById('debug-auth-token').querySelector('span').textContent = initialAuthToken ? 'PRESENT' : 'MISSING';
}

// --- TTS API IMPLEMENTATION (Placeholder for full audio logic) ---
function checkTtsStatus() {
    const btn = document.getElementById('tts-button');
    const statusDiv = document.getElementById('tts-status');
    
    if (!GEMINI_API_KEY) {
        btn.disabled = true;
        btn.innerText = 'API Key Missing!';
        statusDiv.classList.remove('text-gray-500');
        statusDiv.classList.add('text-red-500', 'font-bold');
        statusDiv.textContent = 'Status: FATAL - Set GEMINI_API_KEY in Netlify';
    } else {
        btn.disabled = false;
        btn.innerText = 'Announce Now!';
        statusDiv.classList.remove('text-red-500', 'font-bold');
        statusDiv.classList.add('text-green-600');
        statusDiv.textContent = 'Status: READY';
    }
}
async function generateAndSpeak(speechText) {
    // NOTE: Full audio generation/playback logic is omitted here for brevity, 
    // but should be included in your local app.js file.
    console.log("TTS function called with:", speechText);
    if (!GEMINI_API_KEY) {
        alert("TTS Error: Gemini API Key is missing.");
        return;
    }
    // Placeholder logic for brevity:
    if (speechText) alert(`[TTS SIMULATED]: ${speechText}`);
}
// --- END TTS API IMPLEMENTATION ---

// --- ZEUS UX FUNCTIONS ---
function flyZeusAndClick(btnId, callback, duration = 800) {
    const avatar = document.getElementById('zeus-avatar-svg');
    const btn = document.getElementById(btnId);
    const btnRect = btn.getBoundingClientRect();
    const phrase = getRandomPhrase();
    const currentText = btn.innerText;

    // Animation logic
    avatar.style.transition = 'none';
    avatar.style.transform = `translate(${window.innerWidth - 40}px, ${window.innerHeight - 40}px) scale(0)`;
    avatar.style.opacity = '1';
    void avatar.offsetWidth; // Force reflow
    avatar.classList.add('flying-zeus');
    avatar.style.transition = `transform ${duration/1000}s ease-out, opacity ${duration/1000}s ease-out`;
    avatar.style.transform = `translate(${btnRect.left + (btnRect.width / 2) - 20}px, ${btnRect.top + (btnRect.height / 2) - 20}px) scale(1)`;

    setTimeout(() => {
        // Show phrase
        btn.innerText = phrase;
        btn.classList.add('bg-yellow-400', 'text-black');
        
        callback();

        setTimeout(() => {
            // End animation
            avatar.style.transition = 'opacity 0.5s';
            avatar.style.opacity = '0';
            btn.innerText = currentText;
            btn.classList.remove('bg-yellow-400', 'text-black');
        }, 1000);
    }, duration);
}
// --- END ZEUS UX FUNCTIONS ---

// --- CORE DATA LISTENERS (Placeholders for real Firestore listeners) ---
function startPresenceTracking() { console.log('Presence Tracking Started.'); }
function setupChatListener() { console.log('Chat Listener Setup.'); }
function setupSportsDataListener() { console.log('Sports Data Listener Setup.'); }
function setupLeaderboardListener() { console.log('Leaderboard Listener Setup.'); }
function setupCheerleaderListener() { console.log('Cheerleader Listener Setup.'); } 

function setupLockerRoomListener() { 
    // Simplified logic for media count/limit
    window.lockerMediaCount = 5; // Example count
    const limit = window.isPremium ? 9999 : 10;
    document.getElementById('locker-status-text').textContent = `Capacity: ${window.lockerMediaCount}/${limit} (${window.isPremium ? 'PRO' : 'STANDARD'})`;
    document.getElementById('locker-upload-btn').disabled = window.lockerMediaCount >= limit;
}
function startIdleNarrator() { console.log('Idle Narrator Started.'); }
// --- END CORE DATA LISTENERS ---


// --- EVENT HANDLERS ---

window.simulatePaymentSuccess = async function() {
    // MOCK: Simulate successful payment and upgrade
    if (!db || !window.currentUserId) return;
    try {
        await updateDoc(window.dbRef.users(window.currentUserId), {
            isPremium: true,
            premiumExpires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year from now
        });
        toggleModal(cashappModal, false);
        await loadUserStatusAndContent(); 
    } catch(e) {
        console.error("Error simulating payment:", e);
    }
};

window.handleFileUpload = async function() {
    const fileInput = document.getElementById('media-file-input');
    const file = fileInput.files[0];
    if (!file) return;

    const limit = window.isPremium ? 9999 : 10;
    if (window.lockerMediaCount >= limit) {
        document.getElementById('locker-upload-message').classList.remove('hidden');
        return;
    }
    
    // Placeholder upload logic
    console.log(`Uploading file: ${file.name} to locker...`);
    
    window.lockerMediaCount++;
    setupLockerRoomListener();
    alert(`Locker: Upload successful! Capacity is now ${window.lockerMediaCount}.`);
};

async function submitCheerleaderData() {
    const playerName = document.getElementById('cheer-player-name').value.trim();
    const mediaInput = document.getElementById('cheer-media-input');
    const caption = document.getElementById('cheer-caption').value.trim();
    
    if (!playerName || !mediaInput.files[0]) {
        alert("Please specify a player/team and upload a file.");
        return;
    }

    const file = mediaInput.files[0];
    const storageRef = ref(storage, `cheers/${window.currentUserId}/${Date.now()}_${file.name}`);
    
    try {
        console.log("Uploading cheer media...");
        await uploadBytes(storageRef, file);
        const mediaUrl = await getDownloadURL(storageRef);

        await addDoc(window.dbRef.cheerSquad, {
            uid: window.currentUserId,
            nickname: window.nickname,
            playerName: playerName,
            caption: caption,
            mediaUrl: mediaUrl,
            timestamp: serverTimestamp(),
            type: file.type.startsWith('image') ? 'image' : 'video'
        });

        alert("Cheer submitted successfully!");
        toggleModal(cheerleaderModal, false);
    } catch (e) {
        console.error("Error submitting cheer data:", e);
        alert("Failed to submit cheer. Check console.");
    }
}

function submitSportsData() {
    console.log('Submitting general sports data.');
    toggleModal(sportsDataModal, false);
}

// Authentication functions
function logIn() { 
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    signInWithEmailAndPassword(auth, email, password)
        .catch(error => document.getElementById('login-error').innerText = error.message);
}
function register() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    createUserWithEmailAndPassword(auth, email, password)
        .catch(error => document.getElementById('login-error').innerText = error.message);
}
function logOut() { signOut(auth); }
function saveAccountNickname() {
    const newNickname = document.getElementById('account-nickname').value.trim();
    if (!newNickname || !window.currentUserId) return;
    updateDoc(window.dbRef.users(window.currentUserId), { nickname: newNickname }).then(() => {
        window.nickname = newNickname;
        renderUserStatus({});
    });
}
function updateUserPassword() {
    const newPassword = document.getElementById('account-new-password').value;
    if (newPassword.length < 6) {
        document.getElementById('account-password-error').innerText = "Password must be at least 6 characters.";
        return;
    }
    updatePassword(auth.currentUser, newPassword)
        .then(() => {
            document.getElementById('account-password-error').innerText = "Password updated successfully!";
            document.getElementById('account-new-password').value = '';
        })
        .catch(error => {
            document.getElementById('account-password-error').innerText = `Error: ${error.message}`;
        });
}

// HANDLER: Admin Functions (MOCK)
window.upgradeToPremiumForOneYear = window.simulatePaymentSuccess; 
window.startZeusNarratorTour = () => { 
    generateAndSpeak(LONG_MOTIVATIONAL_SPEECH);
    updateDoc(window.dbRef.users(window.currentUserId), { tourCompleted: true });
    toggleModal(document.getElementById('narrator-launch-btn'), false);
};

// --- EVENT LISTENERS (Attaching JS functions to HTML IDs) ---
document.addEventListener('DOMContentLoaded', () => {
    // Auth & Account Modals
    document.getElementById('header-auth-btn').addEventListener('click', () => { toggleModal(loginModal, true); generateLoginQR(); });
    document.getElementById('account-btn').addEventListener('click', () => toggleModal(accountModal, true));
    document.getElementById('login-auth-btn').addEventListener('click', logIn);
    document.getElementById('register-auth-btn').addEventListener('click', register);
    document.getElementById('close-login-modal-btn').addEventListener('click', () => toggleModal(loginModal, false));
    document.getElementById('logout-btn').addEventListener('click', logOut);
    document.getElementById('close-account-modal-btn').addEventListener('click', () => toggleModal(accountModal, false));
    document.getElementById('save-nickname-btn').addEventListener('click', saveAccountNickname);
    document.getElementById('update-password-btn').addEventListener('click', updateUserPassword);

    // Admin
    document.getElementById('admin-btn').addEventListener('click', () => toggleModal(adminModal, true));
    document.getElementById('close-admin-modal-btn').addEventListener('click', () => toggleModal(adminModal, false));
    
    // Paywall & CashApp
    document.getElementById('upgrade-btn').addEventListener('click', () => { toggleModal(cashappModal, true); generateCashAppQR(); });
    document.getElementById('simulate-payment-btn').addEventListener('click', window.simulatePaymentSuccess);
    document.getElementById('close-cashapp-modal-btn').addEventListener('click', () => toggleModal(cashappModal, false));
    
    // Data Submission
    document.getElementById('submit-data-modal-btn').addEventListener('click', () => toggleModal(sportsDataModal, true));
    document.getElementById('close-sports-data-modal-btn').addEventListener('click', () => toggleModal(sportsDataModal, false));
    document.getElementById('submit-data-btn').addEventListener('click', () => flyZeusAndClick('submit-data-btn', submitSportsData));

    // Narrator/TTS
    document.getElementById('tts-button').addEventListener('click', () => flyZeusAndClick('tts-button', () => generateAndSpeak(document.getElementById('tts-input').value)));
    document.getElementById('narrator-launch-btn').addEventListener('click', window.startZeusNarratorTour);

    // Cheerleader (NEW)
    document.getElementById('cheerleader-upload-btn-trigger').addEventListener('click', () => toggleModal(cheerleaderModal, true));
    document.getElementById('close-cheerleader-upload-modal-btn').addEventListener('click', () => toggleModal(cheerleaderModal, false));
    document.getElementById('submit-cheer-btn').addEventListener('click', () => flyZeusAndClick('submit-cheer-btn', submitCheerleaderData));

    // Start App & Status Check
    authenticate();
    checkTtsStatus();
});