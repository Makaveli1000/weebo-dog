export function renderZeusDashboard(athlete = {}) {

  return `

<section class="zeus-dashboard">

<div class="zeus-header">

<h2>⚡ ZEUS COMMAND CENTER</h2>

<p>

Artificial Sports Intelligence

</p>

</div>

<div class="zeus-grid">

<div class="zeus-card">

<h3>🎥 Film IQ</h3>

<div id="zeus-film-score">

96

</div>

</div>

<div class="zeus-card">

<h3>⚡ Athleticism</h3>

<div id="zeus-athletic-score">

94

</div>

</div>

<div class="zeus-card">

<h3>🧠 Football IQ</h3>

<div id="zeus-iq-score">

92

</div>

</div>

<div class="zeus-card">

<h3>🎓 Recruitability</h3>

<div id="zeus-recruit-score">

95

</div>

</div>

<div class="zeus-card">

<h3>💰 NIL Potential</h3>

<div id="zeus-nil-score">

88

</div>

</div>

<div class="zeus-card">

<h3>🏆 National Projection</h3>

<div id="zeus-national-score">

★★★★★

</div>

</div>

</div>

</section>

`;

}