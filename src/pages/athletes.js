function scoreAthlete(athlete = {}) {
  if (athlete.zeusRating) return Math.round(Number(athlete.zeusRating));

  const scores = Array.isArray(athlete.scores)
    ? athlete.scores
    : [athlete.score0, athlete.score1, athlete.score2, athlete.score3, athlete.score4];

  return scores.reduce((sum, value) => sum + (Number(value) || 0), 0);
}

function getSchool(athlete = {}) {
  return athlete.school || athlete.schoolName || athlete["school name"] || "School N/A";
}

function getPosition(athlete = {}) {
  return athlete.position || athlete.posion || "ATH";
}

function getPhoto(athlete = {}) {
  return athlete.photoUrl || "assets/football1.jpg";
}

export function renderAthletesDirectory(athletes = []) {
  const list = athletes
    .map(item => ({
      id: item.id,
      ...(item.data || item)
    }))
    .sort((a, b) => scoreAthlete(b) - scoreAthlete(a));

  return `
    <section class="athlete-directory-page network-section">

      <div class="section-header">
        <p class="network-kicker">Athlete Directory</p>
        <h2>Verified Athlete Profiles</h2>
        <p>Browse athletes by sport, school, position, Zeus Rating, highlights, and recruiting profile.</p>
      </div>

      <div class="athlete-directory-toolbar">
        <input
          id="athlete-directory-search"
          type="text"
          placeholder="Search athlete, school, sport, position..."
        >

        <select id="athlete-directory-sport">
          <option value="all">All Sports</option>
          <option value="Football">Football</option>
          <option value="Basketball">Basketball</option>
          <option value="Baseball">Baseball</option>
          <option value="Track">Track</option>
          <option value="Soccer">Soccer</option>
          <option value="Volleyball">Volleyball</option>
          <option value="Hockey">Hockey</option>
        </select>
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
            <div class="athlete-directory-grid" id="athlete-directory-grid">
              ${list.map(athlete => {
                const rating = scoreAthlete(athlete);
                const school = getSchool(athlete);
                const position = getPosition(athlete);
                const hasFilm = Boolean(
                  athlete.highlightUrl ||
                  athlete.highlight ||
                  (Array.isArray(athlete.videos) && athlete.videos.length)
                );

                return `
                  <article
                    class="athlete-directory-card"
                    data-search="${`${athlete.name} ${school} ${athlete.sport} ${position}`.toLowerCase()}"
                    data-sport="${athlete.sport || "Sport"}"
                  >
                    <div class="athlete-directory-photo">
                      <img src="${getPhoto(athlete)}" alt="${athlete.name || "Athlete"}">
                      ${hasFilm ? `<span class="film-badge">🎥 Film</span>` : ""}
                    </div>

                    <div class="athlete-directory-info">
                      <h3>${athlete.name || "Unknown Athlete"}</h3>
                      <p>${athlete.sport || "Sport"} • ${position}</p>
                      <p>${school}</p>
                    </div>

                    <div class="athlete-directory-meta">
                      <span>${athlete.city || "City"}, ${athlete.state || "State"}</span>
                      <span>Class ${athlete.classYear || athlete.graduationYear || "N/A"}</span>
                    </div>

                    <div class="athlete-directory-rating">
                      <span>⭐ Zeus Rating</span>
                      <strong>${rating || "N/A"}</strong>
                    </div>

                    <button
                      class="athlete-card-btn"
                      onclick="window.openAthleteFromDirectory('${athlete.id}')">
                      View Profile
                    </button>
                  </article>
                `;
              }).join("")}
            </div>
          `
      }

    </section>
  `;
}