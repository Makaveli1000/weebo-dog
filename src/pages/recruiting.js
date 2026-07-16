function escapeRecruitingHtml(
  value = ""
) {
  return String(value ?? "")
    .replace(
      /[&<>"']/g,
      (character) => {
        const entities = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;"
        };

        return (
          entities[character] ||
          character
        );
      }
    );
}

function getAthleteTotal(
  athlete = {}
) {
  if (
    Number.isFinite(
      Number(athlete.zeusRating)
    )
  ) {
    return Number(
      athlete.zeusRating
    );
  }

  const scores =
    Array.isArray(
      athlete.scores
    )
      ? athlete.scores
      : [
          athlete.score0,
          athlete.score1,
          athlete.score2,
          athlete.score3,
          athlete.score4
        ];

  return scores.reduce(
    (total, score) =>
      total +
      (
        Number(score) ||
        0
      ),
    0
  );
}

function athleteHasFilm(
  athlete = {}
) {
  return Boolean(
    (
      Array.isArray(
        athlete.videos
      ) &&
      athlete.videos.length
    ) ||
    athlete.highlightUrl ||
    athlete.highlight
  );
}

function recruitCard(
  icon,
  label,
  value
) {
  return `
    <div class="recruit-card">

      <div class="recruit-icon">
        ${icon}
      </div>

      <div>
        <h3>
          ${escapeRecruitingHtml(
            label
          )}
        </h3>

        <strong>
          ${escapeRecruitingHtml(
            value
          )}
        </strong>
      </div>

    </div>
  `;
}

function renderRecruitingAthleteCard(
  item
) {
  const athlete =
    item?.data || item || {};

  const athleteId =
    item?.id ||
    athlete.id ||
    "";

  const name =
    athlete.name ||
    "Unknown Athlete";

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

  const school =
    athlete.school ||
    athlete.schoolName ||
    athlete["school name"] ||
    "School Unlisted";

  const city =
    athlete.city || "";

  const state =
    athlete.state || "";

  const location =
    [city, state]
      .filter(Boolean)
      .join(", ") ||
    "Location Unlisted";

  const rating =
    getAthleteTotal(
      athlete
    );

  const verified =
    Boolean(
      athlete.verified ||
      athlete.isVerified ||
      athlete.profileVerified
    );

  const hasFilm =
    athleteHasFilm(
      athlete
    );

  const offers =
    Array.isArray(
      athlete.offers
    )
      ? athlete.offers.length
      : typeof athlete.offers ===
          "string"
        ? athlete.offers
            .split(",")
            .map((offer) =>
              offer.trim()
            )
            .filter(Boolean)
            .length
        : 0;

  const photoUrl =
    athlete.photoUrl ||
    athlete.profilePhoto ||
    "";

  const searchableText = [
    name,
    sport,
    position,
    classYear,
    school,
    city,
    state
  ]
    .join(" ")
    .toLowerCase();

  return `
    <article
      class="recruiting-athlete-card"
      data-recruiting-athlete
      data-recruiting-id="${escapeRecruitingHtml(
        athleteId
      )}"
      data-recruiting-search="${escapeRecruitingHtml(
        searchableText
      )}"
      data-recruiting-sport="${escapeRecruitingHtml(
        sport
      )}"
      data-recruiting-position="${escapeRecruitingHtml(
        position
      )}"
      data-recruiting-class="${escapeRecruitingHtml(
        classYear
      )}"
      data-recruiting-state="${escapeRecruitingHtml(
        state
      )}">

      <div class="recruiting-athlete-profile">

        ${
          photoUrl
            ? `
                <img
                  class="recruiting-athlete-photo"
                  src="${escapeRecruitingHtml(
                    photoUrl
                  )}"
                  alt="${escapeRecruitingHtml(
                    name
                  )}">
              `
            : `
                <div class="recruiting-athlete-photo recruiting-athlete-photo-fallback">
                  👤
                </div>
              `
        }

        <div class="recruiting-athlete-copy">

          <div class="recruiting-athlete-name-row">

            <h3>
              ${escapeRecruitingHtml(
                name
              )}
            </h3>

            ${
              verified
                ? `
                    <span class="recruiting-verified-badge">
                      ✓ Verified
                    </span>
                  `
                : ""
            }

          </div>

          <p>
            ${escapeRecruitingHtml(
              school
            )}
          </p>

          <small>
            ${escapeRecruitingHtml(
              sport
            )}
            •
            ${escapeRecruitingHtml(
              position
            )}
            •
            Class
            ${escapeRecruitingHtml(
              classYear
            )}
          </small>

          <small>
            ${escapeRecruitingHtml(
              location
            )}
          </small>

        </div>

      </div>

      <div class="recruiting-athlete-metrics">

        <div>
          <span>
            Zeus Rating
          </span>

          <strong>
            ${rating || "--"}
          </strong>
        </div>

        <div>
          <span>
            Offers
          </span>

          <strong>
            ${offers}
          </strong>
        </div>

        <div>
          <span>
            Film
          </span>

          <strong>
            ${hasFilm ? "Ready" : "None"}
          </strong>
        </div>

      </div>

      <div class="recruiting-athlete-actions">

        <button
          type="button"
          class="recruiting-view-profile-btn"
          data-recruiting-view="${escapeRecruitingHtml(
            athleteId
          )}">

          View Profile

        </button>

      </div>

    </article>
  `;
}

