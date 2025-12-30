#!/bin/bash

# 1. Create the dist folder if it doesn't exist
mkdir -p ./dist

# 2. Write the config file
# Using quotes around 'EOF' prevents the shell from trying to execute the contents
cat > ./dist/env-config.js << 'EOF'
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

echo "✅ Successfully generated env-config.js in dist/"