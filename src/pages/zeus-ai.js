function aiToolCard(icon, title, text) {
  return `
    <div class="zeus-ai-tool-card">
      <div class="zeus-ai-icon">${icon}</div>
      <h3>${title}</h3>
      <p>${text}</p>
      <button class="athlete-card-btn">Launch</button>
    </div>
  `;
}

export function renderZeusAiPage() {
  return `
    <section class="zeus-ai-page">
      <div class="section-header">
        <p class="network-kicker">Zeus AI</p>
        <h2>AI Scouting & Recruiting Intelligence</h2>
        <p>Film analysis, player comparisons, recruiting reports, rankings support, and development plans.</p>
      </div>

      <div class="zeus-ai-command">
        <div>
          <h3>Ask Zeus AI</h3>
          <p>Generate scouting reports, compare athletes, predict recruiting fit, and build training plans.</p>
        </div>

        <textarea placeholder="Example: Create a scouting report for a 2027 QB with strong arm strength and mobility."></textarea>

        <button class="athlete-card-btn">Generate Zeus Report</button>
      </div>

      <div class="zeus-ai-tools">
        ${aiToolCard("🎥", "Film Breakdown", "Analyze highlights, technique, speed, decision-making, and game impact.")}
        ${aiToolCard("📊", "Player Comparison", "Compare athletes by sport, position, class, school, and Zeus Rating.")}
        ${aiToolCard("🎓", "Recruiting Report", "Create college-ready athlete summaries and projection notes.")}
        ${aiToolCard("📈", "Development Plan", "Build position-specific improvement plans for athletes and coaches.")}
      </div>
    </section>
  `;
}