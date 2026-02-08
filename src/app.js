// ============================================================================
// ⚡ ZEUS SYSTEM IMPORTS
// These are external modules from src/zeus directory
// ============================================================================
import { narrateFirestoreEvent } from "./zeus/firestoreNarration.js";
import { thunder, lightning } from "./zeus/fx.js";
// import { handleTimerTick, resetTimerNarration } from "./zeus/timer.js"; // Removed unused import, timer logic is inline
import { speak } from "./zeus/speech.js";
import { zeusUpsell } from "./zeus/upsell.js";
import { oracleSpeak } from "./zeus/oracle.js";
import { toggleZeusDebug } from "./zeus/debug.js";
import { injectOracleOverlay } from "./zeus/oracleOverlay.js";
import { zeusPredict } from "./zeus/prediction.js"; // Renamed from predition.js

window.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.shiftKey && e.key === "Z") {
    toggleZeusDebug();
  }
});

//============================================================================
// ⚡ OLYMPUS IMPORT GATEWAY
// These now import from src/index.js, which handles Firebase initialization and core exports
// ============================================================================
import { auth, db, appId, upgradeUser, storage } from "./index.js";
import {
  onAuthStateChanged, // Keep onAuthStateChanged here as it's the main app observer
} from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  onSnapshot,
  deleteDoc,
  limit,
  updateDoc,
  increment,
  getDocs,
  setDoc
} from "firebase/firestore";
import {
  // getStorage, // REMOVED DUPLICATE getStorage() call here, now imported from index.js
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
} from "firebase/storage";

//  ============================================================================
// ⚡ OLYMPUS PROTOCOL: EMERGENCY LOADER FAILSAFE
// ============================================================================
setTimeout(() => {
  const loader = document.getElementById("loading-overlay");
  if (loader && !loader.classList.contains("hidden")) {
    console.warn("⚠️ Firebase/Script hang detected. Forcing entry.");
    loader.style.opacity = "0";
    setTimeout(() => loader.classList.add("hidden"), 500);

    document.getElementById("paywall-content")?.classList.remove("hidden");
    document.getElementById("header-auth-btn")?.classList.remove("hidden");
  }
}, 4000);

// ============================================================================
// ⚡ ZEUS BOOT SEQUENCE — CINEMATIC STARTUP
// ============================================================================
function runZeusBootSequence() {
  const boot = document.getElementById("zeus-boot");
  if (!boot) return;

  const l1 = document.getElementById("boot-line-1");
  const l2 = document.getElementById("boot-line-2");
  const l3 = document.getElementById("boot-line-3");

  // Line 1
  setTimeout(() => {
    l1.classList.add("boot-fade-in");
    zeusLog("BOOT_SEQUENCE_STEP", { step: "OLYMPUS_SYSTEMS" });
  }, 300);

  // Line 2
  setTimeout(() => {
    l2.classList.add("boot-fade-in");
    zeusLog("BOOT_SEQUENCE_STEP", { step: "SUMMONING_ORACLE" });
  }, 1100);

  // Line 3
  setTimeout(() => {
    l3.classList.add("boot-fade-in");
    zeusLog("BOOT_SEQUENCE_STEP", { step: "ACCESS_GRANTED" });
  }, 1900);

  // Lightning flash
  setTimeout(() => {
    boot.classList.add("boot-flash");
    zeusLog("BOOT_SEQUENCE_LIGHTNING");
  }, 2600);

  // Fade out
  setTimeout(() => {
    boot.style.opacity = "0";
    boot.style.pointerEvents = "none";
  }, 3000);

  // Remove from DOM
  setTimeout(() => {
    boot.remove();
    zeusLog("BOOT_SEQUENCE_COMPLETE");
  }, 3800);
}

document.addEventListener("DOMContentLoaded", runZeusBootSequence);

// ============================================================================
// ⚡ DIVINE STATE REGISTRY
// ============================================================================
let currentUser = null;
let userIsPro = false; // Global state for Pro status
let mortalTimerInterval = null;

// ============================================================================
// ⚡ ZEUS OBSERVATORY — LOGGING SYSTEM
// ============================================================================
const ZEUS_LOG_MAX = 20;
const zeusLogBuffer = [];

function zeusLog(event, detail = {}) {
  const timestamp = new Date().toISOString().split("T")[1].replace("Z", "");
  const entry = { timestamp, event, detail };

  zeusLogBuffer.unshift(entry);
  if (zeusLogBuffer.length > ZEUS_LOG_MAX) zeusLogBuffer.pop();

  console.log(
    `%c⚡ ZEUS LOG [%c${timestamp}%c] %c${event}`,
    "color:#eab308;font-weight:bold;",
    "color:#38bdf8;",
    "color:#eab308;",
    "color:#fff;font-weight:bold;",
    detail
  );

  const feed = document.getElementById("zeus-log-feed");
  if (feed) {
    feed.innerHTML = zeusLogBuffer
      .map(
        (e) => `<div class="text-[10px] text-gray-400 font-mono">
                <span class="text-yellow-500">${e.timestamp}</span> — ${e.event}
            </div>`
      )
      .join("");
  }
}

// ============================================================================
// ⚡ ASCENSION RITUAL — PRO-ONLY ANIMATION
// ============================================================================
function runAscensionAnimation() {
  const header = document.querySelector("header");
  const status = document.getElementById("user-status");
  const accountCard = document.querySelector("#account-modal .bg-gray-900");

  [header, status, accountCard].forEach((el) => {
    if (!el) return;
    el.classList.add("ascend-pulse");
    setTimeout(() => el.classList.remove("ascend-pulse"), 1300);
  });

  zeusLog("ASCENSION_ANIMATION_TRIGGERED");
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
  msg.voice =
    voices.find(
      (v) =>
        v.name.includes("Google US English") || v.name.includes("Male")
    ) || voices[0];
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
    zeusLog("VOICE_ENGINE_READY");
  }
};

function startMortalTimer() {
  if (mortalTimerInterval) return; // ✅ Double-start guard

  zeusLog("MORTAL_TIMER_STARTED");

  let timeLeft = 600;
  const timerElement = document.getElementById("zeus-timer");
  const timerContainer = document.getElementById("mortal-timer-container");

  timerContainer?.classList.remove("hidden");

  mortalTimerInterval = setInterval(() => {
    timeLeft--;

    // Re-use timer code directly from app.js instead of importing empty timer.js
    const mins = Math.floor(timeLeft / 60);
    const secs = (timeLeft % 60).toString().padStart(2, "0");
    if (timerElement) timerElement.innerText = `${mins}:${secs}`;

    if (timeLeft <= 0) {
      zeusLog("MORTAL_TIMER_EXPIRED");

      clearInterval(mortalTimerInterval);
      mortalTimerInterval = null; // ✅ allow re-start after expiry if needed
      document.getElementById("main-content")?.classList.add("hidden");
      document.getElementById("paywall-content")?.classList.remove("hidden");
      window.speechSynthesis.speak(
        new SpeechSynthesisUtterance("Your time has vanished, Mortal.")
      );
    }
  }, 1000);
}

// ============================================================================
// ⚡ PERSONAL MEDIA UPLOAD FUNCTIONS AND DISPLAY
// ============================================================================
// const storage = getStorage(); // REMOVED DUPLICATE getStorage() call here

// Function to handle cheering a media item
async function cheerMedia(collectionName, mediaId, userId) {
  if (!auth.currentUser) {
    alert("You must be logged in to cheer.");
    return;
  }
  try {
    const mediaRef = collectionName === 'highlights'
      ? doc(db, 'highlights', mediaId)
      : doc(db, 'users', userId, 'personalMedia', mediaId); // Assuming personal media has UID path

    await updateDoc(mediaRef, {
      cheers: increment(1)
    });
    zeusLog("MEDIA_CHEERED", { collectionName, mediaId, userId: auth.currentUser.uid });
  } catch (error) {
    console.error("Error cheering media:", error);
    alert("Failed to cheer media. Please try again.");
  }
}

// Attach event listeners for "Cheer" buttons on media dynamically
function attachMediaCheerListeners() {
  document.querySelectorAll('.cheer-media-btn').forEach(button => {
    // Clone and replace to effectively remove all previous event listeners
    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);
  });

  document.querySelectorAll('.cheer-media-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const collectionName = e.currentTarget.dataset.collection;
      const mediaId = e.currentTarget.dataset.mediaId;
      const userId = e.currentTarget.dataset.userId; // Only for personal media
      if (collectionName && mediaId) {
        cheerMedia(collectionName, mediaId, userId);
      }
    });
  });
}


