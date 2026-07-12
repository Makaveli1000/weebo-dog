function athleteCard(item) {
  const athlete = item.data || item;

  const sport =
    athlete.sport ||
    "Unknown";

  return `
    <div
      class="athlete-card"
      data-athlete-card
      data-athlete-sport="${sport}">

      <img
        src="${athlete.photoUrl || "assets/football1.jpg"}"
        alt="${athlete.name || "Athlete"}">

      <h4>
        ${athlete.name || "Athlete"}
      </h4>

      <p>
        ${athlete.position || sport || "ATH"}
        •
        ${athlete.school || "School"}
      </p>

    </div>
  `;
}

export function renderAthleteStrip(athletes = []) {
  const visibleAthletes = athletes;

  return `
    <div class="home-athlete-strip">

      ${
        visibleAthletes.length
          ? visibleAthletes.map(athleteCard).join("")
          : `
            <div class="mini-athlete-card">
              <h4>No Athletes Yet</h4>
              <p>Add athletes in Admin Command Center</p>
            </div>
          `
      }

    </div>

    <div
      id="home-athlete-filter-empty"
      class="home-athlete-filter-empty hidden">

      <span>🏅</span>

      <strong>
        No athletes found
      </strong>

      <p>
        No athlete profiles have been added for this sport yet.
      </p>

    </div>
  `;
}