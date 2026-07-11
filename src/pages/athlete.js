import { renderAthleteRecruiting } from "../components/athleteRecruiting.js";
import { renderZeusScoreCard } from "../components/zeusScoreCard.js";
import { renderAthleteMeasurements } from "../components/athleteMeasurements.js";

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

const featuredVideo =
  videos[0] ||
  (mainVideoUrl
    ? {
        title: "Main Highlight Film",
        url: mainVideoUrl
      }
    : null);

const videoCount =
  videos.length ||
  (mainVideoUrl ? 1 : 0);

const videoCategories = [
  "Featured",
  "Game Film",
  "Camp Film",
  "Workout",
  "Interviews"
];
  
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

const athletePhoto =
  athlete.photoUrl ||
  athlete.photo ||
  athlete.image ||
  "assets/football1.jpg";

const starRating =
  Number(score) >= 480
    ? 5
    : Number(score) >= 450
      ? 4
      : Number(score) >= 400
        ? 3
        : 2;

const starDisplay =
  "★".repeat(starRating) +
  "☆".repeat(5 - starRating);

  return `
    <section class="athlete-profile-page">

      <div class="recruiter-profile-hero athlete-profile-hero-v3">

  <div
    class="recruiter-hero-bg"
    style="
      background-image:
        linear-gradient(
          90deg,
          rgba(2,6,23,.98) 0%,
          rgba(2,6,23,.82) 45%,
          rgba(2,6,23,.95) 100%
        ),
        url('${coverImage}');
    ">
  </div>

  <div class="athlete-hero-v3-content">

    <!-- ==========================================
         ATHLETE PHOTO
    ========================================== -->

    <div class="athlete-hero-v3-photo-wrap">

      <div class="athlete-hero-v3-photo">

        <img
          src="${athletePhoto}"
          alt="${athlete.name || "Athlete"}">

      </div>

      <div class="athlete-verified-badge">
        ✓ VERIFIED
      </div>

    </div>

    <!-- ==========================================
         ATHLETE IDENTITY
    ========================================== -->

    <div class="athlete-hero-v3-identity">

      <div class="athlete-hero-v3-eyebrow">

        <span>
          ${starDisplay}
        </span>

        <strong>
          Verified National Athlete
        </strong>

      </div>

      <h1>
        ${athlete.name || "Unknown Athlete"}
      </h1>

      <h2>
        ${position} • ${school}
      </h2>

      <p class="athlete-hero-v3-location">
        ${city}, ${state} • Class of ${classYear}
      </p>

      <div class="athlete-hero-v3-tags">

        <span>
          ${athlete.sport || "Sport"}
        </span>

        <span>
          ${height}
        </span>

        <span>
          ${weight}
        </span>

        <span>
          #${jersey}
        </span>

        <span>
          ${hasFilm ? "🎥 Verified Film" : "🎥 Film Pending"}
        </span>

      </div>

      <div class="athlete-hero-v3-actions">

        <button
          type="button"
          onclick="window.saveAthleteToWatchlist()">

          ⭐ Save Athlete

        </button>

        <button
          type="button"
          onclick="window.openRecruiterNotes()">

          📝 Recruiter Notes

        </button>

        <button
          type="button"
          onclick="window.openContactCoach()">

          📧 Contact Coach

        </button>

        <button
          type="button"
          onclick="window.generateZeusScoutingReport()">

          📄 Zeus Report

        </button>

      </div>

    </div>

${renderZeusScoreCard(athlete)}    

  </div>

</div>

${renderAthleteRecruiting(athlete)}

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

  ${renderAthleteMeasurements(athlete)}

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

        <div class="athlete-panel athlete-film-room">

  <div class="athlete-film-room-header">

    <div>
      <p class="network-kicker">Recruiter Film Center</p>
      <h3>Highlight Film Room</h3>
      <p>
        Verified game film, training clips, interviews,
        and recruiting highlights.
      </p>
    </div>

    <div class="athlete-film-count">
      <span>Videos</span>
      <strong>${videoCount}</strong>
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
              getEmbedVideoUrl(featuredVideo.url).includes("youtube.com/embed")
                ? `
                  <iframe
                    src="${getEmbedVideoUrl(featuredVideo.url)}"
                    title="${featuredVideo.title || "Featured Highlight"}"
                    allowfullscreen>
                  </iframe>
                `
                : `
                  <video
                    src="${featuredVideo.url}"
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
              ${athlete.name || "Athlete"} •
              ${athlete.sport || "Sport"} •
              ${school}
            </p>

            <div class="athlete-film-badges">

              <span>✅ Verified Film</span>
              <span>🤖 Zeus Ready</span>
              <span>🎓 Recruiter View</span>

            </div>

            <div class="athlete-film-actions">

              <button
                type="button"
                onclick="window.generateZeusScoutingReport()">

                🤖 Analyze Film

              </button>

              <button
                type="button"
                onclick="window.saveAthleteToWatchlist()">

                ⭐ Save Athlete

              </button>

              <button
                type="button"
                onclick="window.shareAthleteProfile?.()">

                📤 Share Profile

              </button>

            </div>

          </div>

        </div>

        <div class="athlete-film-library-header">

          <div>
            <h4>Film Library</h4>
            <p>Select any clip to load it into the featured player.</p>
          </div>

          <span>
            ${videoCount} Clip${videoCount === 1 ? "" : "s"}
          </span>

        </div>

        <div class="athlete-film-library">

          ${
            videos.length
              ? videos.map((video, index) => `
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
                        ${video.category || athlete.sport || "Film"}
                      </span>

                    </div>

                    <div class="athlete-film-card-copy">

                      <strong>
                        ${video.title || `Highlight ${index + 1}`}
                      </strong>

                      <small>
                        ${video.views || 0} views •
                        ${video.likes || 0} likes
                      </small>

                    </div>

                  </button>
                `).join("")
              : `
                  <button
                    type="button"
                    class="athlete-film-card"
                    data-film-category="Featured"
                    onclick="window.selectAthleteProfileFilm(
                      '${encodeURIComponent(mainVideoUrl)}',
                      '${encodeURIComponent("Main Highlight Film")}'
                    )">

                    <div class="athlete-film-thumb">

                      <span class="athlete-film-play">
                        ▶
                      </span>

                      <span class="athlete-film-tag">
                        Featured
                      </span>

                    </div>

                    <div class="athlete-film-card-copy">

                      <strong>
                        Main Highlight Film
                      </strong>

                      <small>
                        Verified athlete film
                      </small>

                    </div>

                  </button>
                `
          }

        </div>
      `
      : `
        <div class="athlete-film-empty">

          <span>🎥</span>

          <h4>No Film Available</h4>

                  <p>
          Highlight film has not been added to this athlete profile yet.
        </p>

      </div>
    `
  }

</div>

      </div>

    </section>

  `;

}