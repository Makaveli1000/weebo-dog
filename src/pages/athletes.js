function safeScore(athlete = {}) {
  const scores = Array.isArray(athlete.scores)
    ? athlete.scores
    : [athlete.score0, athlete.score1, athlete.score2, athlete.score3, athlete.score4];

  return scores.reduce((sum, v) => sum + (Number(v) || 0), 0);
}

export function renderAthletesDirectory(athletes = []) {
  const list = athletes.map(item => ({
    id: item.id,
    ...(item.data || item)
  }));

  return `
    <section class="athlete-directory-page network-section">

      <div class="section-header">
        <p class="network-kicker">Athlete Directory</p>
        <h2>Verified Athlete Profiles</h2>
        <p>Browse athletes from across the Snt.L.Mo. Sports Network.</p>
      </div>

      ${
        !list.length
          ? `
            <div class="empty-state-card">
              <h3>No Athletes Yet</h3>
              <p>Add athletes in Admin Command Center.</p>
            </div>
          `
          : `
            <div class="athlete-directory-grid">
              ${list.map(athlete => `
                <article class="athlete-directory-card">
                  <div class="athlete-directory-photo">
                    <img src="${athlete.photoUrl || "assets/football1.jpg"}" alt="${athlete.name || "Athlete"}">
                  </div>

                  <div class="athlete-directory-info">
                    <h3>${athlete.name || "Unknown Athlete"}</h3>
                    <p>${athlete.sport || "Sport"} • ${athlete.position || "ATH"}</p>
                    <p>${athlete.school || athlete.schoolName || "School N/A"}</p>
                  </div>

                  <div class="athlete-directory-rating">
                    <span>⭐ Zeus</span>
                    <strong>${athlete.zeusRating || safeScore(athlete)}</strong>
                  </div>

                  <button
                    class="athlete-card-btn"
                    onclick="window.openAthleteFromDirectory('${athlete.id}')">
                    View Profile
                  </button>
                </article>
              `).join("")}
            </div>
          `
      }

    </section>
  `;
}