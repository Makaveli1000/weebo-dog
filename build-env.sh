#!/bin/bash
# 1. Create the dist folder
mkdir -p dist

# 2. Inject Firebase Environment Variables
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

# 3. Copy files into dist (The build artifacts)
if [ -f "index.html" ]; then
  cp index.html dist/
fi

# 4. Copy other assets safely
cp -r audio dist/ 2>/dev/null || true
cp favicon.ico dist/ 2>/dev/null || true
cp _redirects dist/ 2>/dev/null || true

echo "✅ Build assets copied and env-config.js generated."