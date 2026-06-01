import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  onSnapshot, 
  query, 
  orderBy 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// ==========================================
// 1. FIREBASE CONFIGURATION
// ==========================================
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase App & Services
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const titansCollection = collection(db, "titans");

// ==========================================
// 2. ATHLETE COMMAND CENTER: DEPLOY TITAN
// ==========================================
const deployForm = document.getElementById("deployTitanForm");

if (deployForm) {
  deployForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Pull raw layout parameters from input targets
    const name = document.getElementById("titanName").value.trim();
    const sport = document.getElementById("sportType").value;
    const youtubeIdInput = document.getElementById("youtubeId").value.trim();

    // Simple Input Validation
    if (!name) {
      alert("Please provide a valid Titan Name and School before deploying.");
      return;
    }

    // Process and isolate pure 11-character YouTube video ID if full URL is pasted
    let finalizedVideoId = youtubeIdInput;
    if (youtubeIdInput.includes("youtube.com") || youtubeIdInput.includes("youtu.be")) {
      try {
        const urlObj = new URL(youtubeIdInput);
        if (youtubeIdInput.includes("youtu.be")) {
          finalizedVideoId = urlObj.pathname.substring(1);
        } else {
          finalizedVideoId = urlObj.searchParams.get("v");
        }
      } catch (err) {
        console.error("Failed to parse YouTube URL string, defaulting to original input.", err);
      }
    }

    // Build Payload Structure (Simulating random placement values for S0 - S4 attributes)
    const titanPayload = {
      titanName: name,
      sportType: sport,
      youtubeId: finalizedVideoId || "", // Save clean ID if present, else empty string
      attributes: [
        Math.floor(Math.random() * 15) + 85, // S0
        Math.floor(Math.random() * 15) + 85, // S1
        Math.floor(Math.random() * 15) + 85, // S2
        Math.floor(Math.random() * 15) + 85, // S3
        Math.floor(Math.random() * 15) + 85  // S4
      ],
      deployedAt: new Date()
    };

    try {
      await addDoc(titansCollection, titanPayload);
      deployForm.reset();
      console.log("Titan deployed successfully to Snt.L.Mo. Live Grid Feed.");
    } catch (error) {
      console.error("Error writing document to Firestore dashboard schema:", error);
      alert("Deployment failed. Verify Firebase database write rules layout configuration.");
    }
  });
}

// ==========================================
// 3. LIVE GRID FEED: REAL-TIME SYNC
// ==========================================
const gridContainer = document.querySelector(".grid");

if (gridContainer) {
  // Query to sort athletes by newest deployment timestamp
  const q = query(titansCollection, orderBy("deployedAt", "desc"));

  // Open Real-time listening channel stream
  onSnapshot(q, (snapshot) => {
    // Clear out current container grid before painting updated payload snapshots
    gridContainer.innerHTML = "";

    if (snapshot.empty) {
      gridContainer.innerHTML = `
        <div class="col-span-full text-center py-12 border border-dashed border-slate-800 rounded-2xl bg-slate-900/20 text-slate-500">
          No active Titan profiles found. Deploy an athlete profile to begin stream updates.
        </div>
      `;
      return;
    }

    snapshot.forEach((doc) => {
      const titan = doc.data();
      const attrs = titan.attributes || [0, 0, 0, 0, 0];

      // Handle Title Splitting (Extract Main Name vs School metadata info cleanly)
      let displayName = titan.titanName;
      let SubtitleText = "";
      if (titan.titanName.includes("(") && titan.titanName.includes(")")) {
        const parts = titan.titanName.split("(");
        displayName = parts[0].trim();
        SubtitleText = parts[1].replace(")", "").trim();
      }

      // Check if YouTube Video ID exists to decide if button layout should display
      const hasHighlights = titan.youtubeId && titan.youtubeId.trim().length > 0;

      // Construct interactive grid layout profile interface card dynamically
      const cardHtml = `
        <div class="bg-slate-900 border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-colors duration-300">
          <div>
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="text-xl font-bold tracking-tight text-white">${displayName}</h3>
                ${SubtitleText ? `<p class="text-xs text-orange-500 font-semibold uppercase tracking-wider mt-0.5">${SubtitleText}</p>` : ""}
              </div>
              <span class="bg-slate-800 border border-slate-700 text-slate-300 text-[11px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                ${titan.sportType || "General"}
              </span>
            </div>

            <div class="grid grid-cols-5 gap-2 text-center my-5 bg-slate-950/60 border border-slate-800/50 p-3 rounded-xl">
              <div><p class="text-[10px] text-slate-500 font-mono uppercase tracking-wider">S0</p><p class="text-base font-black text-white">${attrs[0]}</p></div>
              <div><p class="text-[10px] text-slate-500 font-mono uppercase tracking-wider">S1</p><p class="text-base font-black text-white">${attrs[1]}</p></div>
              <div><p class="text-[10px] text-slate-500 font-mono uppercase tracking-wider">S2</p><p class="text-base font-black text-white">${attrs[2]}</p></div>
              <div><p class="text-[10px] text-slate-500 font-mono uppercase tracking-wider">S3</p><p class="text-base font-black text-white">${attrs[3]}</p></div>
              <div><p class="text-[10px] text-slate-500 font-mono uppercase tracking-wider">S4</p><p class="text-base font-black text-white">${attrs[4]}</p></div>
            </div>
          </div>

          ${hasHighlights ? `
            <button 
              onclick="openHighlightModal('${titan.youtubeId}')" 
              class="w-full mt-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold py-2.5 px-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path></svg>
              Watch Highlights
            </button>
          ` : `
            <div class="w-full mt-3 text-center py-2.5 text-xs text-slate-600 border border-slate-800 bg-slate-950/40 rounded-xl font-medium select-none">
              No Highlights Linked
            </div>
          `}
        </div>
      `;

      gridContainer.insertAdjacentHTML("beforeend", cardHtml);
    });
  });
}