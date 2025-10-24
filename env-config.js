// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "REDACTED_FIREBASE_API_KEY",
  authDomain: "sntlmoexclusivesportsgrid.firebaseapp.com",
  projectId: "sntlmoexclusivesportsgrid",
  storageBucket: "sntlmoexclusivesportsgrid.firebasestorage.app",
  messagingSenderId: "REDACTED_FIREBASE_MESSAGING_SENDER_ID",
  appId: "1:REDACTED_FIREBASE_MESSAGING_SENDER_ID:web:f742972354f32514b6e99a",
  measurementId: "G-J9BJ4TPFBD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);// This script runs and attaches the configuration object to the global window scope.
window.FIREBASE_CONFIG = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcde12345abcde12345"
};

// If you need other global config variables, you can add them here:
window.ZEUS_HUB_API_URL = "https://api.zeushub.com/v1/";