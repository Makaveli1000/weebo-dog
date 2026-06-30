function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char] || char));
}

export function renderHighlightFeed(athletes = []) {
  const videos = [];

  athletes.forEach((item) => {
    const athlete = item.data || item;

    if (athlete.highlightUrl) {
      videos.push({
        title: "Main Highlight",
        athlete: athlete.name || "Unknown Athlete",
        sport: athlete.sport || "Athlete",
        url: athlete.highlightUrl
      });
    }

    (athlete.videos || []).forEach((video) => {
      videos.push({
        title: video.title || "Highlight",
        athlete: athlete.name || "Unknown Athlete",
        sport: athlete.sport || "Athlete",
        url: video.url || ""
      });
    });
  });

  return `
    <div class="section-header">
      <p class="network-kicker">Highlight Feed</p>
      <h3>TikTok-Style Sports Highlights</h3>
      <p>Swipe-style athlete clips with autoplay, recruiting film, and uploaded game highlights.</p>
    </div>

    <div class="highlight-feed-vertical">
      ${
        videos.length
          ? videos.map((video) => `
            <article class="highlight-reel-card">
              <video
                class="highlight-reel-video"
                src="${escapeHtml(video.url)}"
                muted
                loop
                playsinline
                preload="metadata">
              </video>

              <div class="highlight-reel-overlay">
                <h4>${escapeHtml(video.title)}</h4>
                <p>${escapeHtml(video.athlete)} • ${escapeHtml(video.sport)}</p>
              </div>

              <div class="highlight-reel-actions">
                <button>❤️</button>
                <button>💬</button>
                <button>↗️</button>
              </div>
            </article>
          `).join("")
          : `<div class="feature-card"><h3>No Highlights Yet</h3><p>Upload a video from the Media Locker to appear here.</p></div>`
      }
    </div>
  `;
}