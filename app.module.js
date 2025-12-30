// app.module.js
import { initializeApp } from 'firebase/app';
import { 
    getFirestore, serverTimestamp, doc, getDoc, setDoc, 
    collection, onSnapshot, query, orderBy, deleteDoc 
} from 'firebase/firestore';
import { 
    getAuth, onAuthStateChanged, signOut 
} from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// --- ZEUS ENGINE VARIABLES ---
let audioContext; 
const firebaseConfig = window.NETLIFY_FIREBASE_CONFIG;
const GEMINI_API_KEY = window.GEMINI_API_KEY || ''; 

// Initialize Firebase
let app;
let auth;
let db;
let storage;

function hideLoadingOverlay() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) loadingOverlay.classList.add('hidden');
}

async function showContentBasedOnProfile(profileData, uid) {
    const accountPremiumStatusSpan = document.getElementById('account-premium-status');
    const mainContent = document.getElementById('main-content');
    const paywallContent = document.getElementById('paywall-content');

    let hasAccess = false;
    if (profileData.isPro) {
        hasAccess = true;
    } else if (profileData.freeAccessGranted && profileData.freeAccessStartTime) {
        const tenMinutesInMillis = 10 * 60 * 1000;
        const startTime = profileData.freeAccessStartTime.toMillis ? profileData.freeAccessStartTime.toMillis() : profileData.freeAccessStartTime;
        if (Date.now() < (startTime + tenMinutesInMillis)) hasAccess = true;
    }

    if (hasAccess) {
        if (paywallContent) paywallContent.classList.add('hidden');
        if (mainContent) mainContent.classList.remove('hidden');
    } else {
        if (paywallContent) paywallContent.classList.remove('hidden');
        if (mainContent) mainContent.classList.add('hidden');
    }

    if (accountPremiumStatusSpan) {
        accountPremiumStatusSpan.textContent = profileData.isPro ? 'PRO MEMBER' : 'STANDARD';
    }
}

if (firebaseConfig && firebaseConfig.apiKey) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
}

