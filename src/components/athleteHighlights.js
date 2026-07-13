function getEmbedVideoUrl(url = "") {
  if (!url) return "";

  if (url.includes("youtube.com/watch?v=")) {
    const id = url.split("v=")[1]?.split("&")[0] || "";
    return id
      ? `https://www.youtube.com/embed/${id}`
      : "";
  }

  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1]?.split("?")[0] || "";
    return id
      ? `https://www.youtube.com/embed/${id}`
      : "";
  }

  return url;
}

function normalizeVideos(athlete = {}) {
  const videos = Array.isArray(athlete.videos)
    ? athlete.videos.filter(Boolean)
    : [];

  const fallbackUrl =
    athlete.highlightUrl ||
    athlete.highlight ||
    "";

  if (!videos.length && fallbackUrl) {
    return [
      {
        title: "Main Highlight Film",
        url: fallbackUrl,
        category: "Featured",
        views: 0,
        likes: 0
      }
    ];
  }

  return videos;
}

export function renderAthleteHighlights(athlete = {}) {
  const videos = normalizeVideos(athlete);

  const featuredVideo =
    videos[0] ||
    null;

  const featuredUrl =
    featuredVideo?.url ||
    "";

  const featuredEmbedUrl =
    getEmbedVideoUrl(featuredUrl);

  const athleteName =
    athlete.name ||
    "Athlete";

  const school =
    athlete.school ||
    athlete.schoolName ||
    athlete["school name"] ||
    "School N/A";

  const sport =
    athlete.sport ||
    "Sport";

  const videoCategories = [
    "Featured",
    "Game Film",
    "Camp Film",
    "Workout",
    "Interviews"
  ];

  return `
    <section class="athlete-panel athlete-film-room">

      <div class="athlete-film-room-header">

        <div>
          <p class="network-kicker">
            Recruiter Film Center
          </p>

          <h3>
            Highlight Film Room
          </h3>

          <p>
            Verified game film, training clips,
            interviews, and recruiting highlights.
          </p>
        </div>

        <div class="athlete-film-count">
          <span>Videos</span>
          <strong>${videos.length}</strong>
        </div>

      </div>

      <div class="athlete-film-category-tabs">

        ${videoCategories.map((category, index) => `
          <button
            type="button"
            class="${index === 0 ? "active" : ""}"
            onclick="window.filterAthleteFilm('${category}')">

            ${category}

          </button>
        `).join("")}

      </div>

      ${
        featuredVideo
          ? `
            <div class="athlete-featured-film">

              <div
                id="athlete-featured-player"
                class="athlete-featured-player">

                ${
                  featuredEmbedUrl.includes("youtube.com/embed")
                    ? `
                      <iframe
                        src="${featuredEmbedUrl}"
                        title="${featuredVideo.title || "Featured Highlight"}"
                        allowfullscreen>
                      </iframe>
                    `
                    : `
                      <video
                        src="${featuredUrl}"
                        controls
                        playsinline>
                      </video>
                    `
                }

              </div>

              <div class="athlete-featured-film-info">

                <p class="network-kicker">
                  Featured Film
                </p>

                <h4 id="athlete-featured-film-title">
                  ${featuredVideo.title || "Main Highlight Film"}
                </h4>

                <p>
                  ${athleteName} • ${sport} • ${school}
                </p>

                <div class="athlete-film-badges">

                  <span>Verified Film</span>
                  <span>Zeus Ready</span>
                  <span>Recruiter View</span>

                </div>

                <div class="athlete-film-actions">

  <button
    type="button"
    onclick="window.generateZeusScoutingReport?.()">

    Analyze Film

  </button>

  <button
    type="button"
    onclick="window.saveAthleteToWatchlist?.()">

    Save Athlete

  </button>

  <button
    type="button"
    onclick="window.shareAthleteProfile?.()">

    Share Profile

  </button>

  <button
    type="button"
    onclick="window.openAthleteSportsFeed?.('${athlete.id || ""}')">

    View Feed Videos

  </button>

</div>

              </div>

            </div>

            <div class="athlete-film-library-header">

              <div>
                <h4>
                  Film Library
                </h4>

                <p>
                  Select any clip to load it into the featured player.
                </p>
              </div>

              <span>
                ${videos.length} Clip${videos.length === 1 ? "" : "s"}
              </span>

            </div>

            <div class="athlete-film-library">

              ${videos.map((video, index) => `
                <button
                  type="button"
                  class="athlete-film-card"
                  data-film-category="${video.category || "Featured"}"
                  onclick="window.selectAthleteProfileFilm(
                    '${encodeURIComponent(video.url || "")}',
                    '${encodeURIComponent(video.title || `Highlight ${index + 1}`)}'
                  )">

                  <div class="athlete-film-thumb">

                    <span class="athlete-film-play">
                      ▶
                    </span>

                    <span class="athlete-film-tag">
                      ${video.category || sport}
                    </span>

                  </div>

                  <div class="athlete-film-card-copy">

                    <strong>
                      ${video.title || `Highlight ${index + 1}`}
                    </strong>

                    <small>
                      ${Number(video.views || 0).toLocaleString()} views •
                      ${Number(video.likes || 0).toLocaleString()} likes
                    </small>

                  </div>

                </button>
              `).join("")}

            </div>
          `
          : `
            <div class="athlete-film-empty">

              <span>
                🎥
              </span>

              <h4>
                No Film Available
              </h4>

              <p>
                Highlight film has not been added
                to this athlete profile yet.
              </p>

            </div>
          `
      }

    </section>
  `;
}