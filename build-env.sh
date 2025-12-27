#!/bin/bash
set -e # Exit immediately if a command exits with a non-zero status.

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
  echo "WARNING: FIREBASE_AUTH_DOMAIN is missing. Firebase initialization may fail."
  VALID_CONFIG=false
fi
if [ -z "$MESSAGING_SENDER_ID" ]; then
  echo "WARNING: FIREBASE_MESSAGING_SENDER_ID is missing."
fi
if [ -z "$STORAGE_BUCKET" ]; then
  echo "WARNING: FIREBASE_STORAGE_BUCKET is missing."
fi
if [ -z "$GEMINI_KEY" ]; then
  echo "WARNING: GEMINI_API_KEY is missing. Features requiring it may not work."
fi

if [ "$VALID_CONFIG" = false ]; then
  echo "ERROR: Essential Firebase configuration is missing. Aborting build."
  exit 1
fi

# Build the JavaScript config file content
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