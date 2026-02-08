    const functions = require('firebase-functions');
    const admin = require('firebase-admin');
    admin.initializeApp();
    const db = admin.firestore();

    // --- Configuration ---
    const HIGHLIGHTS_COLLECTION = 'highlights';
    const ACKNOWLEDGED_HIGHLIGHTS_COLLECTION = 'acknowledgedHighlights'; // New collection for acknowledged highlights
    const ACKNOWLEDGMENT_PERIOD_DAYS = 14; // Every two weeks
    const TOP_N_HIGHLIGHTS = 3; // Acknowledge top 3 highlights
    const APP_ID = '1:735791748207:web:74fd6412684db238b6e99a'; // Your app ID from Firestore rules

    // --- Helper to get isPro status from Firestore (same logic as client-side) ---
    async function getUserProStatus(uid) {
      if (!uid) return false;
      try {
        const userDocRef = db.doc(`artifacts/${APP_ID}/users/${uid}/profile/info`);
        const docSnap = await userDocRef.get();
        return docSnap.exists && (docSnap.data().isPremium || docSnap.data().isPro);
      } catch (error) {
        console.error(`Error fetching Pro status for user ${uid}:`, error);
        return false;
      }
    }

    /**
     * Scheduled Cloud Function to find and acknowledge top highlights every two weeks.
     */
    exports.acknowledgeTopHighlights = functions.pubsub.schedule('0 0 */14 * *') // Run at 00:00 (midnight) every 14th day
      .timeZone('America/New_York') // Using a common timezone; can revert to America/Chicago if this deploys
      .onRun(async (context) => {
        console.log(`Running acknowledgeTopHighlights function at ${new Date().toISOString()}`);

        const cutoffDate = admin.firestore.Timestamp.fromDate(
          new Date(Date.now() - ACKNOWLEDGMENT_PERIOD_DAYS * 24 * 60 * 60 * 1000)
        );

        try {
          // 1. Query highlights from the last two weeks, ordered by likes
          const highlightsSnapshot = await db.collection(HIGHLIGHTS_COLLECTION)
            .where('timestamp', '>', cutoffDate)
            .orderBy('timestamp', 'desc') // Order by timestamp first to enable other orderBy
            .orderBy('likes', 'desc')
            .limit(TOP_N_HIGHLIGHTS * 2) // Fetch a few more in case some are invalid
            .get();

          if (highlightsSnapshot.empty) {
            console.log('No highlights found in the last two weeks to acknowledge.');
            return null;
          }

          const topHighlights = [];
          for (const doc of highlightsSnapshot.docs) {
            const highlightData = doc.data();
            // Ensure highlight has a user ID and likes field
            if (highlightData.userId && highlightData.likes !== undefined) {
                topHighlights.push({ id: doc.id, ...highlightData });
                if (topHighlights.length >= TOP_N_HIGHLIGHTS) break; // Collect only top N
            }
          }

          if (topHighlights.length === 0) {
            console.log('No valid top highlights identified.');
            return null;
          }

          console.log(`Found ${topHighlights.length} top highlights for acknowledgment:`, topHighlights.map(h => h.title));

          // Use a batch write for atomic updates
          const batch = db.batch();
          const acknowledgmentDate = admin.firestore.Timestamp.now();

          for (const highlight of topHighlights) {
            const highlightRef = db.collection(HIGHLIGHTS_COLLECTION).doc(highlight.id);
            const acknowledgedRef = db.collection(ACKNOWLEDGED_HIGHLIGHTS_COLLECTION).doc(); // Auto-ID for new acknowledged entry

            // 2. Mark the original highlight as acknowledged
            batch.update(highlightRef, {
              isAcknowledged: true,
              acknowledgedAt: acknowledgmentDate,
              acknowledgmentPeriodStart: cutoffDate,
              acknowledgmentPeriodEnd: acknowledgmentDate,
            });

            // 3. Create a record in a separate collection for historical tracking
            batch.set(acknowledgedRef, {
              highlightId: highlight.id,
              title: highlight.title,
              likes: highlight.likes,
              uploadedBy: highlight.userId,
              uploadTimestamp: highlight.timestamp,
              acknowledgedAt: acknowledgmentDate,
              periodStart: cutoffDate,
              periodEnd: acknowledgmentDate,
            });
          }

          await batch.commit();
          console.log('Top highlights acknowledged successfully!');

        } catch (error) {
          console.error('Error acknowledging top highlights:', error);
        }

        return null; // Cloud Functions should return null or a Promise
      });