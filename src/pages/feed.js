function escapeFeedHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getFeedVideoUrl(video = {}) {
  return (
    video.url ||
    video.videoUrl ||
    video.highlightUrl ||
    ""
  );
}

function getFeedVideoCategory(video = {}) {
  return (
    video.category ||
    video.type ||
    "Highlight"
  );
}

function getYouTubeEmbedUrl(url = "") {
  if (!url) return "";

  if (url.includes("youtube.com/embed/")) {
    return url;
  }

  if (url.includes("youtube.com/watch?v=")) {
    const videoId =
      url.split("watch?v=")[1]?.split("&")[0] || "";

    return videoId
      ? `https://www.youtube.com/embed/${videoId}`
      : "";
  }

  if (url.includes("youtu.be/")) {
    const videoId =
      url.split("youtu.be/")[1]?.split("?")[0] || "";

    return videoId
      ? `https://www.youtube.com/embed/${videoId}`
      : "";
  }

  return "";
}

function createFeedPosts(athletes = []) {
  const posts = [];

  athletes.forEach((item) => {
    const athlete = item.data || item || {};

    const athleteId =
      item.id ||
      athlete.id ||
      "";

    const athleteVideos = Array.isArray(athlete.videos)
      ? athlete.videos
      : [];

    athleteVideos.forEach((video, index) => {
      const url = getFeedVideoUrl(video);

      if (!url) return;

      posts.push({
        id:
          video.id ||
          `${athleteId || "athlete"}-${index}`,

        athleteId,

        athleteName:
          athlete.name ||
          "Unknown Athlete",

        athletePhoto:
          athlete.photoUrl ||
          athlete.photo ||
          athlete.image ||
          "assets/football1.jpg",

        school:
          athlete.school ||
          athlete.schoolName ||
          "School Not Listed",

        sport:
          athlete.sport ||
          "Sport",

        state:
          athlete.state ||
          "",

        title:
          video.title ||
          `${athlete.name || "Athlete"} Highlight`,

        category:
          getFeedVideoCategory(video),

        url,

        likes:
          Number(video.likes || 0),

        views:
          Number(video.views || 0),

        comments:
          Number(video.commentCount || 0),

        shares:
          Number(video.shares || 0),

        createdAt:
          video.createdAt ||
          athlete.updatedAt ||
          athlete.createdAt ||
          null,

        hashtags:
          Array.isArray(video.hashtags)
            ? video.hashtags
            : []
      });
    });

    const fallbackHighlight =
      athlete.highlightUrl ||
      athlete.highlight ||
      "";

    if (
      fallbackHighlight &&
      !athleteVideos.some(
        (video) =>
          getFeedVideoUrl(video) === fallbackHighlight
      )
    ) {
      posts.push({
        id:
          `${athleteId || "athlete"}-main-highlight`,

        athleteId,

        athleteName:
          athlete.name ||
          "Unknown Athlete",

        athletePhoto:
          athlete.photoUrl ||
          athlete.photo ||
          athlete.image ||
          "assets/football1.jpg",

        school:
          athlete.school ||
          athlete.schoolName ||
          "School Not Listed",

        sport:
          athlete.sport ||
          "Sport",

        state:
          athlete.state ||
          "",

        title:
          `${athlete.name || "Athlete"} Main Highlight`,

        category:
          "Highlight",

        url:
          fallbackHighlight,

        likes: 0,
        views: 0,
        comments: 0,
        shares: 0,

        createdAt:
          athlete.updatedAt ||
          athlete.createdAt ||
          null,

        hashtags: []
      });
    }
  });

  return posts;
}

function calculateTrendingScore(post = {}) {
  return (
    Number(post.views || 0) +
    Number(post.likes || 0) * 5 +
    Number(post.comments || 0) * 8 +
    Number(post.shares || 0) * 12
  );
}

function renderFeedPlayer(post = {}) {
  const embedUrl =
    getYouTubeEmbedUrl(post.url);

  if (embedUrl) {
    return `
      <iframe
        src="${escapeFeedHtml(embedUrl)}"
        title="${escapeFeedHtml(post.title)}"
        loading="lazy"
        allowfullscreen>
      </iframe>
    `;
  }

  return `
    <video
      src="${escapeFeedHtml(post.url)}"
      controls
      playsinline
      preload="metadata">
    </video>
  `;
}

