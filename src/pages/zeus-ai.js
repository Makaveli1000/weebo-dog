export function renderZeusAiPage() {
  return `
    <section class="zeus-ai-page national-zeus-center">

      <div class="section-header">
        <p class="network-kicker">Zeus AI</p>
        <h2>National Recruiting Intelligence Center</h2>
        <p>
          AI scouting, film breakdowns, recruiting projections,
          college fit, NIL outlook, comparisons, and printable reports.
        </p>
      </div>

      <div class="zeus-center-hero">

        <div class="zeus-center-avatar">
          <img src="zeus-avatar.png" alt="Zeus AI">
          <span></span>
        </div>

        <div>
          <h3>🤖 Zeus Scout</h3>
          <p>
            Ask Zeus to evaluate athletes, compare prospects,
            generate scouting reports, and build recruiting plans.
          </p>

          <textarea
            id="zeus-center-prompt"
            placeholder="Ask Zeus: Create a scouting report for a 2027 WR with elite speed, varsity film, and D-I interest..."
          ></textarea>

          <div class="zeus-center-actions">
            <button onclick="window.runZeusCenterTool('scout')">🤖 Zeus Scout</button>
            <button onclick="window.runZeusCenterTool('film')">🎥 Film Breakdown</button>
            <button onclick="window.runZeusCenterTool('projection')">📊 Projection</button>
            <button onclick="window.runZeusCenterTool('pdf')">📄 Print Report</button>
          </div>
        </div>

      </div>

      <div class="zeus-ai-tools zeus-center-tool-grid">

        ${zeusToolCard("🎥", "AI Film Breakdown", "Analyze speed, technique, awareness, explosiveness, effort, and impact plays.", "film")}

        ${zeusToolCard("📊", "Recruiting Projection", "Project recruiting tier, offer probability, position fit, and development timeline.", "projection")}

        ${zeusToolCard("🏆", "National Player Comparison", "Compare athletes by Zeus Rating, stats, testing, film, and projection.", "compare")}

        ${zeusToolCard("📈", "NIL Projection", "Estimate athlete brand value, marketability, reach, and sponsor potential.", "nil")}

        ${zeusToolCard("🎓", "College Fit Predictor", "Suggest best-fit programs based on sport, position, region, rating, and profile.", "college")}

        ${zeusToolCard("🧠", "Strengths & Weaknesses", "Generate a clear scouting breakdown with strengths, concerns, and next steps.", "strengths")}

        ${zeusToolCard("📄", "AI Scouting Report PDF", "Prepare a printable recruiter-ready report from the active athlete profile.", "pdf")}

      </div>

      <div id="zeus-center-output" class="zeus-ai-response">
        <h3>⚡ Zeus Output</h3>
        <p>Select a Zeus tool or type a prompt to begin.</p>
      </div>

    </section>
  `;
}

function zeusToolCard(icon, title, text, tool) {
  return `
    <div class="zeus-ai-tool-card">
      <div class="zeus-ai-icon">${icon}</div>
      <h3>${title}</h3>
      <p>${text}</p>
      <button onclick="window.runZeusCenterTool('${tool}')">
        Launch
      </button>
    </div>
  `;
}