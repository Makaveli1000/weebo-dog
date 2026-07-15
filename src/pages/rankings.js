function escapeRankingHtml(value = "") {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function scoreTotal(athlete = {}) {
  const scores = Array.isArray(athlete.scores)
    ? athlete.scores
    : [
        athlete.score0,
        athlete.score1,
        athlete.score2,
        athlete.score3,
        athlete.score4
      ];

  const calculatedTotal = scores.reduce(
    (sum, value) =>
      sum + (Number(value) || 0),
    0
  );

  return (
    calculatedTotal ||
    Number(
      athlete.zeusRating ||
      athlete.totalComposite ||
      0
    )
  );
}

function normalizeOffers(value) {
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

function getRecruitingStatus(athlete = {}) {
  const offers = normalizeOffers(
    athlete.offers
  );

  if (athlete.recruitingStatus) {
    return athlete.recruitingStatus;
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

  if (offers.length) {
    return "Offered";
  }

  return "Open";
}

function getStatusClass(status = "") {
  const value =
    String(status).toLowerCase();

  if (value === "signed") {
    return "is-signed";
  }

  if (value === "committed") {
    return "is-committed";
  }

  if (value === "offered") {
    return "is-offered";
  }

  if (value === "visiting") {
    return "is-visiting";
  }

  if (value === "transfer portal") {
    return "is-transfer";
  }

  if (value === "professional") {
    return "is-professional";
  }

  return "is-open";
}

function getRankBadge(index) {
  const rank = index + 1;

  if (rank === 1) {
    return `
      <div
        class="ranking-number ranking-number-gold"
        title="National #1">

        🏆 1

      </div>
    `;
  }

  if (rank === 2) {
    return `
      <div
        class="ranking-number ranking-number-silver"
        title="National #2">

        🥈 2

      </div>
    `;
  }

  if (rank === 3) {
    return `
      <div
        class="ranking-number ranking-number-bronze"
        title="National #3">

        🥉 3

      </div>
    `;
  }

  return `
    <div class="ranking-number">
      ${rank}
    </div>
  `;
}

function getRankingMovement(athlete = {}) {
  const change = Number(
    athlete.rankingChange ??
    athlete.rankChange ??
    athlete.movement ??
    0
  );

  const isNew = Boolean(
    athlete.isNewRanking ||
    athlete.newRanking ||
    athlete.rankingStatus === "new"
  );

  if (isNew) {
    return `
      <span class="ranking-movement is-new">
        NEW
      </span>
    `;
  }

  if (change > 0) {
    return `
      <span class="ranking-movement is-up">
        ↑${change}
      </span>
    `;
  }

  if (change < 0) {
    return `
      <span class="ranking-movement is-down">
        ↓${Math.abs(change)}
      </span>
    `;
  }

  return `
    <span class="ranking-movement is-stable">
      —
    </span>
  `;
}

function getAthleteState(athlete = {}) {
  return (
    athlete.state ||
    athlete.homeState ||
    athlete.schoolState ||
    "Unlisted"
  );
}

function getSchoolLogo(athlete = {}) {
  const schoolLogo =
    athlete.schoolLogo ||
    athlete.schoolLogoUrl ||
    athlete.teamLogo ||
    athlete.logoUrl ||
    "";

  const school =
    athlete.school ||
    athlete.schoolName ||
    athlete["school name"] ||
    "School Unlisted";

  if (schoolLogo) {
    return `
      <img
        class="ranking-school-logo"
        src="${escapeRankingHtml(schoolLogo)}"
        alt="${escapeRankingHtml(school)}">
    `;
  }

  return `
    <div
      class="ranking-school-logo ranking-school-logo-fallback"
      title="${escapeRankingHtml(school)}">

      🏫

    </div>
  `;
}

function rankingRow(item, index) {
  const athlete =
    item.data || item;

  const athleteId =
    item.id ||
    athlete.id ||
    "";

  const total =
    scoreTotal(athlete);

  const school =
    athlete.school ||
    athlete.schoolName ||
    athlete["school name"] ||
    "School Unlisted";

  const sport =
    athlete.sport ||
    "Sport";

  const position =
    athlete.position ||
    athlete.posion ||
    athlete.role ||
    "ATH";

  const classYear =
    athlete.classYear ||
    athlete.graduationYear ||
    athlete.gradYear ||
    "N/A";

  const state =
    getAthleteState(athlete);

  const recruitingStatus =
    getRecruitingStatus(athlete);

  const statusClass =
    getStatusClass(recruitingStatus);

  const hasFilm = Boolean(
    (
      Array.isArray(athlete.videos) &&
      athlete.videos.length > 0
    ) ||
    athlete.highlightUrl ||
    athlete.highlight
  );

  const verified = Boolean(
    athlete.verified ||
    athlete.isVerified ||
    athlete.profileVerified ||
    athlete.identityVerified
  );

  const isTrending = Boolean(
    athlete.trending ||
    athlete.isTrending ||
    Number(athlete.trendingScore || 0) > 0 ||
    Number(athlete.rankingChange || 0) > 0
  );

  const nationalRank =
    Number(
      athlete.nationalRank ||
      index + 1
    );

  const stateRank =
    Number(
      athlete.stateRank ||
      athlete.rankInState ||
      0
    );

  const photoUrl =
    athlete.photoUrl ||
    athlete.profilePhoto ||
    "";

  return `
    <tr
      class="ranking-row"
      data-ranking-row
      data-ranking-scope="national"
      data-ranking-national-rank="${nationalRank}"
      data-ranking-state-rank="${stateRank}"
      data-ranking-state="${escapeRankingHtml(state)}"
      data-ranking-sport="${escapeRankingHtml(sport)}"
      data-ranking-class="${escapeRankingHtml(classYear)}"
      data-ranking-name="${escapeRankingHtml(
        athlete.name || ""
      )}">

      <!-- RANK -->

      <td class="ranking-rank-cell">

        ${getRankBadge(index)}

      </td>

      <!-- ATHLETE -->

      <td class="ranking-athlete-column">

        <div class="ranking-athlete-cell">

          ${
            photoUrl
              ? `
                  <img
                    class="ranking-athlete-photo"
                    src="${escapeRankingHtml(photoUrl)}"
                    alt="${escapeRankingHtml(
                      athlete.name ||
                      "Athlete"
                    )}">
                `
              : `
                  <div class="ranking-athlete-photo ranking-athlete-photo-fallback">
                    👤
                  </div>
                `
          }

          <div class="ranking-athlete-info">

            <div class="ranking-athlete-name-row">

              <strong>
                ${escapeRankingHtml(
                  athlete.name ||
                  "Unknown Athlete"
                )}
              </strong>

              ${
                verified
                  ? `
                      <span
                        class="ranking-verified-badge"
                        title="Verified athlete">

                        ⭐ Verified

                      </span>
                    `
                  : ""
              }

              ${
                isTrending
                  ? `
                      <span
                        class="ranking-trending-badge"
                        title="Trending athlete">

                        🔥 Trending

                      </span>
                    `
                  : ""
              }

            </div>

            <small>
              ${escapeRankingHtml(sport)}
              •
              ${escapeRankingHtml(position)}
              •
              Class ${escapeRankingHtml(classYear)}
            </small>

          </div>

        </div>

      </td>

      <!-- SCHOOL -->

      <td class="ranking-school-column">

        <div class="ranking-school-cell">

          ${getSchoolLogo(athlete)}

          <div>

            <strong>
              ${escapeRankingHtml(school)}
            </strong>

            <small>
              ${escapeRankingHtml(state)}
            </small>

          </div>

        </div>

      </td>

      <!-- RATING -->

      <td class="ranking-rating-column">

        <span class="rank-score">
          ${total || "--"}
        </span>

        <small>
          Zeus Rating
        </small>

      </td>

      <!-- FILM -->

      <td class="ranking-film-column">

        ${
          hasFilm
            ? `
                <button
                  type="button"
                  class="ranking-film-badge is-ready"
                  onclick="event.stopPropagation(); window.openAthleteFromDirectory?.('${escapeRankingHtml(
                    athleteId
                  )}')">

                  🎥 Film

                </button>
              `
            : `
                <span class="ranking-film-badge is-missing">
                  No Film
                </span>
              `
        }

      </td>

      <!-- RECRUITING -->

      <td class="ranking-recruiting-column">

        <span class="ranking-status ${statusClass}">
          ${escapeRankingHtml(
            recruitingStatus
          )}
        </span>

      </td>

      <!-- MOVEMENT -->

      <td class="ranking-movement-column">

        ${getRankingMovement(athlete)}

      </td>

      <!-- PROFILE -->

      <td class="ranking-profile-column">

        <button
          type="button"
          class="ranking-view-btn"
          onclick="window.openAthleteFromDirectory?.('${escapeRankingHtml(
            athleteId
          )}')">

          View Profile

        </button>

      </td>

    </tr>
  `;
}
          
