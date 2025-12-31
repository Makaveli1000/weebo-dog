#!/bin/bash
mkdir -p dist

# Inject BOTH Firebase and Gemini variables
cat > ./dist/env-config.js << EOF
window.NETLIFY_FIREBASE_CONFIG = {
  "apiKey": "${FIREBASE_API_KEY}",
  "authDomain": "${FIREBASE_AUTH_DOMAIN}",
  "projectId": "${FIREBASE_PROJECT_ID}",
  "storageBucket": "${FIREBASE_STORAGE_BUCKET}",
  "messagingSenderId": "${FIREBASE_MESSAGING_SENDER_ID}",
  "appId": "${FIREBASE_APP_ID}"
};
window.GEMINI_API_KEY = "${GEMINI_API_KEY}";
EOF

# Copy assets
if [ -f "index.html" ]; then cp index.html dist/; fi
cp -r audio dist/ 2>/dev/null || true
cp favicon.ico dist/ 2>/dev/null || true

echo "✅ Generated env-config.js with Firebase and Gemini keys."