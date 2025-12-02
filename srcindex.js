// src/index.js - Firebase Initialization and Service Exports

// Console log to confirm this file is executed
console.log("Hello from Firebase app! Initializing Firebase services...");

// Import the functions you need from the Firebase SDKs
// *** CORRECTED IMPORTS: Using local 'firebase/*' package imports ***
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore"; // Ensure serverTimestamp is imported here
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbt0ITM9G4LOZTlXuAGGvuO80uazFpZSs",
  authDomain: "sntlmoexclusivesportsgrid.firebaseapp.com",
  projectId: "sntlmoexclusivesportsgrid",
  storageBucket: "sntlmoexclusivesportsgrid.appspot.com",
  messagingSenderId: "735791748207", 
  appId: "1:735791748207:web:74fd6412684db238b6e99a",
  measurementId: "G-509374407"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get service instances
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export the initialized services and appId for use in other modules
export {
  auth,
  db,
  storage,
  // The appId from firebaseConfig is typically the same as projectId for this use case
  appId: firebaseConfig.projectId, // Exporting projectId as appId for consistency
  serverTimestamp
};

// You might also want to expose firebaseConfig globally for debugging, similar to what you had before,
// but it's generally better to pass services directly.
// window.firebaseConfig = firebaseConfig; // Optional: for debugging purposes
