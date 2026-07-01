function schoolCard(school) {
  return `
    <article class="school-card">
      <div class="school-banner ${school.color}">
        <div class="school-logo">${school.logo}</div>
      </div>

      <div class="school-body">
        <p class="network-kicker">${school.city}</p>
        <h3>${school.name}</h3>
        <p>${school.mascot}</p>

        <div class="school-stats">
          <div><strong>${school.athletes}</strong><span>Athletes</span></div>
          <div><strong>${school.teams}</strong><span>Teams</span></div>
          <div><strong>${school.titles}</strong><span>Titles</span></div>
        </div>

        <button class="athlete-card-btn">View School</button>
      </div>
    </article>
  `;
}

export function renderSchoolsPage() {
  const schools = [
    { name: "Vashon High School", mascot: "Wolverines", city: "St. Louis, MO", color: "blue", logo: "🐺", athletes: 124, teams: 8, titles: 32 },
    { name: "CBC", mascot: "Cadets", city: "St. Louis, MO", color: "red", logo: "🛡️", athletes: 210, teams: 12, titles: 45 },
    { name: "East St. Louis", mascot: "Flyers", city: "East St. Louis, IL", color: "orange", logo: "✈️", athletes: 188, teams: 10, titles: 39 },
    { name: "Cardinal Ritter", mascot: "Lions", city: "St. Louis, MO", color: "gold", logo: "🦁", athletes: 96, teams: 7, titles: 21 }
  ];

  return `
    <section class="schools-page">
      <div class="section-header">
        <p class="network-kicker">School Network</p>
        <h2>School Pages</h2>
        <p>Every program gets a premium hub for athletes, coaches, rosters, schedules, history, team stores, and rankings.</p>
      </div>

      <div class="schools-search">
        <input placeholder="Search schools...">
        <select>
          <option>All States</option>
          <option>Missouri</option>
          <option>Illinois</option>
        </select>
        <select>
          <option>All Sports</option>
          <option>Football</option>
          <option>Basketball</option>
          <option>Track</option>
        </select>
      </div>

      <div class="schools-grid">
        ${schools.map(schoolCard).join("")}
      </div>
    </section>
  `;
}