document.addEventListener('DOMContentLoaded', () => {
    // --- AUDIO ENGINE ---
    const ambientThunder = document.getElementById('ambient-thunder');
    const summonSound = document.getElementById('summon-sound');

    // Unlock audio on first user click
    document.body.addEventListener('click', () => {
        if (ambientThunder && ambientThunder.paused) {
            ambientThunder.volume = 0.15; 
            ambientThunder.play().catch(err => console.log("Ambience waiting..."));
        }
    }, { once: true });

    // DOM Elements
    const ttsInput = document.getElementById('tts-input');
    const ttsButton = document.getElementById('tts-button');
    const logoutBtn = document.getElementById('logout-btn');
    const headerAuthBtn = document.getElementById('header-auth-btn');
    const accountBtn = document.getElementById('account-btn');
    const addCheerleaderBtn = document.getElementById('add-cheerleader-btn');
    const clGrid = document.getElementById('cheerleader-grid');
    
    // Modal Elements
    const clModal = document.getElementById('cheerleader-modal');
    const clForm = document.getElementById('cheerleader-form');
    const closeClModal = document.getElementById('close-cl-modal');

    // --- 1. ZEUS VOICE (GEMINI AI VERSION) ---
    if (ttsButton) {
        ttsButton.addEventListener('click', async () => {
            if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const textToSay = ttsInput.value;
            if(!textToSay) return;

            ttsButton.disabled = true;
            ttsButton.innerText = "⚡ Zeus is thinking...";

            try {
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: textToSay }] }],
                        generationConfig: { 
                            responseModalities: ["AUDIO"],
                            speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } } } 
                        }
                    })
                });

                const result = await response.json();
                const audioBase64 = result?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

                if (audioBase64) {
                    const audioBlob = pcmToWav(new Int16Array(base64ToArrayBuffer(audioBase64)), 24000);
                    const audio = new Audio(URL.createObjectURL(audioBlob));

                    // ⚡ THE DIVINE VOICE ENTRANCE (THUNDER)
                    if (summonSound) {
                        summonSound.currentTime = 0;
                        summonSound.volume = 0.4; // Subtle thunder for voice
                        if (ambientThunder) ambientThunder.volume = 0.05; // Duck ambience
                        summonSound.play();
                    }

                    // Delay the voice slightly (500ms) so it peaks after the thunder crack
                    setTimeout(() => {
                        audio.play();
                    }, 500);

                    audio.onended = () => {
                        ttsButton.disabled = false;
                        ttsButton.innerText = "Speak";
                        if (ambientThunder) ambientThunder.volume = 0.15; // Restore ambience
                    };
                } else {
                    ttsButton.disabled = false;
                    ttsButton.innerText = "Speak";
                }
            } catch (error) {
                console.error("Zeus Voice Error:", error);
                ttsButton.disabled = false;
                ttsButton.innerText = "Speak";
                if (ambientThunder) ambientThunder.volume = 0.15; // Reset on error
            }
        });
    }

    // --- 2. AUTH & ADMIN LOGIC ---
    if (auth) {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const idTokenResult = await user.getIdTokenResult(true);
                const isAdmin = idTokenResult.claims.admin === true;

                if (isAdmin && addCheerleaderBtn) addCheerleaderBtn.classList.remove('hidden');
                if (headerAuthBtn) headerAuthBtn.classList.add('hidden');
                if (accountBtn) accountBtn.classList.remove('hidden');

                const profileRef = doc(db, 'artifacts', firebaseConfig.appId, 'users', user.uid, 'profile', 'info');
                const snap = await getDoc(profileRef);

                if (!snap.exists()) {
                    const defaultData = { uid: user.uid, isPro: isAdmin, freeAccessGranted: !isAdmin, freeAccessStartTime: serverTimestamp(), createdAt: serverTimestamp() };
                    await setDoc(profileRef, defaultData);
                    showContentBasedOnProfile(defaultData, user.uid);
                } else {
                    const profileData = snap.data();
                    profileData.isPro = isAdmin; 
                    showContentBasedOnProfile(profileData, user.uid);
                }
            } else {
                if (headerAuthBtn) headerAuthBtn.classList.remove('hidden');
                if (accountBtn) accountBtn.classList.add('hidden');
                if (addCheerleaderBtn) addCheerleaderBtn.classList.add('hidden');
            }
            hideLoadingOverlay();
        });
    }

    // --- 3. ROSTER DISPLAY & DELETE ---
    if (db && clGrid) {
        const q = query(collection(db, 'artifacts', firebaseConfig.appId, 'cheerleaders'), orderBy('createdAt', 'desc'));
        onSnapshot(q, (snapshot) => {
            clGrid.innerHTML = ''; 
            snapshot.forEach((snapDoc) => {
                const data = snapDoc.data();
                const card = document.createElement('div');
                card.className = "relative bg-gray-900 border border-gray-800 rounded-lg overflow-hidden group shadow-lg";
                card.innerHTML = `
                    <button class="delete-cl-btn absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10">✕</button>
                    <div class="h-40 bg-gray-800 flex items-center justify-center overflow-hidden">
                        ${data.imageUrl ? `<img src="${data.imageUrl}" class="w-full h-full object-cover">` : `<span class="text-4xl text-gray-700">👤</span>`}
                    </div>
                    <div class="p-3 text-center">
                        <p class="font-bold text-yellow-500 uppercase tracking-tighter text-sm">${data.name}</p>
                    </div>
                `;
                card.querySelector('.delete-cl-btn').onclick = async () => {
                    if (confirm(`Remove ${data.name}?`)) await deleteDoc(snapDoc.ref);
                };
                clGrid.appendChild(card);
            });
        });
    }

    // --- 4. UPLOAD MODAL & SUMMON LOGIC ---
    if (addCheerleaderBtn) addCheerleaderBtn.onclick = () => clModal.classList.remove('hidden');
    if (closeClModal) closeClModal.onclick = () => clModal.classList.add('hidden');

    if (clForm) {
        clForm.onsubmit = async (e) => {
            e.preventDefault();
            const name = document.getElementById('cl-name').value;
            const file = document.getElementById('cl-image').files[0];
            const saveBtn = document.getElementById('save-cl-btn');

            if (!file) return alert("Select an image!");
            saveBtn.disabled = true;
            saveBtn.innerText = "⚡ Uploading...";

            try {
                const sRef = ref(storage, `cheerleaders/${Date.now()}-${file.name}`);
                await uploadBytes(sRef, file);
                const url = await getDownloadURL(sRef);
                
                await setDoc(doc(db, 'artifacts', firebaseConfig.appId, 'cheerleaders', name.toLowerCase().replace(/\s/g, '-')), {
                    name, imageUrl: url, createdAt: serverTimestamp()
                });

                // ⚡ DIVINE SUMMON EFFECT
                if (summonSound) {
                    summonSound.currentTime = 0; summonSound.volume = 0.6;
                    if (ambientThunder) ambientThunder.volume = 0.05;
                    summonSound.play();
                    setTimeout(() => { if (ambientThunder) ambientThunder.volume = 0.15; }, 2500);
                }

                clModal.classList.add('hidden');
                clForm.reset();
            } catch (err) {
                alert(err.message);
            } finally {
                saveBtn.disabled = false;
                saveBtn.innerText = "⚡ Summon to Team";
            }
        };
    }

    if (logoutBtn) logoutBtn.onclick = () => signOut(auth);
});

// --- TRANSLATION HELPERS ---
function base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
    return bytes.buffer;
}

function pcmToWav(pcm16Data, sampleRate) {
    const buffer = new ArrayBuffer(44 + pcm16Data.length * 2);
    const view = new DataView(buffer);
    const writeString = (off, s) => { for (let i = 0; i < s.length; i++) view.setUint8(off + i, s.charCodeAt(i)); };
    writeString(0, 'RIFF');
    view.setUint32(4, 36 + pcm16Data.length * 2, true);
    writeString(8, 'WAVEfmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); 
    view.setUint16(22, 1, true); 
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, pcm16Data.length * 2, true);
    for (let i = 0; i < pcm16Data.length; i++) view.setInt16(44 + i * 2, pcm16Data[i], true);
    return new Blob([buffer], { type: 'audio/wav' });
}