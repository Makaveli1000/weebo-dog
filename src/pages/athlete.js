function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char] || char));
}

export function renderAthletePage(athlete = {}) {

  const scores = Array.isArray(athlete.scores)
    ? athlete.scores
    : [
        athlete.score0,
        athlete.score1,
        athlete.score2,
        athlete.score3,
        athlete.score4
      ];

  const zeusRating = scores.reduce(
    (sum, score) => sum + (Number(score) || 0),
    0
  );

  return `
<div class="athlete-profile">

<div class="profile-hero">

<div class="hero-banner"></div>

<div class="profile-header">

<div class="profile-photo">

<img
src="${escapeHtml(athlete.photo || "images/default-athlete.jpg")}"
alt="${escapeHtml(athlete.name || "Athlete")}"
>

</div>

<div class="profile-info">

<span class="verified-badge">

✔ VERIFIED ATHLETE

</span>

<h1>

${escapeHtml(athlete.name || "Unknown Athlete")}

</h1>

<h3>

${escapeHtml(athlete.position || "")}
•
${escapeHtml(athlete.school || "")}

</h3>

<p>

Class of ${escapeHtml(athlete.classYear || "----")}

</p>

<p>

${escapeHtml(athlete.city || "")},
${escapeHtml(athlete.state || "")}

</p>

<div class="zeus-rating">

⚡ Zeus Rating

<span>${zeusRating}</span>

</div>

<div class="profile-buttons">

<button>Follow</button>

<button>Message</button>

<button>Share</button>

</div>

</div>

</div>

</div>

<div class="profile-tabs">

<button>Overview</button>

<button>Highlights</button>

<button>Stats</button>

<button>Recruiting</button>

<button>Awards</button>

<button>Zeus AI</button>

</div>

<div class="profile-grid">

<div class="profile-card">

<h2>

⚡ Zeus AI Report

</h2>

<p>

Elite athletic upside with excellent competitiveness,
strong work ethic,
and high recruiting potential.

</p>

</div>

<div class="profile-card">

<h2>

📏 Measurements

</h2>

<ul>

<li>Height: ${escapeHtml(athlete.height || "--")}</li>

<li>Weight: ${escapeHtml(athlete.weight || "--")}</li>

<li>40 Time: ${escapeHtml(athlete.forty || "--")}</li>

<li>Vertical: ${escapeHtml(athlete.vertical || "--")}</li>

<li>Position: ${escapeHtml(athlete.position || "--")}</li>

</ul>

</div>

<div class="profile-card">

<h2>

🎓 Recruiting

</h2>

<ul>

<li>GPA: ${escapeHtml(athlete.gpa || "--")}</li>

<li>Offers: ${escapeHtml(athlete.offers || "None")}</li>

<li>Status: ${escapeHtml(athlete.commitment || "Open")}</li>

</ul>

</div>

<div class="profile-card">

<h2>

🏆 Awards

</h2>

<p>

${escapeHtml(athlete.awards || "No awards yet.")}

</p>

</div>

</div>

</div>

`;
}