async function uploadPersonalMedia() {
  const fileInput = document.getElementById("media-file-input");
  const uploadBtn = document.getElementById("upload-media-btn");
  const uploadProgressBar = document.querySelector("#upload-progress div");
  const uploadStatusText = document.getElementById("upload-status");
  const uploadProgressContainer = document.getElementById("upload-progress");

  if (!auth.currentUser) {
    uploadStatusText.textContent = "Error: You must be logged in to upload media.";
    return;
  }

  const file = fileInput.files[0];
  if (!file) {
    uploadStatusText.textContent = "Please select a file to upload.";
    return;
  }

  // Reset UI
  uploadStatusText.textContent = "Starting upload...";
  uploadProgressBar.style.width = "0%";
  uploadProgressContainer.classList.remove("hidden");
  uploadBtn.disabled = true;

  try {
    // 1. Define the storage path for personal media
    // This matches our Storage Security Rule: /users/{userId}/media/{allPaths=**}
    const filePath = `users/${auth.currentUser.uid}/media/${file.name}`;
    const storageRef = ref(storage, filePath);

    // 2. Upload the file
    const uploadTask = uploadBytesResumable(storageRef, file);

    // 3. Monitor upload progress
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploadProgressBar.style.width = `${progress}%`;
        uploadStatusText.textContent = `Upload is ${progress.toFixed(0)}% done (${snapshot.bytesTransferred} / ${snapshot.totalBytes} bytes)`;
        zeusLog("MEDIA_UPLOAD_PROGRESS", { progress: progress.toFixed(0) });
      },
      (error) => {
        // Handle unsuccessful uploads
        uploadStatusText.textContent = `Upload failed: ${error.message}`;
        uploadProgressContainer.classList.add("hidden");
        uploadBtn.disabled = false;
        zeusLog("MEDIA_UPLOAD_FAILED", { error: error.message });
        console.error("Upload failed:", error);
      },
      async () => {
        // 4. Get the download URL
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        uploadStatusText.textContent = "Upload complete! Saving metadata...";
        zeusLog("MEDIA_UPLOAD_COMPLETE", { downloadURL });

        // 5. Store metadata in Firestore
        // We'll create a subcollection under the user's profile for their media
        const userMediaCollectionRef = collection(db, `users/${auth.currentUser.uid}/personalMedia`);
        await addDoc(userMediaCollectionRef, {
          userId: auth.currentUser.uid,
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          downloadURL: downloadURL,
          storagePath: filePath,
          timestamp: serverTimestamp(),
          cheers: 0, // NEW: Initialize cheers for personal media
        });

        uploadStatusText.textContent = "Media uploaded and metadata saved successfully!";
        uploadProgressContainer.classList.add("hidden");
        uploadBtn.disabled = false;
        fileInput.value = ''; // Clear the input
        zeusLog("MEDIA_METADATA_SAVED", { filePath });
      }
    );
  } catch (error) {
    uploadStatusText.textContent = `An unexpected error occurred: ${error.message}`;
    uploadProgressContainer.classList.add("hidden");
    uploadBtn.disabled = false;
    zeusLog("MEDIA_UPLOAD_ERROR", { error: error.message });
    console.error("Error in uploadPersonalMedia:", error);
  }
}

function renderUserMedia(mediaDocs) {
  const userMediaList = document.getElementById('user-media-list');
  if (!userMediaList) return;

  userMediaList.innerHTML = ''; // Clear existing
  if (mediaDocs.empty) {
    userMediaList.innerHTML = '<p class="col-span-full text-center text-gray-500">No personal media uploaded yet.</p>';
    return;
  }

  mediaDocs.forEach(doc => {
    const media = doc.data();
    const mediaElement = document.createElement('div');
    mediaElement.classList.add('relative', 'group', 'overflow-hidden', 'rounded-lg', 'shadow-lg');

    let contentHtml = '';
    if (media.fileType && media.fileType.startsWith('image')) {
      contentHtml = `<img src="${media.downloadURL}" alt="${media.fileName}" class="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110" loading="lazy">`;
    } else if (media.fileType && media.fileType.startsWith('video')) {
      contentHtml = `
        <video controls src="${media.downloadURL}" class="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110">
          Your browser does not support the video tag.
        </video>
        <div class="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path>
          </svg>
        </div>
      `;
    } else {
        // Fallback for unknown file types or if fileType is missing
        contentHtml = `<div class="w-full h-32 flex items-center justify-center bg-gray-700 text-gray-400 text-xs">Unknown Media Type</div>`;
    }


    mediaElement.innerHTML = `
      ${contentHtml}
      <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
        ${media.fileName || 'N/A'}<br>
        <span class="text-gray-400">${media.timestamp ? new Date(media.timestamp.toDate()).toLocaleDateString() : 'N/A'}</span>
      </div>
      <div class="flex items-center absolute top-2 left-2 bg-gray-800/70 rounded-full px-2 py-1 text-xs">
        <button class="cheer-media-btn text-gray-400 hover:text-yellow-500 transition mr-1" data-collection="users" data-user-id="${media.userId}" data-media-id="${doc.id}">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7s-8-3.134-8-7 3.582-7 8-7 8 3.134 8 7zM9 9a1 1 0 000 2h2a1 1 0 100-2H9z" clip-rule="evenodd"></path>
          </svg>
        </button>
        <span class="text-gray-300">${media.cheers || 0}</span>
      </div>
      <button data-doc-id="${doc.id}" data-storage-path="${media.storagePath}" class="delete-media-btn absolute top-2 right-2 bg-red-600 p-1 rounded-full text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 11-2 0v6a1 1 0 112 0V8z" clip-rule="evenodd"></path>
        </svg>
      </button>
    `;
    userMediaList.appendChild(mediaElement);
  });
  attachDeleteListeners();
  attachMediaCheerListeners(); // NEW: Attach cheer listeners after rendering
}

async function deletePersonalMedia(docId, storagePath) {
  if (!confirm("Are you sure you want to delete this media? This action cannot be undone.")) {
    zeusLog("MEDIA_DELETE_CANCELLED", { docId });
    return;
  }

  zeusLog("MEDIA_DELETE_INITIATED", { docId, storagePath });
  try {
    // 1. Delete from Cloud Storage
    const storageRefToDelete = ref(storage, storagePath);
    await deleteObject(storageRefToDelete);
    zeusLog("MEDIA_STORAGE_DELETED", { storagePath });

    // 2. Delete metadata from Firestore
    const mediaDocRef = doc(db, `users/${auth.currentUser.uid}/personalMedia`, docId);
    await deleteDoc(mediaDocRef);
    zeusLog("MEDIA_METADATA_DELETED", { docId });

    alert("Media deleted successfully!");
  } catch (error) {
    console.error("Error deleting media:", error);
    alert(`Failed to delete media: ${error.message}`);
    zeusLog("MEDIA_DELETE_FAILED", { error: error.message });
  }
}

function attachDeleteListeners() {
  // Remove existing listeners to prevent duplicates
  document.querySelectorAll('.delete-media-btn').forEach(button => {
    button.onclick = null; // Clear previous click handler
  });

      document.querySelectorAll('.delete-media-btn').forEach(button => {
        button.addEventListener('click', async (e) => { // <--- ADD 'async' HERE
            const docId = e.currentTarget.dataset.docId;
            const storagePath = e.currentTarget.dataset.storagePath;
            if (docId && storagePath) {
                await deletePersonalMedia(docId, storagePath);
            } else {
   
        console.error("Missing docId or storagePath for deletion.");
        zeusLog("MEDIA_DELETE_MISSING_DATA");
      }
    });
  });
}

// ============================================================================
// ⚡ CHAT MEDIA UPLOAD & SEND MESSAGE FUNCTIONS
// ============================================================================

// A global or module-level variable to store the current chat room ID.
const CURRENT_CHAT_ROOM_ID = "war_room"; // Using 'war_room' as a placeholder chat ID

async function sendChatMessage(messageText = null, mediaFile = null) {
  const chatMessageInput = document.getElementById("chat-message-input");
  const sendButton = document.getElementById("send-chat-message-btn");
  const attachMediaBtn = document.getElementById("attach-media-btn");
  const chatUploadProgressBar = document.querySelector("#chat-upload-progress div");
  const chatUploadStatusText = document.getElementById("chat-upload-status");
  const chatUploadProgressContainer = document.getElementById("chat-upload-progress");

  if (!auth.currentUser) {
    chatUploadStatusText.textContent = "Error: You must be logged in to chat.";
    return;
  }

  // Disable UI during sending
  chatMessageInput.disabled = true;
  sendButton.disabled = true;
  attachMediaBtn.disabled = true;

  try {
    let messageData = {
      userId: auth.currentUser.uid,
      userName: auth.currentUser.displayName || "Anonymous",
      profilePic: auth.currentUser.photoURL || "/img/default_profile.png", // Fallback profile pic
      timestamp: serverTimestamp(),
    };

    if (messageText && messageText.trim() !== "") {
      messageData.text = messageText.trim();
    }

    if (mediaFile) {
      chatUploadStatusText.textContent = "Uploading media...";
      chatUploadProgressContainer.classList.remove("hidden");
      chatUploadProgressBar.style.width = "0%";

      // 1. Upload media to Cloud Storage
      // Construct a unique filename to prevent overwrites, e.g., using timestamp + original name
      const uniqueFileName = `${Date.now()}_${mediaFile.name}`;
      const filePath = `chat_media/${CURRENT_CHAT_ROOM_ID}/${uniqueFileName}`;
      const storageRef = ref(storage, filePath);
      const uploadTask = uploadBytesResumable(storageRef, mediaFile);

      // Monitor upload progress
      await new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            chatUploadProgressBar.style.width = `${progress}%`;
            chatUploadStatusText.textContent = `Media upload ${progress.toFixed(0)}% done.`;
            zeusLog("CHAT_MEDIA_UPLOAD_PROGRESS", { progress: progress.toFixed(0) });
          },
          (error) => {
            console.error("Chat media upload failed:", error);
            chatUploadStatusText.textContent = `Media upload failed: ${error.message}`;
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            messageData.mediaUrl = downloadURL;
            messageData.storagePath = filePath; // Store for potential deletion
            messageData.mediaType = mediaFile.type;
            zeusLog("CHAT_MEDIA_UPLOAD_COMPLETE", { downloadURL });
            resolve();
          }
        );
      });
    }

    // Only send if there's text or media
    if (!messageData.text && !messageData.mediaUrl) {
      chatUploadStatusText.textContent = "Message is empty.";
      return;
    }

    // 2. Add message data to Firestore
    const chatMessagesRef = collection(db, `chatRooms/${CURRENT_CHAT_ROOM_ID}/messages`); // Using subcollection for messages
    await addDoc(chatMessagesRef, messageData);
    zeusLog("CHAT_MESSAGE_SENT", { chatRoom: CURRENT_CHAT_ROOM_ID, hasMedia: !!mediaFile });

    // Clear inputs and reset UI
    chatMessageInput.value = "";
    document.getElementById("chat-media-file-input").value = ""; // Clear file input
    chatUploadStatusText.textContent = "Message sent!";
    chatUploadProgressContainer.classList.add("hidden");

  } catch (error) {
    console.error("Error sending chat message:", error);
    chatUploadStatusText.textContent = `Error sending message: ${error.message}`;
  } finally {
    // Re-enable UI
    chatMessageInput.disabled = false;
    sendButton.disabled = false;
    attachMediaBtn.disabled = false;
    chatMessageInput.focus(); // Keep focus on input
    // Clear status after a short delay
    setTimeout(() => chatUploadStatusText.textContent = "", 3000);
  }
}


