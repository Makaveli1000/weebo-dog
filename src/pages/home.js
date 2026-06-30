export function renderHomePage() {
  return `
    <section id="home" class="zeus-home">

      <div id="zeus-intro-overlay" class="zeus-intro-overlay">
        <button id="skip-zeus-intro" class="skip-zeus-intro">Skip Intro »</button>

        <div class="lightning-flash"></div>

        <div class="zeus-intro-content">
          <div class="zeus-avatar-glow">⚡</div>

          <h1>ZEUS IS SPEAKING...</h1>

          <p id="zeus-intro-line">
            Welcome to Snt.L.Mo. Sports Network...
          </p>

          <div class="zeus-intro-bar">
            <span></span>
          </div>
        </div>
      </div>

      <div class="zeus-home-hero">

        <div class="zeus-home-copy">
          <p class="network-kicker">National Sports Platform</p>

          <h2>Snt.L.Mo. Sports Network</h2>

          <p class="network-slogan">
            The Home of Every Athlete. Every School. Every Dream.
          </p>

          <p class="network-description">
            Zeus is your AI guide. A national sports platform built for athletes,
            coaches, schools, recruiters, families, fans, highlights, rankings,
            live games, gear, and AI scouting.
          </p>

          <div class="network-actions">
            <a href="#athlete-directory-page">Explore Athletes</a>
            <a href="#schools-root">Find Schools</a>
            <a href="#highlights-root">Watch Highlights</a>
            <a href="#recruiting-root">Recruiting Portal</a>
          </div>
        </div>

        <div class="zeus-intro-card">
          <div class="zeus-orb">⚡</div>

          <div>
            <h3>Olympus AI Activated</h3>
            <p>Zeus AI is preparing your personalized sports experience...</p>
          </div>
        </div>

      </div>

      <div class="breaking-news-ticker">
        <strong>⚡ Breaking Sports Headlines</strong>
        <span>St. Louis Elite defeats KC Warriors 28–21</span>
        <span>Top 50 athlete commits to Mizzou</span>
        <span>Zeus AI reports updated nationally</span>
      </div>

      <div class="network-stats">
        <div><strong class="count-up" data-target="250000">0</strong><span>Athletes</span></div>
        <div><strong class="count-up" data-target="12000">0</strong><span>Schools</span></div>
        <div><strong class="count-up" data-target="50">0</strong><span>Sports</span></div>
        <div><strong class="count-up" data-target="1000000">0</strong><span>Highlights</span></div>
        <div><strong>Zeus AI</strong><span>Scouting</span></div>
      </div>

      <section class="network-section">
        <div class="section-header">
          <h3>Explore Sports</h3>
          <p>Every sport. Every athlete. Every level.</p>
        </div>

        <div class="sports-grid">
          <div class="sport-card">🏈<span>Football</span></div>
          <div class="sport-card">🏈<span>Girls Flag Football</span></div>
          <div class="sport-card">🏀<span>Basketball</span></div>
          <div class="sport-card">⚽<span>Soccer</span></div>
          <div class="sport-card">🏐<span>Volleyball</span></div>
          <div class="sport-card">⚾<span>Baseball</span></div>
          <div class="sport-card">🥎<span>Softball</span></div>
          <div class="sport-card">🏃<span>Track & Field</span></div>
          <div class="sport-card">🤼<span>Wrestling</span></div>
          <div class="sport-card">🏊<span>Swimming</span></div>
          <div class="sport-card">🎾<span>Tennis</span></div>
          <div class="sport-card">📣<span>Cheer</span></div>
        </div>
      </section>

    </section>
  `;
}