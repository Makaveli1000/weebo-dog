function schoolCard(name, mascot, city, color, logo = "🏫") {
  return `
    <article class="school-card">

      <div class="school-banner ${color}">

        <div class="school-logo">
          ${logo}
        </div>

      </div>

      <div class="school-body">

        <h3>${name}</h3>

        <p>${mascot}</p>

        <small>${city}</small>

        <div class="school-stats">

          <div>
            <strong>18</strong>
            <span>Sports</span>
          </div>

          <div>
            <strong>642</strong>
            <span>Athletes</span>
          </div>

          <div>
            <strong>27</strong>
            <span>College Commits</span>
          </div>

        </div>

        <button class="athlete-card-btn">
          Visit School
        </button>

      </div>

    </article>
  `;
}

export function renderSchoolsPage() {

return `

<section class="schools-page">

<div class="section-header">

<p class="network-kicker">

National School Directory

</p>

<h2>

Discover Athletic Programs

</h2>

<p>

Every school has its own digital athletic campus.

</p>

</div>

<div class="schools-search">

<input
placeholder="Search school..."
id="school-search"
/>

<select>

<option>All States</option>

<option>Missouri</option>

<option>Illinois</option>

<option>Texas</option>

<option>Florida</option>

<option>Georgia</option>

<option>California</option>

</select>

<select>

<option>All Sports</option>

<option>Football</option>

<option>Basketball</option>

<option>Baseball</option>

<option>Track</option>

</select>

</div>

<div class="schools-grid">

${schoolCard("Vashon High School","Wolverines","St. Louis, MO","blue","🐺")}

${schoolCard("CBC","Cadets","St. Louis, MO","red","🛡")}

${schoolCard("Chaminade","Red Devils","St. Louis, MO","green","😈")}

${schoolCard("Cardinal Ritter","Lions","St. Louis, MO","gold","🦁")}

${schoolCard("East St. Louis","Flyers","Illinois","purple","🛫")}

${schoolCard("Lutheran North","Crusaders","St. Louis","navy","⚔️")}

</div>

</section>

`;

}