// Function to render individual chat messages
function renderChatMessage(doc) {
  const message = doc.data();
  const chatMessagesDiv = document.getElementById("chat-messages");
  if (!chatMessagesDiv) return;

  const messageElement = document.createElement("div");
  messageElement.classList.add("flex", "items-start", "space-x-2", "text-sm");

  const isCurrentUser = auth.currentUser && message.userId === auth.currentUser.uid;
  if (isCurrentUser) {
    messageElement.classList.add("justify-end"); // Align current user's messages to the right
  }

  const timestamp = message.timestamp ? new Date(message.timestamp.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

  let mediaContent = '';
  if (message.mediaUrl) {
    if (message.mediaType && message.mediaType.startsWith('image')) {
      mediaContent = `<img src="${message.mediaUrl}" class="max-w-xs h-auto rounded-lg shadow-md my-1" loading="lazy" alt="Chat image">`;
    } else if (message.mediaType && message.mediaType.startsWith('video')) {
      mediaContent = `<video controls src="${message.mediaUrl}" class="max-w-xs h-auto rounded-lg shadow-md my-1"></video>`;
    }
  }

  messageElement.innerHTML = `
    <div class="${isCurrentUser ? 'order-2' : 'order-1'}">
      <img class="w-8 h-8 rounded-full object-cover" src="${message.profilePic}" alt="${message.userName}">
    </div>
    <div class="flex flex-col ${isCurrentUser ? 'items-end bg-yellow-700/20' : 'items-start bg-gray-700/50'} p-2 rounded-lg max-w-[70%] order-1">
      <div class="font-bold ${isCurrentUser ? 'text-yellow-400' : 'text-gray-200'}">${message.userName}</div>
      ${message.text ? `<p class="text-white">${message.text}</p>` : ''}
      ${mediaContent}
      <span class="text-xs text-gray-400 mt-1">${timestamp}</span>
    </div>
  `;
  chatMessagesDiv.appendChild(messageElement);
  chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight; // Auto-scroll to bottom
}


// ============================================================================
// ⚡ HIGHLIGHTS UPLOAD AND DISPLAY FUNCTIONS
// ============================================================================

async function uploadHighlight() {
  const fileInput = document.getElementById("highlight-file-input");
  const titleInput = document.getElementById("highlight-title-input");
  const uploadBtn = document.getElementById("upload-highlight-btn");
  const uploadProgressBar = document.querySelector("#highlight-upload-progress div");
  const uploadStatusText = document.getElementById("highlight-upload-status");
  const uploadProgressContainer = document.getElementById("highlight-upload-progress");

  if (!auth.currentUser) {
    uploadStatusText.textContent = "Error: You must be logged in to upload highlights.";
    return;
  }

  // Client-side check for Pro status (server-side rules are the ultimate gate)
  if (!userIsPro) { // `userIsPro` is a global variable from onAuthStateChanged
    uploadStatusText.textContent = "Error: Only PRO members can upload highlights.";
    return;
  }

  const file = fileInput.files[0];
  const title = titleInput.value.trim();

  if (!file) {
    uploadStatusText.textContent = "Please select a highlight video to upload.";
    return;
  }
  if (!title) {
    uploadStatusText.textContent = "Please enter a title for your highlight.";
    return;
  }

  // Reset UI
  uploadStatusText.textContent = "Starting highlight upload...";
  uploadProgressBar.style.width = "0%";
  uploadProgressContainer.classList.remove("hidden");
  uploadBtn.disabled = true;
  titleInput.disabled = true;

  try {
    // 1. Define the storage path for highlights
    // Using a timestamp + original name to ensure uniqueness, as any Pro can upload here.
    const uniqueFileName = `${Date.now()}_${file.name}`;
    // This matches our Storage Security Rule: /highlights/{allPaths=**}
    const filePath = `highlights/${uniqueFileName}`;
    const storageRef = ref(storage, filePath);

    // 2. Upload the file
    const uploadTask = uploadBytesResumable(storageRef, file);

    // 3. Monitor upload progress
    await new Promise((resolve, reject) => {
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          uploadProgressBar.style.width = `${progress}%`;
          uploadStatusText.textContent = `Highlight upload ${progress.toFixed(0)}% done.`;
          zeusLog("HIGHLIGHT_UPLOAD_PROGRESS", { progress: progress.toFixed(0) });
        },
        (error) => {
          console.error("Highlight upload failed:", error);
          uploadStatusText.textContent = `Highlight upload failed: ${error.message}`;
          reject(error);
        },
        async () => {
          zeusLog("HIGHLIGHT_UPLOAD_COMPLETE_PROMISE_RESOLVED");
          resolve(); // Resolve the promise once upload is complete
        }
      );
    });
    // Get download URL after upload is complete and promise resolved
    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);


    // 4. Store metadata in Firestore
    const highlightsCollectionRef = collection(db, `highlights`);
    await addDoc(highlightsCollectionRef, {
      userId: auth.currentUser.uid,
      userName: auth.currentUser.displayName || "PRO Member", // Pro user display name
      title: title,
      fileType: file.type,
      fileSize: file.size,
      downloadURL: downloadURL,
      storagePath: filePath, // Store for potential deletion/management
      timestamp: serverTimestamp(),
      likes: 0, // Initialize likes for "most reviewed" tracking
      cheers: 0, // NEW: Initialize cheers for highlights
    });

    uploadStatusText.textContent = "Highlight uploaded and metadata saved successfully!";
    uploadProgressContainer.classList.add("hidden");

  } catch (error) {
    console.error("Error uploading or saving highlight:", error);
    uploadStatusText.textContent = `An error occurred: ${error.message}`;
  } finally {
    // Re-enable UI
    uploadBtn.disabled = false;
    titleInput.disabled = false;
    fileInput.value = ''; // Clear file input
    titleInput.value = ''; // Clear title input
    setTimeout(() => uploadStatusText.textContent = "", 5000); // Clear status after a delay
  }
}

// Function to render community highlights
function renderCommunityHighlights(highlightDocs) {
  const highlightsListDiv = document.getElementById("community-highlights-list");
  if (!highlightsListDiv) return;

  highlightsListDiv.innerHTML = ''; // Clear existing highlights

  if (highlightDocs.empty) {
    highlightsListDiv.innerHTML = '<p class="col-span-full text-center text-gray-500">No community highlights yet. Be the first to upload!</p>';
    return;
  }

  highlightDocs.forEach(doc => {
    const highlight = doc.data();
    const highlightElement = document.createElement("div");
    highlightElement.classList.add("bg-black/50", "rounded-lg", "shadow-lg", "overflow-hidden", "border", "border-gray-800");

    const timestamp = highlight.timestamp ? new Date(highlight.timestamp.toDate()).toLocaleString() : 'N/A';

    let mediaContent = '';
    // Assuming highlights are primarily videos, but adding check for robustness
    if (highlight.fileType && highlight.fileType.startsWith('video')) {
      mediaContent = `<video controls src="${highlight.downloadURL}" class="w-full h-48 object-cover"></video>`;
    } else if (highlight.fileType && highlight.fileType.startsWith('image')) {
       mediaContent = `<img src="${highlight.downloadURL}" alt="${highlight.title}" class="w-full h-48 object-cover" loading="lazy">`;
    } else {
       mediaContent = `<div class="w-full h-48 flex items-center justify-center bg-gray-700 text-gray-400 text-xs">Unsupported Highlight Type</div>`;
    }


    highlightElement.innerHTML = `
      ${mediaContent}
      <div class="p-4">
        <h4 class="font-bold text-lg text-yellow-500 mb-1">${highlight.title}</h4>
        <p class="text-gray-400 text-xs">Uploaded by: ${highlight.userName} on ${timestamp}</p>
        <div class="flex items-center mt-3">
          <button class="like-highlight-btn text-gray-400 hover:text-red-500 transition mr-2" data-highlight-id="${doc.id}">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
            </svg>
          </button>
          <span class="text-gray-300 text-sm">${highlight.likes || 0} Likes</span>

          <button class="cheer-media-btn text-gray-400 hover:text-green-500 transition ml-4 mr-2" data-collection="highlights" data-media-id="${doc.id}">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7s-8-3.134-8-7 3.582-7 8-7 8 3.134 8 7zM9 9a1 1 0 000 2h2a1 1 0 100-2H9z" clip-rule="evenodd"></path>
            </svg>
          </button>
          <span class="text-gray-300 text-sm">${highlight.cheers || 0} Cheers</span>
        </div>
      </div>
    `;
    highlightsListDiv.appendChild(highlightElement);
  });
  attachHighlightLikeListeners(); // Attach listeners for new like buttons
  attachMediaCheerListeners(); // NEW: Attach cheer listeners for highlights
}

