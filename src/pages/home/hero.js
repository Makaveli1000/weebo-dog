export function renderHero() {
  return `
    <div class="cinematic-hero-grid">
      <aside class="zeus-script-box">
        <h3>⚡ Zeus Is Speaking...</h3>
        <p>Welcome to Snt.L.Mo. Sports Network...</p>
        <p>The home of every athlete...</p>
        <p>Every school...</p>
        <p>Every coach...</p>
        <p>Every recruiter...</p>
        <p>Every fan...</p>
        <p>Discover athletes from every city...</p>
        <p>Watch highlights from around the country...</p>
        <p>Explore school programs...</p>
        <p>Track national rankings...</p>
        <p>Connect through recruiting...</p>
        <p class="gold-line">Now... let’s discover the next generation of greatness.</p>
      </aside>

      <section class="zeus-center-stage">
        <img src="assets/zeus-avatar.png" alt="Zeus Avatar" class="zeus-main-image">
        <div class="zeus-title-lockup">
          <h1>ZEUS</h1>
          <h2>IS SPEAKING...</h2>
          <div class="voice-wave"></div>
        </div>
      </section>

      <aside class="home-side-stack">
        <div class="home-panel live-highlights-v2">
          <div class="panel-title-row">
            <h3>🔴 Live Highlights</h3>
            <a href="#highlights-root">View All</a>
          </div>

          <div class="featured-highlight">
            <div class="play-circle">▶</div>
            <span>Football Showcase</span>
          </div>

          <div class="highlight-thumbs">
            <img src="assets/football1.jpg" alt="">
            <img src="assets/football1.jpg" alt="">
            <img src="assets/football1.jpg" alt="">
            <img src="assets/football1.jpg" alt="">
          </div>
        </div>
      </aside>
    </div>
  `;
}