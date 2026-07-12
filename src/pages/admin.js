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

      <option value="Football">Football</option>
      <option value="Basketball">Basketball</option>
      <option value="Baseball">Baseball</option>
      <option value="Softball">Softball</option>
      <option value="Soccer">Soccer</option>
      <option value="Volleyball">Volleyball</option>
      <option value="Track">Track & Field</option>
      <option value="Cross Country">Cross Country</option>
      <option value="Wrestling">Wrestling</option>
      <option value="Boxing">Boxing</option>
      <option value="Swimming">Swimming</option>
      <option value="Hockey">Hockey</option>

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
         
          <hr class="notes-divider">

          <div class="border border-zeus-gold/20 bg-zeus-goldSoft p-4 rounded-xl flex items-center justify-between shadow-zeus-soft">

  <div>

    <span class="text-[10px] font-mono text-zeus-gold uppercase tracking-widest block">
      Current Apex Athlete
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

          <div class="border border-zeus-border bg-zeus-black rounded-xl overflow-hidden">

  <div class="p-4 border-b border-zeus-border bg-zeus-panel/50 flex flex-wrap gap-3 justify-between items-center">

    <span class="text-xs font-black text-white uppercase tracking-wider font-mono">
      Zeus National Athlete Evaluation Matrix
    </span>

    <span
      id="grid-count-badge"
      class="text-[10px] font-mono bg-zeus-panel text-gray-400 px-2 py-0.5 rounded uppercase border border-zeus-border">

      0 Active Athletes

    </span>

  </div>

  <div class="overflow-x-auto">

    <table class="w-full text-left border-collapse border-spacing-0">

      <thead>

        <tr class="bg-zeus-panel text-gray-500 text-[10px] uppercase font-mono tracking-wider border-b border-zeus-border">

          <th class="p-3 font-medium">
            Athlete Name
          </th>

          <th class="p-3 text-center font-medium">
            Primary Attribute
          </th>

          <th class="p-3 text-center font-medium">
            Performance Tier
          </th>

          <th class="p-3 text-center font-medium">
            Total Composite
          </th>

          <th class="p-3 text-center font-medium">
            Discipline
          </th>

          <th class="p-3 text-right font-medium">
            Roster Actions
          </th>

        </tr>

      </thead>

      <tbody
        id="match-grid-body"
        class="text-sm font-mono divide-y divide-zeus-border">

        <!-- Filled by Firebase -->

      </tbody>

        </table>

  </div>

</div>

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

          <div class="admin-video-entry">

  <div class="admin-tool-card">

    <h4 class="text-zeus-gold font-black uppercase tracking-wider">
      Playlist Entry
    </h4>

    <p class="text-gray-400 text-sm mt-2 mb-4">
      Select an athlete from the evaluation matrix, then add a YouTube
      or storage video URL to that athlete’s playlist.
    </p>

    <label
      for="new-vid-title"
      class="block text-xs text-gray-500 uppercase tracking-wider mb-1">
      Video Title
    </label>

    <input
      type="text"
      id="new-vid-title"
      placeholder="Example: Senior Season Highlights"
      class="w-full bg-zeus-black border border-zeus-border rounded p-3 text-sm text-white mb-3">

    <label
      for="new-vid-url"
      class="block text-xs text-gray-500 uppercase tracking-wider mb-1">
      YouTube or Storage URL
    </label>

    <input
      type="text"
      id="new-vid-url"
      placeholder="https://youtube.com/... or Firebase storage URL"
      class="w-full bg-zeus-black border border-zeus-border rounded p-3 text-sm text-white mb-4">

    <button
      type="button"
      onclick="window.handleAdminAddVideo()"
      class="w-full bg-zeus-gold text-black font-black py-3 rounded uppercase tracking-wider">

      Add Video to Athlete

    </button>

  </div>

</div>

          <hr class="notes-divider">

          <div
  id="highlight-theater"
  class="border border-zeus-border bg-zeus-panel p-4 rounded-xl space-y-3">

  <div class="flex flex-wrap gap-3 justify-between items-center">

    <div>

      <h4 class="text-xs font-black tracking-wider text-zeus-gold uppercase font-mono">
        Featured Highlight Preview
      </h4>

      <p class="text-xs text-gray-500 mt-1">
        Select an athlete from the evaluation matrix to preview their film.
      </p>

    </div>

    <span
      id="now-playing-title"
      class="text-[10px] font-mono text-gray-500 uppercase truncate max-w-[300px]">

      Select an athlete to play

    </span>

  </div>

  <div class="aspect-video w-full rounded-lg overflow-hidden bg-black/60 border border-zeus-border flex items-center justify-center relative p-2">

    <div
      id="video-placeholder"
      class="text-center p-6 space-y-2 absolute inset-0 flex flex-col items-center justify-center bg-zeus-black/90 z-10 transition-opacity duration-300">

      <span class="text-4xl">
        🎥
      </span>

      <strong class="block text-sm text-white uppercase tracking-wider">
        No Highlight Selected
      </strong>

      <span class="block text-xs text-gray-500">
        Choose an athlete from the Athletes tab.
      </span>

    </div>

    <div
      id="theater-media-viewport"
      class="w-full h-full flex items-center justify-center">
    </div>

  </div>