export function renderRecruitingPage(
  athletes = []
) {
  const athleteRecords =
    Array.isArray(athletes)
      ? athletes
      : [];

  const sports = [
    ...new Set(
      athleteRecords
        .map(
          (item) =>
            (
              item?.data ||
              item ||
              {}
            ).sport
        )
        .filter(Boolean)
    )
  ].sort();

  const positions = [
    ...new Set(
      athleteRecords
        .map((item) => {
          const athlete =
            item?.data ||
            item ||
            {};

          return (
            athlete.position ||
            athlete.posion ||
            athlete.role ||
            ""
          );
        })
        .filter(Boolean)
    )
  ].sort();

  const classes = [
    ...new Set(
      athleteRecords
        .map((item) => {
          const athlete =
            item?.data ||
            item ||
            {};

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

  const states = [
    ...new Set(
      athleteRecords
        .map(
          (item) =>
            (
              item?.data ||
              item ||
              {}
            ).state
        )
        .filter(Boolean)
    )
  ].sort();

  const filmCount =
    athleteRecords.filter(
      (item) =>
        athleteHasFilm(
          item?.data ||
          item ||
          {}
        )
    ).length;

  const verifiedCount =
    athleteRecords.filter(
      (item) => {
        const athlete =
          item?.data ||
          item ||
          {};

        return Boolean(
          athlete.verified ||
          athlete.isVerified ||
          athlete.profileVerified
        );
      }
    ).length;

  return `
    <section
      id="recruiting-page"
      class="recruiting-page">

      <div class="section-header">

        <p class="network-kicker">
          Recruiting Portal
        </p>

        <h2>
          Recruiting Command Center
        </h2>

        <p>
          Search athletes by sport, class,
          position, school, city, state,
          Zeus Rating, film, offers,
          and verified status.
        </p>

      </div>

      <div class="recruit-search">

        <input
          id="recruiting-search-input"
          type="search"
          placeholder="Search athlete, school, city, or state...">

        <select id="recruiting-sport-filter">

          <option value="all">
            All Sports
          </option>

          ${sports
            .map(
              (sport) => `
                <option value="${escapeRecruitingHtml(
                  sport
                )}">
                  ${escapeRecruitingHtml(
                    sport
                  )}
                </option>
              `
            )
            .join("")}

        </select>

        <select id="recruiting-position-filter">

          <option value="all">
            All Positions
          </option>

          ${positions
            .map(
              (position) => `
                <option value="${escapeRecruitingHtml(
                  position
                )}">
                  ${escapeRecruitingHtml(
                    position
                  )}
                </option>
              `
            )
            .join("")}

        </select>

        <select id="recruiting-class-filter">

          <option value="all">
            All Classes
          </option>

          ${classes
            .map(
              (classYear) => `
                <option value="${escapeRecruitingHtml(
                  classYear
                )}">
                  ${escapeRecruitingHtml(
                    classYear
                  )}
                </option>
              `
            )
            .join("")}

        </select>

        <select id="recruiting-state-filter">

          <option value="all">
            All States
          </option>

          ${states
            .map(
              (state) => `
                <option value="${escapeRecruitingHtml(
                  state
                )}">
                  ${escapeRecruitingHtml(
                    state
                  )}
                </option>
              `
            )
            .join("")}

        </select>

      </div>

      <div class="recruit-dashboard">

        ${recruitCard(
          "👤",
          "Recruitable Athletes",
          athleteRecords.length.toLocaleString()
        )}

        ${recruitCard(
          "🎥",
          "Film Ready",
          filmCount.toLocaleString()
        )}

        ${recruitCard(
          "⭐",
          "Verified Athletes",
          verifiedCount.toLocaleString()
        )}

        ${recruitCard(
          "⚡",
          "Zeus Reports",
          athleteRecords.length.toLocaleString()
        )}

      </div>

      <div
        id="recruiting-results-count"
        class="recruiting-results-count">

        Showing
        ${athleteRecords.length}
        athlete${
          athleteRecords.length === 1
            ? ""
            : "s"
        }

      </div>

      <div
        id="recruiting-athlete-grid"
        class="recruiting-athlete-grid">

        ${athleteRecords.length
          ? athleteRecords
              .map(
                renderRecruitingAthleteCard
              )
              .join("")
          : `
              <div class="recruiting-empty-state">
                No athlete profiles are available yet.
              </div>
            `}

      </div>

      <div
        id="recruiting-empty-state"
        class="recruiting-empty-state hidden">

        No athletes match the selected recruiting filters.

      </div>

      <div class="recruit-board">

        <div class="feature-card">

          <h3>
            🔥 Hot Board
          </h3>

          <ul>
            <li>
              Top uncommitted football prospects
            </li>

            <li>
              Fastest rising athletes
            </li>

            <li>
              Most viewed highlight profiles
            </li>

            <li>
              Zeus AI breakout candidates
            </li>
          </ul>

        </div>

        <div class="feature-card">

          <h3>
            🎓 Recruiter Tools
          </h3>

          <ul>
            <li>
              Save athletes to recruiting boards
            </li>

            <li>
              Compare film and Zeus Ratings
            </li>

            <li>
              Request verified contact access
            </li>

            <li>
              Create prospect watchlists
            </li>
          </ul>

        </div>

        <div class="feature-card">

          <h3>
            📊 Evaluation Filters
          </h3>

          <ul>
            <li>
              Position fit
            </li>

            <li>
              School level
            </li>

            <li>
              Class year
            </li>

            <li>
              Performance grade
            </li>
          </ul>

        </div>

      </div>

    </section>
  `;
}