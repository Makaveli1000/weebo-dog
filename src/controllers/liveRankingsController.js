// ======================================================
// LIVE RANKINGS CONTROLLER
// Loads ranked athletes from Firestore and renders them
// inside the Mortal Vision Live Rankings widget.
// ======================================================

import {
  getTopAthletes
} from "../services/zeusDataService.js";

function escapeHTML(value = "") {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getAthleteSchool(athlete = {}) {
  return (
    athlete.school ||
    athlete.schoolName ||
    athlete["school name"] ||
    "School not listed"
  );
}

function getAthleteLocation(athlete = {}) {
  const locationParts = [
    athlete.city,
    athlete.state
  ].filter(Boolean);

  if (locationParts.length > 0) {
    return locationParts.join(", ");
  }

  return getAthleteSchool(athlete);
}

function createRankingRow(
  athlete = {},
  fallbackRank = 1
) {
  const rank =
    Number(athlete.rank) ||
    fallbackRank;

  const name =
    athlete.name ||
    "Unnamed Athlete";

  const sport =
    athlete.sport ||
    "Sport not listed";

  const location =
    getAthleteLocation(athlete);

  const rating =
    Number(athlete.rating) || 0;

  return `
    <article class="live-ranking-row">
      <div class="live-ranking-position">
        ${rank}
      </div>

      <div class="live-ranking-athlete">
        <strong>
          ${escapeHTML(name)}
        </strong>

        <span>
          ${escapeHTML(location)}
        </span>
      </div>

      <div class="live-ranking-sport">
        ${escapeHTML(sport)}
      </div>

      <div class="live-ranking-rating">
        <span>Zeus Rating</span>

        <strong>
          ${rating}
        </strong>
      </div>
    </article>
  `;
}

function createLoadingMessage() {
  return `
    <div class="live-rankings-loading">
      Loading live athlete rankings...
    </div>
  `;
}

function createEmptyMessage() {
  return `
    <div class="live-rankings-empty">
      <strong>No ranked athletes found.</strong>

      <p>
        Add athlete records and performance scores
        to display live Zeus rankings.
      </p>
    </div>
  `;
}

function createErrorMessage() {
  return `
    <div class="live-rankings-error">
      <strong>Rankings could not be loaded.</strong>

      <p>
        Check your Firebase connection and try again.
      </p>
    </div>
  `;
}

export async function initializeLiveRankings() {
  const rankingsList = document.getElementById(
    "live-rankings-list"
  );

  if (!rankingsList) {
    return;
  }

  rankingsList.innerHTML =
    createLoadingMessage();

  try {
    const athletes =
      await getTopAthletes(10);

    if (
      !Array.isArray(athletes) ||
      athletes.length === 0
    ) {
      rankingsList.innerHTML =
        createEmptyMessage();

      return;
    }

    rankingsList.innerHTML =
      athletes
        .map(
          (athlete, index) =>
            createRankingRow(
              athlete,
              index + 1
            )
        )
        .join("");
  } catch (error) {
    console.error(
      "Live rankings loading failed:",
      error
    );

    rankingsList.innerHTML =
      createErrorMessage();
  }
}