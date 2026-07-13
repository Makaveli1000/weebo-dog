function verificationItem(
  label,
  verified,
  detail
) {
  return `
    <div
      class="athlete-verification-item ${
        verified ? "is-verified" : "is-pending"
      }">

      <span class="athlete-verification-icon">
        ${verified ? "✓" : "○"}
      </span>

      <div>
        <strong>${label}</strong>
        <small>${detail}</small>
      </div>

      <em>
        ${verified ? "Verified" : "Pending"}
      </em>

    </div>
  `;
}

export function renderAthleteVerification(
  athlete = {}
) {
  const measurementsVerified = Boolean(
    athlete.measurementsVerified ||
    athlete.verifiedMeasurements
  );

  const academicsVerified = Boolean(
    athlete.academicsVerified ||
    athlete.verifiedAcademics
  );

  const identityVerified = Boolean(
    athlete.identityVerified ||
    athlete.profileVerified
  );

  const filmVerified = Boolean(
    athlete.filmVerified ||
    athlete.verifiedFilm ||
    (
      Array.isArray(athlete.videos) &&
      athlete.videos.length
    )
  );

  const verifiedCount = [
    measurementsVerified,
    academicsVerified,
    identityVerified,
    filmVerified
  ].filter(Boolean).length;

  return `
    <section
      class="athlete-panel athlete-verification-panel">

      <div class="athlete-panel-heading">

        <div>
          <p class="network-kicker">
            Trust & Validation
          </p>

          <h3>
            Verified Athlete Data
          </h3>
        </div>

        <span class="athlete-measurement-badge">
          ${verifiedCount}/4 VERIFIED
        </span>

      </div>

      <div class="athlete-verification-grid">

        ${verificationItem(
          "Identity",
          identityVerified,
          "Athlete ownership and identity confirmation"
        )}

        ${verificationItem(
          "Measurements",
          measurementsVerified,
          "Height, weight, reach, and testing data"
        )}

        ${verificationItem(
          "Academics",
          academicsVerified,
          "Graduation year and eligibility information"
        )}

        ${verificationItem(
          "Film",
          filmVerified,
          "Connected and reviewed athlete video"
        )}

      </div>

      <p class="athlete-verification-notice">
        Verified information is separated from
        self-reported details and Zeus AI projections.
      </p>

    </section>
  `;
}