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
      data-feed-athlete-id="${escapeFeedHtml(post.athleteId)}"
      data-feed-sport="${escapeFeedHtml(post.sport)}"
      data-feed-category="${escapeFeedHtml(post.category)}"
      data-feed-created-at="${
        post.createdAt?.seconds
          ? post.createdAt.seconds * 1000
          : Date.parse(post.createdAt || "") || 0
      }"
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

<div class="sports-feed-profile-link">

  <button
    type="button"
    data-feed-open-athlete
    data-athlete-id="${escapeFeedHtml(post.athleteId)}">

    👤 View ${escapeFeedHtml(post.athleteName)}'s Profile

  </button>

</div>
      </div>

    </article>
  `;
}

export function renderSportsFeedPage(
  athletes = [],
  storedFeedPosts = []
) {
  const athletePosts =
  createFeedPosts(athletes);

const firebasePosts = Array.isArray(
  storedFeedPosts
)
  ? storedFeedPosts.map((post) => ({
      id: post.id || "",

      athleteId:
        post.athleteId || "",

      athleteName:
        post.athleteName ||
        post.uploaderName ||
        "Sports Creator",

      athletePhoto:
        post.athletePhoto ||
        "assets/football1.jpg",

      school:
        post.schoolName ||
        "School Not Listed",

      sport:
        post.sport ||
        "Sport",

      state:
        post.state ||
        "",

      title:
        post.title ||
        "Sports Video",

      category:
        post.category ||
        "Highlight",

      url:
        post.videoUrl ||
        post.url ||
        "",

      likes:
        Number(post.likes || 0),

      views:
        Number(post.viewCount || post.views || 0),

      comments:
        Number(post.commentCount || 0),

      shares:
        Number(post.shareCount || post.shares || 0),

      createdAt:
        post.createdAt ||
        null,

      hashtags:
        Array.isArray(post.hashtags)
          ? post.hashtags
          : []
    }))
  : [];

const firebaseUrls = new Set(
  firebasePosts
    .map((post) => post.url)
    .filter(Boolean)
);

const legacyPostsWithoutDuplicates =
  athletePosts.filter(
    (post) =>
      !firebaseUrls.has(post.url)
  );

const posts = [
  ...firebasePosts,
  ...legacyPostsWithoutDuplicates
]
  .filter((post) => post.url)
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

      <!-- ==========================================
           SPORTS FEED UPLOAD MODAL
      ========================================== -->

      <div
        id="feed-upload-modal"
        class="feed-upload-modal hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="feed-upload-modal-title">

        <div class="feed-upload-modal-backdrop"></div>

        <div class="feed-upload-modal-card">

          <div class="feed-upload-modal-header">

            <div>

              <p class="network-kicker">
                Creator Studio
              </p>

              <h2 id="feed-upload-modal-title">
                Upload Sports Video
              </h2>

              <p>
                Upload one video and connect it to the
                Sports Feed, athlete profile, school page,
                rankings, and recruiting system.
              </p>

            </div>

            <button
              type="button"
              class="feed-upload-close-btn"
              data-close-feed-upload
              aria-label="Close upload form">

              ×

            </button>

          </div>

          <form
            id="feed-upload-form"
            class="feed-upload-form">

            <!-- VIDEO FILE -->

            <label class="feed-upload-field feed-upload-field-full">

              <span>
                Video File
              </span>

              <input
                type="file"
                id="feed-upload-file"
                accept="video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov"
                required>

              <small>
                MP4, WebM, or MOV. Maximum size: 250 MB.
              </small>

            </label>

            <!-- TITLE -->

            <label class="feed-upload-field feed-upload-field-full">

              <span>
                Video Title
              </span>

              <input
                type="text"
                id="feed-upload-title"
                maxlength="120"
                placeholder="Example: Game-Winning Touchdown"
                required>

            </label>

            <!-- DESCRIPTION -->

            <label class="feed-upload-field feed-upload-field-full">

              <span>
                Description
              </span>

              <textarea
                id="feed-upload-description"
                maxlength="600"
                placeholder="Describe the play, workout, interview, or sports moment."></textarea>

            </label>

            <div class="feed-upload-grid">

              <!-- CATEGORY -->

              <label class="feed-upload-field">

                <span>
                  Category
                </span>

                <select
                  id="feed-upload-category"
                  required>

                  <option value="Highlight">
                    🎥 Highlight
                  </option>

                  <option value="Workout">
                    💪 Workout
                  </option>

                  <option value="Training">
                    🏋 Training
                  </option>

                  <option value="Sports Comedy">
                    😂 Sports Comedy
                  </option>

                  <option value="Interview">
                    🎙 Interview
                  </option>

                  <option value="Team Hype">
                    📣 Team Hype
                  </option>

                  <option value="Championship">
                    🏆 Championship
                  </option>

                  <option value="Trick Shot">
                    🎯 Trick Shot
                  </option>

                  <option value="Film Breakdown">
                    📚 Film Breakdown
                  </option>

                </select>

              </label>

              <!-- ATHLETE -->

              <label class="feed-upload-field">

                <span>
                  Connect Athlete
                </span>

                <select id="feed-upload-athlete">

                  <option value="">
                    No athlete selected
                  </option>

                </select>

              </label>

              <!-- SPORT -->

              <label class="feed-upload-field">

                <span>
                  Sport
                </span>

                <select
                  id="feed-upload-sport"
                  required>

                  <option value="">
                    Select Sport
                  </option>

                  <option value="Football">Football</option>
                  <option value="Girls Flag Football">Girls Flag Football</option>
                  <option value="Basketball">Basketball</option>
                  <option value="Baseball">Baseball</option>
                  <option value="Softball">Softball</option>
                  <option value="Soccer">Soccer</option>
                  <option value="Volleyball">Volleyball</option>
                  <option value="Track & Field">Track & Field</option>
                  <option value="Cross Country">Cross Country</option>
                  <option value="Wrestling">Wrestling</option>
                  <option value="Boxing">Boxing</option>
                  <option value="Hockey">Hockey</option>
                  <option value="Swimming">Swimming</option>
                  <option value="Tennis">Tennis</option>
                  <option value="Golf">Golf</option>
                  <option value="Lacrosse">Lacrosse</option>
                  <option value="Bowling">Bowling</option>
                  <option value="Gymnastics">Gymnastics</option>
                  <option value="Cheer">Cheer</option>
                  <option value="Dance">Dance</option>
                  <option value="Weightlifting">Weightlifting</option>

                </select>

              </label>

              <!-- SCHOOL -->

              <label class="feed-upload-field">

                <span>
                  School or Team
                </span>

                <input
                  type="text"
                  id="feed-upload-school"
                  maxlength="120"
                  placeholder="Example: Vashon High School">

              </label>

              <!-- STATE -->

              <label class="feed-upload-field">

                <span>
                  State
                </span>

                <input
                  type="text"
                  id="feed-upload-state"
                  maxlength="30"
                  placeholder="Example: Missouri or MO">

              </label>

              <!-- HASHTAGS -->

              <label class="feed-upload-field">

                <span>
                  Hashtags
                </span>

                <input
                  type="text"
                  id="feed-upload-hashtags"
                  maxlength="240"
                  placeholder="#Football #Touchdown #ClassOf2027">

              </label>

            </div>

            <!-- UPLOAD PROGRESS -->

            <div class="feed-upload-progress-area">

              <div class="feed-upload-progress-heading">

                <span>
                  Upload Progress
                </span>

                <strong id="feed-upload-progress-text">
                  Ready to upload
                </strong>

              </div>

              <progress
                id="feed-upload-progress"
                value="0"
                max="100">

                0%

              </progress>

            </div>

            <!-- ACTIONS -->

            <div class="feed-upload-actions">

              <button
                type="button"
                class="feed-upload-cancel-btn"
                data-close-feed-upload>

                Cancel

              </button>

              <button
                type="submit"
                class="feed-upload-submit-btn">

                Upload Video

              </button>

            </div>

          </form>

        </div>

      </div>

    </section>
  `;
}