</div>

        </div>

      </div>

      <!-- ==========================================
     DRAFT ROOM
========================================== -->

<div
  class="admin-tab-panel"
  id="admin-tab-draft">

  <div class="admin-panel-card">

    <h3>🧢 National Draft Room</h3>

    <p>
      Build local, regional, and national showcase rosters
      from the Zeus National Athlete Evaluation Matrix.
    </p>

    <div
      id="roster-builder-vault"
      class="border border-zeus-border bg-zeus-panel p-4 rounded-xl space-y-5">

      <div class="flex flex-wrap gap-4 justify-between items-center border-b border-zeus-border/60 pb-4">

        <div>

          <h4 class="text-sm font-black tracking-wider text-zeus-gold uppercase font-mono">
            Live National Draft Board
          </h4>

          <p class="text-xs text-gray-500 mt-1">
            Use Draft A, Draft B, or National from the athlete matrix.
          </p>

        </div>

        <button
          id="reset-draft-btn"
          type="button"
          class="bg-red-950/40 hover:bg-zeus-red border border-red-900/60 hover:border-red-500 text-red-400 hover:text-white font-mono text-xs font-bold uppercase px-4 py-2 rounded transition">

          Reset All Rosters

        </button>

      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">

        <!-- TEAM ST. LOUIS ELITE -->

        <div class="bg-zeus-black/50 border border-zeus-border rounded-xl p-4 space-y-3">

          <div class="flex justify-between items-center border-b border-zeus-border/40 pb-3">

            <div>
              <span class="block text-sm font-black text-white uppercase tracking-tight">
                ⚜️ Team St. Louis Elite
              </span>

              <small class="text-gray-500">
                Local Elite Roster
              </small>
            </div>

            <span
              id="squad-a-rating"
              class="text-xs font-bold bg-zeus-goldSoft text-zeus-gold px-2 py-1 rounded border border-zeus-gold/20">

              AVG: 0

            </span>

          </div>

          <div
            id="squad-a-slots"
            class="space-y-2 min-h-[200px] flex flex-col justify-start">

            <div class="text-sm text-gray-600 font-mono italic text-center my-auto py-8">
              Roster vacant. Select Draft A from the athlete matrix.
            </div>

          </div>

        </div>

        <!-- REGIONAL CHALLENGERS -->

        <div class="bg-zeus-black/50 border border-zeus-border rounded-xl p-4 space-y-3">

          <div class="flex justify-between items-center border-b border-zeus-border/40 pb-3">

            <div>
              <span class="block text-sm font-black text-white uppercase tracking-tight">
                🚀 Regional Challengers
              </span>

              <small class="text-gray-500">
                Regional Showcase Roster
              </small>
            </div>

            <span
              id="squad-b-rating"
              class="text-xs font-bold bg-gray-900 text-gray-400 px-2 py-1 rounded border border-zeus-border">

              AVG: 0

            </span>

          </div>

          <div
            id="squad-b-slots"
            class="space-y-2 min-h-[200px] flex flex-col justify-start">

            <div class="text-sm text-gray-600 font-mono italic text-center my-auto py-8">
              Roster vacant. Select Draft B from the athlete matrix.
            </div>

          </div>

        </div>

        <!-- NATIONAL SELECT -->

        <div class="bg-zeus-black/50 border border-zeus-gold/30 rounded-xl p-4 space-y-3 shadow-zeus-soft">

          <div class="flex justify-between items-center border-b border-zeus-gold/20 pb-3">

            <div>
              <span class="block text-sm font-black text-zeus-gold uppercase tracking-tight">
                🇺🇸 National Select
              </span>

              <small class="text-gray-500">
                National Prospect Roster
              </small>
            </div>

            <span
              id="squad-c-rating"
              class="text-xs font-bold bg-zeus-goldSoft text-zeus-gold px-2 py-1 rounded border border-zeus-gold/20">

              AVG: 0

            </span>

          </div>

          <div
            id="squad-c-slots"
            class="space-y-2 min-h-[200px] flex flex-col justify-start">

            <div class="text-sm text-gray-600 font-mono italic text-center my-auto py-8">
              Roster vacant. Select National from the athlete matrix.
            </div>

          </div>

        </div>

      </div>

    </div>

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
     ZEUS NATIONAL ANALYTICS CENTER
========================================== -->

