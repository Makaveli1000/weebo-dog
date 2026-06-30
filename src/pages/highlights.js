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
        athlete: athlete.name || "Unknown Athlete",
        sport: athlete.sport || "Athlete",
        title: "Main Highlight",
        url: athlete.highlightUrl
      });

    }

    (athlete.videos || []).forEach((video) => {

      videos.push({
        athlete: athlete.name || "Unknown Athlete",
        sport: athlete.sport || "Athlete",
        title: video.title || "Highlight",
        url: video.url || ""
      });

    });

  });

  return `

    <div class="section-header">

      <p class="network-kicker">
        Highlight Feed
      </p>

      <h3>
        TikTok Style Sports Highlights
      </h3>

      <p>
        Watch athlete highlights,
        training clips and game film.
      </p>

    </div>

    <div class="highlight-feed">

      ${
        videos.length

          ? videos.map((video) => `

              <div class="highlight-card">

                <video
                  src="${escapeHtml(video.url)}"
                  controls
                  playsinline>
                </video>

                <h4>
                  ${escapeHtml(video.title)}
                </h4>

                <p>
                  ${escapeHtml(video.athlete)}
                  •
                  ${escapeHtml(video.sport)}
                </p>

              </div>

            `).join("")

          : `

              <div class="feature-card">

                <h3>No Highlights Yet</h3>

                <p>
                  Upload your first highlight
                  to appear here.
                </p>

              </div>

            `
      }

    </div>

  `;
}