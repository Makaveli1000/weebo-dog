// ======================================================
// ZEUS DATA SERVICE
// Central live-data provider for Zeus AI widgets.
// ======================================================

import {
  db
} from "./firebaseService.js";

import {
  getTopAthleteRecords,
  searchAthleteRecords
} from "./athletes.js";

function createEmptyDashboardData() {
  return {
    rankings: [],
    athletes: [],
    schools: [],
    highlights: [],
    recruiting: [],
    liveGames: []
  };
}

export async function getDashboardData() {
  try {
    const rankings =
      await getTopAthleteRecords({
        db,
        maxResults: 10
      });

    return {
      ...createEmptyDashboardData(),
      rankings,
      athletes: rankings
    };
  } catch (error) {
    console.error(
      "Zeus dashboard data failed:",
      error
    );

    return createEmptyDashboardData();
  }
}

export async function searchZeus(query) {
  const searchTerm =
    String(query ?? "").trim();

  if (!searchTerm) {
    return {
      athletes: [],
      schools: [],
      highlights: [],
      recruiting: []
    };
  }

  try {
    const athletes =
      await searchAthleteRecords({
        db,
        searchTerm,
        maxResults: 25
      });

    return {
      athletes,
      schools: [],
      highlights: [],
      recruiting: []
    };
  } catch (error) {
    console.error(
      "Zeus search service failed:",
      error
    );

    throw error;
  }
}

export async function getTopAthletes(
  maxResults = 10
) {
  try {
    return await getTopAthleteRecords({
      db,
      maxResults
    });
  } catch (error) {
    console.error(
      "Top athlete loading failed:",
      error
    );

    return [];
  }
}

export async function getTopSchools() {
  return [];
}

export async function getTrendingHighlights() {
  return [];
}

export async function getLiveGames() {
  return [];
}