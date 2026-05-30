#!/usr/bin/env bash
set -euo pipefail

DIST_DIR="./dist"
ROOT_ENV_FILE="./env-config.js"
DIST_ENV_FILE="$DIST_DIR/env-config.js"

# 1. Ensure the distribution folder exists
mkdir -p "$DIST_DIR"

# 2. Extract configuration tokens safely with default fallback verification
# Using ${VAR:-} prevents the script from crashing if a variable is temporarily unbound.
FIREBASE_API_KEY="${FIREBASE_API_KEY:-}"
FIREBASE_AUTH_DOMAIN="${FIREBASE_AUTH_DOMAIN:-}"
FIREBASE_PROJECT_ID="${FIREBASE_PROJECT_ID:-}"
FIREBASE_STORAGE_BUCKET="${FIREBASE_STORAGE_BUCKET:-}"
FIREBASE_MESSAGING_SENDER_ID="${FIREBASE_MESSAGING_SENDER_ID:-}"
FIREBASE_APP_ID="${FIREBASE_APP_ID:-}"
FIREBASE_MEASUREMENT_ID="${FIREBASE_MEASUREMENT_ID:-}"

# 3. Compile the global window configuration blocks
cat > "$ROOT_ENV_FILE" <<EOF
/**
 * SNT LMO EXCLUSIVE SPORTS HUB - COMPARED PRODUCTION VECTOR TARGETS
 * AUTOMATICALLY GENERATED VIA BASH BUILD PIPELINE. DO NOT EDIT DIRECTLY.
 */
window.NETLIFY_FIREBASE_CONFIG = {
  apiKey: "$FIREBASE_API_KEY",
  authDomain: "$FIREBASE_AUTH_DOMAIN",
  projectId: "$FIREBASE_PROJECT_ID",
  storageBucket: "$FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "$FIREBASE_MESSAGING_SENDER_ID",
  appId: "$FIREBASE_APP_ID",
  measurementId: "$FIREBASE_MEASUREMENT_ID"
};
window.__firebase_config = window.NETLIFY_FIREBASE_CONFIG;
EOF

# 4. Clone identical mapping assets cleanly down to the distribution bucket
cp "$ROOT_ENV_FILE" "$DIST_ENV_FILE"

echo "✅ Generated $ROOT_ENV_FILE from Netlify Environment Controls"
echo "✅ Generated $DIST_ENV_FILE from Netlify Environment Controls"