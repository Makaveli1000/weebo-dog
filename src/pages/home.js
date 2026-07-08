import { renderHero } from "./home/hero.js";
import { renderBreakingNews } from "./home/breakingNews.js";
import { renderDashboard } from "./home/dashboard.js";
import { renderSportsTabs } from "./home/sportsTabs.js";
import { renderAthleteStrip } from "./home/athleteStrip.js";

export function renderHomePage(athletes = []) {
  return `
    <section id="home" class="cinematic-home-v2">

      <div id="zeus-intro-overlay" class="zeus-movie-overlay">
        <button id="skip-zeus-intro" class="cinematic-skip">Skip Intro »</button>
        <div class="storm-flash"></div>

        <div class="zeus-movie-stage">
          <img src="assets/zeus-avatar.png" alt="Zeus Avatar" class="zeus-movie-face">

          <div class="zeus-home-avatar-card">
  <img src="zeus-avatar.png" alt="Zeus Avatar" class="zeus-home-avatar-img">

  <div class="zeus-home-avatar-title">
    ZEUS
  </div>

  <div class="zeus-home-avatar-subtitle">
    IS SPEAKING...
  </div>
</div>

          <div class="zeus-movie-progress">
            <span></span>
          </div>
        </div>
      </div>

      <div class="cinematic-topbar">
        <button>🔊 Sound: On</button>
        <button id="skip-zeus-intro-inline">Skip Intro »</button>
      </div>

      ${renderHero()}
      
      ${renderBreakingNews()}

      ${renderDashboard()}

      ${renderSportsTabs()}

      ${renderAthleteStrip(athletes)}

    </section>
  `;
}