const functions = require("firebase-functions");
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();
const logger = functions.logger;

// ONLY define this once here
const FIREBASE_WEB_APP_ID = "1:735791748207:web:74fd6412684db238b6e99a";

functions.setGlobalOptions({ maxInstances: 10 });

exports.grantPremiumAccess = functions.https.onCall(async (data, context) => {
    // 1. Security Check
    if (!context.auth) {
        logger.warn('Unauthenticated call attempt.');
        throw new functions.https.HttpsError('unauthenticated', 'Must be logged in.');
    }

    const userId = data.userId;
    const callerUid = context.auth.uid;

    if (!userId || userId !== callerUid) {
        logger.error(`Permission denied for ${callerUid}`);
        throw new functions.https.HttpsError('permission-denied', 'Unauthorized.');
    }

    // 2. Reference the path using our App ID
    const userDocRef = db.collection(`artifacts/${FIREBASE_WEB_APP_ID}/users/${userId}/profile`).doc("info");

    try {
        // 3. Set Custom Claim for Security Rules
        const currentUser = await admin.auth().getUser(userId);
        const currentClaims = currentUser.customClaims || {};
        await admin.auth().setCustomUserClaims(userId, { ...currentClaims, premiumAccount: true });

        // 4. Update Firestore Profile
        const oneYearFromNow = new Date();
        oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

        await userDocRef.set({
            isPremium: true,
            premiumExpires: admin.firestore.Timestamp.fromDate(oneYearFromNow),
            cheerleaderMediaCount: admin.firestore.FieldValue.delete(),
            freeAccessGranted: true,
            freeAccessStartTime: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        return { status: 'success', message: 'Premium access granted!' };

    } catch (error) {
        logger.error(`Error for user ${userId}:`, error);
        throw new functions.https.HttpsError('internal', 'Failed to update status.');
    }
});