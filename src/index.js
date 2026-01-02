// --- 1. FIREBASE INITIALIZATION ---
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, onSnapshot, addDoc, serverTimestamp, query, orderBy, limit } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { getRemoteConfig, fetchAndActivate } from "firebase/remote-config";

const netlifyFirebaseConfig = window.NETLIFY_FIREBASE_CONFIG;
const app = initializeApp(netlifyFirebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const remoteConfig = getRemoteConfig(app);

// --- 2. THE GRID & ADMIN LOGIC (Integrated) ---
const gridBody = document.getElementById('match-grid-body');
const adminPanel = document.getElementById('admin-panel');

// This function now uses the 'db' we just initialized above
const syncGrid = () => {
    const q = query(collection(db, "athletes"), orderBy("score0", "desc"));
    onSnapshot(q, (snapshot) => {
        if (!gridBody) return;
        gridBody.innerHTML = ""; 
        snapshot.forEach(doc => {
            const athlete = doc.data();
            const row = document.createElement('tr');
            row.className = "hover:bg-yellow-500/5 border-b border-gray-800";
            row.innerHTML = `
                <td class="p-3 text-yellow-500 font-bold">${athlete.name}</td>
                <td class="p-3 text-center font-mono">${athlete.score0}</td>
                <td class="p-3 text-center text-gray-400">${athlete.score1}</td>
                <td class="p-3 text-center text-gray-400">${athlete.score2}</td>
                <td class="p-3 text-center text-gray-400">${athlete.score3}</td>
                <td class="p-3 text-center text-gray-400">${athlete.score4}</td>
            `;
            gridBody.appendChild(row);
        });
    });
};

// --- 3. AUTH OBSERVER ---
onAuthStateChanged(auth, (user) => {
    const mainContent = document.getElementById('main-content');
    const paywall = document.getElementById('paywall-content');
    
    if (user) {
        if (mainContent) mainContent.classList.remove('hidden');
        if (paywall) paywall.classList.add('hidden');
        if (user.uid === "cEQQHNVXPQfXFhOzO1xBXWZcGy52") { // Your Admin UID
             adminPanel?.classList.remove('hidden');
        }
        syncGrid();
    }
});

// Export everything for other files to use
export { auth, db, storage, serverTimestamp };