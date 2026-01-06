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
    orderBy,
    addDoc,            // ADDED THIS
    serverTimestamp    // ADDED THIS
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

        // SUCCESS: Dispatch the signal back to HTML to stop "Thinking" and show the grid
        document.dispatchEvent(new CustomEvent('firebase-auth-ready', {
            detail: { user: userCredential.user }
        }));

    } catch (error) {
        // ERROR: Send signal to stop "Thinking" and show alert
        console.error("Auth Error:", error.message);
        
        // This tells the HTML that something went wrong
        document.dispatchEvent(new CustomEvent('auth-error', {
            detail: { message: error.message }
        }));
        
        alert("Ascension Failed: " + error.message);
    }
});// --- 3. THE GRID SYNC LOGIC ---
const gridBody = document.getElementById('match-grid-body');

const syncGrid = () => {
    // Note: If this doesn't show data, check the F12 console for the Index Link!
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

// --- 4. THE ADMIN DEPLOY ENGINE ---
const athleteForm = document.getElementById('add-athlete-form');

if (athleteForm) {
    athleteForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(athleteForm);
        
        try {
            // This sends the data to your 'athletes' collection
            await addDoc(collection(db, "athletes"), {
                name: formData.get('name'),
                score0: Number(formData.get('score0')), 
                score1: Number(formData.get('score1')),
                score2: Number(formData.get('score2')),
                score3: Number(formData.get('score3')),
                score4: Number(formData.get('score4')),
                timestamp: serverTimestamp() 
            });
            
            athleteForm.reset(); 
            alert("Titan Deployed Successfully!");
        } catch (error) {
            console.error("Deploy failed:", error);
            alert("Error: " + error.message);
        }
    });
}

// --- 5. AUTH OBSERVER ---
onAuthStateChanged(auth, (user) => {
    const mainContent = document.getElementById('main-content');
    const paywall = document.getElementById('paywall-content');
    const adminPanel = document.getElementById('admin-panel');
    const statusText = document.getElementById('user-status');
    
    if (user) {
        if (mainContent) mainContent.classList.remove('hidden');
        if (paywall) paywall.classList.add('hidden');
        
        // Admin Check (Using your specific UID)
        if (user.uid === "cEQQHNVXPQfXFhOzO1xBXWZcGy52") {
             adminPanel?.classList.remove('hidden');
             if (statusText) {
                statusText.innerText = "Status: Titan Vision (Admin)";
                statusText.className = "text-[9px] uppercase tracking-widest text-yellow-500 font-bold";
             }
        } else {
             if (statusText) statusText.innerText = "Status: Pro Vision";
        }
        syncGrid();
    }
});

export { auth, db, storage };