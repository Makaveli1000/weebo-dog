function recruitCard(title, value, icon) {
  return `
    <div class="recruit-card">
      <div class="recruit-icon">${icon}</div>
      <div>
        <h3>${title}</h3>
        <strong>${value}</strong>
      </div>
    </div>
  `;
}

export function renderRecruitingPage() {
  return `
<section class="recruiting-page">

<div class="section-header">

<p class="network-kicker">
College Recruiting
</p>

<h2>
Recruiting Command Center
</h2>

<p>
Search, compare, evaluate and recruit athletes nationwide.
</p>

</div>

<div class="recruit-search">

<input
type="text"
placeholder="Search athlete..."
>

<select>
<option>All Sports</option>
<option>Football</option>
<option>Basketball</option>
<option>Baseball</option>
<option>Track</option>
<option>Volleyball</option>
</select>

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
<option>Class</option>
<option>2026</option>
<option>2027</option>
<option>2028</option>
<option>2029</option>
</select>

<button class="athlete-card-btn">
Search
</button>

</div>

<div class="recruit-dashboard">

${recruitCard("Verified Athletes","248,221","👤")}

${recruitCard("College Coaches","4,981","🎓")}

${recruitCard("Open Offers","18,342","📄")}

${recruitCard("Zeus AI Reports","931,118","⚡")}

</div>

<div class="recruit-board">

<div class="feature-card">

<h3>Recruiter Watch List</h3>

<ul>

<li>⭐ Mac Cody</li>

<li>⭐ Jackie Joyner-Kersee</li>

<li>⭐ Jayson Tatum</li>

<li>⭐ Jeremiah Love</li>

<li>⭐ Luther Burden III</li>

</ul>

</div>

<div class="feature-card">

<h3>Newest Commitments</h3>

<ul>

<li>🏈 Missouri</li>

<li>🏀 Duke</li>

<li>⚾ Arkansas</li>

<li>🏃 LSU</li>

<li>🏐 Nebraska</li>

</ul>

</div>

<div class="feature-card">

<h3>Zeus AI Recommendations</h3>

<p>

⚡ 32 athletes match your recruiting profile.

</p>

<button class="athlete-card-btn">

View Prospects

</button>

</div>

</div>

</section>

`;
}