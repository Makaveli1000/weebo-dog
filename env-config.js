
#!/bin/bash

# This script reads environment variables set in Netlify and generates the
# JavaScript configuration file (env-config.js) required by index.html.

echo "Generating env-config.js from Netlify Environment Variables..."

# The strip_quotes function is not needed if direct assignment is used,
# but keeping it in case Netlify injects quotes, though the current usage is problematic.
# For local testing with hardcoded values, we'll assign directly.
strip_quotes() {
    local var="$1"
    var="${var//\"/}" # Remove all quotes
    var="${var%,}"    # Remove trailing commas
    echo "$var"
}

# --- CRITICAL FIX: Assign values directly to the variables ---
API_KEY="AIzaSyCVDpWCX1Ntu7Obepe9fQRsDZQCVHxDI4I"
PROJECT_ID="sntlmoexclusivesportsgrid"
STORAGE_BUCKET="sntlmoexclusivesportsgrid.firebasestorage.app"
MESSAGING_SENDER_ID="735791748207"
APP_ID="1:735791748207:web:74fd6412684db238b6e99a"
GEMINI_KEY="AIzaSyCVDpWCX1Ntu7Obepe9fQRsDZQCVHxDI4I"
# --- END CRITICAL FIX ---

# --- NEW: Ensure the 'dist' directory exists ---
mkdir -p dist

# Build the JavaScript config file content
# Output to ./dist/env-config.js
cat > ./dist/env-config.js << EOF
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
head -5 ./dist/env-config.js # Now showing the head of the file in dist
