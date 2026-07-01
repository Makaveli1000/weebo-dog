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

function videoCard(video) {
  return `
    <article class="reel-card" data-highlight-id="${escapeHtml(video.id)}">

      <video
        class="highlight-reel-video reel-video"
        src="${escapeHtml(video.url)}"
        muted
        loop
        playsinline
        preload="metadata">
      </video>

      <div class="reel-gradient"></div>

      <div class="reel-athlete-info">
        <span class="rating-badge">⚡ Zeus ${video.rating}</span>

        <h3>${escapeHtml(video.title)}</h3>

        <p>${escapeHtml(video.athlete)} • ${escapeHtml(video.school)} • ${escapeHtml(video.sport)}</p>

        <button
          class="athlete-card-btn"
          onclick="window.openAthleteProfile && window.openAthleteProfile('${escapeHtml(video.athleteId)}')">
          View Profile
        </button>
      </div>

      <div class="reel-actions">

        <button onclick="likeHighlight('${escapeHtml(video.id)}')">
          ❤️
          <span id="likes-${escapeHtml(video.id)}">${video.likes || 0}</span>
        </button>

        <button onclick="commentHighlight('${escapeHtml(video.id)}')">
          💬
          <span>${video.comments || 0}</span>
        </button>

        <button onclick="shareHighlight('${escapeHtml(video.id)}')">
          ↗️
          <span>Share</span>
        </button>

        <button onclick="zeusAnalyze('${escapeHtml(video.id)}')">
          ⚡
          <span>AI</span>
        </button>

      </div>

      <button class="reel-sound-toggle" onclick="toggleReelSound(this)">
        🔇
      </button>

    </article>
  `;
}

export function renderHighlightFeed(athletes = []) {
  const videos = [];

  athletes.forEach((item) => {
    const athlete = item.data || item;
    const athleteId = item.id || "";

    if (athlete.highlightUrl) {
      videos.push({
        id: `${athleteId}-main`,
        athleteId,
        title: "Main Highlight",
        athlete: athlete.name || "Unknown Athlete",
        school: athlete.school || "School Unlisted",
        sport: athlete.sport || "Athlete",
        rating: totalScore(athlete),
        url: athlete.highlightUrl,
        likes: 0,
        comments: 0
      });
    }

    (athlete.videos || []).forEach((video, index) => {
      if (!video.url) return;

      videos.push({
        id: `${athleteId}-${index}`,
        athleteId,
        title: video.title || "Highlight",
        athlete: athlete.name || "Unknown Athlete",
        school: athlete.school || "School Unlisted",
        sport: athlete.sport || "Athlete",
        rating: totalScore(athlete),
        url: video.url,
        likes: video.likes || 0,
        comments: video.comments || 0
      });
    });
  });

  return `
    <section class="reels-page">

      <div class="section-header">
        <p class="network-kicker">National Highlight Feed</p>
        <h2>Discover The Next Generation</h2>
        <p>Swipe-style athlete clips with autoplay, recruiting access, Zeus AI overlays, likes, comments, and sharing.</p>
      </div>

      <div class="reels-shell">

        ${
          videos.length
            ? videos.map(videoCard).join("")
            : `
              <div class="feature-card">
                <h3>No Highlights Yet</h3>
                <p>Select an athlete in the Admin Grid and upload a video from the Media Locker.</p>
              </div>
            `
        }

      </div>

    </section>
  `;
}