function renderFeedPost(post = {}) {
  const location = [
    post.school,
    post.state
  ]
    .filter(Boolean)
    .join(" • ");

  const hashtags =
    post.hashtags.length
      ? post.hashtags
          .map((tag) => {
            const cleanedTag = String(tag)
              .replace(/^#/, "");

            return `
              <span>
                #${escapeFeedHtml(cleanedTag)}
              </span>
            `;
          })
          .join("")
      : `
          <span>
            #${escapeFeedHtml(post.sport)}
          </span>

          <span>
            #SntLMoSports
          </span>
        `;

  return `
    <article
      class="sports-feed-post"
      data-feed-post
      data-feed-post-id="${escapeFeedHtml(post.id)}"
      data-feed-sport="${escapeFeedHtml(post.sport)}"
      data-feed-category="${escapeFeedHtml(post.category)}"
      data-trending-score="${calculateTrendingScore(post)}">

      <div class="sports-feed-video">

        ${renderFeedPlayer(post)}

        <span class="sports-feed-category">
          ${escapeFeedHtml(post.category)}
        </span>

      </div>

      <div class="sports-feed-post-body">

        <div class="sports-feed-creator">

          <img
            src="${escapeFeedHtml(post.athletePhoto)}"
            alt="${escapeFeedHtml(post.athleteName)}">

          <div>

            <button
              type="button"
              class="sports-feed-athlete-link"
              data-athlete-id="${escapeFeedHtml(post.athleteId)}">

              ${escapeFeedHtml(post.athleteName)}

            </button>

            <p>
              ${escapeFeedHtml(location)}
            </p>

          </div>

          <span class="sports-feed-sport">
            ${escapeFeedHtml(post.sport)}
          </span>

        </div>

        <h3>
          ${escapeFeedHtml(post.title)}
        </h3>

        <div class="sports-feed-hashtags">
          ${hashtags}
        </div>

        <div class="sports-feed-actions">

          <button
            type="button"
            data-feed-action="like"
            data-feed-post-id="${escapeFeedHtml(post.id)}">

            ❤️
            <span>${post.likes.toLocaleString()}</span>

          </button>

          <button
            type="button"
            data-feed-action="comments"
            data-feed-post-id="${escapeFeedHtml(post.id)}">

            💬
            <span>${post.comments.toLocaleString()}</span>

          </button>

          <button
            type="button"
            data-feed-action="share"
            data-feed-post-id="${escapeFeedHtml(post.id)}">

            🔁
            <span>${post.shares.toLocaleString()}</span>

          </button>

          <button
            type="button"
            data-feed-action="save"
            data-feed-post-id="${escapeFeedHtml(post.id)}">

            ⭐ Save

          </button>

        </div>

                <div class="sports-feed-reactions">

          <button
            type="button"
            data-zeus-reaction="greatPlay">
            👍 Great Play
            <span>0</span>
          </button>

          <button
            type="button"
            data-zeus-reaction="highlight">
            🔥 Highlight
            <span>0</span>
          </button>

          <button
            type="button"
            data-zeus-reaction="beastMode">
            💪 Beast Mode
            <span>0</span>
          </button>

          <button
            type="button"
            data-zeus-reaction="fast">
            ⚡ Fast
            <span>0</span>
          </button>

          <button
            type="button"
            data-zeus-reaction="highIQ">
            🧠 High IQ
            <span>0</span>
          </button>

          <button
            type="button"
            data-zeus-reaction="clutch">
            🎯 Clutch
            <span>0</span>
          </button>

        </div>

        <div
          class="sports-feed-comments hidden"
          data-feed-comments-panel>

          <div
            class="sports-feed-comments-list"
            data-feed-comments-list>
          </div>

          <form data-feed-comment-form>

            <input
              type="text"
              data-feed-comment-input
              maxlength="300"
              placeholder="Add a sports comment..."
              required>

            <button type="submit">
              Post
            </button>

          </form>

        </div>

        <div class="sports-feed-performance">

          <span>
            👀 ${post.views.toLocaleString()} views
          </span>

          <span>
            🔥 ${calculateTrendingScore(post).toLocaleString()} trending
          </span>

        </div>

      </div>

    </article>
  `;
}

export function renderSportsFeedPage(athletes = []) {
  const posts = createFeedPosts(athletes)
    .sort(
      (a, b) =>
        calculateTrendingScore(b) -
        calculateTrendingScore(a)
    );

  return `
    <section
      id="sports-feed-page"
      class="sports-feed-page">

      <header class="sports-feed-header">

        <div>

          <p class="network-kicker">
            Snt.L.Mo. Sports Network
          </p>

          <h1>
            Sports Feed
          </h1>

          <p>
            Highlights, workouts, sports comedy,
            interviews, championships, and recruiting film.
          </p>

        </div>

        <button
          type="button"
          id="open-feed-upload-btn"
          class="sports-feed-upload-btn">

          ＋ Upload Sports Video

        </button>

      </header>

      <nav
        id="sports-feed-tabs"
        class="sports-feed-tabs">

        <button
          type="button"
          class="active"
          data-feed-filter="Trending">

          🔥 Trending

        </button>

        <button
          type="button"
          data-feed-filter="Latest">

          🕒 Latest

        </button>

        <button
          type="button"
          data-feed-filter="Highlight">

          🎥 Highlights

        </button>

        <button
          type="button"
          data-feed-filter="Workout">

          💪 Workouts

        </button>

        <button
          type="button"
          data-feed-filter="Sports Comedy">

          😂 Sports Comedy

        </button>

        <button
          type="button"
          data-feed-filter="Interview">

          🎙 Interviews

        </button>

        <button
          type="button"
          data-feed-filter="All">

          ▦ All Posts

        </button>

      </nav>

      <div
  id="sports-feed-list"
  class="sports-feed-list">

  ${
    posts.length
      ? posts
          .map(renderFeedPost)
          .join("")
      : `
          <div class="sports-feed-empty">

            <span>
              🎥
            </span>

            <h2>
              No sports videos yet
            </h2>

            <p>
              Upload a video through the existing
              Video Management system. It will
              automatically appear in this feed.
            </p>

          </div>
        `
  }

</div>

<div
  id="sports-feed-load-marker"
  class="sports-feed-load-marker">

  Loading more sports content...

</div>

</section>
`;
}