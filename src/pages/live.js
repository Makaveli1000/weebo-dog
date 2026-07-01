function liveGameCard(game) {
  return `
    <article class="live-game-card">
      <div class="live-game-top">
        <span class="${game.live ? "live-badge" : "upcoming-badge"}">
          ${game.live ? "● LIVE" : "UPCOMING"}
        </span>
        <small>${game.time}</small>
      </div>

      <div class="live-matchup">
        <div>
          <strong>${game.away}</strong>
          <span>${game.awayScore}</span>
        </div>

        <p>VS</p>

        <div>
          <strong>${game.home}</strong>
          <span>${game.homeScore}</span>
        </div>
      </div>

      <div class="live-game-actions">
        <button class="athlete-card-btn">Watch</button>
        <button class="athlete-card-btn">Stats</button>
        <button class="athlete-card-btn">Highlights</button>
      </div>
    </article>
  `;
}

export function renderLiveGamesPage() {
  const games = [
    { away: "Vashon", home: "CBC", awayScore: 28, homeScore: 21, time: "4th QTR • 2:18", live: true },
    { away: "East St. Louis", home: "Cardinal Ritter", awayScore: 14, homeScore: 14, time: "Halftime", live: true },
    { away: "Chaminade", home: "De Smet", awayScore: "-", homeScore: "-", time: "Tonight • 7:00 PM", live: false },
    { away: "SLUH", home: "Lutheran North", awayScore: "-", homeScore: "-", time: "Friday • 6:30 PM", live: false }
  ];

  return `
    <section class="live-page">
      <div class="section-header">
        <p class="network-kicker">Live Games</p>
        <h2>Game Center</h2>
        <p>Live broadcasts, scores, schedules, instant replays, stat overlays, and game-day event pages.</p>
      </div>

      <div class="live-scoreboard">
        <div>
          <span>📺</span>
          <strong>643</strong>
          <p>Live Broadcasts</p>
        </div>

        <div>
          <span>🏟️</span>
          <strong>1,284</strong>
          <p>Events Today</p>
        </div>

        <div>
          <span>🎥</span>
          <strong>48K</strong>
          <p>Replay Clips</p>
        </div>

        <div>
          <span>👀</span>
          <strong>2.1M</strong>
          <p>Viewers</p>
        </div>
      </div>

      <div class="live-games-grid">
        ${games.map(liveGameCard).join("")}
      </div>
    </section>
  `;
}