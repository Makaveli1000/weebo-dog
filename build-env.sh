#!/bin/sh

# Make sure the dist directory exists
mkdir -p dist

# Set fallback values for local development if not provided
FIREBASE_API_KEY="${FIREBASE_API_KEY:-YOUR_FIREBASE_API_KEY_HERE}"
FIREBASE_AUTH_DOMAIN="${FIREBASE_AUTH_DOMAIN:-YOUR_FIREBASE_AUTH_DOMAIN_HERE}"
FIREBASE_PROJECT_ID="${FIREBASE_PROJECT_ID:-sntlmoexclusivesportsgrid}"
FIREBASE_STORAGE_BUCKET="${FIREBASE_STORAGE_BUCKET:-sntlmoexclusivesportsgrid.appspot.com}"
FIREBASE_MESSAGING_SENDER_ID="${FIREBASE_MESSAGING_SENDER_ID:-YOUR_FIREBASE_MESSAGING_SENDER_ID_HERE}"
FIREBASE_APP_ID="${FIREBASE_APP_ID:-1:735791748207:web:74fd6412684db238b6e99a}"
FIREBASE_MEASUREMENT_ID="${FIREBASE_MEASUREMENT_ID:-G-YOURMEASUREMENTID}"
GEMINI_API_KEY="${GEMINI_API_KEY:-YOUR_GEMINI_API_KEY_HERE}"


# Create the env-config.js file directly in the dist folder
echo "window.NETLIFY_FIREBASE_CONFIG = {" > dist/env-config.js
echo "  apiKey: \"$FIREBASE_API_KEY\"," >> dist/env-config.js
echo "  authDomain: \"$FIREBASE_AUTH_DOMAIN\"," >> dist/env-config.js
echo "  projectId: \"$FIREBASE_PROJECT_ID\"," >> dist/env-config.js
echo "  storageBucket: \"$FIREBASE_STORAGE_BUCKET\"," >> dist/env-config.js
echo "  messagingSenderId: \"$FIREBASE_MESSAGING_SENDER_ID\"," >> dist/env-config.js
echo "  appId: \"$FIREBASE_APP_ID\"," >> dist/env-config.js
echo "  measurementId: \"$FIREBASE_MEASUREMENT_ID\"" >> dist/env-config.js
echo "};" >> dist/env-config.js
echo "window.GEMINI_API_KEY = \"$GEMINI_API_KEY\";" >> dist/env-config.js

echo "✅ Generated env-config.js with Firebase and Gemini keys."