// Function to handle liking a highlight (simple increment)
async function likeHighlight(highlightId) {
  if (!auth.currentUser) {
    alert("Please log in to like a highlight.");
    return;
  }

  try {
    const highlightRef = doc(db, 'highlights', highlightId);
    // Atomically increment the 'likes' field
    await updateDoc(highlightRef, {
      likes: increment(1)
    });
    zeusLog("HIGHLIGHT_LIKED", { highlightId, userId: auth.currentUser.uid });
  } catch (error) {
    console.error("Error liking highlight:", error);
    alert("Failed to like highlight. Please try again.");
  }
}

function attachHighlightLikeListeners() {
  document.querySelectorAll('.like-highlight-btn').forEach(button => {
    button.onclick = null; // Clear existing listeners to prevent duplicates
    button.addEventListener('click', (e) => {
      const highlightId = e.currentTarget.dataset.highlightId;
      if (highlightId) {
        likeHighlight(highlightId);
      }
    });
  });
}

// ============================================================================
// ⚡ PLAYER HIGHLIGHTS FUNCTIONS AND DISPLAY
// ============================================================================

let unsubscribePlayers = null; // To store the unsubscribe function for the player listener

// Function to handle cheering a player (already exists)
async function cheerPlayer(playerId) {
  if (!auth.currentUser) {
    alert("You must be logged in to cheer a player.");
    return;
  }
  try {
    const playerRef = doc(db, 'players', playerId);
    await updateDoc(playerRef, {
      cheers: increment(1)
    });
    zeusLog("PLAYER_CHEERED", { playerId, userId: auth.currentUser.uid });
  } catch (error) {
    console.error("Error cheering player:", error);
    alert("Failed to cheer player. Please try again.");
  }
}

// Attach event listeners for the "Cheer" buttons dynamically (already exists)
function attachCheerListeners() {
    // Clear previous listeners to prevent duplicates if displayPlayers runs multiple times
    document.querySelectorAll('.cheer-player-btn').forEach(button => {
        // Clone and replace to effectively remove all previous event listeners
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
    });

    document.querySelectorAll('.cheer-player-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const playerId = e.currentTarget.dataset.playerId;
            if (playerId) {
                cheerPlayer(playerId);
            }
        });
    });
}


function renderPlayerCard(player) {
  const playerCard = document.createElement("div");
  playerCard.classList.add("bg-black/50", "rounded-lg", "shadow-lg", "overflow-hidden", "border", "border-gray-800");

  const playerId = player.id; // Get the player ID for comments and cheers

  // Ensure highlightVideoUrls is an array before mapping
  const highlightVideosHtml = player.highlightVideoUrls && Array.isArray(player.highlightVideoUrls) && player.highlightVideoUrls.length > 0
    ? player.highlightVideoUrls.map(url => `
        <div class="mb-2">
          <video controls src="${url}" class="w-full h-32 object-cover"></video>
        </div>`).join('')
    : (player.associatedHighlightIds && Array.isArray(player.associatedHighlightIds) && player.associatedHighlightIds.length > 0 ?
      `<p class="text-xs text-gray-500 mb-2">Has ${player.associatedHighlightIds.length} community highlights (click for details)</p>` :
      '<p class="text-xs text-gray-500 mb-2">No direct highlight videos.</p>');


  playerCard.innerHTML = `
    <img src="${player.profilePicUrl || '/img/default_player.png'}" alt="${player.name}" class="w-full h-48 object-cover object-top">
    <div class="p-4">
      <h4 class="font-bold text-xl text-yellow-500 mb-1">${player.name}</h4>
      <p class="text-gray-300 text-sm mb-1">${player.level} - ${player.sport}</p>
      <p class="text-gray-400 text-xs mb-2">${player.team} ${player.school ? `(${player.school})` : ''}</p>
      ${player.stLouisConnection && player.stLouisConnection.isFromSTL ? `<p class="text-yellow-600 text-xs font-bold mb-2">⭐ St. Louis Connection! ${player.stLouisConnection.details ? `(${player.stLouisConnection.details})` : ''}</p>` : ''}
      <p class="text-gray-300 text-sm">${player.bio || 'No bio available.'}</p>
      ${highlightVideosHtml}
      ${player.statsSummary ? `
        <div class="mt-3 border-t border-gray-700 pt-3">
          <h5 class="text-yellow-600 text-xs font-bold uppercase mb-1">Key Stats:</h5>
          <ul class="text-gray-400 text-xs list-disc pl-4">
            ${Object.entries(player.statsSummary).map(([key, value]) => `<li>${key}: ${value}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      <!-- NEW: Cheer Button -->
      <div class="flex items-center mt-3 border-t border-gray-700 pt-3">
        <button class="cheer-player-btn text-gray-400 hover:text-yellow-500 transition mr-2" data-player-id="${playerId}">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7s-8-3.134-8-7 3.582-7 8-7 8 3.134 8 7zM9 9a1 1 0 000 2h2a1 1 0 100-2H9z" clip-rule="evenodd"></path>
          </svg>
        </button>
        <span class="text-gray-300 text-sm">${player.cheers || 0} Cheers</span>
      </div>

      <!-- Existing Comments Section -->
      <div class="mt-4 border-t border-gray-700 pt-4">
        <h5 class="text-yellow-600 text-xs font-bold uppercase mb-2">Comments</h5>
        <div id="player-comments-${playerId}" class="space-y-2 text-sm text-gray-300 max-h-40 overflow-y-auto no-scrollbar mb-3">
          <!-- Comments will be loaded here -->
          <p class="text-gray-500">No comments yet.</p>
        </div>
        <div class="flex items-center space-x-2">
          <input type="text" id="comment-input-${playerId}" placeholder="Add a comment..." class="flex-grow grid-input text-xs" />
          <button data-player-id="${playerId}" class="post-comment-btn bg-gray-700 text-gray-300 px-3 py-1 rounded text-xs font-bold hover:bg-gray-600">Post</button>
        </div>
        <p id="comment-status-${playerId}" class="text-xs text-gray-400 mt-1"></p>
      </div>
    </div>
  `;

  // After rendering the card, load and display comments for this player
  loadPlayerComments(playerId); // Load comments for this specific player card

  return playerCard;
}

// Function to load and display comments for a specific player
async function loadPlayerComments(playerId) {
  const commentsListDiv = document.getElementById(`player-comments-${playerId}`);
  if (!commentsListDiv) return;

  commentsListDiv.innerHTML = '<p class="text-gray-500">Loading comments...</p>';

  try {
    const commentsRef = collection(db, `players/${playerId}/comments`);
    const q = query(commentsRef, orderBy('timestamp', 'asc'), limit(5)); // Show last 5 comments
    const commentsSnapshot = await getDocs(q); // Use getDocs for a one-time fetch

    commentsListDiv.innerHTML = ''; // Clear loading message

    if (commentsSnapshot.empty) {
      commentsListDiv.innerHTML = '<p class="text-gray-500">No comments yet.</p>';
      return;
    }

    commentsSnapshot.forEach(doc => {
      const comment = doc.data();
      const commentTime = comment.timestamp ? new Date(comment.timestamp.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
      commentsListDiv.innerHTML += `
        <div>
          <span class="font-bold text-yellow-400">${comment.userName || 'Anonymous'}</span>
          <span class="text-gray-500 text-xs">(${commentTime})</span>:
          <span class="text-white">${comment.text}</span>
        </div>
      `;
    });
    commentsListDiv.scrollTop = commentsListDiv.scrollHeight; // Scroll to bottom
  } catch (error) {
    console.error(`Error loading comments for player ${playerId}:`, error);
    commentsListDiv.innerHTML = '<p class="text-red-400">Error loading comments.</p>';
    zeusLog("LOAD_PLAYER_COMMENTS_FAILED", { playerId, error: error.message });
  }
}

// Function to post a new comment for a player
async function postPlayerComment(playerId, commentText) {
  if (!auth.currentUser) {
    alert("You must be logged in to post a comment.");
    return;
  }
  if (!commentText.trim()) {
    alert("Comment cannot be empty.");
    return;
  }

  const commentInput = document.getElementById(`comment-input-${playerId}`);
  const commentStatus = document.getElementById(`comment-status-${playerId}`);
  const postBtn = document.querySelector(`.post-comment-btn[data-player-id="${playerId}"]`);

  if (commentInput) commentInput.disabled = true;
  if (postBtn) postBtn.disabled = true;
  if (commentStatus) commentStatus.textContent = "Posting...";

  try {
    const commentsRef = collection(db, `players/${playerId}/comments`);
    await addDoc(commentsRef, {
      userId: auth.currentUser.uid,
      userName: auth.currentUser.displayName || auth.currentUser.email,
      profilePic: auth.currentUser.photoURL || '/img/default_profile.png',
      text: commentText.trim(),
      timestamp: serverTimestamp(),
    });

    if (commentInput) commentInput.value = ''; // Clear input
    if (commentStatus) commentStatus.textContent = "Comment posted!";
    zeusLog("PLAYER_COMMENT_POSTED", { playerId, userId: auth.currentUser.uid });

    // Refresh comments for this player
    loadPlayerComments(playerId);

  } catch (error) {
    console.error("Error posting comment:", error);
    if (commentStatus) commentStatus.textContent = `Error: ${error.message}`;
    zeusLog("PLAYER_COMMENT_POST_FAILED", { playerId, error: error.message });
  } finally {
    if (commentInput) commentInput.disabled = false;
    if (postBtn) postBtn.disabled = false;
    setTimeout(() => {
      if (commentStatus) commentStatus.textContent = "";
    }, 3000);
  }
}


function displayPlayers(playersSnapshot) {
  const playersListDiv = document.getElementById("st-louis-players-list");
  if (!playersListDiv) return;

  playersListDiv.innerHTML = ''; // Clear existing players

  if (playersSnapshot.empty) {
    playersListDiv.innerHTML = '<p class="col-span-full text-center text-gray-500">No St. Louis players found for current filters.</p>';
    return;
  }

  playersSnapshot.forEach(doc => {
    const player = { id: doc.id, ...doc.data() }; // Include doc.id in player object
    playersListDiv.appendChild(renderPlayerCard(player));
  });
  zeusLog("PLAYER_HIGHLIGHTS_DISPLAYED", { count: playersSnapshot.size });
  attachPlayerCommentListeners(); // Attach comment listeners after all cards are rendered
  attachCheerListeners(); // Attach cheer listeners after all cards are rendered
}

// Function to set up the real-time listener for players
function setupPlayersListener() {
  if (unsubscribePlayers) {
    unsubscribePlayers(); // Unsubscribe from previous listener if it exists
    zeusLog("UNSUBSCRIBED_FROM_PREVIOUS_PLAYERS_LISTENER");
  }

  const playersCollectionRef = collection(db, `players`);
  let playerQuery = query(playersCollectionRef);

  // Apply filters
  const levelFilter = document.getElementById("player-level-filter")?.value;
  const sportFilter = document.getElementById("player-sport-filter")?.value;

  // Always filter for St. Louis connection
  playerQuery = query(playerQuery, where("stLouisConnection.isFromSTL", "==", true));

  if (levelFilter && levelFilter !== "All") {
    playerQuery = query(playerQuery, where("level", "==", levelFilter));
  }
  if (sportFilter && sportFilter !== "All") {
    playerQuery = query(playerQuery, where("sport", "==", sportFilter));
  }

  playerQuery = query(playerQuery, orderBy('name', 'asc')); // Order results

  unsubscribePlayers = onSnapshot(playerQuery, (snapshot) => {
    displayPlayers(snapshot);
    zeusLog("ST_LOUIS_PLAYERS_LISTENER_UPDATED", { count: snapshot.size });
  }, (error) => {
    console.error("Error listening to St. Louis players:", error);
    zeusLog("ST_LOUIS_PLAYERS_LISTENER_ERROR", { error: error.message });
  });
  zeusLog("NEW_ST_LOUIS_PLAYERS_LISTENER_SETUP");
}

// Attach event listeners for the "Post Comment" buttons dynamically
function attachPlayerCommentListeners() {
    // Clear previous listeners to prevent duplicates if displayPlayers runs multiple times
    document.querySelectorAll('.post-comment-btn').forEach(button => {
        // Clone and replace to effectively remove all previous event listeners
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
    });

    document.querySelectorAll('.post-comment-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const playerId = e.currentTarget.dataset.playerId;
            const commentInput = document.getElementById(`comment-input-${playerId}`);
            if (playerId && commentInput) {
                postPlayerComment(playerId, commentInput.value);
            }
        });
    });
}


