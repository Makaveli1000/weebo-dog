export function renderHomePage() {
  return `
    <section id="home" class="cinematic-home-v2">

      <div id="zeus-intro-overlay" class="zeus-movie-overlay">
        <button id="skip-zeus-intro" class="cinematic-skip">Skip Intro »</button>

        <div class="storm-flash"></div>

        <div class="zeus-movie-stage">
          <img src="zeus-avatar.png" alt="Zeus Avatar" class="zeus-movie-face">

          <div class="zeus-movie-copy">
            <p class="network-kicker">⚡ Zeus Is Speaking...</p>
            <p id="zeus-intro-line">Welcome to Snt.L.Mo. Sports Network...</p>
          </div>

          <div class="zeus-movie-progress">
            <span></span>
          </div>
        </div>
      </div>

      <div class="cinematic-topbar">
        <button>🔊 Sound: On</button>
        <button id="skip-zeus-intro">Skip Intro »</button>
      </div>

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
          <img src="zeus-avatar.png" alt="Zeus Avatar" class="zeus-main-image">
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

    <img src="assets/football1.jpg">

    <img src="assets/football2.jpg">

    <img src="assets/football3.jpg">

    <img src="assets/football4.jpg">

</div>

          <div class="home-panel breaking-panel">
            <div class="panel-title-row">
              <h3>⚡ Breaking Headlines</h3>
              <a href="#news-root">View All</a>
            </div>

            <ul>
              <li><span>2m</span> St. Louis Elite defeats KC Warriors 28–21</li>
              <li><span>5m</span> Top QB commits to Mizzou</li>
              <li><span>8m</span> National rankings updated by Zeus AI</li>
              <li><span>15m</span> New recruiting reports published</li>
            </ul>
          </div>

        </aside>

      </div>

      <div class="dashboard-title">National Dashboard</div>

      <div class="cinematic-stat-strip">
        <div>
          <span>👤</span>
          <p>Athletes</p>
          <strong class="count-up" data-target="256852">0</strong>
          <small>↑ 1,842 today</small>
        </div>

        <div>
          <span>🏫</span>
          <p>Schools</p>
          <strong class="count-up" data-target="12347">0</strong>
          <small>↑ 72 today</small>
        </div>

        <div>
          <span>🎥</span>
          <p>Highlights</p>
          <strong class="count-up" data-target="1024381">0</strong>
          <small>↑ 8,721 today</small>
        </div>

        <div>
          <span>📡</span>
          <p>Live Games</p>
          <strong class="count-up" data-target="87">0</strong>
          <small>Live now</small>
        </div>

        <div>
          <span>🎓</span>
          <p>Recruiters</p>
          <strong class="count-up" data-target="25687">0</strong>
          <small>↑ 203 today</small>
        </div>

        <div>
          <span>🤖</span>
          <p>Zeus AI Reports</p>
          <strong class="count-up" data-target="18932">0</strong>
          <small>↑ 620 today</small>
        </div>

        <div>
          <span>💰</span>
          <p>NIL Deals</p>
          <strong class="count-up" data-target="3412">0</strong>
          <small>↑ 115 today</small>
        </div>
      </div>

      <div class="sports-tab-bar">
        <button class="active">🏈 Football</button>
        <button>🏀 Basketball</button>
        <button>⚾ Baseball</button>
        <button>🥎 Softball</button>
        <button>⚽ Soccer</button>
        <button>🏃 Track & Field</button>
      <div class="mini-athlete-card">
    <img src="assets/football1.jpg" alt="Athlete">
    <h4>Jayden Smith</h4>
    <p>QB • Vashon</p>
</div>

<div class="mini-athlete-card">
    <img src="assets/football2.jpg" alt="Athlete">
    <h4>Marcus Brown</h4>
    <p>WR • CBC</p>
</div>

<div class="mini-athlete-card">
    <img src="assets/football3.jpg" alt="Athlete">
    <h4>Isaiah Lewis</h4>
    <p>RB • East St. Louis</p>
</div>

<div class="mini-athlete-card">
    <img src="assets/football4.jpg" alt="Athlete">
    <h4>Ty Johnson</h4>
    <p>DB • SLUH</p>
</div>

<div class="mini-athlete-card">
    <img src="assets/football1.jpg" alt="Athlete">
    <h4>Chris Williams</h4>
    <p>LB • De Smet</p>
</div>

      <div class="zeus-audio-player">
        <div class="audio-face">
          <img src="zeus-avatar.png" alt="Zeus Avatar  <button>🤼 Wrestling</button>
        <button>🏐 Volleyball</button>
        <button>▦ All Sports</button>
      </div>

      <div class="home-athlete-strip">
        ">
        </div>

        <div class="audio-meta">
          <p class="network-kicker">Cinematic Intro</p>
          <h3>Zeus Is Speaking...</h3>
          <p>I am Zeus... guardian of greatness. This is your platform.</p>
          <div class="audio-progress"><span></span></div>
        </div>

        <button>⏸</button>
        <button>🔊</button>
        <button>⛶</button>
      </div>

    </section>
  `;
}