function buildUniqueRankings(
  athletes = []
) {
  const uniqueAthletes = new Map();

  athletes.forEach((item) => {
    const athlete =
      item.data || item;

    if (
      athlete.recordType &&
      athlete.recordType !== "athlete"
    ) {
      return;
    }

    const name = String(
      athlete.name || ""
    )
      .trim()
      .toLowerCase();

    const school = String(
      athlete.school ||
      athlete.schoolName ||
      athlete["school name"] ||
      ""
    )
      .trim()
      .toLowerCase();

    const sport = String(
      athlete.sport || ""
    )
      .trim()
      .toLowerCase();

    const classYear = String(
      athlete.classYear || ""
    )
      .trim()
      .toLowerCase();

    const duplicateKey = [
      name,
      school,
      sport,
      classYear
    ].join("|");

    const existing =
      uniqueAthletes.get(duplicateKey);

    if (
      !existing ||
      scoreTotal(athlete) >
        scoreTotal(
          existing.data || existing
        )
    ) {
      uniqueAthletes.set(
        duplicateKey,
        item
      );
    }
  });

  return Array.from(
    uniqueAthletes.values()
  );
}

function renderRankingPodium(ranked = []) {
  const topThree = ranked.slice(0, 3);

  if (!topThree.length) {
    return "";
  }

  const podiumOrder = [
    topThree[1],
    topThree[0],
    topThree[2]
  ];

  return `
    <section class="rankings-podium">

      ${podiumOrder
        .map((item, podiumIndex) => {
          if (!item) return "";

          const athlete =
            item.data || item;

          const athleteId =
            item.id ||
            athlete.id ||
            "";

          const realRank =
            podiumIndex === 0
              ? 2
              : podiumIndex === 1
                ? 1
                : 3;

          const school =
            athlete.school ||
            athlete.schoolName ||
            athlete["school name"] ||
            "School Unlisted";

          const sport =
            athlete.sport ||
            "Sport";

          const position =
            athlete.position ||
            athlete.posion ||
            athlete.role ||
            "ATH";

          const photoUrl =
            athlete.photoUrl ||
            athlete.profilePhoto ||
            "";

          const verified = Boolean(
            athlete.verified ||
            athlete.isVerified ||
            athlete.profileVerified
          );

          const total =
            scoreTotal(athlete);

          const cardClass =
            realRank === 1
              ? "is-first"
              : realRank === 2
                ? "is-second"
                : "is-third";

          const medal =
            realRank === 1
              ? "🏆"
              : realRank === 2
                ? "🥈"
                : "🥉";

          return `
            <article
              class="rankings-podium-card ${cardClass}">

              <div class="rankings-podium-rank">
                ${medal} #${realRank}
              </div>

              ${
                photoUrl
                  ? `
                      <img
                        class="rankings-podium-photo"
                        src="${escapeRankingHtml(photoUrl)}"
                        alt="${escapeRankingHtml(
                          athlete.name ||
                          "Athlete"
                        )}">
                    `
                  : `
                      <div class="rankings-podium-photo rankings-podium-photo-fallback">
                        👤
                      </div>
                    `
              }

              <div class="rankings-podium-copy">

                <div class="rankings-podium-name-row">

                  <h3>
                    ${escapeRankingHtml(
                      athlete.name ||
                      "Unknown Athlete"
                    )}
                  </h3>

                  ${
                    verified
                      ? `
                          <span
                            class="ranking-verified-badge">

                            ⭐ Verified

                          </span>
                        `
                      : ""
                  }

                </div>

                <p>
                  ${escapeRankingHtml(school)}
                </p>

                <small>
                  ${escapeRankingHtml(sport)}
                  •
                  ${escapeRankingHtml(position)}
                </small>

              </div>

              <div class="rankings-podium-rating">

                <span>
                  Zeus Rating
                </span>

                <strong>
                  ${total || "--"}
                </strong>

              </div>

              <button
                type="button"
                class="ranking-view-btn"
                onclick="window.openAthleteFromDirectory?.('${escapeRankingHtml(
                  athleteId
                )}')">

                View Profile

              </button>

            </article>
          `;
        })
        .join("")}

    </section>
  `;
}

