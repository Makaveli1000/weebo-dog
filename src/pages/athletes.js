function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char] || char));
}

function totalScore(athlete = {}) {
  const scores = Array.isArray(athlete.scores)
    ? athlete.scores
    : [];

  return scores.reduce((sum, value) => sum + (Number(value) || 0), 0);
}

export function renderAthletesDirectory(athletes = []) {

  return `
    <div class="section-header">
      <p class="network-kicker">Athlete Directory</p>

      <h3>Verified Athlete Profiles</h3>

      <p>
        Browse athletes from across the
        Snt.L.Mo. Sports Network.
      </p>
    </div>

    <div class="athlete-directory-grid">

      ${athletes.map((item) => {

        const athlete = item.data || item;
        const id = item.id || "";

        return `

          <div class="athlete-card">

            <div class="athlete-avatar">
              ${(athlete.name || "A").charAt(0).toUpperCase()}
            </div>

            <div class="athlete-card-body">

              <div class="athlete-card-top">

                <span class="verified-badge">
                  ⭐ Verified
                </span>

                <span class="rating-badge">
                  Zeus ${totalScore(athlete)}
                </span>

              </div>

              <h4>
                ${escapeHtml(athlete.name || "Unknown Athlete")}
              </h4>

              <p>
                ${escapeHtml(athlete.sport || "Athlete")}
              </p>

              <p>
                ${escapeHtml(athlete.school || "School Unlisted")}
              </p>

              <button
                class="athlete-card-btn"
                onclick="window.openAthleteProfile('${id}')">

                View Profile

              </button>

            </div>

          </div>

        `;

      }).join("")}

    </div>
  `;
}