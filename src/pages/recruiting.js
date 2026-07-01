function recruitCard(icon, label, value) {
  return `
    <div class="recruit-card">
      <div class="recruit-icon">${icon}</div>
      <div>
        <h3>${label}</h3>
        <strong>${value}</strong>
      </div>
    </div>
  `;
}

export function renderRecruitingPage() {
  return `
    <section class="recruiting-page">
      <div class="section-header">
        <p class="network-kicker">Recruiting Portal</p>
        <h2>Recruiting Command Center</h2>
        <p>Search athletes by sport, class, position, school, city, state, Zeus Rating, film, offers, and verified status.</p>
      </div>

      <div class="recruit-search">
        <input placeholder="Search athlete name...">
        <select><option>All Sports</option><option>Football</option><option>Basketball</option><option>Track</option></select>
        <select><option>All Positions</option><option>QB</option><option>WR</option><option>RB</option><option>DB</option></select>
        <select><option>All Classes</option><option>2026</option><option>2027</option><option>2028</option></select>
        <select><option>All States</option><option>Missouri</option><option>Illinois</option></select>
      </div>

      <div class="recruit-dashboard">
        ${recruitCard("👤", "Recruitable Athletes", "18,420")}
        ${recruitCard("🎥", "Verified Highlights", "92,310")}
        ${recruitCard("🎓", "College Recruiters", "25,687")}
        ${recruitCard("⚡", "Zeus Reports", "18,932")}
      </div>

      <div class="recruit-board">
        <div class="feature-card">
          <h3>🔥 Hot Board</h3>
          <ul>
            <li>Top uncommitted football prospects</li>
            <li>Fastest rising 2027 athletes</li>
            <li>Most viewed highlight profiles</li>
            <li>Zeus AI breakout candidates</li>
          </ul>
        </div>

        <div class="feature-card">
          <h3>🎓 Recruiter Tools</h3>
          <ul>
            <li>Save athletes to recruiting boards</li>
            <li>Compare film and Zeus Ratings</li>
            <li>Request verified contact access</li>
            <li>Create prospect watchlists</li>
          </ul>
        </div>

        <div class="feature-card">
          <h3>📊 Evaluation Filters</h3>
          <ul>
            <li>Position fit</li>
            <li>School level</li>
            <li>Class year</li>
            <li>Performance grade</li>
          </ul>
        </div>
      </div>
    </section>
  `;
}