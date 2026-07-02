export function renderAthletePage(athlete = {}) {
  const score = athlete.zeusRating || athlete.score || athlete.total || "N/A";
  const videos = athlete.videos || [];

  return `
    <section class="athlete-profile-page">

      <div class="athlete-profile-hero">
        <div class="athlete-profile-photo">
          <img src="${athlete.photoUrl || "assets/football1.jpg"}" alt="${athlete.name || "Athlete"}">
        </div>

        <div>
          <p class="network-kicker">Verified Athlete Profile</p>
          <h1>${athlete.name || "Unknown Athlete"}</h1>
          <h2>${athlete.position || "ATH"} • ${athlete.schoolName || athlete.school || "School N/A"}</h2>

          <div class="athlete-profile-tags">
            <span>${athlete.sport || "Sport"}</span>
            <span>Class ${athlete.classYear || athlete.graduationYear || "N/A"}</span>
            <span>#${athlete.jerseyNumber || "N/A"}</span>
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
          <p><strong>Height:</strong> ${athlete.height || "N/A"}</p>
          <p><strong>Weight:</strong> ${athlete.weight || "N/A"}</p>
          <p><strong>Position:</strong> ${athlete.position || "N/A"}</p>
          <p><strong>Graduation:</strong> ${athlete.graduationYear || athlete.classYear || "N/A"}</p>
        </div>

        <div class="athlete-panel">
          <h3>Bio</h3>
          <p>${athlete.bio || "No athlete bio added yet."}</p>
        </div>

        <div class="athlete-panel">
          <h3>Offers</h3>
          <p>${Array.isArray(athlete.offers) && athlete.offers.length ? athlete.offers.join(", ") : "No offers added yet."}</p>
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