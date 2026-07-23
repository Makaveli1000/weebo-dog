import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  getDocs
} from "firebase/firestore";

// ======================================================
// ATHLETE LIVE SUBSCRIPTION
// ======================================================

export function subscribeAthletes(
  db,
  callback
) {
  return onSnapshot(
    collection(db, "athletes"),
    (snapshot) => {
      const athletes =
        snapshot.docs.map((item) => ({
          id: item.id,
          data: item.data()
        }));

      callback(athletes);
    },
    (error) => {
      console.error(
        "Athlete subscription failed:",
        error
      );

      callback([]);
    }
  );
}

// ======================================================
// CREATE ATHLETE
// ======================================================

export function createAthlete(
  db,
  athlete
) {
  return addDoc(
    collection(db, "athletes"),
    {
      ...athlete,
      createdAt: serverTimestamp()
    }
  );
}

// ======================================================
// UPDATE ATHLETE
// ======================================================

export function updateAthlete(
  db,
  id,
  updates
) {
  return updateDoc(
    doc(db, "athletes", id),
    {
      ...updates,
      updatedAt: serverTimestamp()
    }
  );
}

// ======================================================
// DELETE ATHLETE
// ======================================================

export function deleteAthlete(
  db,
  id
) {
  return deleteDoc(
    doc(db, "athletes", id)
  );
}

// ======================================================
// GET TOP ATHLETE RECORDS
// Used by Zeus dashboard and rankings widgets.
// ======================================================

export async function getTopAthleteRecords({
  db,
  maxResults = 10
} = {}) {
  if (!db) {
    console.warn(
      "getTopAthleteRecords requires a Firestore database instance."
    );

    return [];
  }

  const snapshot =
    await getDocs(
      collection(db, "athletes")
    );

  const records =
    snapshot.docs.map((item) => ({
      id: item.id,
      data: item.data()
    }));

  records.sort(
    (firstRecord, secondRecord) => {
      const firstScore =
        getAthleteRankingScore(
          firstRecord.data
        );

      const secondScore =
        getAthleteRankingScore(
          secondRecord.data
        );

      return secondScore - firstScore;
    }
  );

  return records.slice(
    0,
    Math.max(
      0,
      Number(maxResults) || 10
    )
  );
}

// ======================================================
// SEARCH ATHLETE RECORDS
// Searches athlete names, schools, sports, positions,
// locations, classifications, and recruiting fields.
// ======================================================

export async function searchAthleteRecords({
  db,
  searchTerm = "",
  maxResults = 25
} = {}) {
  if (!db) {
    console.warn(
      "searchAthleteRecords requires a Firestore database instance."
    );

    return [];
  }

  const normalizedSearchTerm =
    normalizeSearchValue(
      searchTerm
    );

  if (!normalizedSearchTerm) {
    return [];
  }

  const snapshot =
    await getDocs(
      collection(db, "athletes")
    );

  const matchingRecords =
    snapshot.docs
      .map((item) => ({
        id: item.id,
        data: item.data()
      }))
      .filter((record) => {
        const searchableText =
          createAthleteSearchText(
            record.data
          );

        return searchableText.includes(
          normalizedSearchTerm
        );
      })
      .sort(
        (firstRecord, secondRecord) =>
          getAthleteRankingScore(
            secondRecord.data
          ) -
          getAthleteRankingScore(
            firstRecord.data
          )
      );

  return matchingRecords.slice(
    0,
    Math.max(
      0,
      Number(maxResults) || 25
    )
  );
}

// ======================================================
// PRIVATE HELPERS
// ======================================================

function getAthleteRankingScore(
  athlete = {}
) {
  const directScores = [
    athlete.zeusRating,
    athlete.apexRating,
    athlete.totalComposite,
    athlete.composite,
    athlete.total,
    athlete.rating
  ];

  for (const score of directScores) {
    const numericScore =
      Number(score);

    if (
      Number.isFinite(
        numericScore
      )
    ) {
      return numericScore;
    }
  }

  if (
    Array.isArray(
      athlete.scores
    )
  ) {
    return athlete.scores.reduce(
      (total, score) =>
        total +
        (Number(score) || 0),
      0
    );
  }

  const individualScores = [
    athlete.score0,
    athlete.score1,
    athlete.score2,
    athlete.score3,
    athlete.score4
  ];

  return individualScores.reduce(
    (total, score) =>
      total +
      (Number(score) || 0),
    0
  );
}

function createAthleteSearchText(
  athlete = {}
) {
  const searchableValues = [
    athlete.name,
    athlete.athleteName,
    athlete.firstName,
    athlete.lastName,
    athlete.school,
    athlete.schoolName,
    athlete["school name"],
    athlete.sport,
    athlete.discipline,
    athlete.position,
    athlete.posion,
    athlete.city,
    athlete.state,
    athlete.classification,
    athlete.classYear,
    athlete.graduationYear,
    athlete.team,
    athlete.club,
    athlete.college,
    athlete.commitment,
    athlete.offer
  ];

  return normalizeSearchValue(
    searchableValues
      .filter(Boolean)
      .join(" ")
  );
}

function normalizeSearchValue(
  value
) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}