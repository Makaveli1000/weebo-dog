const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
const rootEnvPath = path.join(__dirname, 'env-config.js');
const distEnvPath = path.join(distDir, 'env-config.js');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const config = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyDbt0ITM9G4LOZTlXuAGGvuO80uazFpZSs",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "sntlmoexclusivesportsgrid.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "sntlmoexclusivesportsgrid",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "sntlmoexclusivesportsgrid.firebasestorage.app",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "735791748207",
  appId: process.env.FIREBASE_APP_ID || "1:735791748207:web:74fd6412684db238b6e99a",
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || "G-T8RJPDPL4G"
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
`;

fs.writeFileSync(rootEnvPath, content, 'utf8');
fs.writeFileSync(distEnvPath, content, 'utf8');

console.log('✅ Generated env-config.js in root and dist successfully!');
