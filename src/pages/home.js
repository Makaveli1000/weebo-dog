export function renderHomePage() {
  return `
    <section id="home" class="cinematic-home">

      <div id="zeus-intro-overlay" class="cinematic-zeus-overlay">
        <button id="skip-zeus-intro" class="cinematic-skip">Skip Intro »</button>

        <div class="cinematic-lightning"></div>

        <div class="cinematic-zeus-stage">
          <div class="zeus-face">
            <img src="zeus-avatar.png" alt="Zeus Avatar">
          </div>

          <div class="zeus-script-panel">
            <p class="network-kicker">⚡ Zeus Is Speaking...</p>
            <p id="zeus-intro-line">Welcome to Snt.L.Mo. Sports Network...</p>
          </div>

          <div class="cinematic-progress">
            <span></span>
          </div>
        </div>
      </div>

      <div class="cinematic-hero">

        <div class="zeus-speech-card">
          <h3>⚡ Zeus Is Speaking...</h3>
          <p>Welcome to Snt.L.Mo. Sports Network...</p>
          <p>The home of every athlete... every school... every coach... every recruiter... every fan.</p>
          <p>Now... let’s discover the next generation of greatness.</p>
        </div>

        <div class="cinematic-center">
          <img src="zeus-avatar.png" alt="Zeus Avatar" class="cinematic-zeus-img">
          <h1>ZEUS</h1>
          <h2>IS SPEAKING...</h2>
        </div>

        <div class="live-highlights-panel">
          <h3>🔴 Live Highlights</h3>
          <div class="highlight-preview-card">🏈 Football Showcase</div>
          <div class="highlight-preview-row">
            <span>🏀</span>
            <span>⚽</span>
            <span>⚾</span>
            <span>🤼</span>
          </div>
        </div>

      </div>

      <div class="cinematic-dashboard-title">National Dashboard</div>

      <div class="cinematic-dashboard">
        <div><span>👤</span><strong class="count-up" data-target="256852">0</strong><p>Athletes</p></div>
        <div><span>🏫</span><strong class="count-up" data-target="12347">0</strong><p>Schools</p></div>
        <div><span>🎥</span><strong class="count-up" data-target="1024381">0</strong><p>Highlights</p></div>
        <div><span>📡</span><strong class="count-up" data-target="87">0</strong><p>Live Games</p></div>
        <div><span>🎓</span><strong class="count-up" data-target="25687">0</strong><p>Recruiters</p></div>
        <div><span>🤖</span><strong class="count-up" data-target="18932">0</strong><p>Zeus AI Reports</p></div>
        <div><span>💰</span><strong class="count-up" data-target="3412">0</strong><p>NIL Deals</p></div>
      </div>

      <div class="breaking-news-ticker cinematic-news">
        <strong>⚡ Breaking News</strong>
        <span>St. Louis Elite defeats KC Warriors 28–21</span>
        <span>Top QB commits to Mizzou</span>
        <span>Zeus AI reports updated nationally</span>
      </div>

      <div class="cinematic-sports-bar">
        <button>🏈 Football</button>
        <button>🏀 Basketball</button>
        <button>⚾ Baseball</button>
        <button>🥎 Softball</button>
        <button>⚽ Soccer</button>
        <button>🏃 Track & Field</button>
        <button>🤼 Wrestling</button>
        <button>🏐 Volleyball</button>
      </div>

    </section>
  `;
}