#!/bin/bash
set -x # Enable shell tracing for debugging.

echo "Generating env-config.js from Netlify Environment Variables..."

# Directly assign environment variables from Netlify's build context.
# We'll use default values (empty strings) if they are not set,
# which helps avoid script errors if Netlify completely fails to pass them.
API_KEY="${FIREBASE_API_KEY:-}"
APP_ID="${FIREBASE_APP_ID:-}"
AUTH_DOMAIN="${FIREBASE_AUTH_DOMAIN:-}"
MEASUREMENT_ID="${FIREBASE_MEASUREMENT_ID:-}"
MESSAGING_SENDER_ID="${FIREBASE_MESSAGING_SENDER_ID:-}"
PROJECT_ID="${FIREBASE_PROJECT_ID:-}"
STORAGE_BUCKET="${FIREBASE_STORAGE_BUCKET:-}"
GEMINI_KEY="${GEMINI_API_KEY:-}"

echo "--- Debugging env-config.js variable values ---"
echo "API_KEY=$API_KEY"
echo "APP_ID=$APP_ID"
echo "AUTH_DOMAIN=$AUTH_DOMAIN"
echo "MEASUREMENT_ID=$MEASUREMENT_ID"
echo "MESSAGING_SENDER_ID=$MESSAGING_SENDER_ID"
echo "PROJECT_ID=$PROJECT_ID"
echo "STORAGE_BUCKET=$STORAGE_BUCKET"
echo "GEMINI_KEY=$GEMINI_KEY"
echo "----------------------------------------------"

# Build the JavaScript config file content
# Output to ./dist/env-config.js
cat > ./dist/env-config.js << EOF
window.NETLIFY_FIREBASE_CONFIG = {
  "apiKey": "${API_KEY}",
  "authDomain": "${AUTH_DOMAIN}",
  "projectId": "${PROJECT_ID}",
  "storageBucket": "${STORAGE_BUCKET}",
  "messagingSenderId": "${MESSAGING_SENDER_ID}",
  "appId": "${APP_ID}",
  "measurementId": "${MEASUREMENT_ID}"
};
window.__app_id = "${APP_ID}";
window.__project_id = "${PROJECT_ID}";
window.GEMINI_API_KEY = "${GEMINI_KEY}";
EOF

echo "✅ Successfully generated env-config.js in dist/."
echo "--- Full generated dist/env-config.js content ---"
cat ./dist/env-config.js # Print the entire file content to logs
echo "-------------------------------------------------"