// ============================================================================
// ⚡ NEW: PRO PLAYER PLATFORM FUNCTIONS AND DISPLAY
// ============================================================================

async function publishProPost() {
  const titleInput = document.getElementById("pro-post-title");
  const contentInput = document.getElementById("pro-post-content");
  const publishBtn = document.getElementById("post-pro-content-btn");
  const statusText = document.getElementById("pro-post-status");

  if (!auth.currentUser) {
    statusText.textContent = "Error: You must be logged in to publish a post.";
    return;
  }
  if (!userIsPro) {
    statusText.textContent = "Error: Only PRO members can publish posts.";
    return;
  }

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (!title || !content) {
    statusText.textContent = "Title and content cannot be empty.";
    return;
  }

  publishBtn.disabled = true;
  statusText.textContent = "Publishing post...";

  try {
    const proPlayerPostsRef = collection(db, `proPlayerPosts`);
    await addDoc(proPlayerPostsRef, {
      userId: auth.currentUser.uid,
      userName: auth.currentUser.displayName || "Pro Player",
      userProfilePic: auth.currentUser.photoURL || "/img/default_pro.png",
      title: title,
      content: content,
      timestamp: serverTimestamp(),
      // mediaUrl: '', // Add this later if you implement media uploads for Pro posts
      // mediaType: ''
    });

    statusText.textContent = "Post published successfully!";
    titleInput.value = '';
    contentInput.value = '';
    zeusLog("PRO_POST_PUBLISHED", { userId: auth.currentUser.uid });

  } catch (error) {
    console.error("Error publishing Pro post:", error);
    statusText.textContent = `Error: ${error.message}`;
    zeusLog("PRO_POST_PUBLISH_FAILED", { error: error.message });
  } finally {
    publishBtn.disabled = false;
    setTimeout(() => statusText.textContent = "", 3000);
  }
}

function renderProPost(post) {
  const postElement = document.createElement("div");
  postElement.classList.add("bg-black/50", "rounded-lg", "p-4", "border", "border-gray-700", "shadow-sm");
  const timestamp = post.timestamp ? new Date(post.timestamp.toDate()).toLocaleString() : 'N/A';

  postElement.innerHTML = `
    <div class="flex items-center mb-3">
      <img src="${post.userProfilePic || '/img/default_pro.png'}" alt="${post.userName}" class="w-10 h-10 rounded-full object-cover mr-3">
      <div>
        <h5 class="font-bold text-yellow-500">${post.userName} (PRO)</h5>
        <span class="text-gray-400 text-xs">${timestamp}</span>
      </div>
    </div>
    <h4 class="font-bold text-lg text-white mb-2">${post.title}</h4>
    <p class="text-gray-300 text-sm">${post.content}</p>
    ${post.mediaUrl ? `<img src="${post.mediaUrl}" alt="Post Media" class="mt-3 rounded-lg max-w-full h-auto">` : ''}
  `;
  return postElement;
}

function displayProPosts(postsSnapshot) {
  const proPostsListDiv = document.getElementById("pro-player-posts-list");
  if (!proPostsListDiv) return;

  proPostsListDiv.innerHTML = ''; // Clear existing posts

  if (postsSnapshot.empty) {
    proPostsListDiv.innerHTML = '<p class="text-gray-500 text-center">No Pro Player updates yet.</p>';
    return;
  }

  postsSnapshot.forEach(doc => {
    const post = doc.data();
    proPostsListDiv.appendChild(renderProPost(post));
  });
  zeusLog("PRO_PLAYER_POSTS_DISPLAYED", { count: postsSnapshot.size });
}

// ============================================================================
// ⚡ NEW: WEBRTC VIDEO CALLING FUNCTIONS
// ============================================================================

// Global WebRTC variables
let peerConnection = null;
let localStream = null;
let remoteStream = null;
let currentCallId = null;
let callListenerUnsubscribe = null;
let offerListenerUnsubscribe = null;
let answerListenerUnsubscribe = null;
let callerCandidatesListenerUnsubscribe = null;
let receiverCandidatesListenerUnsubscribe = null;

const servers = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};

async function startLocalMedia() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    document.getElementById('local-video').srcObject = stream;
    localStream = stream;
    return stream;
  } catch (error) {
    console.error('Error getting user media:', error);
    alert('Failed to get camera/microphone. Please ensure permissions are granted.');
    return null;
  }
}

function stopAllMedia() {
  if (localStream) {
    localStream.getTracks().forEach(track => track.stop());
    localStream = null;
  }
  if (remoteStream) {
    remoteStream.getTracks().forEach(track => track.stop());
    remoteStream = null;
  }
  document.getElementById('local-video').srcObject = null;
  document.getElementById('remote-video').srcObject = null;
}

function resetCallState() {
  if (peerConnection) {
    peerConnection.close();
    peerConnection = null;
  }
  currentCallId = null;
  stopAllMedia();
  document.getElementById('incoming-call-notification').classList.add('hidden');
  document.getElementById('start-call-btn').disabled = false;
  document.getElementById('hang-up-btn').disabled = true;

  // Unsubscribe all listeners
  if (callListenerUnsubscribe) callListenerUnsubscribe();
  if (offerListenerUnsubscribe) offerListenerUnsubscribe();
  if (answerListenerUnsubscribe) answerListenerUnsubscribe();
  if (callerCandidatesListenerUnsubscribe) callerCandidatesListenerUnsubscribe();
  if (receiverCandidatesListenerUnsubscribe) receiverCandidatesListenerUnsubscribe();

  callListenerUnsubscribe = null;
  offerListenerUnsubscribe = null;
  answerListenerUnsubscribe = null;
  callerCandidatesListenerUnsubscribe = null;
  receiverCandidatesListenerUnsubscribe = null;
  zeusLog("CALL_STATE_RESET");
}


