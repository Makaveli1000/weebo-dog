#!/bin/bash

# This script reads environment variables set in Netlify and generates the
# JavaScript configuration file (env-config.js) required by index.html.

echo "Generating env-config.js from Netlify Environment Variables..."

# --- CRITICAL FIX: Ensure variables read from Netlify Environment Variables ---
# The previous hardcoded values (like AIzaSyCVDpWCX1Ntu7Obepe9fQRsDZCVHxDI4I)
# MUST BE REMOVED from the script file itself. They should only exist
# in Netlify's Environment Variables settings.

# These variables will be populated by Netlify's environment variables during build
API_KEY="${FIREBASE_API_KEY}" # This now truly reads from Netlify Env Var
PROJECT_ID="${FIREBASE_PROJECT_ID}" # This now truly reads from Netlify Env Var
STORAGE_BUCKET="${FIREBASE_STORAGE_BUCKET}" # This now truly reads from Netlify Env Var
MESSAGING_SENDER_ID="${FIREBASE_MESSAGING_SENDER_ID}" # This now truly reads from Netlify Env Var
APP_ID="${FIREBASE_APP_ID}" # This now truly reads from Netlify Env Var
GEMINI_KEY="${GEMINI_API_KEY}" # This now truly reads from Netlify Env Var
# --- END CRITICAL FIX ---

# Build the JavaScript config file content
# Output to ./env-config.js (directly in the root)
cat > ./env-config.js << EOF
window.NETLIFY_FIREBASE_CONFIG = {
  "apiKey": "${API_KEY}",
  "authDomain": "${PROJECT_ID}.firebaseapp.com",
  "projectId": "${PROJECT_ID}",
  "storageBucket": "${STORAGE_BUCKET}",
  "messagingSenderId": "${MESSAGING_SENDER_ID}",
  "appId": "${APP_ID}"
};
window.__app_id = "${APP_ID}";
window.__project_id = "${PROJECT_ID}";
window.GEMINI_API_KEY = "${GEMINI_KEY}";
EOF

echo "✅ Successfully generated env-config.js with secrets."
echo "Config preview:"
head -5 ./env-config.js # Now showing the head of the file in the root
