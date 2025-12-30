#!/bin/bash
mkdir -p ./dist

# No quotes around EOF allows variable injection
cat > ./dist/env-config.js << EOF
window.NETLIFY_FIREBASE_CONFIG = {
  "apiKey": "${FIREBASE_API_KEY}",
  "authDomain": "${FIREBASE_AUTH_DOMAIN}",
  "projectId": "${FIREBASE_PROJECT_ID}",
  "storageBucket": "${FIREBASE_STORAGE_BUCKET}",
  "messagingSenderId": "${FIREBASE_MESSAGING_SENDER_ID}",
  "appId": "${FIREBASE_APP_ID}",
  "measurementId": "${FIREBASE_MEASUREMENT_ID}"
};
EOF

echo "✅ Generated env-config.js with FIREBASE_ prefix variables."