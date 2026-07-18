import {
  buildZeusHeroScript
} from "../../components/zeusAI.js";

export function renderHero() {
  const zeusScript =
    buildZeusHeroScript();

  const zeusScriptMarkup =
    zeusScript
      .map(
        (line, index) => {
          const className =
            index ===
            zeusScript.length - 1
              ? ' class="gold-line"'
              : "";

          return `
            <p${className}>
              ${line}
            </p>
          `;
        }
      )
      .join("");

  return `
    <div class="cinematic-hero-grid">
      <aside class="zeus-script-box">
        <h3>⚡ Zeus Is Speaking...</h3>

        ${zeusScriptMarkup}
      </aside>

      <section class="zeus-center-stage">
        <img
          src="assets/zeus-avatar.png"
          alt="Zeus Avatar"
          class="zeus-main-image"
        >

        <div class="zeus-title-lockup">
          <h1>ZEUS</h1>

          <h2>IS SPEAKING...</h2>

          <div class="voice-wave"></div>

          <div class="hero-action-buttons">
            <button
              type="button"
              onclick="window.platformAction?.('athletes')"
            >
              🏈 Explore Athletes
            </button>

            <button
              type="button"
              onclick="window.platformAction?.('highlights')"
            >
              🎥 Watch Highlights
            </button>

            <button
              type="button"
              onclick="window.platformAction?.('rankings')"
            >
              🏆 National Rankings
            </button>

            <button
              type="button"
              onclick="window.platformAction?.('recruiting')"
            >
              🎓 Recruiting
            </button>
          </div>
        </div>
      </section>

      <aside class="home-side-stack">
        <div class="home-panel live-highlights-v2">
          <div class="panel-title-row">
            <h3>🔴 Live Highlights</h3>

            <a
              href="javascript:void(0)"
              onclick="window.scrollToSection('highlights-root')"
            >
              View All
            </a>
          </div>

          <div class="featured-highlight">
            <div class="play-circle">
              ▶
            </div>

            <span>
              Football Showcase
            </span>
          </div>

          <div class="highlight-thumbs">
            <img
              src="assets/football1.jpg"
              alt=""
            >

            <img
              src="assets/football1.jpg"
              alt=""
            >

            <img
              src="assets/football1.jpg"
              alt=""
            >

            <img
              src="assets/football1.jpg"
              alt=""
            >
          </div>
        </div>
      </aside>
    </div>
  `;
}