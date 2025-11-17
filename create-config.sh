#!/bin/bash

# Function to strip extraneous quotes and commas from environment variables
strip_quotes() {
    # Uses sed to remove leading/trailing quotes (") and commas (,) from the value
    echo "$1" | sed -e 's/^"//' -e 's/"$//' -e 's/,$//' -e 's/^'$"'"'//' -e 's/'$"'"'$//'
}

echo "Creating env-config.js with configuration variables..."

# 1. Strip quotes and store cleaned values
API_KEY_CLEAN=$(strip_quotes "$FIREBASE_API_KEY")
AUTH_DOMAIN_CLEAN=$(strip_quotes "$FIREBASE_AUTH_DOMAIN")
PROJECT_ID_CLEAN=$(strip_quotes "$FIREBASE_PROJECT_ID")
STORAGE_BUCKET_CLEAN=$(strip_quotes "$FIREBASE_STORAGE_BUCKET")
MESSAGING_SENDER_ID_CLEAN=$(strip_quotes "$FIREBASE_MESSAGING_SENDER_ID")
APP_ID_CLEAN=$(strip_quotes "$FIREBASE_APP_ID")
AUTH_TOKEN_CLEAN=$(strip_quotes "$AUTH_TOKEN")
GEMINI_API_KEY_CLEAN=$(strip_quotes "$GEMINI_API_KEY")

# 2. Create the Firebase configuration JSON string using the CLEANED values
FIREBASE_CONFIG_JSON=$(cat <<EOF
{
  "apiKey": "$API_KEY_CLEAN",
  "authDomain": "$AUTH_DOMAIN_CLEAN",
  "projectId": "$PROJECT_ID_CLEAN",
  "storageBucket": "$STORAGE_BUCKET_CLEAN",
  "messagingSenderId": "$MESSAGING_SENDER_ID_CLEAN",
  "appId": "$APP_ID_CLEAN"
}
EOF
)

# 3. Write all required variables to the env-config.js file
cat <<EOF > env-config.js
window.__app_id = '$PROJECT_ID_CLEAN';
window.__initial_auth_token = '$AUTH_TOKEN_CLEAN';
window.GEMINI_API_KEY = '$GEMINI_API_KEY_CLEAN';

# The full Firebase object, written as a string for robust handling in app.js
window.__firebase_config = '$FIREBASE_CONFIG_JSON';
window.NETLIFY_FIREBASE_CONFIG = '$FIREBASE_CONFIG_JSON';

EOF

echo "✅ Successfully generated env-config.js with clean values."