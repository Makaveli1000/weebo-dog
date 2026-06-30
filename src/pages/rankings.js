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
  const scores = Array.isArray(athlete.scores) ? athlete.scores : [];
  return scores.reduce((sum, value) => sum + (Number(value) || 0), 0);
}

export function renderRankingsPage(athletes = []) {
  const ranked = [...athletes]
    .map((item) => ({ id: item.id || "", data: item.data || item }))
    .sort((a, b) => totalScore(b.data) - totalScore(a.data))
    .slice(0, 25);

  return `
    <section class="rankings-page">

      <div class="section-header">
        <p class="network-kicker">Zeus Rankings</p>
        <h2>National Athlete Rankings</h2>
        <p>Rank athletes by Zeus Rating, sport, school, class, position, and verified performance.</p>
      </div>

      <div class="rankings-filters">
        <select><option>All States</option><option>Missouri</option><option>Illinois</option></select>
        <select><option>All Sports</option><option>Football</option><option>Basketball</option><option>Track</option></select>
        <select><option>All Classes</option><option>2026</option><option>2027</option><option>2028</option></select>
        <select><option>Verified Only</option><option>All Athletes</option></select>
      </div>

      <div class="rankings-table">
        ${
          ranked.length
            ? ranked.map((item, index) => {
                const athlete = item.data;

                return `
                  <div class="ranking-row">
                    <div class="ranking-number">#${index + 1}</div>

                    <div class="ranking-athlete">
                      <div class="ranking-avatar">
                        ${(athlete.name || "A").charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <h3>${escapeHtml(athlete.name || "Unknown Athlete")}</h3>
                        <p>${escapeHtml(athlete.school || "School Unlisted")} • ${escapeHtml(athlete.sport || "Athlete")}</p>
                      </div>
                    </div>

                    <div class="ranking-meta">
                      <span>Class ${escapeHtml(athlete.classYear || "----")}</span>
                      <span>${escapeHtml(athlete.position || "ATH")}</span>
                    </div>

                    <div class="ranking-rating">
                      <strong>${totalScore(athlete)}</strong>
                      <span>Zeus Rating</span>
                    </div>

                    <button
                      class="athlete-card-btn"
                      onclick="window.openAthleteProfile && window.openAthleteProfile('${escapeHtml(item.id)}')">
                      View
                    </button>
                  </div>
                `;
              }).join("")
            : `
              <div class="feature-card">
                <h3>No Rankings Loaded</h3>
                <p>Add athletes to generate live Zeus rankings.</p>
              </div>
            `
        }
      </div>

    </section>
  `;
}