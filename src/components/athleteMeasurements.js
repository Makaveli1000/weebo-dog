export function renderAthleteMeasurements(athlete = {}) {
  const school =
    athlete.school ||
    athlete.schoolName ||
    athlete["school name"] ||
    "School N/A";

  const position =
    athlete.position ||
    athlete.posion ||
    "ATH";

  const height =
    athlete.height ||
    "N/A";

  const weight =
    athlete.weight ||
    "N/A";

  const classYear =
    athlete.classYear ||
    athlete.graduationYear ||
    "N/A";

  const jersey =
    athlete.jerseyNumber ||
    athlete.jersey ||
    "N/A";

  const city =
    athlete.city ||
    "City";

  const state =
    athlete.state ||
    "State";

  const testing =
    athlete.testing || {};

  const athleticTesting = [
    [
      "40 Yard",
      testing.forty ||
      athlete.forty ||
      "N/A"
    ],
    [
      "Vertical",
      testing.vertical ||
      athlete.vertical ||
      "N/A"
    ],
    [
      "Shuttle",
      testing.shuttle ||
      athlete.shuttle ||
      "N/A"
    ],
    [
      "Bench",
      testing.bench ||
      athlete.bench ||
      "N/A"
    ],
    [
      "Wingspan",
      testing.wingspan ||
      athlete.wingspan ||
      "N/A"
    ],
    [
      "Hand Size",
      testing.handSize ||
      athlete.handSize ||
      "N/A"
    ]
  ];

  return `
    <div class="athlete-measurements-grid">

      <!-- ==========================================
           ATHLETE VITALS
      ========================================== -->

      <div class="athlete-panel athlete-vitals-panel">

        <div class="athlete-panel-heading">

          <div>
            <p class="network-kicker">
              Athlete Profile
            </p>

            <h3>
              Vitals
            </h3>
          </div>

          <span class="athlete-measurement-badge">
            VERIFIED DATA
          </span>

        </div>

        <div class="athlete-vitals-grid">

          <div class="athlete-vital-card">
            <span>Height</span>
            <strong>${height}</strong>
          </div>

          <div class="athlete-vital-card">
            <span>Weight</span>
            <strong>${weight}</strong>
          </div>

          <div class="athlete-vital-card">
            <span>Position</span>
            <strong>${position}</strong>
          </div>

          <div class="athlete-vital-card">
            <span>Graduation</span>
            <strong>${classYear}</strong>
          </div>

          <div class="athlete-vital-card">
            <span>School</span>
            <strong>${school}</strong>
          </div>

          <div class="athlete-vital-card">
            <span>Jersey</span>
            <strong>#${jersey}</strong>
          </div>

          <div class="athlete-vital-card athlete-vital-card-wide">
            <span>Location</span>
            <strong>${city}, ${state}</strong>
          </div>

        </div>

      </div>

      <!-- ==========================================
           ATHLETIC TESTING
      ========================================== -->

      <div class="athlete-panel athletic-testing-panel">

        <div class="athlete-panel-heading">

          <div>
            <p class="network-kicker">
              Verified Measurements
            </p>

            <h3>
              Athletic Testing
            </h3>
          </div>

          <span class="athlete-measurement-badge">
            PERFORMANCE
          </span>

        </div>

        <div class="testing-stat-grid">

          ${athleticTesting.map(([label, value]) => `
            <div class="testing-stat-card">

              <span>
                ${label}
              </span>

              <strong>
                ${value}
              </strong>

            </div>
          `).join("")}

        </div>

      </div>

    </div>
  `;
}