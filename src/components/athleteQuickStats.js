function normalizeList(value) {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map(item => item.trim())
      .filter(Boolean);
  }

  return [];
}

export function renderAthleteQuickStats(athlete = {}) {
  const score =
    athlete.zeusRating ||
    athlete.score ||
    athlete.total ||
    "N/A";

  const offers = normalizeList(athlete.offers);

  const videos = Array.isArray(athlete.videos)
    ? athlete.videos.filter(Boolean)
    : [];

  const hasFallbackFilm = Boolean(
    athlete.highlightUrl ||
    athlete.highlight
  );

  const videoCount =
    videos.length ||
    (hasFallbackFilm ? 1 : 0);

  const hasFilm =
    videos.length > 0 ||
    hasFallbackFilm;

  const height =
    athlete.height ||
    "N/A";

  const weight =
    athlete.weight ||
    "N/A";

  const position =
    athlete.position ||
    athlete.posion ||
    "ATH";

  const classYear =
    athlete.classYear ||
    athlete.graduationYear ||
    "N/A";

  const quickStats = [
    ["ZEUS", score],
    ["OFFERS", offers.length],
    ["VIDEOS", videoCount],
    ["HEIGHT", height],
    ["WEIGHT", weight],
    ["POSITION", position],
    ["CLASS", classYear],
    ["FILM", hasFilm ? "YES" : "NO"]
  ];

  return `
    <div class="athlete-quick-stats">

      ${quickStats.map(([label, value]) => `
        <div class="quick-stat">

          <span>
            ${label}
          </span>

          <strong>
            ${value}
          </strong>

        </div>
      `).join("")}

    </div>
  `;
}