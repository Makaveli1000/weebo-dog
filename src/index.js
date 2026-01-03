// --- 1. FIREBASE INITIALIZATION ---
import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword 
} from "firebase/auth";
import { 
    getFirestore, 
    collection, 
    onSnapshot, 
    query, 
    orderBy 
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getRemoteConfig } from "firebase/remote-config";

// Configuration from your Netlify environment
const netlifyFirebaseConfig = window.NETLIFY_FIREBASE_CONFIG;
const app = initializeApp(netlifyFirebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const remoteConfig = getRemoteConfig(app);

// --- 2. THE RECEIVER (The Bridge from HTML to Firebase) ---
// This is what makes your "Thinking" button actually work!
document.addEventListener('trigger-auth', async (event) => {
    const { email, pass, isSignUp } = event.detail;

    try {
        let userCredential;
        if (isSignUp) {
            // Logic for creating a new Titan account
            userCredential = await createUserWithEmailAndPassword(auth, email, pass);
        } else {
            // Logic for signing in an existing Titan
            userCredential = await signInWithEmailAndPassword(auth, email, pass);
        }

        // SUCCESS: Dispatch the signal back to HTML to show the grid
        document.dispatchEvent(new CustomEvent('firebase-auth-ready', {
            detail: { user: userCredential.user }
        }));

    } catch (error) {
        // ERROR: Dispatch error to HTML to stop "Thinking" and show alert
        document.dispatchEvent(new CustomEvent('auth-error', {
            detail: { message: error.message }
        }));
    }
});

// --- 3. THE GRID SYNC LOGIC ---
const gridBody = document.getElementById('match-grid-body');

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

// --- 4. AUTH OBSERVER ---
onAuthStateChanged(auth, (user) => {
    const mainContent = document.getElementById('main-content');
    const paywall = document.getElementById('paywall-content');
    const adminPanel = document.getElementById('admin-panel');
    
    if (user) {
        if (mainContent) mainContent.classList.remove('hidden');
        if (paywall) paywall.classList.add('hidden');
        
        // Admin Check (Using your specific UID)
        if (user.uid === "cEQQHNVXPQfXFhOzO1xBXWZcGy52") {
             adminPanel?.classList.remove('hidden');
        }
        syncGrid();
    }
});

export { auth, db, storage };