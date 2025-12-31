// --- 1. Firebase Service Imports (Synced from index.js) ---
import { 
    auth, 
    db, 
    storage, 
    appId, 
    upgradeUser 
} from './index.js'; 

// --- 2. Firebase SDK Function Imports ---
import { 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut
} from 'firebase/auth';

import { 
    doc, 
    getDoc, 
    setDoc, 
    onSnapshot, 
    collection, 
    addDoc, 
    serverTimestamp, 
    query, 
    orderBy, 
    limit 
} from 'firebase/firestore';

import { 
    ref as storageRef, 
    uploadBytes, 
    getDownloadURL 
} from 'firebase/storage';

// --- 3. Configuration Check ---
const geminiApiKey = window.GEMINI_API_KEY;

let currentUser = null;
let currentUserID = null;
let userIsPro = false;

console.log("✅ App.js linked to initialized Firebase services.");

// --- 4. UI Element References ---
const loadingOverlay = document.getElementById('loading-overlay');
const mainContent = document.getElementById('main-content');
const paywallContent = document.getElementById('paywall-content');
const loginModal = document.getElementById('login-modal');
const accountModal = document.getElementById('account-modal');
const headerAuthBtn = document.getElementById('header-auth-btn');
const accountBtn = document.getElementById('account-btn');
const userStatusDisplay = document.getElementById('user-status-display');
const userIdDisplay = document.getElementById('user-id-display');
const accountUID = document.getElementById('account-uid');
const accountPremiumStatus = document.getElementById('account-premium-status');
const ttsButton = document.getElementById('tts-button');
const ttsStatus = document.getElementById('tts-status');
const ttsInput = document.getElementById('tts-input');
const lockerUploadBtn = document.getElementById('locker-upload-btn');
const mediaFileInput = document.getElementById('media-file-input');
const lockerMediaDisplay = document.getElementById('locker-media-display');
const lockerStatusText = document.getElementById('locker-status-text');

// --- 5. Core Functions ---

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

window.toggleLoginModal = (show) => {
    if (loginModal) show ? loginModal.classList.remove('hidden') : loginModal.classList.add('hidden');
};

window.toggleAccountModal = (show) => {
    if (accountModal) show ? accountModal.classList.remove('hidden') : accountModal.classList.add('hidden');
};

window.logIn = async () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const loginError = document.getElementById('login-error');
    try {
        await signInWithEmailAndPassword(auth, email, password);
        window.toggleLoginModal(false);
    } catch (error) {
        loginError.textContent = `Login failed: ${error.message}`;
    }
};

window.register = async () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const loginError = document.getElementById('login-error');
    try {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        // Use the synced appId for the path
        await setDoc(doc(db, `artifacts/${appId}/users/${cred.user.uid}/profile`, "info"), {
            uid: cred.user.uid,
            email: cred.user.email,
            isPremium: false,
            createdAt: serverTimestamp()
        });
        window.toggleLoginModal(false);
    } catch (error) {
        loginError.textContent = `Registration failed: ${error.message}`;
    }
};

window.logOut = async () => {
    await signOut(auth);
    window.location.reload();
};

window.handleFileUpload = async () => {
    if (!currentUser || !mediaFileInput.files[0]) return;
    const file = mediaFileInput.files[0];
    const fileRef = storageRef(storage, `user_media/${currentUser.uid}/${file.name}`);
    try {
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);
        await addDoc(collection(db, `artifacts/${appId}/users/${currentUser.uid}/media`), {
            name: file.name, url, uploadedAt: serverTimestamp(), type: file.type
        });
        alert("Upload successful!");
    } catch (error) { alert("Upload failed: " + error.message); }
};

// --- 6. Auth & Data Listeners ---

onAuthStateChanged(auth, async (user) => {
    currentUser = user;
    currentUserID = user ? user.uid : null;
    if (user) {
        userStatusDisplay.textContent = 'Logged In';
        userIdDisplay.textContent = user.uid.substring(0, 8);
        headerAuthBtn.classList.add('hidden');
        accountBtn.classList.remove('hidden');
        accountUID.textContent = user.uid;

        const userDocRef = doc(db, `artifacts/${appId}/users/${user.uid}/profile`, "info");
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
            userIsPro = docSnap.data().isPremium || false;
            accountPremiumStatus.textContent = userIsPro ? 'PRO Member' : 'Standard User';
        }
        hideLoadingOverlayAndShowContent();
        loadUserMedia();
    } else {
        userStatusDisplay.textContent = 'Logged Out';
        headerAuthBtn.classList.remove('hidden');
        accountBtn.classList.add('hidden');
        hideLoadingOverlayAndShowContent();
    }
});

async function loadUserMedia() {
    if (!currentUser) return;
    const q = query(collection(db, `artifacts/${appId}/users/${currentUser.uid}/media`), orderBy("uploadedAt", "desc"), limit(10));
    onSnapshot(q, (snap) => {
        lockerMediaDisplay.innerHTML = '';
        snap.forEach(d => {
            const m = d.data();
            const div = document.createElement('div');
            div.innerHTML = `<img src="${m.url}" class="w-full h-32 object-cover rounded-lg shadow">`;
            lockerMediaDisplay.appendChild(div);
        });
    });
}

// --- 7. DOM Content Loaded (Button Listeners & QR) ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Upgrade Button Listener
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
            }
        });
    }

    // 2. QR Code (Existing Logic)
    const qrcodeContainer = document.getElementById('qrcode-container');
    if (qrcodeContainer && typeof QRCode !== 'undefined') {
        new QRCode(qrcodeContainer, { text: window.location.href, width: 96, height: 96 });
    }

    // 3. TTS Logic (Existing Logic)
    if (geminiApiKey) {
        if (ttsButton) ttsButton.disabled = false;
    }
});