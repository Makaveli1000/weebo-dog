export function renderAthleteAcademics(athlete = {}) {
  const gpa =
    athlete.gpa ||
    "N/A";

  const act =
    athlete.act ||
    "N/A";

  const sat =
    athlete.sat ||
    "N/A";

  const classYear =
    athlete.classYear ||
    athlete.graduationYear ||
    "N/A";

  const ncaaId =
    athlete.ncaaId ||
    "N/A";

  const eligibility =
    athlete.ncaaEligibility ||
    athlete.eligibility ||
    "Pending";

  const academicHonors = Array.isArray(athlete.academicHonors)
    ? athlete.academicHonors
    : typeof athlete.academicHonors === "string"
      ? athlete.academicHonors
          .split(",")
          .map(item => item.trim())
          .filter(Boolean)
      : [];

  return `
    <section class="athlete-panel academic-info-panel">

      <div class="athlete-panel-heading">

        <div>
          <p class="network-kicker">
            Student-Athlete Profile
          </p>

          <h3>
            Academic Information
          </h3>
        </div>

        <span class="athlete-measurement-badge">
          ACADEMICS
        </span>

      </div>

      <div class="academic-stat-grid">

        <div class="academic-stat-card">
          <span>GPA</span>
          <strong>${gpa}</strong>
        </div>

        <div class="academic-stat-card">
          <span>ACT</span>
          <strong>${act}</strong>
        </div>

        <div class="academic-stat-card">
          <span>SAT</span>
          <strong>${sat}</strong>
        </div>

        <div class="academic-stat-card">
          <span>Graduation Class</span>
          <strong>${classYear}</strong>
        </div>

        <div class="academic-stat-card">
          <span>NCAA ID</span>
          <strong>${ncaaId}</strong>
        </div>

        <div class="academic-stat-card">
          <span>Eligibility</span>
          <strong>${eligibility}</strong>
        </div>

      </div>

      <div class="academic-honors-section">

        <h4>
          Academic Honors
        </h4>

        ${
          academicHonors.length
            ? `
              <div class="academic-honors-grid">

                ${academicHonors.map(item => `
                  <div class="academic-honor-card">
                    <span>🎓</span>
                    <strong>${item}</strong>
                  </div>
                `).join("")}

              </div>
            `
            : `
              <p class="academic-empty-message">
                No academic honors have been added yet.
              </p>
            `
        }

      </div>

    </section>
  `;
}