// ======================================================
// SNT.L.MO. ATHLETE SERVICE
// Handles Firestore athlete reads, writes, subscriptions,
// duplicate detection, and cleanup.
// ======================================================

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc
} from "firebase/firestore";

function normalizeText(value = "") {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

function safeNumber(value) {
  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : 0;
}

function getAthleteScoreTotal(
  athlete = {}
) {
  const scores = Array.isArray(
    athlete.scores
  )
    ? athlete.scores
    : [
        athlete.score0,
        athlete.score1,
        athlete.score2,
        athlete.score3,
        athlete.score4
      ];

  return scores.reduce(
    (total, score) =>
      total + safeNumber(score),
    0
  );
}

export function buildAthleteDuplicateKey(
  athlete = {}
) {
  return [
    normalizeText(athlete.name),
    normalizeText(athlete.sport),
    normalizeText(
      athlete.school ||
      athlete.schoolName ||
      athlete["school name"]
    ),
    normalizeText(
      athlete.classYear ||
      athlete.graduationYear ||
      athlete.gradYear
    )
  ].join("|");
}

export function buildUniqueAthleteRecords(
  records = []
) {
  const uniqueRecords =
    new Map();

  records.forEach((record) => {
    const athlete =
      record?.data || {};

    if (
      athlete.recordType &&
      athlete.recordType !== "athlete"
    ) {
      return;
    }

    const duplicateKey =
      buildAthleteDuplicateKey(
        athlete
      );

    const existingRecord =
      uniqueRecords.get(
        duplicateKey
      );

    if (!existingRecord) {
      uniqueRecords.set(
        duplicateKey,
        record
      );

      return;
    }

    const existingScore =
      getAthleteScoreTotal(
        existingRecord.data
      );

    const incomingScore =
      getAthleteScoreTotal(
        athlete
      );

    if (
      incomingScore >
      existingScore
    ) {
      uniqueRecords.set(
        duplicateKey,
        record
      );
    }
  });

  return Array.from(
    uniqueRecords.values()
  ).sort(
    (first, second) =>
      getAthleteScoreTotal(
        second.data
      ) -
      getAthleteScoreTotal(
        first.data
      )
  );
}

export function subscribeToAthleteRecords({
  db,
  normalizeRecord = (
    data,
    id
  ) => ({
    id,
    ...data
  }),
  maxResults = 120,
  onData,
  onError
} = {}) {
  if (!db) {
    throw new Error(
      "Firestore database instance is required."
    );
  }

  const athleteQuery =
    query(
      collection(
        db,
        "athletes"
      ),
      limit(maxResults)
    );

  return onSnapshot(
    athleteQuery,

    (snapshot) => {
      const loadedRecords =
        snapshot.docs.map(
          (athleteDocument) => ({
            id:
              athleteDocument.id,

            data:
              normalizeRecord(
                athleteDocument.data(),
                athleteDocument.id
              )
          })
        );

      const uniqueRecords =
        buildUniqueAthleteRecords(
          loadedRecords
        );

      onData?.(
        uniqueRecords
      );
    },

    (error) => {
      console.error(
        "Athlete subscription failed:",
        error
      );

      onError?.(error);
    }
  );
}

export async function saveAthleteRecord({
  db,
  athleteData,
  athleteId = null,
  currentUserId = "unknown",
  existingRecord = null
} = {}) {
  if (!db) {
    throw new Error(
      "Firestore database instance is required."
    );
  }

  if (!athleteData?.name) {
    throw new Error(
      "Athlete name is required."
    );
  }

  const athleteDocument = {
    ...athleteData,

    videos:
      Array.isArray(
        existingRecord?.videos
      )
        ? existingRecord.videos
        : Array.isArray(
            athleteData.videos
          )
          ? athleteData.videos
          : [],

    verified:
      Boolean(
        existingRecord?.verified ||
        existingRecord?.isVerified ||
        existingRecord?.profileVerified ||
        athleteData.verified
      ),

    recordType:
      "athlete",

    updatedAt:
      serverTimestamp(),

    createdBy:
      existingRecord?.createdBy ||
      athleteData.createdBy ||
      currentUserId ||
      "unknown"
  };

  if (athleteId) {
    await updateDoc(
      doc(
        db,
        "athletes",
        athleteId
      ),
      athleteDocument
    );

    return {
      id: athleteId,
      mode: "updated",
      data: athleteDocument
    };
  }

  const createdDocument =
    await addDoc(
      collection(
        db,
        "athletes"
      ),
      {
        ...athleteDocument,
        createdAt:
          serverTimestamp()
      }
    );

  return {
    id: createdDocument.id,
    mode: "created",
    data: athleteDocument
  };
}

export function findDuplicateAthlete(
  records = [],
  athleteData = {}
) {
  const duplicateKey =
    buildAthleteDuplicateKey(
      athleteData
    );

  return records.find(
    (record) =>
      buildAthleteDuplicateKey(
        record?.data || {}
      ) === duplicateKey
  ) || null;
}

export async function deleteAthleteRecord({
  db,
  athleteId
} = {}) {
  if (!db || !athleteId) {
    throw new Error(
      "Database and athlete ID are required."
    );
  }

  await deleteDoc(
    doc(
      db,
      "athletes",
      athleteId
    )
  );
}

export async function purgeDuplicateAthletes({
  db
} = {}) {
  if (!db) {
    throw new Error(
      "Firestore database instance is required."
    );
  }

  const snapshot =
    await getDocs(
      collection(
        db,
        "athletes"
      )
    );

  const savedRecords =
    new Map();

  const deletions = [];

  snapshot.docs.forEach(
    (athleteDocument) => {
      const athlete =
        athleteDocument.data();

      const duplicateKey =
        buildAthleteDuplicateKey(
          athlete
        );

      if (
        !duplicateKey.replace(
          /\|/g,
          ""
        )
      ) {
        return;
      }

      const currentRecord = {
        id:
          athleteDocument.id,

        score:
          getAthleteScoreTotal(
            athlete
          )
      };

      const savedRecord =
        savedRecords.get(
          duplicateKey
        );

      if (!savedRecord) {
        savedRecords.set(
          duplicateKey,
          currentRecord
        );

        return;
      }

      if (
        currentRecord.score >
        savedRecord.score
      ) {
        deletions.push(
          deleteDoc(
            doc(
              db,
              "athletes",
              savedRecord.id
            )
          )
        );

        savedRecords.set(
          duplicateKey,
          currentRecord
        );
      } else {
        deletions.push(
          deleteDoc(
            doc(
              db,
              "athletes",
              currentRecord.id
            )
          )
        );
      }
    }
  );

  await Promise.all(
    deletions
  );

  return deletions.length;
}