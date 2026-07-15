function cleanText(value = "") {
  return String(value ?? "").trim();
}

function normalizeList(value) {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function normalizeState(value = "") {
  const state = cleanText(value);

  const stateMap = {
    mo: "Missouri",
    "mo.": "Missouri",
    missouri: "Missouri",

    il: "Illinois",
    "il.": "Illinois",
    illinois: "Illinois",

    ks: "Kansas",
    "ks.": "Kansas",
    kansas: "Kansas"
  };

  return (
    stateMap[state.toLowerCase()] ||
    state
  );
}

function normalizeSport(value = "") {
  const sport = cleanText(value);

  const sportMap = {
    football: "Football",
    basketball: "Basketball",
    baseball: "Baseball",
    softball: "Softball",
    soccer: "Soccer",
    volleyball: "Volleyball",
    track: "Track & Field",
    "track & field": "Track & Field",
    wrestling: "Wrestling",
    boxing: "Boxing",
    hockey: "Hockey",
    swimming: "Swimming",
    golf: "Golf",
    lacrosse: "Lacrosse",
    cheer: "Cheer",
    dance: "Dance"
  };

  return (
    sportMap[sport.toLowerCase()] ||
    sport ||
    "Sport"
  );
}

function normalizeScores(athlete = {}) {
  if (Array.isArray(athlete.scores)) {
    return athlete.scores.map((score) =>
      Number(score) || 0
    );
  }

  return [
    Number(athlete.score0) || 0,
    Number(athlete.score1) || 0,
    Number(athlete.score2) || 0,
    Number(athlete.score3) || 0,
    Number(athlete.score4) || 0
  ];
}

function normalizeVideos(athlete = {}) {
  const existingVideos = Array.isArray(
    athlete.videos
  )
    ? athlete.videos.filter(Boolean)
    : [];

  const legacyVideos = Array.isArray(
    athlete.video
  )
    ? athlete.video.filter(Boolean)
    : [];

  return [
    ...existingVideos,
    ...legacyVideos
  ];
}

function detectRecordType(athlete = {}) {
  const explicitType = cleanText(
    athlete.recordType ||
    athlete.type ||
    athlete.entityType
  ).toLowerCase();

  if (
    ["athlete", "team", "school"].includes(
      explicitType
    )
  ) {
    return explicitType;
  }

  const name = cleanText(athlete.name)
    .toLowerCase();

  const teamWords = [
    "squad",
    "team",
    "cadet core",
    "billikens",
    "prep leader"
  ];

  const looksLikeTeam = teamWords.some(
    (word) => name.includes(word)
  );

  return looksLikeTeam
    ? "team"
    : "athlete";
}

export function normalizeAthleteRecord(
  rawAthlete = {},
  id = ""
) {
  const athlete = rawAthlete || {};

  const school =
    cleanText(
      athlete.school ||
      athlete.schoolName ||
      athlete["school name"]
    );

  const position =
    cleanText(
      athlete.position ||
      athlete.posion ||
      athlete.role
    ) || "ATH";

  const highlightUrl =
    cleanText(
      athlete.highlightUrl ||
      athlete.highlight ||
      athlete.higlightightUrl ||
      athlete.higlightUrl
    );

  const videos =
    normalizeVideos(athlete);

  if (
    !videos.length &&
    highlightUrl
  ) {
    videos.push({
      title: "Main Highlight Film",
      url: highlightUrl,
      category: "Featured"
    });
  }

  const normalized = {
    ...athlete,

    id:
      athlete.id ||
      id,

    name:
      cleanText(athlete.name) ||
      "Unnamed Athlete",

    sport:
      normalizeSport(athlete.sport),

    position,

    school,

    schoolName: school,

    city:
      cleanText(athlete.city),

    state:
      normalizeState(athlete.state),

    classYear:
      cleanText(
        athlete.classYear ||
        athlete.graduationYear ||
        athlete.gradYear
      ),

    height:
      cleanText(athlete.height),

    weight:
      cleanText(athlete.weight),

    bio:
      cleanText(
        athlete.bio ||
        athlete.scoutingNotes
      ),

    highlightUrl,

    videos,

    offers:
      normalizeList(athlete.offers),

    achievements:
      normalizeList(
        athlete.achievements
      ),

    scores:
      normalizeScores(athlete),

    zeusRating:
      Number(
        athlete.zeusRating ||
        athlete.totalComposite ||
        0
      ),

    verified:
      Boolean(
        athlete.verified ||
        athlete.isVerified
      ),

    recordType:
      detectRecordType(athlete)
  };

  return normalized;
}