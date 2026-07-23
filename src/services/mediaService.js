// ======================================================
// SNT.L.MO. Sports Network MEDIA SERVICE
// ======================================================

import {
  doc,
  updateDoc,
  arrayUnion
} from "firebase/firestore";

import {
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";

export async function uploadAthleteVideo({
  storage,
  db,
  athleteId,
  file,
  onProgress,
  onComplete
}) {

  if (!athleteId) {
    throw new Error("Missing athlete id.");
  }

  if (!file) {
    throw new Error("Missing file.");
  }

  const storagePath =
    `highlights/${athleteId}/${Date.now()}_${file.name}`;

  const uploadTask =
    uploadBytesResumable(
      ref(storage, storagePath),
      file
    );

  return new Promise(
    (resolve, reject) => {

      uploadTask.on(

        "state_changed",

        (snapshot) => {

          const percent =
            Math.round(
              (
                snapshot.bytesTransferred /
                snapshot.totalBytes
              ) * 100
            );

          onProgress?.(percent);

        },

        reject,

        async () => {

          const url =
            await getDownloadURL(
              uploadTask.snapshot.ref
            );

          await updateDoc(
            doc(
              db,
              "athletes",
              athleteId
            ),
            {
              highlightUrl: url,

              videos: arrayUnion({
                title:
                  file.name.replace(
                    /\.[^.]+$/,
                    ""
                  ),

                url,

                createdAt:
                  new Date().toISOString()
              })
            }
          );

          onComplete?.(url);

          resolve(url);

        }

      );

    }

  );

}

// ======================================================
// MANUAL ATHLETE VIDEO URL
// ======================================================

export async function addAthleteVideoUrl({
  db,
  athleteId,
  title,
  url,
  currentUserId = "unknown"
}) {
  if (!athleteId) {
    throw new Error(
      "Select an athlete first."
    );
  }

  if (!title?.trim()) {
    throw new Error(
      "Enter a video title."
    );
  }

  if (!url?.trim()) {
    throw new Error(
      "Enter a video URL."
    );
  }

  await updateDoc(
    doc(
      db,
      "athletes",
      athleteId
    ),
    {
      videos: arrayUnion({
        title: title.trim(),

        url: url.trim(),

        createdAt:
          new Date().toISOString(),

        createdBy:
          currentUserId
      })
    }
  );

  return true;
}