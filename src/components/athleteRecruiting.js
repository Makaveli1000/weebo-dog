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

export function renderAthleteRecruiting(athlete = {}) {
  const name =
    athlete.name ||
    "This athlete";

  const position =
    athlete.position ||
    athlete.posion ||
    "ATH";

  const score =
    athlete.zeusRating ||
    athlete.score ||
    athlete.total ||
    "N/A";

  const offers = normalizeList(athlete.offers);
  const visits = normalizeList(athlete.visits);

  const recruitingStatus =
    athlete.recruitingStatus ||
    athlete.commitmentStatus ||
    "Open";

  const commitment =
    athlete.commitment ||
    athlete.committedTo ||
    "Uncommitted";

  const recruitingLevel =
    athlete.recruitingLevel ||
    athlete.projection ||
    "National Prospect";

  const strengths = normalizeList(athlete.strengths);

  const displayedStrengths = strengths.length
    ? strengths
    : [
        "Athletic ability",
        "Competitiveness",
        "Leadership",
        "Coachability"
      ];

  const developmentAreas =
    normalizeList(
      athlete.developmentAreas ||
      athlete.weaknesses
    );

  const displayedDevelopmentAreas =
    developmentAreas.length
      ? developmentAreas
      : [
          "Add more verified film",
          "Continue measurable testing",
          "Expand recruiting exposure"
        ];

  const collegeProjection =
    athlete.collegeProjection ||
    athlete.recruitingProjection ||
    "National College Prospect";

  const professionalProjection =
    athlete.proProjection ||
    athlete.nflProjection ||
    athlete.professionalProjection ||
    "Developmental Professional Prospect";

  const zeusSummary =
    athlete.zeusSummary ||
    `${name} projects as a high-upside ${position} with a Zeus rating of ${score}. The profile shows strong athletic traits, competitive upside, and continued recruiting potential.`;

  return `
    <div class="athlete-recruiting-command-grid">

      <!-- ==========================================
           RECRUITING STATUS
      ========================================== -->

      <div class="athlete-recruiting-command-card">

        <div class="athlete-command-card-header">

          <div>
            <p class="network-kicker">
              Recruiting Command
            </p>

            <h3>
              Recruiting Status
            </h3>
          </div>

          <span class="athlete-status-live">
            ${recruitingStatus}
          </span>

        </div>

        <div class="athlete-recruiting-command-stats">

          <div>
            <span>Offers</span>
            <strong>${offers.length}</strong>
          </div>

          <div>
            <span>Visits</span>
            <strong>${visits.length}</strong>
          </div>

          <div>
            <span>Commitment</span>
            <strong>${commitment}</strong>
          </div>

          <div>
            <span>Recruiting Level</span>
            <strong>${recruitingLevel}</strong>
          </div>

        </div>

        <div class="athlete-command-actions">

          <button
            type="button"
            onclick="window.saveAthleteToWatchlist()">

            ⭐ Save to Watchlist

          </button>

          <button
            type="button"
            onclick="window.openContactCoach()">

            📧 Contact Coach

          </button>

          <button
            type="button"
            onclick="window.openRecruiterNotes()">

            📝 Add Recruiter Note

          </button>

        </div>

      </div>

      <!-- ==========================================
           ZEUS SCOUTING SUMMARY
      ========================================== -->

      <div class="athlete-zeus-summary-card">

        <div class="athlete-command-card-header">

          <div>
            <p class="network-kicker">
              Zeus AI Intelligence
            </p>

            <h3>
              Scouting Summary
            </h3>
          </div>

          <span class="athlete-zeus-ready">
            AI READY
          </span>

        </div>

        <p class="athlete-zeus-summary-copy">
          ${zeusSummary}
        </p>

        <div class="athlete-scouting-columns">

          <div>

            <h4>
              Strengths
            </h4>

            <ul>

              ${displayedStrengths
                .slice(0, 5)
                .map(item => `
                  <li>
                    ✓ ${item}
                  </li>
                `)
                .join("")}

            </ul>

          </div>

          <div>

            <h4>
              Development Areas
            </h4>

            <ul>

              ${displayedDevelopmentAreas
                .slice(0, 5)
                .map(item => `
                  <li>
                    • ${item}
                  </li>
                `)
                .join("")}

            </ul>

          </div>

        </div>

        <div class="athlete-projection-grid">

          <div>
            <span>College Projection</span>
            <strong>${collegeProjection}</strong>
          </div>

          <div>
            <span>Professional Projection</span>
            <strong>${professionalProjection}</strong>
          </div>

        </div>

        <button
          type="button"
          class="athlete-full-report-btn"
          onclick="window.generateZeusScoutingReport()">

          📄 Generate Full Zeus Scouting Report

        </button>

      </div>

    </div>
  `;
}