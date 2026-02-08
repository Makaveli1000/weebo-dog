    // ============================================================================
    // ⚡ ZEUS SYSTEM IMPORTS
    // ============================================================================
    import { handleTimerTick, resetTimerNarration } from "./zeus/timer.js";
    import { speak } from "./zeus/speech.js";

    // ============================================================================
    // 🔥 FIREBASE INITIALIZATION & EXPORTS
    // ============================================================================
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
      addDoc,
      serverTimestamp,
      doc,
      getDoc,
      updateDoc
    } from "firebase/firestore";
    import { getStorage } from "firebase/storage";
    import { getRemoteConfig } from "firebase/remote-config";

    // Firebase config from env-config.js (loaded in index.html)
    const netlifyFirebaseConfig = window.NETLIFY_FIREBASE_CONFIG;
    const app = initializeApp(netlifyFirebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    const storage = getStorage(app);
    const remoteConfig = getRemoteConfig(app);

    // Define appId (NO export keyword here)
    const appId = '1:735791748207:web:74fd6412684db238b6e99a'; // Your Firebase Web App ID

    // Define upgradeUser function (NO export keyword here)
    async function upgradeUser() {
      if (!auth.currentUser) {
        throw new Error("User must be logged in to upgrade.");
      }
      try {
        const userProfileRef = doc(db, `artifacts/${appId}/users/${auth.currentUser.uid}/profile/info`);
        await updateDoc(userProfileRef, {
          isPro: true,
          isPremium: true
        });
        alert("Congratulations! You are now a PRO Member.");
      } catch (error) {
        console.error("Error upgrading user:", error);
        throw new Error("Failed to upgrade to PRO: " + error.message);
      }
    }


    // ============================================================================
    // ⚡ ZEUS BOOT CONFIRMATION
    // ============================================================================
    window.addEventListener("DOMContentLoaded", () => {
      speak("Zeus is awake.");
    });

    // ============================================================================
    // 🔐 AUTH RECEIVER (HTML → FIREBASE)
    // ============================================================================
    document.addEventListener("trigger-auth", async (event) => {
      const { email, pass, isSignUp } = event.detail;

      try {
        let userCredential;

        if (isSignUp) {
          userCredential = await createUserWithEmailAndPassword(auth, email, pass);
          speak("A new mortal is forged.");
        } else {
          userCredential = await signInWithEmailAndPassword(auth, email, pass);
          speak("A mortal ascends. The grid awakens.");
        }

        document.dispatchEvent(new CustomEvent("firebase-auth-ready", {
          detail: { user: userCredential.user }
        }));

      } catch (error) {
        console.error("Auth Error:", error.message);
        speak("The gates remain closed.");

        document.dispatchEvent(new CustomEvent("auth-error", {
          detail: { message: error }
        }));

        alert("Ascension Failed: " + error.message);
      }
    });

    // ============================================================================
    // 📊 GRID SYNC LOGIC
    // ============================================================================
    const gridBody = document.getElementById("match-grid-body");

    const syncGrid = () => {
      const q = query(collection(db, "athletes"), orderBy("score0", "desc"));

      onSnapshot(q, (snapshot) => {
        if (!gridBody) return;

        gridBody.innerHTML = "";
        snapshot.forEach(doc => {
          const athlete = doc.data();
          const row = document.createElement("tr");
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

        speak("The grid has been refreshed.", { interrupt: false });
      });
    };

    // ============================================================================
    // 🛠 ADMIN DEPLOY ENGINE
    // ============================================================================
    const athleteForm = document.getElementById("add-athlete-form");

    if (athleteForm) {
      athleteForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(athleteForm);

        try {
          await addDoc(collection(db, "athletes"), {
            name: formData.get("name"),
            score0: Number(formData.get("score0")),
            score1: Number(formData.get("score1")),
            score2: Number(formData.get("score2")),
            score3: Number(formData.get("score3")),
            score4: Number(formData.get("score4")),
            timestamp: serverTimestamp()
          });

          athleteForm.reset();
          speak("Titan deployed successfully.");

        } catch (error) {
          console.error("Deploy failed:", error);
          speak("Deployment failed.");
          alert("Error: " + error.message);
        }
      });
    }

    // ============================================================================
    // 👁 AUTH OBSERVER
    // ============================================================================
    onAuthStateChanged(auth, (user) => {
      const mainContent = document.getElementById("main-content");
      const paywall = document.getElementById("paywall-content");
      const adminPanel = document.getElementById("admin-panel");
      const statusText = document.getElementById("user-status");

      if (user) {
        mainContent?.classList.remove("hidden");
        paywall?.classList.add("hidden");

        syncGrid();
      }
    });

    // ============================================================================
    // 📦 EXPORTS
    // ============================================================================
    export { auth, db, storage, appId, upgradeUser }; // Only one export statement

