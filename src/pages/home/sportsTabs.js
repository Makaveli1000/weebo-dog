const sports = [
  ["🏈", "Football"],
  ["🏳️", "Girls Flag Football"],
  ["🏀", "Basketball"],
  ["⚾", "Baseball"],
  ["🥎", "Softball"],
  ["⚽", "Soccer"],
  ["🏐", "Volleyball"],
  ["🏃", "Track & Field"],
  ["🤼", "Wrestling"],
  ["🥊", "Boxing"],
  ["🏒", "Hockey"],
  ["🏊", "Swimming"],
  ["⛳", "Golf"],
  ["🥍", "Lacrosse"],
  ["📣", "Cheer"],
  ["💃", "Dance"]
];

export function renderSportsTabs() {
  return `
    <div
      id="home-sports-tabs"
      class="sports-tab-bar">

      ${sports.map(([icon, name]) => `
        <button
          type="button"
          data-sport="${name}">

          ${icon} ${name}

        </button>
      `).join("")}

      <button
        type="button"
        class="active"
        data-sport="All Sports">

        ▦ All Sports

      </button>

    </div>
  `;
}