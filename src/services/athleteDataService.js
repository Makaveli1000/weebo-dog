// ======================================================
// ATHLETE DATA SERVICE
// Central service for athlete data.
// Later this will connect to Firebase.
// ======================================================

import {
  getTopRankedAthletes,
  searchAthletes
} from "./athleteDataService.js";

const ATHLETES = [];

export async function getTopAthletes() {
  return getTopRankedAthletes(10);
}

export async function getTopRankedAthletes(limit = 10) {
  return [...ATHLETES]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, limit);
}

export async function searchZeus(query) {
  return {
    athletes: await searchAthletes(query),
    schools: [],
    highlights: [],
    recruiting: []
  };
}