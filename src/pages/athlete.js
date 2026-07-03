export function renderAthletePage(athlete = {}) {
  const score =
    athlete.zeusRating ||
    athlete.score ||
    athlete.total ||
    "N/A";

  const videos = athlete.videos || [];
  const school = athlete.school || athlete.schoolName || athlete["school name"] || "School N/A";
  const position = athlete.position || athlete.posion || "ATH";
  const height = athlete.height || "N/A";
  const weight = athlete.weight || "N/A";
  const classYear = athlete.classYear || athlete.graduationYear || "N/A";
  const jersey = athlete.jerseyNumber || "N/A";
  const bio = athlete.bio || "No athlete bio added yet.";
  const offers = Array.isArray(athlete.offers) ? athlete.offers : [];

  return `
    <section class="athlete-profile-page">

      <div class="athlete-profile-hero">
        <div class="athlete-profile-photo">
          <img src="${athlete.photoUrl || "assets/football1.jpg"}" alt="${athlete.name || "Athlete"}">
        </div>

        <div>
          <p class="network-kicker">Verified Athlete Profile</p>
          <h1>${athlete.name || "Unknown Athlete"}</h1>
          <h2>${position} • ${school}</h2>

          <div class="athlete-profile-tags">
            <span>${athlete.sport || "Sport"}</span>
            <span>Class ${classYear}</span>
            <span>#${jersey}</span>
            <span>${athlete.city || "City"}, ${athlete.state || "State"}</span>
          </div>
        </div>

        <div class="athlete-rating-card">
          <span>ZEUS RATING</span>
          <strong>${score}</strong>
        </div>
      </div>

      <div class="athlete-profile-tabs">
        <button class="active">Overview</button>
        <button>Highlights</button>
        <button>Stats</button>
        <button>Offers</button>
        <button>Achievements</button>
        <button>Photos</button>
        <button>Schedule</button>
        <button>Zeus AI Report</button>
      </div>

      <div class="athlete-profile-grid">
        <div class="athlete-panel">
          <h3>Vitals</h3>
          <p><strong>Height:</strong> ${height}</p>
          <p><strong>Weight:</strong> ${weight}</p>
          <p><strong>Position:</strong> ${position}</p>
          <p><strong>Graduation:</strong> ${classYear}</p>
        </div>

        <div class="athlete-panel">
          <h3>Bio</h3>
          <p>${bio}</p>
        </div>

        <div class="athlete-panel">
          <h3>Offers</h3>
          <p>${offers.length ? offers.join(", ") : "No offers added yet."}</p>
        </div>

        <div class="athlete-panel">
          <h3>Highlights</h3>
          ${
            videos.length
              ? videos.map(v => `<p>🎥 ${v.title || "Highlight Video"}</p>`).join("")
              : athlete.highlightUrl
                ? `<p>🎥 Main Highlight Available</p>`
                : `<p>No videos added yet.</p>`
          }
        </div>
      </div>

    </section>
  `;
}