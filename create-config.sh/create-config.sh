#!/bin/bash

# This script reads environment variables set in Netlify and generates the
# JavaScript configuration file (******) required by index.html.

echo "Generating ****** from Netlify Environment Variables..."

# Strip any surrounding quotes and commas from environment variables
strip_quotes() {
    local var="$1"
    # Remove all quotes and trailing commas
    var="${var//\"/}"
    var="${var%,}"
    echo "$var"
}

API_KEY=$(strip_quotes "$FIREBASE_API_KEY")
PROJECT_ID=$(strip_quotes "$FIREBASE_PROJECT_ID")
STORAGE_BUCKET=$(strip_quotes "$FIREBASE_STORAGE_BUCKET")
MESSAGING_SENDER_ID=$(strip_quotes "$FIREBASE_MESSAGING_SENDER_ID")
APP_ID=$(strip_quotes "$FIREBASE_APP_ID")
GEMINI_KEY=$(strip_quotes "$GEMINI_API_KEY")

# Build the JavaScript config file content
cat > ./****** << EOF
window.NETLIFY_FIREBASE_CONFIG = {
  "apiKey": "${API_KEY}",
  "authDomain": "${PROJECT_ID}.firebaseapp.com",
  "projectId": "${PROJECT_ID}",
  "storageBucket": "${STORAGE_BUCKET}",
  "messagingSenderId": "${MESSAGING_SENDER_ID}",
  "appId": "${APP_ID}"
};
window.__app_id = "${APP_ID}";
window.__project_id = "${APP_ID}";
window.GEMINI_API_KEY = "${GEMINI_KEY}";
EOF

echo "✅ Successfully generated ******"
echo "Config preview:"
head -5 ./******
Did you find this helpful? Your feedback helps improve this feature.


