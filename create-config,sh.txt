#!/bin/bash

# This script reads environment variables set in Netlify and generates the
# JavaScript configuration file (env-config.js) required by index.html.

echo "Generating env-config.js from Netlify Environment Variables..."

# 1. Start defining the content of the config file
CONFIG_CONTENT="window.NETLIFY_FIREBASE_CONFIG = {"
CONFIG_CONTENT="${CONFIG_CONTENT}\"apiKey\": \"${FIREBASE_API_KEY}\","
CONFIG_CONTENT="${CONFIG_CONTENT}\"authDomain\": \"${FIREBASE_PROJECT_ID}.firebaseapp.com\","
CONFIG_CONTENT="${CONFIG_CONTENT}\"projectId\": \"${FIREBASE_PROJECT_ID}\","
CONFIG_CONTENT="${CONFIG_CONTENT}\"storageBucket\": \"${FIREBASE_STORAGE_BUCKET}\","
CONFIG_CONTENT="${CONFIG_CONTENT}\"messagingSenderId\": \"${FIREBASE_MESSAGING_SENDER_ID}\","
CONFIG_CONTENT="${CONFIG_CONTENT}\"appId\": \"${FIREBASE_APP_ID}\""
CONFIG_CONTENT="${CONFIG_CONTENT}};"

# 2. Add other necessary global variables
CONFIG_CONTENT="${CONFIG_CONTENT}window.__project_id = \"${FIREBASE_APP_ID}\";"
CONFIG_CONTENT="${CONFIG_CONTENT}window.GEMINI_API_KEY = \"${GEMINI_API_KEY}\";"

# 3. Write the content to the final file
echo "${CONFIG_CONTENT}" > ./env-config.js

echo "✅ Successfully generated env-config.js with secrets."

# NOTE: You must ensure all variables (FIREBASE_API_KEY, FIREBASE_APP_ID, etc.) 
# are correctly set in your Netlify site settings.