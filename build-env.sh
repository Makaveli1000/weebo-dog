#!/bin/bash
    set -x # Enable shell tracing for debugging. This will print each command as it executes.

    echo "Generating env-config.js from Netlify Environment Variables..."

    # Improved strip_quotes function:
    # - Removes leading/trailing whitespace
    # - Removes surrounding double quotes (")
    # - Removes a single trailing comma (,)
    strip_quotes() {
        local var="$1"
        var=$(echo "$var" | xargs) # Trim whitespace
        var="${var%\"}" # Remove trailing quote
        var="${var#\"}" # Remove leading quote
        var="${var%,}"  # Remove trailing comma
        echo "$var"
    }

    API_KEY=$(strip_quotes "$FIREBASE_API_KEY")
    PROJECT_ID=$(strip_quotes "$FIREBASE_PROJECT_ID")
    STORAGE_BUCKET=$(strip_quotes "$FIREBASE_STORAGE_BUCKET")
    MESSAGING_SENDER_ID=$(strip_quotes "$FIREBASE_MESSAGING_SENDER_ID")
    APP_ID=$(strip_quotes "$FIREBASE_APP_ID")
    MEASUREMENT_ID=$(strip_quotes "$FIREBASE_MEASUREMENT_ID") # Add this for GA
    GEMINI_KEY=$(strip_quotes "$GEMINI_API_KEY")

    echo "--- Debugging env-config.js variable values after strip_quotes ---"
    echo "API_KEY=$API_KEY"
    echo "PROJECT_ID=$PROJECT_ID"
    echo "STORAGE_BUCKET=$STORAGE_BUCKET"
    echo "MESSAGING_SENDER_ID=$MESSAGING_SENDER_ID"
    echo "APP_ID=$APP_ID"
    echo "MEASUREMENT_ID=$MEASUREMENT_ID"
    echo "GEMINI_KEY=$GEMINI_KEY"
    echo "---------------------------------------------------------------"

    # Build the JavaScript config file content
    cat > ./dist/env-config.js << EOF
    window.NETLIFY_FIREBASE_CONFIG = {
      "apiKey": "${API_KEY}",
      "authDomain": "${PROJECT_ID}.firebaseapp.com",
      "projectId": "${PROJECT_ID}",
      "storageBucket": "${STORAGE_BUCKET}",
      "messagingSenderId": "${MESSAGING_SENDER_ID}",
      "appId": "${APP_ID}",
      "measurementId": "${MEASUREMENT_ID}" # Add this to the config object
    };
    window.__app_id = "${APP_ID}";
    window.__project_id = "${PROJECT_ID}";
    window.GEMINI_API_KEY = "${GEMINI_KEY}";
    EOF

    echo "✅ Successfully generated env-config.js in dist/."
    echo "--- Full generated dist/env-config.js content ---"
    cat ./dist/env-config.js # Print the entire file content to logs
    echo "-------------------------------------------------"
    ```