function aiToolCard(icon, title, text) {
  return `
    <article class="zeus-ai-tool-card">
      <div class="zeus-ai-icon">${icon}</div>
      <h3>${title}</h3>
      <p>${text}</p>
      <button class="athlete-card-btn">Launch</button>
    </article>
  `;
}

export function renderZeusAiPage() {
  return `
    <section class="zeus-ai-page">
      <div class="section-header">
        <p class="network-kicker">Zeus AI</p>
        <h2>AI Scouting Intelligence</h2>
        <p>Film breakdown, scouting reports, player comparisons, recruiting projections, development plans, and ranking support.</p>
      </div>

      <div class="zeus-ai-command">
        <div>
          <h3>Ask Zeus AI</h3>
          <p>Generate a scouting report, compare athletes, evaluate film, or build a recruiting plan.</p>
        </div>

        <textarea placeholder="Example: Create a scouting report for a 2027 QB with arm strength, mobility, leadership, and varsity film."></textarea>

        <div class="zeus-ai-actions">
          <button class="athlete-card-btn">Generate Report</button>
          <button class="athlete-card-btn">Analyze Film</button>
          <button class="athlete-card-btn">Compare Players</button>
        </div>
      </div>

      <div class="zeus-ai-tools">
        ${aiToolCard("🎥", "Film Breakdown", "Analyze speed, technique, awareness, explosiveness, decision-making, and game impact.")}
        ${aiToolCard("📊", "Player Comparison", "Compare athletes by sport, position, class, school, Zeus Rating, and verified film.")}
        ${aiToolCard("🎓", "Recruiting Report", "Create college-ready summaries with strengths, weaknesses, projection notes, and fit.")}
        ${aiToolCard("📈", "Development Plan", "Build improvement plans for athletes, trainers, coaches, and parents.")}
        ${aiToolCard("🏆", "Ranking Support", "Use Zeus AI to assist with rating, ranking, and leaderboard movement.")}
        ${aiToolCard("🧠", "Coach Strategy", "Generate practice plans, opponent notes, and player development guidance.")}
      </div>
    </section>
  `;
}