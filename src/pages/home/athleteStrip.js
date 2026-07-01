function athleteCard(item) {
  const athlete = item.data || item;

  return `
    <div class="mini-athlete-card">
      <img src="${athlete.photoUrl || "assets/football1.jpg"}" alt="">
      <h4>${athlete.name || "Athlete"}</h4>
      <p>${athlete.position || athlete.sport || "ATH"} • ${athlete.school || "School"}</p>
    </div>
  `;
}

export function renderAthleteStrip(athletes = []) {
  const topAthletes = athletes.slice(0, 5);

  return `
    <div class="home-athlete-strip">
      ${
        topAthletes.length
          ? topAthletes.map(athleteCard).join("")
          : `
            <div class="mini-athlete-card">
              <h4>No Athletes Yet</h4>
              <p>Add athletes in Admin Command Center</p>
            </div>
          `
      }
    </div>
  `;
}