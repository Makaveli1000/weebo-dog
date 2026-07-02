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
    <video src="${url}" class="film-video" controls playsinline></video>
  `;
}

export function renderHighlightFeed(athletes = []) {
  const videos = getVideoList(athletes);
  const featured = videos[0];

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
            <div class="film-center-grid">

              <div class="film-main-panel">
                <div class="film-player">
                  ${embedVideo(featured.url)}
                </div>

                <div class="film-info">
                  <p class="network-kicker">${featured.sport}</p>
                  <h3>${featured.title}</h3>
                  <p>${featured.athleteName}</p>

                  <div class="film-actions">
                    <button onclick="likeHighlight('${featured.id}')">❤️ <span id="likes-${featured.id}">${featured.likes}</span></button>
                    <button onclick="commentHighlight('${featured.id}')">💬 ${featured.comments}</button>
                    <button>👀 ${featured.views}</button>
                    <button onclick="shareHighlight('${featured.id}')">📤 Share</button>
                    <button onclick="zeusAnalyze('${featured.id}')">🤖 Zeus Breakdown</button>
                  </div>
                </div>
              </div>

              <div class="film-side-panel">
                <h3>🎬 Playlist</h3>

                <div class="film-playlist">
                  ${videos.map((video, index) => `
                    <button onclick="window.selectFilm('${video.id}')">
                      <span>▶ ${video.title}</span>
                      <small>${video.athleteName}</small>
                    </button>
                  `).join("")}
                </div>

                <div class="recruiter-notes">
                  <h3>⭐ Recruiter Notes</h3>
                  <p>Explosive traits, verified film, and growing recruiting profile. Notes will connect to recruiter accounts next.</p>
                </div>

                <div class="zeus-breakdown">
                  <h3>🤖 Zeus AI Breakdown</h3>
                  <p>Zeus is ready to analyze speed, decision-making, technique, impact plays, and college projection.</p>
                </div>
              </div>

            </div>
          `
      }

    </section>
  `;
}