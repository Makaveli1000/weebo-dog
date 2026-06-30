function liveGameCard(teamA, teamB, scoreA, scoreB, quarter, status) {
  return `
    <div class="live-game-card">

      <div class="live-badge">${status}</div>

      <div class="teams">

        <div class="team">
          <h2>${teamA}</h2>
          <span>${scoreA}</span>
        </div>

        <div class="vs">VS</div>

        <div class="team">
          <h2>${teamB}</h2>
          <span>${scoreB}</span>
        </div>

      </div>

      <div class="quarter">
        ${quarter}
      </div>

      <button class="athlete-card-btn">
        ▶ Watch Live
      </button>

    </div>
  `;
}

export function renderLiveGamesPage() {

return `

<section class="live-page">

<div class="section-header">

<p class="network-kicker">

Live Sports Network

</p>

<h2>

Watch Games Live

</h2>

<p>

High school, college, amateur and professional sports.

</p>

</div>

<div class="live-hero">

${liveGameCard(
"Vashon Wolverines",
"CBC Cadets",
21,
17,
"3rd Quarter",
"🔴 LIVE"
)}

${liveGameCard(
"East St. Louis",
"Belleville West",
14,
7,
"Halftime",
"🔴 LIVE"
)}

${liveGameCard(
"Cardinal Ritter",
"Lutheran North",
0,
0,
"Tonight 7:00 PM",
"UPCOMING"
)}

</div>

<div class="feature-grid">

<div class="feature-card">

<h3>Today's Schedule</h3>

<ul>

<li>4:00 PM Baseball</li>

<li>5:30 PM Soccer</li>

<li>6:00 PM Volleyball</li>

<li>7:00 PM Football</li>

<li>8:00 PM Basketball</li>

</ul>

</div>

<div class="feature-card">

<h3>Live Statistics</h3>

<p>

Real-time scoring

Player statistics

Game leaders

Possession tracker

Team comparison

</p>

</div>

<div class="feature-card">

<h3>Zeus AI Live</h3>

<p>

⚡ Win Probability

⚡ Momentum Meter

⚡ Player Impact

⚡ Live Predictions

</p>

</div>

</div>

</section>

`;

}