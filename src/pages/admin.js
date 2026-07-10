export function renderAdminPage() {
  return `
    <section class="admin-dashboard-v2">

      <div class="admin-dashboard-header">

        <div>
          <p class="network-kicker">Admin Center</p>
          <h2>Snt.L.Mo. Platform Control Center</h2>
          <p>
            Manage athletes, videos, draft boards, media uploads,
            analytics, and platform settings from one clean dashboard.
          </p>
        </div>

        <div class="admin-dashboard-status">
          <span>ADMIN MODE</span>
          <strong>ACTIVE</strong>
        </div>

      </div>

      <div class="admin-tabs">

        <button class="active" onclick="window.switchAdminTab('athletes')">
          👤 Athletes
        </button>

        <button onclick="window.switchAdminTab('videos')">
          🎥 Videos
        </button>

        <button onclick="window.switchAdminTab('draft')">
          🧢 Draft Room
        </button>

        <button onclick="window.switchAdminTab('media')">
          📁 Media
        </button>

        <button onclick="window.switchAdminTab('analytics')">
          📊 Analytics
        </button>

        <button onclick="window.switchAdminTab('settings')">
          ⚙️ Settings
        </button>

      </div>

      <!-- ==========================================
           ATHLETES
      ========================================== -->

      <div
        class="admin-tab-panel active"
        id="admin-tab-athletes">

        <div class="admin-panel-card">

          <h3>👤 Athlete Command Center</h3>

          <p>
            Create athlete profiles, manage recruiting information,
            rankings, schools, and Zeus athlete intelligence.
          </p>

          <div class="admin-athlete-form-section">

  <form id="athlete-form" class="space-y-3">

    <input
      type="text"
      id="athlete-name"
      placeholder="Titan Athlete Name"
      class="w-full bg-zeus-black border border-zeus-border rounded p-3 text-sm text-white"
      required>

    <select
      id="athlete-sport"
      class="w-full bg-zeus-black border border-zeus-border rounded p-3 text-sm text-white">

      <option value="Basketball">Basketball</option>
      <option value="Football">Football</option>
      <option value="Track">Track / Speed</option>
      <option value="Hockey">Hockey</option>
      <option value="Baseball">Baseball</option>

    </select>

    <input
      type="text"
      id="athlete-highlight"
      placeholder="Fallback Main Highlight URL (Optional)"
      class="w-full bg-zeus-black border border-zeus-border rounded p-3 text-sm text-white">

    <input
      type="text"
      id="athlete-photo"
      placeholder="Photo URL (Optional)"
      class="w-full bg-zeus-black border border-zeus-border rounded p-3 text-sm text-white">

    <input
      type="text"
      id="athlete-position"
      placeholder="Position / Role (WR, QB, PG, etc.)"
      class="w-full bg-zeus-black border border-zeus-border rounded p-3 text-sm text-white">

    <input
      type="text"
      id="athlete-school"
      placeholder="School Name"
      class="w-full bg-zeus-black border border-zeus-border rounded p-3 text-sm text-white">

    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">

      <input
        type="text"
        id="athlete-city"
        placeholder="City"
        class="bg-zeus-black border border-zeus-border rounded p-3 text-sm text-white">

      <input
        type="text"
        id="athlete-state"
        placeholder="State"
        class="bg-zeus-black border border-zeus-border rounded p-3 text-sm text-white">

    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">

      <input
        type="text"
        id="athlete-height"
        placeholder="Height"
        class="bg-zeus-black border border-zeus-border rounded p-3 text-sm text-white">

      <input
        type="text"
        id="athlete-weight"
        placeholder="Weight"
        class="bg-zeus-black border border-zeus-border rounded p-3 text-sm text-white">

      <input
        type="text"
        id="athlete-class-year"
        placeholder="Class Year"
        class="bg-zeus-black border border-zeus-border rounded p-3 text-sm text-white">

    </div>

    <textarea
      id="athlete-bio"
      placeholder="Athlete Bio / Scouting Notes"
      class="w-full bg-zeus-black border border-zeus-border rounded p-3 text-sm text-white min-h-[110px]"></textarea>

    <input
      type="text"
      id="athlete-offers"
      placeholder="Offers (comma separated: Memphis, Mizzou, Illinois)"
      class="w-full bg-zeus-black border border-zeus-border rounded p-3 text-sm text-white">

    <input
      type="text"
      id="athlete-achievements"
      placeholder="Achievements (comma separated)"
      class="w-full bg-zeus-black border border-zeus-border rounded p-3 text-sm text-white">

    <div class="grid grid-cols-2 md:grid-cols-5 gap-2">

      <input type="number" id="score-0" placeholder="Attr 1" min="0" max="100"
        class="bg-zeus-black border border-zeus-border rounded p-2 text-center text-sm text-white">

      <input type="number" id="score-1" placeholder="Attr 2" min="0" max="100"
        class="bg-zeus-black border border-zeus-border rounded p-2 text-center text-sm text-white">

      <input type="number" id="score-2" placeholder="Attr 3" min="0" max="100"
        class="bg-zeus-black border border-zeus-border rounded p-2 text-center text-sm text-white">

      <input type="number" id="score-3" placeholder="Attr 4" min="0" max="100"
        class="bg-zeus-black border border-zeus-border rounded p-2 text-center text-sm text-white">

      <input type="number" id="score-4" placeholder="Attr 5" min="0" max="100"
        class="bg-zeus-black border border-zeus-border rounded p-2 text-center text-sm text-white">

    </div>

    <button
      type="submit"
      class="w-full bg-zeus-gold text-black font-black py-3 rounded uppercase tracking-wider">

      Commit Titan to Grid

    </button>

  </form>

</div>

          <hr class="notes-divider">

          <div class="border border-zeus-border bg-zeus-panel p-4 rounded-xl space-y-4">

  <h3 class="text-xs font-black tracking-wider text-gray-400 uppercase font-mono">
    Grid Filters
  </h3>

  <div>

    <label class="block text-[10px] font-mono text-gray-600 uppercase tracking-wider mb-1">
      Select Tier
    </label>

    <select
      id="tier-select"
      class="w-full bg-zeus-black border border-zeus-border rounded p-2 text-xs text-white focus:outline-none focus:border-zeus-gold">

      <option value="all">All Tiers</option>
      <option value="highschool">St. Louis High Schools</option>
      <option value="college">Colleges (Local & National)</option>
      <option value="pro-teams">St. Louis Home Pro Teams</option>
      <option value="pro-players">Locals in the Pros (Domestic & Global)</option>

    </select>

  </div>

  <div>

    <label class="block text-[10px] font-mono text-gray-600 uppercase tracking-wider mb-1">
      Refine View
    </label>

    <select
      id="sub-tier-select"
      class="w-full bg-zeus-black border border-zeus-border rounded p-2 text-xs text-white focus:outline-none focus:border-zeus-gold">

      <option value="all">All Sub-Categories</option>

    </select>

  </div>

</div>

          <div class="admin-grid-filter-section">

  <h4 class="text-zeus-gold font-black uppercase tracking-wider mb-3">

    Grid Filters

  </h4>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

    <div>

      <label class="text-xs text-gray-400 uppercase">

        Select Tier

      </label>

      <select
        id="tier-filter"
        class="w-full mt-2 bg-zeus-black border border-zeus-border rounded p-3 text-white">

        <option value="all">

          All Tiers

        </option>

      </select>

    </div>

    <div>

      <label class="text-xs text-gray-400 uppercase">

        Refine View

      </label>

      <select
        id="subcategory-filter"
        class="w-full mt-2 bg-zeus-black border border-zeus-border rounded p-3 text-white">

        <option value="all">

          All Sub-Categories

        </option>

      </select>

    </div>

  </div>

</div>

          <hr class="notes-divider">

          <div class="border border-zeus-gold/20 bg-zeus-goldSoft p-4 rounded-xl flex items-center justify-between shadow-zeus-soft">

  <div>

    <span class="text-[10px] font-mono text-zeus-gold uppercase tracking-widest block">
      Current Apex Predator
    </span>

    <span
      id="apex-predator-name"
      class="text-xl font-black text-white uppercase tracking-tight">

      Loading Grid Apex...

    </span>

  </div>

  <div class="text-right">

    <span class="text-[10px] font-mono text-gray-500 uppercase block">
      Apex Rating
    </span>

    <span
      id="apex-predator-score"
      class="text-xl font-mono font-black text-zeus-gold">

      ---

    </span>

  </div>

</div>

          <hr class="notes-divider">

          <div id="admin-matrix-root"></div>

        </div>

      </div>

      <!-- ==========================================
           VIDEOS
      ========================================== -->

      <div
        class="admin-tab-panel"
        id="admin-tab-videos">

        <div class="admin-panel-card">

          <h3>🎥 Video Management</h3>

          <p>
            Upload highlight film, organize playlists,
            and connect videos to athlete profiles.
          </p>

          <div id="admin-playlist-root"></div>

          <hr class="notes-divider">

          <div id="admin-highlight-theater-root"></div>

        </div>

      </div>

      <!-- ==========================================
           DRAFT ROOM
      ========================================== -->

      <div
        class="admin-tab-panel"
        id="admin-tab-draft">

        <div class="admin-panel-card">

          <h3>🧢 Draft Room</h3>

          <p>
            Build showcase rosters, compare teams,
            and manage the live War Room board.
          </p>

          <div id="admin-draft-root"></div>

          <hr class="notes-divider">

          <div id="admin-chat-root"></div>

        </div>

      </div>

      <!-- ==========================================
           MEDIA
      ========================================== -->

      <div
        class="admin-tab-panel"
        id="admin-tab-media">

        <div class="admin-panel-card">

          <h3>📁 Media Locker</h3>

          <p>
            Upload videos, manage media files,
            and attach highlights to athlete profiles.
          </p>

          <div id="admin-media-root"></div>

        </div>

      </div>

      <!-- ==========================================
           ANALYTICS
      ========================================== -->

      <div
        class="admin-tab-panel"
        id="admin-tab-analytics">

        <div class="admin-panel-card">

          <h3>📊 Platform Analytics</h3>

          <p>
            Track athletes, videos, recruiters,
            Zeus reports, watchlists, and platform growth.
          </p>

          <div class="admin-analytics-grid">

            <div>
              <span>Athletes</span>
              <strong id="admin-athlete-count">0</strong>
            </div>

            <div>
              <span>Videos</span>
              <strong id="admin-video-count">0</strong>
            </div>

            <div>
              <span>Recruiters</span>
              <strong>25K+</strong>
            </div>

            <div>
              <span>Zeus Reports</span>
              <strong>18K+</strong>
            </div>

          </div>

        </div>

      </div>

      <!-- ==========================================
           SETTINGS
      ========================================== -->

      <div
        class="admin-tab-panel"
        id="admin-tab-settings">

        <div class="admin-panel-card">

          <h3>⚙️ Platform Settings</h3>

          <p>
            Manage cleanup tools, visibility,
            platform controls, and future role access.
          </p>

          <button
            id="admin-purge-btn"
            class="zeus-action-btn">
            ⚠️ Clear Duplicates
          </button>

          <button
            class="zeus-action-btn"
            onclick="window.comingSoon('Admin Settings')">
            Open Settings
          </button>

        </div>

      </div>

    </section>
  `;
}