<div
  class="admin-tab-panel"
  id="admin-tab-analytics">

  <div class="admin-panel-card">

    <div class="admin-analytics-header">

      <div>

        <p class="network-kicker">
          Zeus Intelligence Network
        </p>

        <h3>
          📊 Zeus National Analytics Center
        </h3>

        <p>
          Live platform intelligence covering athletes, schools,
          states, highlights, recruiting activity, and national growth.
        </p>

      </div>

      <div class="admin-analytics-status">

        <span>LIVE DATA</span>

        <strong>
          ● CONNECTED
        </strong>

      </div>

    </div>

    <!-- ==========================================
         PRIMARY ANALYTICS CARDS
    ========================================== -->

    <div class="admin-analytics-grid admin-analytics-grid-large">

      <div class="admin-analytics-card">

        <span class="admin-analytics-icon">
          👥
        </span>

        <div>
          <small>Total Athletes</small>

          <strong id="admin-athlete-count">
            0
          </strong>
        </div>

      </div>

      <div class="admin-analytics-card">

        <span class="admin-analytics-icon">
          🏫
        </span>

        <div>
          <small>Schools</small>

          <strong id="admin-school-count">
            0
          </strong>
        </div>

      </div>

      <div class="admin-analytics-card">

        <span class="admin-analytics-icon">
          🗺️
        </span>

        <div>
          <small>States Represented</small>

          <strong id="admin-state-count">
            0
          </strong>
        </div>

      </div>

      <div class="admin-analytics-card">

        <span class="admin-analytics-icon">
          🎥
        </span>

        <div>
          <small>Videos Uploaded</small>

          <strong id="admin-video-count">
            0
          </strong>
        </div>

      </div>

      <div class="admin-analytics-card">

        <span class="admin-analytics-icon">
          ❤️
        </span>

        <div>
          <small>Total Likes</small>

          <strong id="admin-like-count">
            0
          </strong>
        </div>

      </div>

      <div class="admin-analytics-card">

        <span class="admin-analytics-icon">
          👀
        </span>

        <div>
          <small>Total Views</small>

          <strong id="admin-view-count">
            0
          </strong>
        </div>

      </div>

      <div class="admin-analytics-card">

        <span class="admin-analytics-icon">
          🎓
        </span>

        <div>
          <small>Recruiters Watching</small>

          <strong id="admin-recruiter-count">
            0
          </strong>
        </div>

      </div>

      <div class="admin-analytics-card">

        <span class="admin-analytics-icon">
          📄
        </span>

        <div>
          <small>Zeus AI Reports</small>

          <strong id="admin-report-count">
            0
          </strong>
        </div>

      </div>

    </div>

    <hr class="notes-divider">

    <!-- ==========================================
         PLATFORM LEADERS
    ========================================== -->

    <div class="admin-insight-grid">

      <div class="admin-insight-card">

        <span class="admin-insight-icon">
          📈
        </span>

        <small>
          Fastest Growing Sport
        </small>

        <strong id="admin-fastest-sport">
          Loading...
        </strong>

        <p id="admin-fastest-sport-detail">
          Analyzing athlete growth.
        </p>

      </div>

      <div class="admin-insight-card">

        <span class="admin-insight-icon">
          🔥
        </span>

        <small>
          Trending Athlete
        </small>

        <strong id="admin-trending-athlete">
          Loading...
        </strong>

        <p id="admin-trending-athlete-detail">
          Analyzing ratings, film, and engagement.
        </p>

      </div>

      <div class="admin-insight-card">

        <span class="admin-insight-icon">
          🏆
        </span>

        <small>
          Top School
        </small>

        <strong id="admin-top-school">
          Loading...
        </strong>

        <p id="admin-top-school-detail">
          Calculating athlete representation.
        </p>

      </div>

    </div>

    <hr class="notes-divider">

    <!-- ==========================================
         NATIONAL ATHLETE MAP
    ========================================== -->

    <div class="admin-national-map-card">

      <div class="admin-national-map-header">

        <div>

          <p class="network-kicker">
            National Athlete Distribution
          </p>

          <h3>
            🌎 United States Athlete Map
          </h3>

          <p>
            Track athlete representation across every state
            connected to the Snt.L.Mo. Sports Network.
          </p>

        </div>

        <div class="admin-map-total">

          <span>
            States Active
          </span>

          <strong id="admin-map-state-count">
            0
          </strong>

        </div>

      </div>

      <div
        id="admin-us-map"
        class="admin-us-map">

        <div class="admin-map-placeholder">

          <span>
            🇺🇸
          </span>

          <strong>
            National Athlete Map
          </strong>

          <p>
            Athlete locations will appear here as state data loads.
          </p>

        </div>

      </div>

      <div
        id="admin-state-breakdown"
        class="admin-state-breakdown">

        <div class="admin-empty-analytics">

          No state data available yet.

        </div>

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