import {
  doc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";


export async function ensureUserProfile(db, user) {
  if (!user) return;

  try {
    const userRef = doc(
      db,
      "users",
      user.uid
    );

    await setDoc(
      userRef,
      {
        uid: user.uid,

        name:
          user.displayName ||
          "Snt.L.Mo User",

        email:
          user.email ||
          "",

        photoURL:
          user.photoURL ||
          "",

        provider:
          user.providerData?.[0]?.providerId ||
          "unknown",

        status:
          "active",

        updatedAt:
          serverTimestamp()
      },
      {
        merge: true
      }
    );

    console.log(
      "User profile synced:",
      user.uid
    );

  } catch (error) {

    console.error(
      "Profile sync failed:",
      error
    );

  }
}