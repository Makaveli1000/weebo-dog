export function renderAccountSetupPage() {
  return `
    <section class="account-setup-page network-section">

      <div class="section-header">
        <p class="network-kicker">Create Account</p>
        <h2>Choose Your Role</h2>
        <p>Select how you want to join Snt.L.Mo. Sports Network.</p>
      </div>

      <div class="account-type-grid">

        ${accountType("athlete", "👤", "Athlete", "Create profile, upload film, track recruiting.")}
        ${accountType("school", "🏫", "School", "Build school page, teams, rosters, schedules.")}
        ${accountType("recruiter", "🎓", "Recruiter / College Coach", "Search athletes, save prospects, request contact.")}
        ${accountType("coach", "🧑‍🏫", "Coach", "Manage teams, athletes, film, and reports.")}
        ${accountType("parent", "👨‍👩‍👧", "Parent", "Support athlete profiles and recruiting.")}
        ${accountType("media", "📸", "Media", "Post coverage, highlights, interviews, rankings.")}
        ${accountType("business", "💼", "Business / Sponsor", "Create NIL deals, sponsor athletes, sell offers.")}
        ${accountType("fan", "🙋", "Fan", "Follow athletes, schools, games, and highlights.")}

      </div>

      <form id="account-setup-form" class="account-setup-form" onsubmit="handleAccountSetup(event)">
        <input id="setup-name" placeholder="Full name / Organization name" required>
        <input id="setup-email" placeholder="Email" type="email" required>
        <input id="setup-password" placeholder="Password" type="password" required>

        <input type="hidden" id="setup-role" value="athlete">

        <button type="submit" class="athlete-card-btn">Create Account</button>
      </form>

    </section>
  `;
}

function accountType(role, icon, title, text) {
  return `
    <button class="account-type-card" data-role="${role}" onclick="selectAccountRole('${role}', this)">
      <span>${icon}</span>
      <h3>${title}</h3>
      <p>${text}</p>
    </button>
  `;
}