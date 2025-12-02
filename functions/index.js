// functions/index.js

// Import necessary modules
const functions = require("firebase-functions");
const admin = require('firebase-admin');

// Initialize the Firebase Admin SDK once when the function environment starts
admin.initializeApp();

// Get a reference to the Firestore database
const db = admin.firestore();

// IMPORTANT: Define your actual Firebase Web App ID here.
// This is CRITICAL for matching your client-side Firestore paths and rules
// (e.g., `artifacts/{appId}/...`). It must match the `appId` exported from your `src/index.js`.
const FIREBASE_WEB_APP_ID = "1:735791748207:web:74fd6412684db238b6e99a";

// --- Global Options and Logger ---
// The `setGlobalOptions` is primarily for 2nd Gen Cloud Functions (Node.js 14+ with specific syntax).
// For 1st Gen HTTP Callable functions (which functions.https.onCall is),
// you typically use `functions.runWith({ maxInstances: 10 })` on the specific function.
// However, if you're using a newer runtime, the setGlobalOptions might still have an effect.
// We'll keep it for now, assuming your runtime supports it or you'll transition to 2nd Gen syntax soon.
functions.setGlobalOptions({ maxInstances: 10 });

// Use the Firebase Functions logger for better structured logging
const logger = functions.logger;
// --- End Global Options and Logger ---


// --- START: grantPremiumAccess Cloud Function ---
// This function grants premium access by updating a user's custom claim
// and their Firestore profile. It's invoked via an HTTPS callable request
// from your client-side application.
exports.grantPremiumAccess = functions.https.onCall(async (data, context) => {
    // 1. Security Check: Ensure the function is called by an authenticated user.
    if (!context.auth) {
        logger.warn('Attempted unauthenticated call to grantPremiumAccess.');
        throw new functions.https.HttpsError(
            'unauthenticated',
            'The function must be called while authenticated.'
        );
    }

    const userId = data.userId;       // User ID provided by the client-side
    const callerUid = context.auth.uid; // UID of the user making the request (from their auth token)

    // 2. Validate that the requesting user is trying to update *their own* premium status.
    // This prevents one user from attempting to grant premium to another user.
    if (!userId || userId !== callerUid) {
        logger.error(`Permission denied: Caller UID ${callerUid} attempted to grant premium to userId ${userId}.`);
        throw new functions.https.HttpsError(
            'permission-denied',
            'Unauthorized request. Cannot grant premium access for another user.'
        );
    }

    // 3. Construct the Firestore document reference using the correct `FIREBASE_WEB_APP_ID`.
    const userDocRef = db.collection(`artifacts/${FIREBASE_WEB_APP_ID}/users/${userId}/profile`).doc("info");

    try {
        // 4. Retrieve the user's current custom claims from Firebase Authentication.
        // This is good practice to avoid overwriting other existing claims.
        const currentUser = await admin.auth().getUser(userId);
        const currentClaims = currentUser.customClaims || {};

        // 5. Update the custom claims: Set 'premiumAccount' to true.
        // This claim will be embedded in the user's ID token and used by client-side rules.
        const newClaims = { ...currentClaims, premiumAccount: true };
        await admin.auth().setCustomUserClaims(userId, newClaims);
        logger.info(`Custom claim 'premiumAccount: true' set for user: ${userId}`);

        // 6. Calculate the premium expiration date (e.g., 1 year from the current time).
        const oneYearFromNow = new Date();
        oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

        // 7. Update the user's profile in Cloud Firestore for data consistency and easier querying.
        await userDocRef.set({ // Using set with merge to ensure doc exists or is created/updated
            isPremium: true, // Mark user as premium in Firestore profile
            premiumExpires: admin.firestore.Timestamp.fromDate(oneYearFromNow), // Store as a native Firestore Timestamp
            // For PRO users, their media count limit is likely removed.
            // Deleting the field simplifies client-side logic and storage rules.
            cheerleaderMediaCount: admin.firestore.FieldValue.delete(),
            // Also, update freeAccess details as they are now superseded by premium
            freeAccessGranted: true,
            freeAccessStartTime: admin.firestore.FieldValue.serverTimestamp() // Record when free access period effectively ended (or started) for context
        }, { merge: true }); // Use merge: true to update specific fields without overwriting the entire document

        logger.info(`Firestore profile for ${userId} updated to PRO, media count field deleted, and free access marked.`);

        // 8. Return a success response to the client.
        return { status: 'success', message: 'Premium access granted and profile updated!' };

    } catch (error) {
        logger.error(`Error granting premium access for user ${userId}:`, error);
        // If an error occurs, throw an HTTPS error that the client-side can catch.
        throw new functions.https.HttpsError(
            'internal',
            'Failed to update premium status. Please try again.',
            error.message // Include the original error message for debugging
        );
    }
});
// --- END: grantPremiumAccess Cloud Function ---
