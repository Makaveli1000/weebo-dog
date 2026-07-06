function getVideoUrl(athlete = {}, videos = []) {
  if (videos.length && videos[0]?.url) return videos[0].url;
  return athlete.highlightUrl || athlete.highlight || "";
}

function getEmbedVideoUrl(url = "") {
  if (!url) return "";

  if (url.includes("youtube.com/watch?v=")) {
    const id = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${id}`;
  }

  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${id}`;
  }

  return url;
}

export function renderAthletePage(athlete = {}) {
  const score =
    athlete.zeusRating ||
    athlete.score ||
    athlete.total ||
    "N/A";

  const videos = Array.isArray(athlete.videos) ? athlete.videos : [];

  const school =
    athlete.school ||
    athlete.schoolName ||
    athlete["school name"] ||
    "School N/A";

  const position =
    athlete.position ||
    athlete.posion ||
    "ATH";

  const height = athlete.height || "N/A";
  const weight = athlete.weight || "N/A";

  const classYear =
    athlete.classYear ||
    athlete.graduationYear ||
    "N/A";

  const jersey = athlete.jerseyNumber || "N/A";
  const bio = athlete.bio || "No athlete bio added yet.";

  const offers = Array.isArray(athlete.offers)
    ? athlete.offers
    : [];

  const achievements = Array.isArray(athlete.achievements)
    ? athlete.achievements
    : [];

  const city = athlete.city || "City";
  const state = athlete.state || "State";

  const coachName = athlete.coachName || athlete.coach || "Coach N/A";
  const coachEmail = athlete.coachEmail || "Email N/A";
  const coachPhone = athlete.coachPhone || "Phone N/A";

  const gpa = athlete.gpa || "N/A";
  const act = athlete.act || "N/A";
  const sat = athlete.sat || "N/A";
  const ncaaId = athlete.ncaaId || "N/A";

  const hasFilm = Boolean(
    athlete.highlightUrl ||
    videos.length
 ); 

  const mainVideoUrl = getVideoUrl(athlete, videos);
  const embedVideoUrl = getEmbedVideoUrl(mainVideoUrl);
  
  const coverImage =
  athlete.coverImage ||
  athlete.bannerUrl ||
  "assets/football1.jpg";

const stats = athlete.stats || {};

const seasonStats = [
  ["Games", stats.games || athlete.games || "N/A"],
  ["Yards", stats.yards || athlete.yards || "N/A"],
  ["TDs", stats.touchdowns || athlete.touchdowns || athlete.tds || "N/A"],
  ["Tackles", stats.tackles || athlete.tackles || "N/A"],
  ["Receptions", stats.receptions || athlete.receptions || "N/A"],
  ["INTs", stats.interceptions || athlete.interceptions || "N/A"]
];

const testing = athlete.testing || {};

const athleticTesting = [
  ["40 Yard", testing.forty || athlete.forty || "N/A"],
  ["Vertical", testing.vertical || athlete.vertical || "N/A"],
  ["Shuttle", testing.shuttle || athlete.shuttle || "N/A"],
  ["Bench", testing.bench || athlete.bench || "N/A"],
  ["Wingspan", testing.wingspan || athlete.wingspan || "N/A"],
  ["Hand Size", testing.handSize || athlete.handSize || "N/A"]
];

  return `
    <section class="athlete-profile-page">

      <div class="recruiter-profile-hero">

        <div
  class="recruiter-hero-bg"
  style="background-image:
    linear-gradient(90deg, rgba(2,6,23,.96), rgba(2,6,23,.72), rgba(2,6,23,.95)),
    url('${coverImage}');
  "
></div>

        <div class="recruiter-athlete-photo">
          <img src="${athlete.photoUrl || "assets/football1.jpg"}" alt="${athlete.name || "Athlete"}">
        </div>

        <div class="recruiter-hero-info">
          <p class="network-kicker">Verified Athlete Profile</p>

          <h1>${athlete.name || "Unknown Athlete"}</h1>

          <h2>${position} • ${school}</h2>

          <div class="recruiter-hero-tags">
            <span>${athlete.sport || "Sport"}</span>
            <span>Class ${classYear}</span>
            <span>#${jersey}</span>
            <span>${height} • ${weight}</span>
            <span>${city}, ${state}</span>
          </div>

          <div class="recruiter-verification-row">
            <span>✅ Verified Athlete</span>
            <span>${hasFilm ? "🎥 Film Available" : "🎥 Film Pending"}</span>
            <span>🤖 Zeus AI Ready</span>
          </div>
        </div>

        <div class="recruiter-rating-tower">
          <span>ZEUS RATING</span>
          <strong>${score}</strong>
          <small>Recruiting Projection</small>
        </div>

      </div>

      <div class="athlete-quick-stats">

        <div class="quick-stat">
          <span>ZEUS</span>
          <strong>${score}</strong>
        </div>

        <div class="quick-stat">
          <span>OFFERS</span>
          <strong>${offers.length}</strong>
        </div>

        <div class="quick-stat">
          <span>VIDEOS</span>
          <strong>${videos.length || (athlete.highlightUrl ? 1 : 0)}</strong>
        </div>

        <div class="quick-stat">
          <span>HEIGHT</span>
          <strong>${height}</strong>
        </div>

             <div class="quick-stat">
          <span>WEIGHT</span>
          <strong>${weight}</strong>
        </div>

        <div class="quick-stat">
          <span>POSITION</span>
          <strong>${position}</strong>
        </div>

        <div class="quick-stat">
          <span>CLASS</span>
          <strong>${classYear}</strong>
        </div>

        <div class="quick-stat">
          <span>FILM</span>
          <strong>${hasFilm ? "YES" : "NO"}</strong>
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
          <p><strong>School:</strong> ${school}</p>
          <p><strong>Jersey:</strong> #${jersey}</p>
          <p><strong>Location:</strong> ${city}, ${state}</p>

        </div>

        <div class="athlete-panel">
  <h3>Biography</h3>

  <p>${bio}</p>

</div>

<div class="athlete-panel season-stats-panel">

  <h3>Season Stats</h3>

  <div class="season-stat-grid">

    ${seasonStats.map(([label, value]) => `
      <div class="season-stat-card">
        <span>${label}</span>
        <strong>${value}</strong>
      </div>
    `).join("")}

  </div>

</div>

<div class="athlete-panel athletic-testing-panel">

  <h3>Athletic Testing</h3>

  <div class="testing-stat-grid">

    ${athleticTesting.map(([label, value]) => `
      <div class="testing-stat-card">
        <span>${label}</span>
        <strong>${value}</strong>
      </div>
    `).join("")}

  </div>

</div>

<div class="athlete-panel athlete-offers-panel">
          
            <h3>College Offers</h3>

          ${
            offers.length
              ? `
                <div class="offer-card-grid">

                  ${offers.map(offer => `

                    <div class="offer-card">

                      <span class="offer-logo">🎓</span>

                      <div>

                        <strong>${offer}</strong>

                        <small>Recruiting Interest</small>

                      </div>

                    </div>

                  `).join("")}

                </div>
              `
              : `
                <p>No offers added yet.</p>
              `
          }

        <div>

        <div class="athlete-panel athlete-achievements-panel">

          <h3>Achievements</h3>

          ${
            achievements.length
              ? `
                <div class="achievement-badge-grid">

                  ${achievements.map(item => `

                    <div class="achievement-badge">

                      <span>🏆</span>

                      <strong>${
                        typeof item === "string"
                          ? item
                          : item.title || "Achievement"
                      }</strong>

                    </div>

                  `).join("")}

                </div>
              `
              : `
                <p>No achievements added yet.</p>
              `
          }

        </div>

        <div class="athlete-panel recruiter-contact-panel">

          <h3>Recruiter Contact</h3>

          <div class="recruiter-info-list">

            <div>
              <span>Coach</span>
              <strong>${coachName}</strong>
            </div>

            <div>
              <span>Email</span>
              <strong>${coachEmail}</strong>
            </div>

            <div>
              <span>Phone</span>
              <strong>${coachPhone}</strong>
            </div>

            <div>
              <span>NCAA ID</span>
              <strong>${ncaaId}</strong>
            </div>

          </div>

        </div>

        <div class="athlete-panel academic-info-panel">

          <h3>Academic Information</h3>

          <div class="academic-stat-grid">

            <div>
              <span>GPA</span>
              <strong>${gpa}</strong>
            </div>

            <div>
              <span>ACT</span>
              <strong>${act}</strong>
            </div>

            <div>
              <span>SAT</span>
              <strong>${sat}</strong>
            </div>

            <div>
              <span>Graduation Class</span>
              <strong>${classYear}</strong>
            </div>

          </div>

        </div>

        <div class="athlete-panel athlete-highlight-panel profile-film-panel">
  <h3>Highlight Film</h3>

  ${
    embedVideoUrl
      ? `
        <div class="profile-embedded-player">
          ${
            embedVideoUrl.includes("youtube.com/embed")
              ? `<iframe src="${embedVideoUrl}" allowfullscreen></iframe>`
              : `<video src="${embedVideoUrl}" controls></video>`
          }
        </div>
      `
      : `<div class="profile-film-empty">No film loaded yet.</div>`
  }

  <div class="profile-video-list">
    ${
      videos.length
        ? videos.map((video, index) => `
          <button
            class="profile-video-card"
            onclick="window.open('${video.url}', '_blank')">

            <span class="profile-video-icon">▶</span>

            <div>
              <strong>${video.title || "Highlight Film"}</strong>
              <small>Open recruiter film clip</small>
            </div>
          </button>
        `).join("")
        : athlete.highlightUrl
          ? `
            <button
              class="profile-video-card"
              onclick="window.open('${athlete.highlightUrl}', '_blank')">

              <span class="profile-video-icon">▶</span>

              <div>
                <strong>Main Highlight Film</strong>
                <small>Open verified athlete video</small>
              </div>
            </button>
          `
          : `<p>No highlight videos have been added yet.</p>`
    }
  </div>
</div>

      </div>

    </section>
  `;
}