// Function to initiate a call
async function startCall() {
  if (!auth.currentUser) {
    alert("You must be logged in to start a call.");
    return;
  }
  resetCallState(); // Ensure clean state before starting new call

  const calleeId = document.getElementById('callee-id-input').value.trim();
  if (!calleeId || calleeId === auth.currentUser.uid) {
    alert("Please enter a valid recipient User ID (UID) to call.");
    return;
  }

  document.getElementById('start-call-btn').disabled = true;
  document.getElementById('hang-up-btn').disabled = false;

  zeusLog("CALL_INITIATED", { calleeId });

  // 1. Create a call document in Firestore
  // The callId can be a combination of caller and receiver UIDs for uniqueness
  const callRef = doc(collection(db, 'calls')); // Let Firestore generate ID for initial call
  currentCallId = callRef.id;

  await setDoc(callRef, {
    callerId: auth.currentUser.uid,
    receiverId: calleeId,
    status: 'pending',
    createdAt: serverTimestamp(),
    callerName: auth.currentUser.displayName || auth.currentUser.email,
    receiverName: "Unknown" // Will be updated by receiver or on client side from their profile if available
  });
  zeusLog("CALL_DOCUMENT_CREATED", { callId: currentCallId });

  // 2. Set up WebRTC Peer Connection
  peerConnection = new RTCPeerConnection(servers);

  // Get local media stream
  const stream = await startLocalMedia();
  if (!stream) {
    hangUpCall();
    return;
  }
  stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

  // Handle incoming media tracks from remote peer
  peerConnection.ontrack = (event) => {
    if (!remoteStream) {
      remoteStream = new MediaStream();
      document.getElementById('remote-video').srcObject = remoteStream;
    }
    event.streams[0].getTracks().forEach(track => {
      remoteStream.addTrack(track);
    });
  };

  // Listen for ICE candidates and add them to Firestore
  const callerCandidatesCollection = collection(callRef, 'callerCandidates');
  peerConnection.onicecandidate = async (event) => {
    if (event.candidate) {
      await addDoc(callerCandidatesCollection, event.candidate.toJSON());
      zeusLog("CALLER_ICE_CANDIDATE", { callId: currentCallId });
    }
  };

  // 3. Create and set SDP Offer
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  await setDoc(doc(callRef, 'offer', 'offerDoc'), {
    sdp: offer.sdp,
    type: offer.type,
    createdAt: serverTimestamp(),
  });
  zeusLog("SDP_OFFER_SENT", { callId: currentCallId });

  // 4. Listen for changes in call status and remote answer
  listenForRemoteAnswer(callRef);
  listenForReceiverCandidates(callRef);
}


// Function to hang up the call
async function hangUpCall() {
  if (!currentCallId) return;

  const callRef = doc(db, 'calls', currentCallId);
  await updateDoc(callRef, { status: 'ended', endedAt: serverTimestamp() });
  zeusLog("CALL_ENDED", { callId: currentCallId });
  resetCallState();
}


// Listen for changes in the call document (status, answer)
function listenForRemoteAnswer(callRef) {
  answerListenerUnsubscribe = onSnapshot(collection(callRef, 'answer'), async (snapshot) => {
    if (!snapshot.empty && peerConnection && !peerConnection.currentRemoteDescription) {
      const answer = snapshot.docs[0].data();
      const sdpAnswer = new RTCSessionDescription(answer);
      await peerConnection.setRemoteDescription(sdpAnswer);
      zeusLog("SDP_ANSWER_RECEIVED", { callId: callRef.id });
    }
  });

  callListenerUnsubscribe = onSnapshot(callRef, (docSnap) => {
    if (docSnap.exists()) {
      const callData = docSnap.data();
      if (callData.status === 'ended' || callData.status === 'rejected' || callData.status === 'failed') {
        if (currentCallId === docSnap.id) { // Only reset if it's the current active call
          alert(`Call ${callData.status}.`);
          resetCallState();
        }
      } else if (callData.status === 'accepted') {
        zeusLog("CALL_ACCEPTED_BY_RECEIVER", { callId: docSnap.id });
        // Optionally update UI for call accepted state
      }
    } else {
      // Document deleted or doesn't exist anymore
      if (currentCallId === docSnap.id) {
        alert("Call ended by other party.");
        resetCallState();
      }
    }
  });
}

// Listen for incoming ICE candidates from the receiver
function listenForReceiverCandidates(callRef) {
  receiverCandidatesListenerUnsubscribe = onSnapshot(collection(callRef, 'receiverCandidates'), (snapshot) => {
    snapshot.docChanges().forEach(async (change) => {
      if (change.type === 'added') {
        const candidate = new RTCIceCandidate(change.doc.data());
        await peerConnection.addIceCandidate(candidate);
        zeusLog("RECEIVER_ICE_CANDIDATE_ADDED", { callId: callRef.id });
      }
    });
  });
}


// Function to listen for incoming calls (for the receiver)
let incomingCallListenerUnsubscribe = null; // Store for global listener cleanup
async function listenForIncomingCalls() {
  if (!auth.currentUser) return;

  // Cleanup any old incoming call listener
  if (incomingCallListenerUnsubscribe) incomingCallListenerUnsubscribe();

  const myIncomingCallsQuery = query(
    collection(db, 'calls'),
    where('receiverId', '==', auth.currentUser.uid),
    where('status', '==', 'pending') // Only interested in pending calls
  );

  incomingCallListenerUnsubscribe = onSnapshot(myIncomingCallsQuery, async (snapshot) => {
    if (!snapshot.empty) {
      const incomingCallDoc = snapshot.docs[0]; // Take the first incoming call
      const callData = incomingCallDoc.data();

      // Only show notification if not already in a call or already handling this one
      if (!currentCallId || currentCallId !== incomingCallDoc.id) {
        currentCallId = incomingCallDoc.id; // Set current call ID
        document.getElementById('incoming-caller-name').textContent = callData.callerName || 'Unknown Caller';
        document.getElementById('incoming-call-notification').classList.remove('hidden');
        zeusLog("INCOMING_CALL", { callId: currentCallId, callerId: callData.callerId });
      }
    } else {
      // No incoming calls or all handled/rejected
      if (!peerConnection || peerConnection.connectionState === 'closed') { // Only hide if no active call
        document.getElementById('incoming-call-notification').classList.add('hidden');
        if (!currentCallId) { // Only reset if no pending/active calls
           resetCallState(); // Ensure clean UI if last incoming call disappeared
        }
      }
    }
  });
  zeusLog("LISTENING_FOR_INCOMING_CALLS", { userId: auth.currentUser.uid });
}


// Function to accept an incoming call
async function acceptCall() {
  if (!auth.currentUser || !currentCallId) {
    alert("No active incoming call to accept.");
    return;
  }
  zeusLog("ACCEPT_CALL_INITIATED", { callId: currentCallId });

  document.getElementById('incoming-call-notification').classList.add('hidden');
  document.getElementById('start-call-btn').disabled = true;
  document.getElementById('hang-up-btn').disabled = false;

  const callRef = doc(db, 'calls', currentCallId);
  const offerDoc = await getDoc(doc(callRef, 'offer', 'offerDoc'));
  if (!offerDoc.exists()) {
    alert("Call offer not found.");
    hangUpCall();
    return;
  }
  const offer = offerDoc.data();

  // 1. Set up WebRTC Peer Connection for receiver
  peerConnection = new RTCPeerConnection(servers);

  // Get local media stream
  const stream = await startLocalMedia();
  if (!stream) {
    hangUpCall();
    return;
  }
  stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

  // Handle incoming media tracks from remote peer
  peerConnection.ontrack = (event) => {
    if (!remoteStream) {
      remoteStream = new MediaStream();
      document.getElementById('remote-video').srcObject = remoteStream;
    }
    event.streams[0].getTracks().forEach(track => {
      remoteStream.addTrack(track);
    });
  };

  // Listen for ICE candidates and add them to Firestore
  const receiverCandidatesCollection = collection(callRef, 'receiverCandidates');
  peerConnection.onicecandidate = async (event) => {
    if (event.candidate) {
      await addDoc(receiverCandidatesCollection, event.candidate.toJSON());
      zeusLog("RECEIVER_ICE_CANDIDATE", { callId: currentCallId });
    }
  };

  // 2. Set remote description with caller's offer
  const rtcOffer = new RTCSessionDescription(offer);
  await peerConnection.setRemoteDescription(rtcOffer);

  // 3. Create and set SDP Answer
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  await setDoc(doc(callRef, 'answer', 'answerDoc'), {
    sdp: answer.sdp,
    type: answer.type,
    createdAt: serverTimestamp(),
  });
  zeusLog("SDP_ANSWER_SENT", { callId: currentCallId });

  // 4. Update call status in Firestore
  await updateDoc(callRef, {
    status: 'accepted',
    answeredAt: serverTimestamp(),
    receiverName: auth.currentUser.displayName || auth.currentUser.email
  });
  zeusLog("CALL_ACCEPTED", { callId: currentCallId });

  // 5. Listen for incoming ICE candidates from the caller
  listenForCallerCandidates(callRef);
  // 6. Listen for call status changes (e.g., hang up)
  listenForRemoteCallStatus(callRef);
}

// Function to reject an incoming call
async function rejectCall() {
  if (!auth.currentUser || !currentCallId) {
    document.getElementById('incoming-call-notification').classList.add('hidden');
    return;
  }
  zeusLog("CALL_REJECTED", { callId: currentCallId });

  const callRef = doc(db, 'calls', currentCallId);
  await updateDoc(callRef, { status: 'rejected', endedAt: serverTimestamp() });
  resetCallState(); // Clean up state
}

