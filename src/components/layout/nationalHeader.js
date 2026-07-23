// ======================================================
// NATIONAL HEADER
// Main platform navigation and global search.
// ======================================================

export function createNationalHeader() {
  return `
    <div
      class="national-brand"
      data-header-action="home"
    >
      <img
        src="./zeus-avatar.png"
        alt="Zeus Avatar"
      />

      <div>
        <strong>Snt.L.Mo.</strong>
        <span>Sports Network</span>
      </div>
    </div>

    <div class="national-search-wrapper">
      <div class="national-search">
        <span aria-hidden="true">🔍</span>

        <input
          id="global-search-input"
          type="search"
          placeholder="Search athletes, schools, highlights..."
          autocomplete="off"
        />
      </div>

      <div
        id="global-search-results"
        class="global-search-results hidden"
      ></div>
    </div>

    <nav
      class="national-nav"
      aria-label="Main navigation"
    >
      <button
        type="button"
        data-header-action="back"
      >
        ← Back
      </button>

      <button
        type="button"
        data-platform-route="home"
      >
        Home
      </button>

      <button
        type="button"
        data-platform-route="feed"
      >
        Sports Feed
      </button>

      <button
        type="button"
        data-platform-route="athletes"
      >
        Athletes
      </button>

      <button
        type="button"
        data-platform-route="schools"
      >
        Schools
      </button>

      <button
        type="button"
        data-platform-route="rankings"
      >
        Rankings
      </button>

      <button
        type="button"
        data-platform-route="highlights"
      >
        Highlights
      </button>

      <button
        type="button"
        data-platform-route="recruiting"
      >
        Recruiting
      </button>

      <button
        type="button"
        data-platform-route="gear"
      >
        Gear
      </button>

      <button
        type="button"
        data-platform-route="zeus"
      >
        Zeus AI
      </button>
    </nav>

    <div class="national-actions">
      <button
        type="button"
        data-header-action="notifications"
        aria-label="Notifications"
      >
        🔔
      </button>

      <button
        id="header-auth-btn"
        type="button"
        data-header-action="auth"
      >
        Login
      </button>
    </div>
  `;
}