export function renderRankingsPage(
  athletes = []
) {
  const ranked = buildUniqueRankings(
    athletes
  )
    .sort(
      (a, b) =>
        scoreTotal(b.data || b) -
        scoreTotal(a.data || a)
    )
    .slice(0, 100);

  const availableClasses = [
    ...new Set(
      ranked
        .map((item) => {
          const athlete =
            item.data || item;

          return (
            athlete.classYear ||
            athlete.graduationYear ||
            athlete.gradYear ||
            ""
          );
        })
        .filter(Boolean)
    )
  ].sort();

  return `
    <section
      id="rankings-page"
      class="rankings-page">

     <div class="rankings-hero">

  <div class="rankings-hero-copy">

    <p class="network-kicker">
      Zeus National Rankings
    </p>

    <h2>
      National Athlete Rankings
    </h2>

    <p>
      Compare athletes using verified profiles,
      recruiting movement, film availability,
      performance data, school information,
      and the Zeus Rating.
    </p>

  </div>

  <div class="rankings-hero-stat">

    <span>
      Ranked Athletes
    </span>

    <strong>
      ${ranked.length}
    </strong>

    <small>
      Live database
    </small>

  </div>

</div>

<div class="rankings-scope-tabs">

  <button
    type="button"
    class="active"
    data-ranking-scope-filter="national">

    🌎 National

  </button>

  <button
    type="button"
    data-ranking-scope-filter="state">

    📍 State Rankings

  </button>

</div>

${renderRankingPodium(ranked)}

<div class="rankings-header">

  <div
    id="rankings-filters"
    class="rankings-filters">

          <select id="rankings-sport-filter">

            <option value="all">
              All Sports
            </option>

            <option value="Football">
              Football
            </option>

            <option value="Girls Flag Football">
              Girls Flag Football
            </option>

            <option value="Basketball">
              Basketball
            </option>

            <option value="Baseball">
              Baseball
            </option>

            <option value="Softball">
              Softball
            </option>

            <option value="Soccer">
              Soccer
            </option>

            <option value="Volleyball">
              Volleyball
            </option>

            <option value="Track & Field">
              Track & Field
            </option>

            <option value="Wrestling">
              Wrestling
            </option>

            <option value="Boxing">
              Boxing
            </option>

            <option value="Hockey">
              Hockey
            </option>

            <option value="Swimming">
              Swimming
            </option>

          </select>

          <select id="rankings-class-filter">

            <option value="all">
              All Classes
            </option>

            ${availableClasses
              .map((classYear) => `
                <option value="${escapeRankingHtml(
                  classYear
                )}">

                  ${escapeRankingHtml(classYear)}

                </option>
              `)
              .join("")}

          </select>

          <input
            id="rankings-search-input"
            type="search"
            placeholder="Search athlete or school...">

        </div>

      </div>

      <div class="rankings-table-wrapper">

        <table class="rankings-table">

          <thead>

  <tr>

    <th>
      Rank
    </th>

    <th>
      Athlete
    </th>

    <th>
      School
    </th>

    <th>
      Zeus Rating
    </th>

    <th>
      Film
    </th>

    <th>
      Recruiting
    </th>

    <th>
      Movement
    </th>

    <th>
      Profile
    </th>

  </tr>

</thead>

          <tbody id="rankings-table-body">

            ${
              ranked.length
                ? ranked
                    .map(rankingRow)
                    .join("")
                : `
                    <tr>

                      <td
                        colspan="8"
                        class="rankings-empty-cell">

                        No ranked athletes yet.
                        Add athletes in the Admin
                        Command Center.

                      </td>

                    </tr>
                  `
            }

          </tbody>

        </table>

      </div>

      <div
        id="rankings-empty-state"
        class="rankings-empty-state hidden">

        <span>
          🏆
        </span>

        <strong>
          No rankings found
        </strong>

        <p>
          No athlete profiles match
          the selected ranking filters.
        </p>

      </div>

    </section>
  `;
}