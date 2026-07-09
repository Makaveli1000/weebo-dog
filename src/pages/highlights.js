function getVideoList(athletes = []) {
  const active = window.appState?.activeAthlete;

  if (active) {
    const videos = active.videos || [];

    if (videos.length) {
      return videos.map((video, index) => ({
        id: `${active.id || "active"}-${index}`,
        athleteName: active.name || "Unknown Athlete",
        sport: active.sport || "Sport",
        title: video.title || `Highlight ${index + 1}`,
        url: video.url || active.highlightUrl || "",
        views: video.views || 0,
        likes: video.likes || 0,
        comments: video.comments || 0
      }));
    }

    if (active.highlightUrl) {
      return [{
        id: `${active.id || "active"}-main`,
        athleteName: active.name || "Unknown Athlete",
        sport: active.sport || "Sport",
        title: "Main Highlight",
        url: active.highlightUrl,
        views: 0,
        likes: 0,
        comments: 0
      }];
    }
  }

  return athletes.flatMap(({ id, data }) => {
    const videos = data.videos || [];

    if (videos.length) {
      return videos.map((video, index) => ({
        id: `${id}-${index}`,
        athleteName: data.name || "Unknown Athlete",
        sport: data.sport || "Sport",
        title: video.title || `Highlight ${index + 1}`,
        url: video.url || "",
        views: video.views || 0,
        likes: video.likes || 0,
        comments: video.comments || 0
      }));
    }

    if (data.highlightUrl) {
      return [{
        id: `${id}-main`,
        athleteName: data.name || "Unknown Athlete",
        sport: data.sport || "Sport",
        title: "Main Highlight",
        url: data.highlightUrl,
        views: 0,
        likes: 0,
        comments: 0
      }];
    }

    return [];
  });
}

function embedVideo(url = "") {
  if (!url) {
    return `<div class="film-empty">No video selected.</div>`;
  }

  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    let videoId = url.split("v=")[1] || url.split("/").pop();
    if (videoId.includes("?")) videoId = videoId.split("?")[0];

    return `
      <iframe
        src="https://www.youtube.com/embed/${videoId}"
        class="film-video"
        allowfullscreen>
      </iframe>
    `;
  }

  return `
    <video
      src="${url}"
      class="film-video"
      controls
      playsinline>
    </video>
  `;
}

function filmMetric(label, score) {

  return `
    <div class="film-metric-card">

      <div class="film-metric-top">
        <span>${label}</span>
        <strong>${score}</strong>
      </div>

      <div class="film-metric-bar">
        <i style="width:${score}%"></i>
      </div>

    </div>
  `;

}

function collegeMatch(school, percent) {
  return `
    <div class="college-match-card">

      <div>
        <strong>${school}</strong>
        <span>${percent}% Match</span>
      </div>

      <div class="college-match-bar">
        <i style="width:${percent}%"></i>
      </div>

    </div>
  `;
}

