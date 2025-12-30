#!/bin/bash
set -e # Exit immediately if a command exits with a non-zero status.
# set -x # Uncomment this line to enable shell tracing for debugging in Netlify build logs.

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

# --- Non-revealing validation checks ---
# These checks will output warnings or errors during the Netlify build process
# if critical environment variables are not set.
VALID_CONFIG=true

if [ -z "$API_KEY" ]; then
  echo "WARNING: FIREBASE_API_KEY is missing. Firebase initialization may fail."
  VALID_CONFIG=false
fi
if [ -z "$PROJECT_ID" ]; then
  echo "WARNING: FIREBASE_PROJECT_ID is missing. Firebase initialization may fail."
  VALID_CONFIG=false
fi
if [ -z "$APP_ID" ]; then
  echo "WARNING: FIREBASE_APP_ID is missing. Firebase initialization may fail."
  VALID_CONFIG=false
fi
if [ -z "$AUTH_DOMAIN" ]; then
  # Automatically derive authDomain if not explicitly set, common for Firebase
  if [ -n "$PROJECT_ID" ]; then
    AUTH_DOMAIN="${PROJECT_ID}.firebaseapp.com"
    echo "INFO: FIREBASE_AUTH_DOMAIN was missing, derived from PROJECT_ID: $AUTH_DOMAIN"
  else
    echo "WARNING: FIREBASE_AUTH_DOMAIN is missing and cannot be derived. Firebase Auth may fail."
    VALID_CONFIG=false
  fi
fi
if [ -z "$MESSAGING_SENDER_ID" ]; then
  echo "WARNING: FIREBASE_MESSAGING_SENDER_ID is missing. Firebase Cloud Messaging features may not work."
fi
if [ -z "$STORAGE_BUCKET" ]; then
  echo "WARNING: FIREBASE_STORAGE_BUCKET is missing. Cloud Storage features may not work."
fi
if [ -z "$MEASUREMENT_ID" ]; then
  echo "WARNING: FIREBASE_MEASUREMENT_ID is missing. Google Analytics may not track data."
fi
if [ -z "$GEMINI_KEY" ]; then
  echo "WARNING: GEMINI_API_KEY is missing. Features requiring it may not work."
fi

# If essential configurations are missing, abort the build to prevent deploying a broken app.
if [ "$VALID_CONFIG" = false ]; then
  echo "ERROR: Essential Firebase configuration is missing. Aborting build."
  exit 1
fi

# Ensure the 'dist' directory exists before attempting to write the file.
# This prevents errors if your build command doesn't create it first.
mkdir -p ./dist

# Build the JavaScript config file content
# This uses a "here document" (<< EOF) to write the content directly to the file.
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
window.__app_id = "${APP_ID}"; # Exposing for potential global access if needed
window.__project_id = "${PROJECT_ID}"; # Exposing for potential global access if needed
window.GEMINI_API_KEY = "${GEMINI_KEY}";
EOF

echo "✅ Successfully generated env-config.js in dist/."
# You can optionally print the content of the generated file to the build logs
# by uncommenting the following lines, but be mindful of sensitive keys in logs.
# echo "--- Full generated dist/env-config.js content ---"
# cat ./dist/env-config.js
# echo "-------------------------------------------------"