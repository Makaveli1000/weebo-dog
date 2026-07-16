// ======================================================
// SNT.L.MO. FILTER UTILITIES
// Shared athlete filtering and normalization helpers.
// ======================================================

export function normalizeFilterValue(
  value = ""
) {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

export function normalizeCommaList(
  value = ""
) {
  if (Array.isArray(value)) {
    return value
      .map((item) =>
        String(item ?? "").trim()
      )
      .filter(Boolean);
  }

  return String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function getAthleteRecruitingStatus(
  athlete = {}
) {
  if (
    athlete.recruitingStatus ||
    athlete.commitmentStatus
  ) {
    return (
      athlete.recruitingStatus ||
      athlete.commitmentStatus
    );
  }

  if (
    athlete.signedSchool ||
    athlete.signingDate
  ) {
    return "Signed";
  }

  if (
    athlete.committedSchool ||
    athlete.committedTo ||
    athlete.commitment
  ) {
    return "Committed";
  }

  if (
    athlete.transferPortal === true ||
    athlete.inTransferPortal === true
  ) {
    return "Transfer Portal";
  }

  if (
    athlete.tier === "pro-players" ||
    athlete.professional === true
  ) {
    return "Professional";
  }

  if (
    normalizeCommaList(
      athlete.offers
    ).length
  ) {
    return "Offered";
  }

  return "Open";
}

export function athleteHasFilm(
  athlete = {}
) {
  return Boolean(
    (
      Array.isArray(athlete.videos) &&
      athlete.videos.length > 0
    ) ||
    athlete.highlightUrl ||
    athlete.highlight ||
    athlete.higlightightUrl
  );
}

export function getRecruitingStatusClasses(
  status = ""
) {
  switch (
    normalizeFilterValue(status)
  ) {
    case "signed":
      return (
        "bg-gray-800 text-gray-200 " +
        "border-gray-600"
      );

    case "committed":
      return (
        "bg-purple-950/50 text-purple-300 " +
        "border-purple-800"
      );

    case "offered":
      return (
        "bg-blue-950/50 text-blue-300 " +
        "border-blue-800"
      );

    case "visiting":
      return (
        "bg-yellow-950/40 text-yellow-300 " +
        "border-yellow-800"
      );

    case "transfer portal":
      return (
        "bg-orange-950/50 text-orange-300 " +
        "border-orange-800"
      );

    case "professional":
      return (
        "bg-red-950/50 text-red-300 " +
        "border-red-800"
      );

    default:
      return (
        "bg-green-950/40 text-green-300 " +
        "border-green-800"
      );
  }
}

export function filterAthleteRecords(
  records = [],
  filters = {}
) {
  const selectedTier =
    filters.tier || "all";

  const selectedSubTier =
    filters.subTier || "all";

  const selectedSport =
    filters.sport || "all";

  const positionQuery =
    normalizeFilterValue(
      filters.position
    );

  const classQuery =
    normalizeFilterValue(
      filters.classYear
    );

  const recruitingFilter =
    filters.recruitingStatus ||
    "all";

  const filmFilter =
    filters.film ||
    "all";

  return records.filter(
    (item) => {
      const athlete =
        item?.data || item || {};

      if (
        athlete.recordType &&
        athlete.recordType !== "athlete"
      ) {
        return false;
      }

      const athleteTier =
        athlete.tier || "";

      const athleteSubTier =
        athlete.subCategory || "";

      const athleteSport =
        athlete.sport || "";

      const athletePosition =
        normalizeFilterValue(
          athlete.position ||
          athlete.posion ||
          athlete.role
        );

      const athleteClass =
        normalizeFilterValue(
          athlete.classYear ||
          athlete.graduationYear ||
          athlete.gradYear
        );

      const recruitingStatus =
        getAthleteRecruitingStatus(
          athlete
        );

      const hasFilm =
        athleteHasFilm(athlete);

      const matchesTier =
        selectedTier === "all" ||
        athleteTier === selectedTier;

      const matchesSubTier =
        selectedSubTier === "all" ||
        athleteSubTier ===
          selectedSubTier;

      const matchesSport =
        selectedSport === "all" ||
        athleteSport === selectedSport;

      const matchesPosition =
        !positionQuery ||
        athletePosition.includes(
          positionQuery
        );

      const matchesClass =
        !classQuery ||
        athleteClass.includes(
          classQuery
        );

      const matchesRecruiting =
        recruitingFilter === "all" ||
        recruitingStatus ===
          recruitingFilter;

      const matchesFilm =
        filmFilter === "all" ||
        (
          filmFilter === "with-film" &&
          hasFilm
        ) ||
        (
          filmFilter === "without-film" &&
          !hasFilm
        );

      return (
        matchesTier &&
        matchesSubTier &&
        matchesSport &&
        matchesPosition &&
        matchesClass &&
        matchesRecruiting &&
        matchesFilm
      );
    }
  );
}