// Listen for incoming ICE candidates from the caller (for receiver)
function listenForCallerCandidates(callRef) {
  callerCandidatesListenerUnsubscribe = onSnapshot(collection(callRef, 'callerCandidates'), (snapshot) => {
    snapshot.docChanges().forEach(async (change) => {
      if (change.type === 'added') {
        const candidate = new RTCIceCandidate(change.doc.data());
        await peerConnection.addIceCandidate(candidate);
        zeusLog("CALLER_ICE_CANDIDATE_ADDED_TO_RECEIVER", { callId: callRef.id });
      }
    });
  });
}

// Listen for remote call status changes (for receiver)
function listenForRemoteCallStatus(callRef) {
  callListenerUnsubscribe = onSnapshot(callRef, (docSnap) => {
    if (docSnap.exists()) {
      const callData = docSnap.data();
      if (callData.status === 'ended' || callData.status === 'failed') {
        if (currentCallId === docSnap.id) { // Only reset if it's the current active call
          alert(`Call ${callData.status}.`);
          resetCallState();
        }
      }
    } else {
      // Document deleted by caller
      if (currentCallId === docSnap.id) {
        alert("Call ended by other party.");
        resetCallState();
      }
    }
  });
}

// ============================================================================
// ⚡ ACKNOWLEDGED HIGHLIGHTS FUNCTIONS AND DISPLAY
// ============================================================================

// Function to render an acknowledged highlight
function renderAcknowledgedHighlight(acknowledgedHighlight) {
  const highlightElement = document.createElement("div");
  highlightElement.classList.add("bg-gradient-to-br", "from-yellow-800/50", "to-yellow-500/20", "rounded-lg", "shadow-xl", "overflow-hidden", "border", "border-yellow-600");

  const highlight = acknowledgedHighlight.data; // The actual highlight data stored within the acknowledged highlight record
  const acknowledgedAt = acknowledgedHighlight.acknowledgedAt ? new Date(acknowledgedHighlight.acknowledgedAt.toDate()).toLocaleString() : 'N/A';

  // Fallback if highlight.mediaUrl is not directly available in the acknowledged record
  const mediaUrl = highlight.downloadURL || '#';
  const mediaType = highlight.fileType || 'video/mp4'; // Assume video, or check more robustly

  let mediaContent = '';
  if (mediaType && mediaType.startsWith('video')) {
    mediaContent = `<video controls src="${mediaUrl}" class="w-full h-48 object-cover"></video>`;
  } else if (mediaType && mediaType.startsWith('image')) {
    mediaContent = `<img src="${mediaUrl}" alt="${highlight.title || 'Acknowledged Highlight'}" class="w-full h-48 object-cover" loading="lazy">`;
  } else {
    mediaContent = `<div class="w-full h-48 flex items-center justify-center bg-gray-700 text-gray-400 text-xs">Unsupported Media Type</div>`;
  }

  highlightElement.innerHTML = `
    ${mediaContent}
    <div class="p-4">
      <h4 class="font-bold text-lg text-yellow-300 mb-1">🏆 ${highlight.title || 'Acknowledged Highlight'}</h4>
      <p class="text-gray-300 text-xs">Acknowledged: ${acknowledgedAt}</p>
      <p class="text-gray-400 text-xs mt-1">Original Likes: ${highlight.likes || 0}</p>
      <p class="text-gray-400 text-xs">Uploaded by: ${highlight.userName || 'N/A'}</p>
    </div>
  `;
  return highlightElement;
}


// Function to display acknowledged highlights
function displayAcknowledgedHighlights(acknowledgedHighlightsSnapshot) {
  const acknowledgedHighlightsListDiv = document.getElementById("acknowledged-highlights-list");
  if (!acknowledgedHighlightsListDiv) return;

  acknowledgedHighlightsListDiv.innerHTML = ''; // Clear existing
  if (acknowledgedHighlightsSnapshot.empty) {
    acknowledgedHighlightsListDiv.innerHTML = '<p class="col-span-full text-center text-gray-500">No acknowledged highlights yet. Check back soon!</p>';
    return;
  }

  acknowledgedHighlightsSnapshot.forEach(doc => {
    // The document in acknowledgedHighlights contains the original highlight's ID and data
    const acknowledgedRecord = doc.data();
    acknowledgedHighlightsListDiv.appendChild(renderAcknowledgedHighlight(acknowledgedRecord));
  });
  zeusLog("ACKNOWLEDGED_HIGHLIGHTS_DISPLAYED", { count: acknowledgedHighlightsSnapshot.size });
}

// ============================================================================
// ⚡ ASCENSION WATCHTOWER — AUTH STATE HANDLER (Combined with all new listeners)
// ============================================================================
onAuthStateChanged(auth, async (user) => {
  zeusLog("AUTH_STATE_CHANGED", { uid: user?.uid || null });
  currentUser = user;

  const loader = document.getElementById("loading-overlay");
  const main = document.getElementById("main-content");
  const paywall = document.getElementById("paywall-content");
  const loginBtn = document.getElementById("header-auth-btn");
  const accountBtn = document.getElementById("account-btn");
  const premiumStatus = document.getElementById("account-premium-status");
  const userMediaList = document.getElementById('user-media-list');
  const chatMessagesDiv = document.getElementById('chat-messages');
  const highlightsUploadPanel = document.getElementById('highlights-upload-panel');
  const communityHighlightsList = document.getElementById('community-highlights-list');
  const playerHighlightsPanel = document.getElementById('player-highlights-panel');
  const proPlayerDashboardPanel = document.getElementById('pro-player-dashboard-panel');
  const proPlayerPostsList = document.getElementById('pro-player-posts-list');
  const videoCallPanel = document.getElementById('video-call-panel');
  const acknowledgedHighlightsList = document.getElementById('acknowledged-highlights-list');


  loader?.classList.add("hidden");

  // ── NO USER ─────────────────────────────────────────────
  if (!user) {
    loginBtn?.classList.remove("hidden");
    accountBtn?.classList.add("hidden");
    main?.classList.add("hidden");
    paywall?.classList.remove("hidden");
    window.speechSynthesis.cancel();

    if (mortalTimerInterval) clearInterval(mortalTimerInterval);
    mortalTimerInterval = null;

    // Clear and hide all user-specific/pro-specific panels
    if (userMediaList) userMediaList.innerHTML = '';
    if (chatMessagesDiv) chatMessagesDiv.innerHTML = '<p class="text-gray-500 text-center">Please log in to view chat.</p>';
    if (highlightsUploadPanel) highlightsUploadPanel.classList.add('hidden');
    if (communityHighlightsList) communityHighlightsList.innerHTML = '<p class="col-span-full text-center text-gray-500">Please log in to view highlights.</p>';
    if (playerHighlightsPanel) playerHighlightsPanel.classList.add('hidden');
    if (proPlayerDashboardPanel) proPlayerDashboardPanel.classList.add('hidden');
    if (proPlayerPostsList) proPlayerPostsList.innerHTML = '<p class="text-gray-500 text-center">Please log in to view Pro Player updates.</p>';
    if (videoCallPanel) videoCallPanel.classList.add('hidden');
    if (acknowledgedHighlightsList) acknowledgedHighlightsList.innerHTML = '<p class="col-span-full text-center text-gray-500">Please log in to view Acknowledged Highlights.</p>';
    if (unsubscribePlayers) {
      unsubscribePlayers();
      unsubscribePlayers = null;
    }
    resetCallState();
    if (incomingCallListenerUnsubscribe) incomingCallListenerUnsubscribe();
    incomingCallListenerUnsubscribe = null;
    return;
  }

  // ── USER PRESENT ───────────────────────────────────────
  loginBtn?.classList.add("hidden");
  accountBtn?.classList.remove("hidden");
  document.getElementById("account-email").textContent = user.email;

  // ⚡ Zeus acknowledges identity
  speak("The threads of fate align."); // Changed from oracleSpeak to speak for direct use

  injectOracleOverlay(user, {
    winProb: "72%",
    momentum: "+8.4",
    volatility: "LOW",
  });

  zeusPredict({
    favorite: "Raptors",
    winProb: 0.72,
  });

  try {
    const userDocRef = doc(
      db,
      `artifacts/${appId}/users/${user.uid}/profile`,
      "info"
    );
    const docSnap = await getDoc(userDocRef);

    const wasPro = userIsPro;
    userIsPro =
      docSnap.exists() &&
      (docSnap.data().isPremium || docSnap.data().isPro);

    zeusLog("USER_PROFILE_LOADED", { isPro: userIsPro });

    document.getElementById("user-status").textContent = userIsPro
      ? "Status: PRO Vision"
      : "Status: Mortal Vision";

    if (premiumStatus)
      premiumStatus.textContent = userIsPro ? "PRO Member" : "Mortal";

    document
      .getElementById("btn-upgrade-pro")
      ?.classList.toggle("hidden", userIsPro);

    // Toggle visibility of Pro-only panels
    if (userIsPro) {
      document
        .getElementById("mortal-timer-container")
        ?.classList.add("hidden");
      if (highlightsUploadPanel) highlightsUploadPanel.classList.remove('hidden');
      if (proPlayerDashboardPanel) proPlayerDashboardPanel.classList.remove('hidden');
    } else {
      if (highlightsUploadPanel) highlightsUploadPanel.classList.add('hidden');
      if (proPlayerDashboardPanel) proPlayerDashboardPanel.classList.add('hidden');
    }

    // ⚡ ASCENSION MOMENT (ONCE)
    if (!wasPro && userIsPro) {
      runAscensionAnimation();
      lightning();
      thunder();
      zeusLog("USER_ASCENDED_TO_PRO", { uid: user.uid });

      const header = document.querySelector("header");
      const oracle = document.getElementById("zeus-oracle");

      [header, oracle].forEach((el) => {
        if (!el) return;
        el.classList.add("lightning-strike");
        setTimeout(() => el.classList.remove("lightning-strike"), 600);
      });
    }

    triggerZeusNarration(userIsPro);
    if (!userIsPro) startMortalTimer();

    main?.classList.remove("hidden");
    paywall?.classList.add("hidden");

    // Set up real-time listener for user's personal media (ONLY when user is logged in)
    const userMediaCollectionRef = collection(db, `users/${user.uid}/personalMedia`);
    const qMedia = query(userMediaCollectionRef, orderBy('timestamp', 'desc'));

    onSnapshot(qMedia, (snapshot) => {
      renderUserMedia(snapshot);
      zeusLog("USER_MEDIA_LISTENER_UPDATED", { count: snapshot.size });
    }, (error) => {
      console.error("Error listening to personal media:", error);
      zeusLog("USER_MEDIA_LISTENER_ERROR", { error: error.message });
    });

    // Set up real-time listener for War Room Chat Messages
    const chatRoomMessagesRef = collection(db, `chatRooms/${CURRENT_CHAT_ROOM_ID}/messages`);
    const qChat = query(chatRoomMessagesRef, orderBy('timestamp', 'asc'), limit(50));

    if (chatMessagesDiv) chatMessagesDiv.innerHTML = '';
    onSnapshot(qChat, (snapshot) => {
      if (chatMessagesDiv) chatMessagesDiv.innerHTML = ''; // Clear each time for full re-render
      snapshot.forEach(doc => renderChatMessage(doc));
      zeusLog("CHAT_MESSAGES_UPDATED", { count: snapshot.size });
    }, (error) => {
      console.error("Error listening to chat messages:", error);
      zeusLog("CHAT_MESSAGES_LISTENER_ERROR", { error: error.message });
    });

    // Set up real-time listener for Community Highlights
    const highlightsCollectionRef = collection(db, `highlights`);
    const qHighlights = query(highlightsCollectionRef, orderBy('timestamp', 'desc')); // Order by newest first

    if (communityHighlightsList) communityHighlightsList.innerHTML = '<p class="col-span-full text-center text-gray-500">Loading highlights...</p>';
    onSnapshot(qHighlights, (snapshot) => {
      renderCommunityHighlights(snapshot);
      zeusLog("COMMUNITY_HIGHLIGHTS_UPDATED", { count: snapshot.size });
    }, (error) => {
      console.error("Error listening to community highlights:", error);
      zeusLog("COMMUNITY_HIGHLIGHTS_LISTENER_ERROR", { error: error.message });
    });

    // Set up real-time listener for St. Louis Player Highlights
    if (playerHighlightsPanel) playerHighlightsPanel.classList.remove('hidden');
    setupPlayersListener();

    // Set up real-time listener for Pro Player Posts
    const proPlayerPostsCollectionRef = collection(db, `proPlayerPosts`);
    const qProPosts = query(proPlayerPostsCollectionRef, orderBy('timestamp', 'desc'), limit(10)); // Show last 10 posts

    if (proPlayerPostsList) proPlayerPostsList.innerHTML = '<p class="text-gray-500 text-center">Loading Pro Player updates.</p>';
    onSnapshot(qProPosts, (snapshot) => {
      displayProPosts(snapshot);
      zeusLog("PRO_PLAYER_POSTS_UPDATED", { count: snapshot.size });
    }, (error) => {
      console.error("Error listening to Pro Player posts:", error);
      zeusLog("PRO_PLAYER_POSTS_LISTENER_ERROR", { error: error.message });
    });

    // Video Call setup for authenticated users
    if (videoCallPanel) videoCallPanel.classList.remove('hidden');
    listenForIncomingCalls();

    // Set up real-time listener for Acknowledged Highlights
    const acknowledgedHighlightsCollectionRef = collection(db, `acknowledgedHighlights`);
    const qAcknowledged = query(acknowledgedHighlightsCollectionRef, orderBy('acknowledgedAt', 'desc'), limit(3)); // Show top 3 most recent acknowledgments

    if (acknowledgedHighlightsList) acknowledgedHighlightsList.innerHTML = '<p class="col-span-full text-center text-gray-500">Loading acknowledged highlights...</p>';
    onSnapshot(qAcknowledged, (snapshot) => {
      displayAcknowledgedHighlights(snapshot);
      zeusLog("ACKNOWLEDGED_HIGHLIGHTS_UPDATED", { count: snapshot.size }); acknowledgedHighlightsSnapshot.size });
    }, (error) => {
      console.error("Error listening to acknowledged highlights:", error);
      zeusLog("ACKNOWLEDGED_HIGHLIGHTS_LISTENER_ERROR", { error: error.message });
    });


  } catch (e) {
    zeusLog("PROFILE_FETCH_FAILED", { error: e.message });

    userIsPro = false;
    triggerZeusNarration(false);
    startMortalTimer();

    main?.classList.remove("hidden");
    paywall?.classList.add("hidden");
  }
});

