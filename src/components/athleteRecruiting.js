function escapeRecruitingHtml(value = "") {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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

function getRecruitingItemName(item, fallback = "") {
  if (typeof item === "string") {
    return item;
  }

  return (
    item?.school ||
    item?.name ||
    item?.title ||
    fallback
  );
}

function getRecruitingStatus(
  athlete = {},
  offers = []
) {
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

  return athlete.commitmentStatus || "Open";
}

function getStatusClass(status = "") {
  const normalizedStatus =
    String(status).toLowerCase();

  if (normalizedStatus === "signed") {
    return "is-signed";
  }

  if (normalizedStatus === "committed") {
    return "is-committed";
  }

  if (normalizedStatus === "offered") {
    return "is-offered";
  }

  if (normalizedStatus === "visiting") {
    return "is-visiting";
  }

  if (normalizedStatus === "transfer portal") {
    return "is-transfer";
  }

  if (normalizedStatus === "professional") {
    return "is-professional";
  }

  return "is-open";
}

export function renderAthleteRecruiting(
  athlete = {}
) {
  const name =
    athlete.name ||
    "This athlete";

  const position =
    athlete.position ||
    athlete.posion ||
    athlete.role ||
    "ATH";

  const score =
    athlete.zeusRating ||
    athlete.totalComposite ||
    athlete.score ||
    athlete.total ||
    "N/A";

  const offers = normalizeList(
    athlete.offers
  );

  const visits = normalizeList(
    athlete.officialVisits ||
    athlete.visits
  );

  const recruitingStatus =
    getRecruitingStatus(
      athlete,
      offers
    );

  const commitment =
    athlete.committedSchool ||
    athlete.committedTo ||
    athlete.commitment ||
    "Uncommitted";

  const recruitingLevel =
    athlete.recruitingLevel ||
    athlete.recruitingTier ||
    athlete.projection ||
    (
      athlete.tier === "pro-players"
        ? "Professional Athlete"
        : athlete.tier === "college"
          ? "College Athlete"
          : "National Prospect"
    );

  const strengths = normalizeList(
    athlete.strengths
  );

  const displayedStrengths =
    strengths.length
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
    (
      athlete.tier === "pro-players"
        ? "College career completed"
        : "National College Prospect"
    );

  const professionalProjection =
    athlete.proProjection ||
    athlete.nflProjection ||
    athlete.professionalProjection ||
    (
      athlete.tier === "pro-players"
        ? "Professional Athlete"
        : "Projection pending additional verified film"
    );

  const zeusSummary =
    athlete.zeusSummary ||
    `${name} projects as a high-upside ${position} with a Zeus rating of ${score}. The profile shows competitive traits, developmental upside, and continued recruiting potential.`;

  const statusClass =
    getStatusClass(recruitingStatus);

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

          <span
            class="athlete-status-live ${statusClass}">

            ${escapeRecruitingHtml(
              recruitingStatus
            )}

          </span>

        </div>

        <div class="athlete-recruiting-command-stats">

          <div>

            <span>
              Offers
            </span>

            <strong>
              ${offers.length}
            </strong>

          </div>

          <div>

            <span>
              Visits
            </span>

            <strong>
              ${visits.length}
            </strong>

          </div>

          <div>

            <span>
              Commitment
            </span>

            <strong>
              ${escapeRecruitingHtml(
                commitment
              )}
            </strong>

          </div>

          <div>

            <span>
              Recruiting Level
            </span>

            <strong>
              ${escapeRecruitingHtml(
                recruitingLevel
              )}
            </strong>

          </div>

        </div>

        ${
          offers.length
            ? `
                <div class="athlete-recruiting-detail-list">

                  <span>
                    Current Offers
                  </span>

                  <div>

                    ${offers
                      .slice(0, 6)
                      .map((offer) => `
                        <em>
                          ${escapeRecruitingHtml(
                            getRecruitingItemName(
                              offer,
                              "Program Offer"
                            )
                          )}
                        </em>
                      `)
                      .join("")}

                  </div>

                </div>
              `
            : ""
        }

        ${
          visits.length
            ? `
                <div class="athlete-recruiting-detail-list">

                  <span>
                    Visits
                  </span>

                  <div>

                    ${visits
                      .slice(0, 6)
                      .map((visit) => `
                        <em>
                          ${escapeRecruitingHtml(
                            getRecruitingItemName(
                              visit,
                              "Recruiting Visit"
                            )
                          )}
                        </em>
                      `)
                      .join("")}

                  </div>

                </div>
              `
            : ""
        }

        <div class="athlete-command-actions">

          <button
            type="button"
            onclick="window.saveAthleteToWatchlist?.()">

            ⭐ Save to Watchlist

          </button>

          <button
            type="button"
            onclick="window.openContactCoach?.()">

            📧 Contact Coach

          </button>

          <button
            type="button"
            onclick="window.openRecruiterNotes?.()">

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
          ${escapeRecruitingHtml(
            zeusSummary
          )}
        </p>

        <div class="athlete-scouting-columns">

          <div>

            <h4>
              Strengths
            </h4>

            <ul>

              ${displayedStrengths
                .slice(0, 5)
                .map((item) => `
                  <li>
                    ✓ ${escapeRecruitingHtml(item)}
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
                .map((item) => `
                  <li>
                    • ${escapeRecruitingHtml(item)}
                  </li>
                `)
                .join("")}

            </ul>

          </div>

        </div>

        <div class="athlete-projection-grid">

          <div>

            <span>
              College Projection
            </span>

            <strong>
              ${escapeRecruitingHtml(
                collegeProjection
              )}
            </strong>

          </div>

          <div>

            <span>
              Professional Projection
            </span>

            <strong>
              ${escapeRecruitingHtml(
                professionalProjection
              )}
            </strong>

          </div>

        </div>

        <button
          type="button"
          class="athlete-full-report-btn"
          onclick="window.generateZeusScoutingReport?.()">

          📄 Generate Full Zeus Scouting Report

        </button>

      </div>

    </div>
  `;
}