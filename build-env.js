const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

const config = {
    apiKey: process.env.FIREBASE_API_KEY || "YOUR_FIREBASE_API_KEY_HERE",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || "YOUR_FIREBASE_AUTH_DOMAIN_HERE",
    projectId: process.env.FIREBASE_PROJECT_ID || "sntlmoexclusivesportsgrid",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "sntlmoexclusivesportsgrid.appspot.com",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "YOUR_FIREBASE_MESSAGING_SENDER_ID_HERE",
    appId: process.env.FIREBASE_APP_ID || "1:735791748207:web:74fd6412684db238b6e99a",
    measurementId: process.env.FIREBASE_MEASUREMENT_ID || "G-YOURMEASUREMENTID",
    geminiKey: process.env.GEMINI_API_KEY || "YOUR_GEMINI_API_KEY_HERE"
};

const content = `window.NETLIFY_FIREBASE_CONFIG = {
  apiKey: "${config.apiKey}",
  authDomain: "${config.authDomain}",
  projectId: "${config.projectId}",
  storageBucket: "${config.storageBucket}",
  messagingSenderId: "${config.messagingSenderId}",
  appId: "${config.appId}",
  measurementId: "${config.measurementId}"
};
window.GEMINI_API_KEY = "${config.geminiKey}";`;

fs.writeFileSync(path.join(distDir, 'env-config.js'), content);
console.log("✅ Generated env-config.js successfully!");