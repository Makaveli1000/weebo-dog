// functions/index.js
const functions = require("firebase-functions");
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();
const logger = functions.logger;

// This MUST match the appId in your frontend
const FIREBASE_WEB_APP_ID = "1:735791748207:web:74fd6412684db238b6e99a";

functions.setGlobalOptions({ maxInstances: 10 });

exports.grantPremiumAccess = functions.https.onCall(async (data, context) => {
    // 1. Auth Check
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'Must be logged in.');
    }

    const userId = data.userId;
    const callerUid = context.auth.uid;

    if (!userId || userId !== callerUid) {
        throw new functions.https.HttpsError('permission-denied', 'Unauthorized.');
    }

    // 2. Define path using the verified App ID
    const userDocRef = db.collection(`artifacts/${FIREBASE_WEB_APP_ID}/users/${userId}/profile`).doc("info");

    try {
        // 3. Set Custom Claim
        await admin.auth().setCustomUserClaims(userId, { premiumAccount: true });
        
        // 4. Update Firestore
        const oneYear = new Date();
        oneYear.setFullYear(oneYear.getFullYear() + 1);

        await userDocRef.set({
            isPremium: true,
            premiumExpires: admin.firestore.Timestamp.fromDate(oneYear),
            cheerleaderMediaCount: admin.firestore.FieldValue.delete(),
            freeAccessGranted: true,
            freeAccessStartTime: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        return { status: 'success' };
    } catch (error) {
        logger.error("Premium Grant Error:", error);
        throw new functions.https.HttpsError('internal', error.message);
    }
});