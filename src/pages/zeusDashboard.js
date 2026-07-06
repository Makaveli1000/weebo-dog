function safeScore(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function getScores(athlete = {}) {
  return Array.isArray(athlete.scores)
    ? athlete.scores.map(safeScore)
    : [
        safeScore(athlete.score0),
        safeScore(athlete.score1),
        safeScore(athlete.score2),
        safeScore(athlete.score3),
        safeScore(athlete.score4)
      ];
}

function hasVerifiedFilm(athlete = {}) {
  return Boolean(
    athlete.highlightUrl ||
    athlete.highlight ||
    (Array.isArray(athlete.videos) && athlete.videos.length)
  );
}

function getOfferCount(athlete = {}) {
  return Array.isArray(athlete.offers) ? athlete.offers.length : 0;
}

function getProfileCompleteness(athlete = {}) {
  const fields = [
    athlete.name,
    athlete.sport,
    athlete.position,
    athlete.school,
    athlete.height,
    athlete.weight,
    athlete.graduationYear || athlete.classYear,
    athlete.bio
  ];

  const completed = fields.filter(Boolean).length;

  return Math.round((completed / fields.length) * 100);
}

export function renderZeusDashboard(athlete = {}) {
  const scores = getScores(athlete);

  const filmIQ = scores[0] || 0;
  const athleticism = scores[1] || 0;
  const sportIQ = scores[2] || 0;
  const recruitability = scores[3] || 0;
  const nilPotential = scores[4] || 0;

  const average = Math.round(
  (filmIQ + athleticism + sportIQ + recruitability + nilPotential) / 5
);

const filmVerified = hasVerifiedFilm(athlete);
const offerCount = getOfferCount(athlete);
const profileComplete = getProfileCompleteness(athlete);

  const stars =
    average >= 95 ? "★★★★★" :
    average >= 90 ? "★★★★☆" :
    average >= 80 ? "★★★☆☆" :
    average >= 70 ? "★★☆☆☆" :
    "★☆☆☆☆";
  const recruitingLevel =
  average >= 95 ? "Power 4 / National Recruit" :
  average >= 90 ? "FBS / High D1 Interest" :
  average >= 85 ? "FCS / D2 Scholarship Level" :
  average >= 75 ? "D3 / NAIA Development Track" :
  "Needs More Verified Film";

const offerProbability =
  average >= 95 ? "92%" :
  average >= 90 ? "78%" :
  average >= 85 ? "61%" :
  average >= 75 ? "38%" :
  "18%";

const collegeMatches = [
  { school: "Missouri", fit: Math.min(99, average + 2) },
  { school: "Memphis", fit: Math.min(97, average) },
  { school: "Illinois", fit: Math.max(70, average - 3) },
  { school: "Kansas State", fit: Math.max(68, average - 5) },
  { school: "Notre Dame", fit: Math.max(65, average - 8) }
];
  
const recommendations = [];

if (!filmVerified) {
  recommendations.push(
    "Upload verified highlight film to improve recruiting visibility."
  );
}

if (offerCount === 0) {
  recommendations.push(
    "No college offers listed. Continue attending camps and contacting coaches."
  );
}

if (profileComplete < 100) {
  recommendations.push(
    "Complete your athlete profile to increase recruiter confidence."
  );
}

if (average >= 90) {
  recommendations.push(
    "You project as a high-level prospect. Keep adding verified game film."
  );
} else if (average >= 80) {
  recommendations.push(
    "Focus on measurable improvements and consistent varsity production."
  );
} else {
  recommendations.push(
    "Continue developing fundamentals and update your profile each season."
  );
} 

    return `
    
    <section class="zeus-dashboard">

      <div class="zeus-ai-oracle">

  <div class="zeus-ai-avatar-wrap">
    <img src="zeus-avatar.png" alt="Zeus AI" class="zeus-ai-avatar">
    <div class="zeus-ai-pulse"></div>
  </div>

  <div>
    <h2>⚡ ZEUS AI</h2>
    <p>National Recruiting Intelligence</p>
    <small>I have analyzed this athlete.</small>
  </div>

</div>

      <div class="zeus-recruiting-grade-panel">

  <div class="zeus-grade-row">
    <span>Overall Projection</span>
    <strong>${stars}</strong>
  </div>

  <div class="zeus-grade-row">
    <span>D-I Offer Probability</span>
    <strong>${offerProbability}</strong>
  </div>

  <div class="zeus-grade-row">
    <span>Recruiting Tier</span>
    <strong>${recruitingLevel}</strong>
  </div>

  <div class="zeus-grade-row">
    <span>Film Grade</span>
    <strong>${filmIQ >= 90 ? "Elite" : filmIQ >= 80 ? "Strong" : "Developing"}</strong>
  </div>

  <div class="zeus-grade-row">
    <span>Athletic Ceiling</span>
    <strong>${athleticism >= 90 ? "A+" : athleticism >= 80 ? "A" : "B"}</strong>
  </div>

</div>
       
       <div class="zeus-action-center">

  <h3>Recruiter Actions</h3>

  <div class="zeus-action-grid">

    <button
  class="zeus-action-btn"
  onclick="window.openZeusCompare()">
  📊 Compare Athlete
</button>

    <button class="zeus-action-btn"
      onclick="window.print()">
      📄 Print Recruit PDF
    </button>

    <button class="zeus-action-btn"
      onclick="navigator.share ? navigator.share({title: '${athlete.name}', url: location.href}) : navigator.clipboard.writeText(location.href)">
      📤 Share Profile
    </button>

    <button class="zeus-action-btn">
      📧 Contact Coach
    </button>

    <button class="zeus-action-btn">
      🎥 Watch Full Film
    </button>

    <button class="zeus-action-btn">
      📊 Compare Athlete
    </button>

  </div>

</div>

        <h3>Recruiter Actions</h3>


           <div class="zeus-grid">
        <div class="zeus-card">
          <h3>🎥 Film IQ</h3>
          <div>${filmIQ}</div>
        </div>

        <div class="zeus-card">
          <h3>⚡ Athleticism</h3>
          <div>${athleticism}</div>
        </div>

        <div class="zeus-card">
          <h3>🧠 Sport IQ</h3>
          <div>${sportIQ}</div>
        </div>

        <div class="zeus-card">
          <h3>🎓 Recruitability</h3>
          <div>${recruitability}</div>
        </div>

        <div class="zeus-card">
          <h3>💰 NIL Potential</h3>
          <div>${nilPotential}</div>
        </div>

        <div class="zeus-card">
  <h3>🏆 National Projection</h3>
  <div>${stars}</div>
</div>

<div class="zeus-card">
  <h3>🎓 Recruiting Level</h3>
  <div>${recruitingLevel}</div>
</div>

<div class="zeus-card">
  <h3>📈 Offer Probability</h3>
  <div>${offerProbability}</div>
</div>

<div class="zeus-card">
  <h3>🎥 Film Verified</h3>
  <div>${filmVerified ? "YES" : "NO"}</div>
</div>

<div class="zeus-card">
  <h3>🎓 Offers</h3>
  <div>${offerCount}</div>
</div>

<div class="zeus-card">
  <h3>📋 Profile Complete</h3>
  <div>${profileComplete}%</div>
</div>

</div> <!-- closes zeus-grid -->

<div class="zeus-match-engine">
  <h3>🏈 Best College Matches</h3>

  ${collegeMatches.map((match, index) => `
    <div class="college-match-row">
      <span>${index + 1}. ${match.school}</span>
      <strong>${match.fit}% Match</strong>
    </div>
  `).join("")}
</div>

<div class="zeus-recommendations">

  <h3>⚡ Zeus Recommendations</h3>

  ${recommendations.map(item => `
    <div class="college-match-row">
      <span>${item}</span>
    </div>
  `).join("")}

</div>

</section>
  `;
}