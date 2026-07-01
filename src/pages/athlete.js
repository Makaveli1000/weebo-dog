function statBox(label, value) {
  return `
    <div class="athlete-profile-stat">
      <strong>${value || "--"}</strong>
      <span>${label}</span>
    </div>
  `;
}

export function renderAthletePage(athlete = {}) {
  const scores = Array.isArray(athlete.scores)
    ? athlete.scores
    : [athlete.score0, athlete.score1, athlete.score2, athlete.score3, athlete.score4];

  const total = scores.reduce((sum, value) => sum + (Number(value) || 0), 0);

  return `
    <section class="athlete-profile-page">

      <div class="athlete-profile-hero">

        <div class="athlete-profile-bg"></div>

        <div class="athlete-profile-main">

          <div class="athlete-profile-photo">
            <img src="${athlete.photoUrl || "assets/football1.jpg"}" alt="Athlete">
          </div>

          <div class="athlete-profile-info">
            <p class="network-kicker">Verified Athlete Profile</p>

            <h1>${athlete.name || "Athlete Name"}</h1>

            <p class="athlete-profile-meta">
              ${athlete.position || "Position"} • ${athlete.school || "School"} • ${athlete.sport || "Sport"}
            </p>

            <div class="athlete-profile-badges">
              <span class="rating-badge">⚡ Zeus Rating ${total || "--"}</span>
              <span class="verified-badge">Verified</span>
              <span class="rating-badge">Recruiting Ready</span>
            </div>

            <div class="athlete-profile-actions">
              <button class="athlete-card-btn">Follow Athlete</button>
              <button class="athlete-card-btn">Message</button>
              <button class="athlete-card-btn">Recruit</button>
            </div>
          </div>

        </div>

      </div>

      <div class="athlete-profile-grid">

        <div class="athlete-profile-card highlight-card-large">
          <h3>🎥 Highlight Hero</h3>

          ${
            athlete.highlightUrl
              ? `<video src="${athlete.highlightUrl}" controls class="athlete-highlight-video"></video>`
              : `<div class="athlete-highlight-placeholder">No highlight uploaded yet</div>`
          }
        </div>

        <div class="athlete-profile-card">
          <h3>📊 Performance Stats</h3>

          <div class="athlete-profile-stats">
            ${statBox("Speed", scores[0])}
            ${statBox("Power", scores[1])}
            ${statBox("Skill", scores[2])}
            ${statBox("IQ", scores[3])}
            ${statBox("Impact", scores[4])}
            ${statBox("Total", total)}
          </div>
        </div>

        <div class="athlete-profile-card">
          <h3>🎓 Recruiting Status</h3>

          <ul class="athlete-profile-list">
            <li><strong>Class:</strong> ${athlete.classYear || "Unlisted"}</li>
            <li><strong>Height:</strong> ${athlete.height || "Unlisted"}</li>
            <li><strong>Weight:</strong> ${athlete.weight || "Unlisted"}</li>
            <li><strong>Offers:</strong> ${athlete.offers || "Open"}</li>
            <li><strong>Contact:</strong> Available to verified recruiters</li>
          </ul>
        </div>

        <div class="athlete-profile-card">
          <h3>⚡ Zeus AI Scouting Snapshot</h3>

          <p>
            ${athlete.aiSummary || "Explosive upside, strong competitive profile, and room for continued development with verified film and consistent performance tracking."}
          </p>

          <button class="athlete-card-btn">Generate Full Report</button>
        </div>

      </div>

    </section>
  `;
}