// ======================================================
// DATABASE SEED SERVICE
// ======================================================

import {
  addDoc,
  collection,
  getDocs,
  limit,
  query,
  serverTimestamp
} from "firebase/firestore";

const ST_LOUIS_INITIAL_SEEDS = [
  {
    name: "Vashon Elite Squad",
    sport: "Basketball",
    tier: "highschool",
    subCategory: "phsl",
    scores: [95, 92, 94, 96, 98],
    highlightUrl:
      "https://www.youtube.com/watch?v=ifiFShFX5Pg",
    recordType: "athlete"
  },
  {
    name: "Soldan Prep Leader",
    sport: "Basketball",
    tier: "highschool",
    subCategory: "phsl",
    scores: [88, 85, 90, 89, 91],
    highlightUrl: "",
    recordType: "athlete"
  },
  {
    name: "CBC Cadet Core",
    sport: "Football",
    tier: "highschool",
    subCategory: "mcc",
    scores: [94, 96, 95, 93, 97],
    highlightUrl: "",
    recordType: "athlete"
  },
  {
    name: "SLUH Jr. Billikens",
    sport: "Track & Field",
    tier: "highschool",
    subCategory: "mcc",
    scores: [89, 92, 91, 90, 94],
    highlightUrl: "",
    recordType: "athlete"
  },
  {
    name: "Macler Cody (Mac10)",
    sport: "Football",
    tier: "pro-players",
    subCategory: "pro-cfl-alt",
    scores: [98, 97, 99, 96, 98],
    highlightUrl: "",
    recordType: "athlete"
  },
  {
    name: "David Freese (Lafayette HS)",
    sport: "Baseball",
    tier: "pro-players",
    subCategory: "pro-major",
    scores: [95, 94, 96, 92, 95],
    highlightUrl: "",
    recordType: "athlete"
  },
  {
    name: "Pat Maroon (Oakville HS)",
    sport: "Hockey",
    tier: "pro-players",
    subCategory: "pro-major",
    scores: [93, 95, 94, 91, 96],
    highlightUrl: "",
    recordType: "athlete"
  },
  {
    name: "Bradley Beal (Chaminade)",
    sport: "Basketball",
    tier: "pro-players",
    subCategory: "pro-major",
    scores: [97, 98, 96, 95, 99],
    highlightUrl: "",
    recordType: "athlete"
  }
];

export async function checkAndSeedDatabase(db) {
  const existingSnapshot =
    await getDocs(
      query(
        collection(db, "athletes"),
        limit(1)
      )
    );

  if (!existingSnapshot.empty) {
    return;
  }

  const athletesCollection =
    collection(db, "athletes");

  for (const athlete of ST_LOUIS_INITIAL_SEEDS) {
    await addDoc(
      athletesCollection,
      {
        ...athlete,
        videos: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        createdBy: "auto_init"
      }
    );
  }
}