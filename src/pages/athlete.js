export function renderAthletePage(athlete = {}) {
  return `
    <div class="section-header">
      <p class="network-kicker">Athlete Profile</p>
      <h3>${athlete.name || "Athlete Profile"}</h3>
      <p>${athlete.sport || "Sport"} • ${athlete.school || "School Unlisted"}</p>
    </div>
  `;
}