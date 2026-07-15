function escapeAthleteHeroHtml(value = "") {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function renderAthleteHero(athlete = {}) {
  const name =
    athlete.name ||
    "Athlete";

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

  const photoUrl =
    athlete.photoUrl ||
    athlete.profilePhoto ||
    "";

  const rating =
    athlete.zeusRating ||
    athlete.totalComposite ||
    (
      Array.isArray(athlete.scores)
        ? athlete.scores.reduce(
            (sum, score) =>
              sum + (Number(score) || 0),
            0
          )
        : 0
    );

  const verified = Boolean(
    athlete.verified ||
    athlete.isVerified ||
    athlete.profileVerified
  );

  return `
    <section class="athlete-profile-hero">

      <div class="athlete-profile-hero-media">

        ${
          photoUrl
            ? `
                <img
                  src="${escapeAthleteHeroHtml(photoUrl)}"
                  alt="${escapeAthleteHeroHtml(name)}">
              `
            : `
                <div class="athlete-profile-hero-placeholder">
                  👤
                </div>
              `
        }

      </div>

      <div class="athlete-profile-hero-copy">

        <p class="network-kicker">
          Athlete Profile 3.0
        </p>

        <div class="athlete-profile-hero-name">

          <h1>
            ${escapeAthleteHeroHtml(name)}
          </h1>

          ${
            verified
              ? `
                  <span>
                    ✓ Verified
                  </span>
                `
              : ""
          }

        </div>

        <p>
          ${escapeAthleteHeroHtml(school)}
        </p>

        <div class="athlete-profile-hero-meta">

          <span>
            ${escapeAthleteHeroHtml(sport)}
          </span>

          <span>
            ${escapeAthleteHeroHtml(position)}
          </span>

          <span>
            Class ${escapeAthleteHeroHtml(classYear)}
          </span>

        </div>

      </div>

      <div class="athlete-profile-hero-rating">

        <span>
          Zeus Rating
        </span>

        <strong>
          ${rating || "--"}
        </strong>

      </div>

    </section>
  `;
}