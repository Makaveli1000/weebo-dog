export function renderNationalDashboard(stats = {}) {
  const data = [
    ["👥", "Athletes", stats.athletes || "2,345,918"],
    ["🏫", "Schools", stats.schools || "28,000+"],
    ["🏈", "Sports", stats.sports || "22"],
    ["📺", "Live Games", stats.liveGames || "643"],
    ["🤖", "Zeus AI Reports", stats.zeusReports || "986,541"],
    ["🎥", "Highlights Today", stats.highlightsToday || "48,230"],
    ["🎓", "Coaches Online", stats.coachesOnline || "612"],
    ["💰", "NIL Deals", stats.nilDeals || "12,804"]
  ];

  return `
    <section class="national-dashboard">
      <div class="section-header">
        <p class="network-kicker">National Live Dashboard</p>
        <h3>Platform Pulse</h3>
        <p>Live national sports activity across athletes, schools, recruiting, highlights, and Zeus AI.</p>
      </div>

      <div class="national-dashboard-grid">
        ${data.map(([icon, label, value]) => `
          <div class="national-dashboard-card">
            <div class="national-dashboard-icon">${icon}</div>
            <strong>${value}</strong>
            <span>${label}</span>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}
