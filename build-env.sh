#!/usr/bin/env bash
set -euo pipefail

DIST_DIR="./dist"
ROOT_ENV_FILE="./env-config.js"
DIST_ENV_FILE="$DIST_DIR/env-config.js"

mkdir -p "$DIST_DIR"

# Read directly from Netlify's platform profile configurations
FIREBASE_API_KEY="${FIREBASE_API_KEY}"
FIREBASE_AUTH_DOMAIN="${FIREBASE_AUTH_DOMAIN}"
FIREBASE_PROJECT_ID="${FIREBASE_PROJECT_ID}"
FIREBASE_STORAGE_BUCKET="${FIREBASE_STORAGE_BUCKET}"
FIREBASE_MESSAGING_SENDER_ID="${FIREBASE_MESSAGING_SENDER_ID}"
FIREBASE_APP_ID="${FIREBASE_APP_ID}"
FIREBASE_MEASUREMENT_ID="${FIREBASE_MEASUREMENT_ID}"

cat > "$ROOT_ENV_FILE" <<EOF
window.NETLIFY_FIREBASE_CONFIG = {
  apiKey: "$FIREBASE_API_KEY",
  authDomain: "$FIREBASE_AUTH_DOMAIN",
  projectId: "$FIREBASE_PROJECT_ID",
  storageBucket: "$FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "$FIREBASE_MESSAGING_SENDER_ID",
  appId: "$FIREBASE_APP_ID",
  measurementId: "$FIREBASE_MEASUREMENT_ID"
};
EOF

cp "$ROOT_ENV_FILE" "$DIST_ENV_FILE"

echo "✅ Generated $ROOT_ENV_FILE from Netlify Environment Controls"
echo "✅ Generated $DIST_ENV_FILE from Netlify Environment Controls"