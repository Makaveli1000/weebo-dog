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

          <div id="admin-athlete-form-root"></div>

          <hr class="notes-divider">

          <div id="admin-grid-filter-root"></div>

          <hr class="notes-divider">

          <div id="admin-apex-root"></div>

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