// ============================================================================
// ⚡ WAR ROOM EVENT BINDINGS (Combined with all new event listeners)
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  // Login form handler is now in src/index.js and exposed globally via window.logIn
  // We remove the direct event listener here.

  const upgradeBtn = document.getElementById("btn-upgrade-pro");
  if (upgradeBtn) {
    upgradeBtn.addEventListener("click", async (e) => {
      e.preventDefault();

      upgradeBtn.disabled = true;
      upgradeBtn.innerText = "ASCENDING...";
      zeusLog("UPGRADE_CLICKED");

      try {
        await upgradeUser();
        zeusLog("UPGRADE_SUCCESS");

        upgradeBtn.innerText = "PRO UNLOCKED";
        upgradeBtn.classList.add("opacity-60", "cursor-default");
      } catch (err) {
        upgradeBtn.disabled = false;
        upgradeBtn.innerText = "UPGRADE TO PRO";
        zeusLog("UPGRADE_FAILED", { error: err.message });
        alert(err.message);
      }
    });
  }

  const debugToggle = document.getElementById("zeus-debug-toggle");
  const logPanel = document.getElementById("zeus-log-panel");

  if (debugToggle && logPanel) {
    debugToggle.addEventListener("click", () => {
      const isHidden = logPanel.classList.contains("hidden-panel");

      logPanel.classList.toggle("hidden-panel", !isHidden);
      zeusLog(
        isHidden ? "DEBUG_CONSOLE_OPENED" : "DEBUG_CONSOLE_CLOSED"
      );
    });
  }

  // Event listener for personal media upload button
  const uploadMediaBtn = document.getElementById("upload-media-btn");
  if (uploadMediaBtn) {
    uploadMediaBtn.addEventListener("click", uploadPersonalMedia);
  }

  // Event listener for chat message input and send button
  const chatMessageInput = document.getElementById("chat-message-input");
  const sendChatMessageBtn = document.getElementById("send-chat-message-btn");
  const attachMediaBtn = document.getElementById("attach-media-btn");
  const chatMediaFileInput = document.getElementById("chat-media-file-input");

  if (sendChatMessageBtn && chatMessageInput) {
    sendChatMessageBtn.addEventListener("click", () => {
      const mediaFile = chatMediaFileInput.files[0];
      const messageText = chatMessageInput.value;
      sendChatMessage(messageText, mediaFile);
    });

    chatMessageInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const mediaFile = chatMediaFileInput.files[0];
        const messageText = chatMessageInput.value;
        sendChatMessage(messageText, mediaFile);
      }
    });
  }

  // Handle attaching media to chat
  if (attachMediaBtn && chatMediaFileInput) {
    attachMediaBtn.addEventListener("click", () => {
      chatMediaFileInput.click();
    });

    chatMediaFileInput.addEventListener("change", () => {
      if (chatMediaFileInput.files.length > 0) {
        const fileName = chatMediaFileInput.files[0].name;
        document.getElementById("chat-upload-status").textContent = `Media ready: ${fileName}`;
      } else {
        document.getElementById("chat-upload-status").textContent = "";
      }
    });
  }

  // Event listener for highlight upload button
  const uploadHighlightBtn = document.getElementById("upload-highlight-btn");
  if (uploadHighlightBtn) {
    uploadHighlightBtn.addEventListener("click", uploadHighlight);
  }

  // Event listeners for player filters
  const playerLevelFilter = document.getElementById("player-level-filter");
  const playerSportFilter = document.getElementById("player-sport-filter");

  if (playerLevelFilter) {
    playerLevelFilter.addEventListener("change", setupPlayersListener);
  }
  if (playerSportFilter) {
    playerSportFilter.addEventListener("change", setupPlayersListener);
  }

  // Event listener for Pro Player Post button
  const postProContentBtn = document.getElementById("post-pro-content-btn");
  if (postProContentBtn) {
    postProContentBtn.addEventListener("click", publishProPost);
  }

  // Event listeners for video calling buttons
  const startCallBtn = document.getElementById('start-call-btn');
  const hangUpBtn = document.getElementById('hang-up-btn');
  const acceptCallBtn = document.getElementById('accept-call-btn');
  const rejectCallBtn = document.getElementById('reject-call-btn');

  if (startCallBtn) startCallBtn.addEventListener('click', startCall);
  if (hangUpBtn) hangUpBtn.addEventListener('click', hangUpCall);
  if (acceptCallBtn) acceptCallBtn.addEventListener('click', acceptCall);
  if (rejectCallBtn) rejectCallBtn.addEventListener('click', rejectCall);
});
