// app.js - SNTLMO SportsGrid Main Application Logic

// Firebase SDK imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updatePassword } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, onSnapshot, collection, query, orderBy, limit, addDoc, serverTimestamp, where, increment, getDocs, deleteDoc, setLogLevel } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";

// --- CONFIGURATION AND GLOBALS (Read from window injected by env-config.js) ---
const appId = window.__app_id || 'default-app-id';
const firebaseConfig = window.__firebase_config ? JSON.parse(window.__firebase_config) : null;
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

if (firebaseConfig && Object.keys(firebaseConfig).length > 0) { 
    try {
        setLogLevel('Debug');
        app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        auth = getAuth(app);
        storage = getStorage(app);
        window.serverTimestamp = serverTimestamp; 
    } catch (e) {
        console.error("Error initializing Firebase:", e);
        db = null;
    }
} else {
    console.error("Firebase config not found or empty. App requires manual login.");
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

onAuthStateChanged(auth, (user) => {
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
                cheerSquad: collection(db, `artifacts/${appId}/public/data/cheerleader_squads`), // NEW: Cheer Squad Collection
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
                    setupCheerleaderListener(); // NEW: Cheerleader listener
                    
                    if (!userData.tourCompleted) {
                        toggleModal(document.getElementById('narrator-launch-btn'), true);
                    } else {
                        toggleModal(document.getElementById('narrator-launch-btn'), false);
                        startIdleNarrator();
                    }

                } else {
                    toggleModal(mainContent, false);
                    toggleModal(paywallContent, true);
                    setupLocker