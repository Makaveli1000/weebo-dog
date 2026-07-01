function scoreTotal(athlete = {}) {
  const scores = Array.isArray(athlete.scores)
    ? athlete.scores
    : [athlete.score0, athlete.score1, athlete.score2, athlete.score3, athlete.score4];

  return scores.reduce((sum, value) => sum + (Number(value) || 0), 0);
}

function rankingRow(item, index) {
  const athlete = item.data || item;
  const total = scoreTotal(athlete);

  return `
    <tr>
      <td><div class="rank-number">${index + 1}</div></td>
      <td>
        <strong>${athlete.name || "Unknown Athlete"}</strong>
        <small>${athlete.school || "School Unlisted"}</small>
      </td>
      <td>${athlete.sport || "Sport"}</td>
      <td>${athlete.position || "ATH"}</td>
      <td><span class="rank-score">${total || "--"}</span></td>
      <td><span class="rank-change-up">▲ Trending</span></td>
      <td><button class="athlete-card-btn">View</button></td>
    </tr>
  `;
}

export function renderRankingsPage(athletes = []) {
  const ranked = [...athletes]
    .sort((a, b) => scoreTotal(b.data || b) - scoreTotal(a.data || a))
    .slice(0, 25);

  return `
    <section class="rankings-page">
      <div class="rankings-header">
        <div class="section-header">
          <p class="network-kicker">National Rankings</p>
          <h2>Zeus Rating Leaderboard</h2>
          <p>Live rankings by sport, school, position, performance score, film, recruiting status, and verified data.</p>
        </div>

        <div class="rankings-filters">
          <select>
            <option>All Sports</option>
            <option>Football</option>
            <option>Basketball</option>
            <option>Track</option>
          </select>

          <select>
            <option>All Classes</option>
            <option>2026</option>
            <option>2027</option>
            <option>2028</option>
          </select>

          <input placeholder="Search athlete...">
        </div>
      </div>

      <table class="rankings-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Athlete</th>
            <th>Sport</th>
            <th>Position</th>
            <th>Zeus Rating</th>
            <th>Status</th>
            <th>Profile</th>
          </tr>
        </thead>

        <tbody>
          ${
            ranked.length
              ? ranked.map(rankingRow).join("")
              : `
                <tr>
                  <td colspan="7">No ranked athletes yet. Add athletes in the Admin Command Center.</td>
                </tr>
              `
          }
        </tbody>
      </table>
    </section>
  `;
}