export function renderHighlightFeed(athletes = []) {
  const videos = getVideoList(athletes);
const featured = videos[0];
const activeAthlete = window.appState?.activeAthlete || {};

  return `
    <section class="network-section highlight-film-center">

      <div class="section-header">
        <p class="network-kicker">Highlight Film Center</p>
        <h2>${window.appState?.activeAthlete ? `${window.appState.activeAthlete.name} Film Room` : "National Highlight Feed"}</h2>
        <p>Featured film, playlist, recruiter notes, Zeus AI breakdown, likes, comments, views, and sharing.</p>
      </div>

      ${
        !featured
          ? `
            <div class="empty-state-card">
              <h3>No Highlights Yet</h3>
              <p>Select an athlete in the Admin Grid and upload a video from the Media Locker.</p>
            </div>
          `
          : ` 

<div class="athlete-hero-banner">

  <div class="athlete-hero-left">

    <div class="athlete-avatar">
      <img
        src="${activeAthlete.photo || 'zeus-avatar.png'}"
        alt="${featured.athleteName}">
    </div>

    <div>

      <p class="network-kicker">
        Featured Athlete
      </p>

      <h1>
        ${featured.athleteName}
      </h1>

      <div class="athlete-tags">

        <span>
          ${featured.sport || "Sport"}
        </span>

        <span>
          ${activeAthlete.position || activeAthlete.posion || "ATH"}
        </span>

        <span>
          ${activeAthlete.school || activeAthlete.schoolName || "School"}
        </span>

      </div>

    </div>

  </div>

  <div class="athlete-hero-right">

    <div class="hero-stat">
      <span>Zeus Rating</span>
      <strong>
        ${activeAthlete.zeusRating || activeAthlete.total || "95"}
      </strong>
    </div>

    <div class="hero-stat">
      <span>Verified Film</span>
      <strong>YES</strong>
    </div>

    <div class="hero-stat">
      <span>Recruiting</span>
      <strong>ACTIVE</strong>
    </div>

  </div>

</div>
            <div class="highlight-v2-featured">

  <div class="highlight-v2-player">
    ${embedVideo(featured.url)}
  </div>

  <div class="highlight-v2-meta">

    <p class="network-kicker">Featured Highlight</p>

    <h2>${featured.athleteName || activeAthlete.name || "Featured Athlete"}</h2>

    <p>
      ${featured.sport || activeAthlete.sport || "Sport"} •
      ${activeAthlete.position || activeAthlete.posion || "ATH"} •
      ${activeAthlete.school || activeAthlete.schoolName || "School N/A"}
    </p>

    <h3>${featured.title || "Main Highlight"}</h3>

    <div class="highlight-v2-stats">
      <span>❤️ ${featured.likes || 0}</span>
      <span>💬 ${featured.comments || 0}</span>
      <span>👀 ${featured.views || 0}</span>
      <button onclick="shareHighlight('${featured.id}')">📤 Share</button>
      <button onclick="zeusAnalyze('${featured.id}')">🤖 Zeus Breakdown</button>
    </div>

    <div class="highlight-v2-badges">
      <span>✅ Verified Film</span>
      <span>⚡ Zeus Ready</span>
      <span>🎓 Recruiter View</span>
    </div>

<div class="zeus-film-dashboard">

  <div class="zeus-film-header">
    <div>
      <p class="network-kicker">Zeus Film Intelligence</p>
      <h3>AI Film Breakdown Dashboard</h3>
    </div>

    <div class="zeus-film-overall">
      <span>Overall Impact</span>
      <strong>96</strong>
    </div>
  </div>

  <div class="zeus-film-metrics">
    ${filmMetric("Speed", 97)}
    ${filmMetric("Explosion", 95)}
    ${filmMetric("IQ", 94)}
    ${filmMetric("Technique", 92)}
    ${filmMetric("Leadership", 98)}
    ${filmMetric("Competitiveness", 99)}
  </div>

</div>

<div class="college-match-engine">

  <div class="college-match-header">
    <div>
      <p class="network-kicker">College Fit Predictor</p>
      <h3>Best Program Matches</h3>
    </div>

    <span>Zeus Match Engine</span>
  </div>

  <div class="college-match-grid">
    ${collegeMatch("Missouri", 99)}
    ${collegeMatch("Memphis", 97)}
    ${collegeMatch("Illinois", 95)}
    ${collegeMatch("Kansas State", 93)}
    ${collegeMatch("Notre Dame", 90)}
  </div>

</div>
                <h3>🎬 Playlist</h3>

               <div class="film-category-tabs">
  <button onclick="window.comingSoon('Bio film filter')">Bio</button>
  <button onclick="window.comingSoon('High School film filter')">High School</button>
  <button onclick="window.comingSoon('College film filter')">College</button>
  <button onclick="window.comingSoon('Pro film filter')">Pro</button>
</div>

<div class="film-gallery-header">
  <div>
    <h3>🎬 Featured Film Library</h3>
    <p>Top clips, interviews, highlights, and verified recruiting film.</p>
  </div>

  <span>${videos.length} Videos</span>
</div>

<div class="film-card-grid">
  ${videos.slice(0, 12).map((video) => `
    <button class="film-card film-card-premium" onclick="window.selectFilm('${video.id}')">

      <div class="film-card-thumb">
        <span class="film-play-badge">▶</span>
        <span class="film-card-tag">${video.sport || "Film"}</span>
      </div>

      <div class="film-card-body">
        <strong>${video.title}</strong>
        <small>${video.athleteName}</small>
      </div>

    </button>
  `).join("")}
</div>

                <div class="highlight-recruiter-panel">
  <h3>🎓 Recruiter Center</h3>

  <button onclick="window.saveAthleteToWatchlist()">⭐ Save Athlete</button>
  <button onclick="window.openWatchlist()">📌 Watchlist</button>
  <button onclick="window.openRecruiterNotes()">📝 Recruiter Notes</button>
  <button onclick="window.openContactCoach()">📧 Contact Coach</button>
  <button onclick="window.generateZeusScoutingReport()">📄 AI Report</button>
</div>

<div class="highlight-zeus-panel">
  <h3>⚡ Zeus Film IQ</h3>

  <div class="highlight-zeus-score">
    <span>Overall Film Grade</span>
    <strong>94</strong>
  </div>

  <ul>
    <li>Elite competitive profile</li>
    <li>Verified film available</li>
    <li>Recruiter-ready evaluation</li>
    <li>Projection updates with new film</li>
  </ul>

  <button onclick="window.zeusAnalyze('${featured.id}')">
    🤖 Analyze Film
  </button>
</div>

            </div>
          `
      }

    </section>
  `;
}