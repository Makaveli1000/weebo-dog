import { renderAthleteRecruiting } from "../components/athleteRecruiting.js";
import { renderZeusScoreCard } from "../components/zeusScoreCard.js";
import { renderAthleteHero } from "../components/athleteHero.js";
import { renderAthleteVerification } from "../components/athleteVerification.js";
import { renderAthleteMeasurements } from "../components/athleteMeasurements.js";
import { renderAthleteAchievements } from "../components/athleteAchievements.js";
import { renderAthleteAcademics } from "../components/athleteAcademics.js";
import { renderAthleteTimeline } from "../components/athleteTimeline.js";
import { renderAthleteOffers } from "../components/athleteOffers.js";
import { renderAthleteHighlights } from "../components/athleteHighlights.js";
import { renderAthleteQuickStats } from "../components/athleteQuickStats.js";

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

  const hasFilm = Boolean(
    athlete.highlightUrl ||
    videos.length
 ); 
  
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

${renderAthleteHero(athlete)}

${renderAthleteQuickStats(athlete)}

${renderAthleteVerification(athlete)}

${renderAthleteMeasurements(athlete)}

${renderAthleteVideos(athlete)}      

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

${renderAthleteOffers(athlete)}

${renderAthleteAchievements(athlete)}       

${renderAthleteAcademics(athlete)}

${renderAthleteTimeline(athlete)}

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

${renderAthleteAchievements(athlete)}

${renderAthleteAcademics(athlete)}

${renderAthleteTimeline(athlete)}
       
${renderAthleteHighlights(athlete)}        

      </div>

    </section>

  `;

}