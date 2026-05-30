<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SntLMo Exclusive Sports Grid</title>

  <script src="./env-config.js"></script>
  <link href="./output.css" rel="stylesheet" />
  <!-- FontAwesome for Filter & Radar Icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

  <style>
    .hidden { display: none !important; }

    #loading-overlay {
      transition: opacity 0.5s ease;
    }

    .zeus-border {
      border: 1px solid #eab308;
      box-shadow: 0 0 15px rgba(234, 179, 8, 0.2);
    }

    .grid-input {
      background: #111;
      border: 1px solid #333;
      padding: 8px 10px;
      border-radius: 4px;
      color: white;
      width: 100%;
    }

    .grid-input:focus {
      border-color: #eab308;
      outline: none;
    }

    @keyframes ascend-pulse {
      0% { transform: scale(1); box-shadow: 0 0 0 rgba(234, 179, 8, 0.7); }
      50% { transform: scale(1.02); box-shadow: 0 0 20px rgba(234, 179, 8, 0.9); }
      100% { transform: scale(1); box-shadow: 0 0 0 rgba(234, 179, 8, 0.7); }
    }

    .ascend-pulse {
      animation: ascend-pulse 1.5s ease-in-out infinite;
    }

    .video-container {
      position: relative;
      width: 100%;
      padding-top: 56.25%;
      background-color: #000;
    }

    .video-container video {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .panel-card {
      background: rgba(17, 24, 39, 0.75);
      border: 1px solid rgba(75, 85, 99, 0.5);
      border-radius: 1rem;
    }

    .glass-bar {
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(10px);
    }

    #intro-screen {
      opacity: 0;
      pointer-events: none;
      transform: scale(1.02);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }

    #intro-screen.active {
      opacity: 1;
      pointer-events: auto;
      transform: scale(1);
    }

    #intro-screen.exit {
      opacity: 0;
      pointer-events: none;
      transform: scale(1.03);
    }

    .intro-card {
      background: radial-gradient(circle at top, rgba(234, 179, 8, 0.12), rgba(0, 0, 0, 0.92) 55%);
      border: 1px solid rgba(234, 179, 8, 0.35);
      box-shadow: 0 0 45px rgba(234, 179, 8, 0.16);
      backdrop-filter: blur(14px);
    }

    .intro-glow {
      text-shadow: 0 0 18px rgba(234, 179, 8, 0.45);
    }

    .intro-fade-up {
      animation: introFadeUp 0.9s ease both;
    }

    @keyframes introFadeUp {
      from {
        opacity: 0;
        transform: translateY(18px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .intro-subtle {
      letter-spacing: 0.28em;
    }
    
    .animate-spin-slow {
      animation: spin 6s linear infinite;
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  </style>
</head>
<body class="bg-black text-white overflow-x-hidden">

  <!-- Loading Overlay -->
  <div id="loading-overlay" class="fixed inset-0 z-[100] flex items-center justify-center bg-black">
    <div class="text-center">
      <div data-loading-text class="text-yellow-500 text-2xl animate-pulse font-bold italic intro-glow">
        ⚡ SUMMONING ZEUS...
      </div>
      <p class="mt-2 text-xs uppercase tracking-[0.3em] text-gray-500">
        Preparing The Grid
      </p>
    </div>
  </div>

  <!-- Zeus Intro Screen -->
  <div id="intro-screen" class="hidden fixed inset-0 z-[95] flex items-center justify-center bg-black/95 px-6">
    <div class="intro-card intro-fade-up max-w-3xl w-full rounded-[28px] p-8 md:p-12 text-center">
      <p class="text-[11px] uppercase font-black text-yellow-500 intro-subtle mb-4">
        St. Louis • Every Level • One Grid
      </p>

      <h2 class="text-4xl md:text-6xl font-black uppercase italic tracking-tight text-white intro-glow">
        Enter The Grid
      </h2>

      <p id="zeus-intro-copy" class="mt-5 max-w-2xl mx-auto text-sm md:text-lg text-gray-300 leading-relaxed">
        Zeus is waiting to introduce the city, the athletes, and the rise of the next titan.
        Click below to enter the site.
      </p>

      <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          id="enter-site-btn"
          type="button"
          class="bg-yellow-500 text-black px-10 py-4 rounded-full font-black text-lg uppercase tracking-widest hover:scale-105 hover:bg-yellow-400 transition-all"
        >
          Enter Site
        </button>

        <button
          id="skip-intro-btn"
          type="button"
          class="border border-yellow-500 text-yellow-500 px-10 py-4 rounded-full font-black text-lg uppercase tracking-widest hover:bg-yellow-500 hover:text-black transition-colors"
        >
          Skip Voice
        </button>
      </div>

      <p class="mt-6 text-xs uppercase tracking-[0.28em] text-gray-500">
        Audio will begin after your click
      </p>
    </div>

    <audio id="zeus-intro-audio" preload="auto">
      <source src="./audio/zeus-intro.mp3" type="audio/mpeg" />
    </audio>

    <audio id="thunder-audio" preload="auto">
      <source src="./audio/thunder.mp3" type="audio/mpeg" />
    </audio>
    <audio id="ambient-audio" preload="auto" loop>
      <source src="./audio/ambient.mp3" type="audio/mpeg" />
    </audio>
  </div>

  <!-- Header -->
  <header class="p-4 border-b border-gray-800 flex justify-between items-center glass-bar sticky top-0 z-40">
    <div>
      <h1 class="text-xl md:text-2xl font-black text-yellow-500 tracking-tighter uppercase">
        SNT LMO EXCLUSIVE SPORTS HUB
      </h1>
      <p id="user-status" class="text-[9px] uppercase tracking-widest text-gray-500 font-bold">
        Status: Mortal Vision
      </p>
    </div>

    <div class="flex gap-3">
      <button
        onclick="window.toggleLoginModal(true)"
        id="header-auth-btn"
        class="bg-yellow-500 text-black px-4 py-2 rounded font-bold text-sm uppercase hover:bg-yellow-400 transition-colors"
      >
        Login
      </button>

      <button
        onclick="window.toggleAccountModal(true)"
        id="account-btn"
        class="hidden border border-yellow-500 text-yellow-500 px-4 py-2 rounded font-bold text-sm uppercase hover:bg-yellow-500 hover:text-black transition-colors"
      >
        My Grid
      </button>
    </div>
  </header>

  <!-- Public / Paywall Content -->
  <section id="paywall-content" class="py-20 md:py-28 px-6">
    <div class="max-w-5xl mx-auto text-center">
      <p class="text-[11px] uppercase tracking-[0.35em] text-yellow-500 font-black mb-4">
        St. Louis Athletes • Every Level • One Grid
      </p>

      <h2 class="text-4xl md:text-6xl font-black mb-4 tracking-tighter italic uppercase">
        The Grid Awaits.
      </h2>

      <p class="max-w-2xl mx-auto text-gray-300 text-sm md:text-lg leading-relaxed">
        Premium hometown coverage, athlete rankings, community energy, live updates,
        and exclusive access to the rising names carrying St. Louis to every level of the game.
      </p>

      <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onclick="window.toggleLoginModal(true)"
          class="bg-yellow-500 text-black px-10 py-4 rounded-full font-black text-lg hover:scale-105 transition-transform uppercase tracking-widest ascend-pulse"
        >
          Join for $1 / Month
        </button>

        <button
          onclick="window.toggleLoginModal(true)"
          class="border border-yellow-500 text-yellow-500 px-10 py-4 rounded-full font-black text-lg uppercase tracking-widest hover:bg-yellow-500 hover:text-black transition-colors"
        >
          Or $10 / Year
        </button>
      </div>

      <div class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
        <div class="panel-card p-5">
          <p class="text-[10px] uppercase tracking-widest text-yellow-500 font-black mb-2">Athlete Coverage</p>
          <p class="text-sm text-gray-300">
            Follow high school, college, pro, and rising St. Louis talent in one place.
          </p>
        </div>

        <div class="panel-card p-5">
          <p class="text-[10px] uppercase tracking-widest text-yellow-500 font-black mb-2">Community Access</p>
          <p class="text-sm text-gray-300">
            Jump into the War Room Chat, see who is active, and stay locked into the city’s sports pulse.
          </p>
        </div>

        <div class="panel-card p-5">
          <p class="text-[10px] uppercase tracking-widest text-yellow-500 font-black mb-2">Premium Grid Tools</p>
          <p class="text-sm text-gray-300">
            Unlock the member dashboard, locker uploads, live boards, and deeper athlete insight.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Main App (Authenticated Experience) -->
  <main id="main-content" class="hidden p-6 max-w-7xl mx-auto space-y-8">

    <!-- GLOBAL AI SCOUT RADAR -->
    <div class="p-5 bg-gray-900 border border-yellow-500/20 rounded-2xl shadow-lg space-y-3">
      <div class="flex items-center justify-between text-yellow-500">
        <div class="flex items-center gap-2">
          <i class="fa-solid fa-earth-americas text-sm animate-pulse"></i>
          <h3 class="text-xs font-black uppercase tracking-widest text-gray-400">Global Athlete Radar</h3>
        </div>
        <span id="global-search-status" class="text-[9px] uppercase font-bold text-gray-500 tracking-wider">System Ready</span>
      </div>
      
      <div class="relative">
        <input 
          id="global-search-input" 
          type="text" 
          class="grid-input p-4 pl-11 text-sm text-white font-medium bg-black rounded-xl border border-gray-800 focus:border-yellow-500 placeholder-gray-600 transition-all"
          placeholder="Type Athlete Name & hit Enter to search the globe..."
        />
        <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-600">
          <i class="fa-solid fa-magnifying-glass text-xs"></i>
        </div>
      </div>

      <!-- Inline Processing Panel -->
      <div id="global-search-spinner" class="hidden flex items-center justify-center gap-3 py-2 bg-yellow-500/5 rounded-lg border border-yellow-500/10 text-yellow-500 font-black text-xs tracking-widest uppercase animate-pulse">
        <i class="fa-solid fa-circle-notch animate-spin"></i>
        SNT LMO Bots parsing news, video feeds, and metrics...
      </div>
    </div>

    <!-- Admin Panel -->
    <div id="admin-panel" class="hidden p-6 bg-gray-900 border border-yellow-500/50 rounded-2xl shadow-2xl">
      <h3 class="text-yellow-500 font-black mb-4 uppercase italic tracking-widest">
        Athlete Command Center
      </h3>

      <form id="add-athlete-form" class="grid grid-cols-2 md:grid-cols-8 gap-3">
        <input
          type="text"
          id="player-name"
          placeholder="NAME"
          class="grid-input md:col-span-1"
          required
        />

        <select id="player-sport" class="grid-input md:col-span-1">
          <option value="Football">Football</option>
          <option value="Basketball">Basketball</option>
          <option value="Baseball">Baseball</option>
          <option value="Track">Track</option>
          <option value="Soccer">Soccer</option>
        </select>

        <input type="number" id="score0" placeholder="S0" class="grid-input text-center" />
        <input type="number" id="score1" placeholder="S1" class="grid-input text-center" />
        <input type="number" id="score2" placeholder="S2" class="grid-input text-center" />
        <input type="number" id="score3" placeholder="S3" class="grid-input text-center" />
        <input type="number" id="score4" placeholder="S4" class="grid-input text-center" />

        <button
          type="submit"
          id="deploy-athlete-btn"
          class="col-span-full bg-yellow-500 text-black font-bold py-2 rounded uppercase hover:bg-yellow-400 transition-colors"
        >
          Deploy Titan
        </button>
      </form>
    </div>

    <!-- Interactive Grid Filter Panel -->
    <div class="p-5 bg-gray-900 border border-gray-800 rounded-2xl shadow-lg space-y-4">
      <div class="flex items-center gap-2 text-yellow-500">
        <i class="fa-solid fa-sliders text-sm"></i>
        <h3 class="text-xs font-black uppercase tracking-widest text-gray-400">Grid Filters</h3>
      </div>
      
      <div class="flex flex-col md:flex-row gap-4">
        <!-- LEVEL 1: Main Category Selection -->
        <div class="flex-1 space-y-1.5">
          <label for="main-tier-filter" class="block text-[10px] uppercase tracking-widest text-gray-500 font-bold">Select Tier</label>
          <select id="main-tier-filter" class="grid-input p-3 font-medium cursor-pointer">
            <option value="all">All Tiers</option>
            <option value="highschool">St. Louis High Schools</option>
            <option value="college">Colleges (Local & National)</option>
            <option value="pro-teams">St. Louis Home Pro Teams</option>
            <option value="pro-players">Locals in the Pros (Domestic & Global)</option>
          </select>
        </div>

        <!-- LEVEL 2: Dynamic Sub-Category Selection -->
        <div class="flex-1 space-y-1.5">
          <label for="sub-category-filter" class="block text-[10px] uppercase tracking-widest text-gray-500 font-bold">Refine View</label>
          <select id="sub-category-filter" class="grid-input p-3 font-medium cursor-pointer">
            <option value="all-sub">Select a main tier first...</option>

            <!-- High School Conferences -->
            <optgroup label="High School Conferences" id="opt-highschool" class="hidden">
              <option value="all-hs">All High Schools</option>
              <option value="mcc">Metro Catholic (CBC, De Smet, SLUH...)</option>
              <option value="phsl">Public High School League (Vashon, Soldan...)</option>
              <option value="suburban">Suburban Conference (Kirkwood, Webster...)</option>
              <option value="aaa">AAA (Cardinal Ritter, St. Mary's...)</option>
            </optgroup>
            
            <!-- College Tracking -->
            <optgroup label="College Tracking" id="opt-college" class="hidden">
              <option value="all-college">All Registered Colleges</option>
              <option value="college-local">St. Louis In-Market (SLU, Lindenwood, UMSL)</option>
              <option value="college-regional">Regional Programs (Mizzou, Illinois, SEMO)</option>
              <option value="college-national">Stars Out-of-State (NCAA National Stage)</option>
            </optgroup>

            <!-- Home Pro Teams -->
            <optgroup label="Home Pro Franchises" id="opt-pro-teams" class="hidden">
              <option value="all-pro-teams">All Pro Teams</option>
              <option value="battlehawks">St. Louis Battlehawks (UFL)</option>
              <option value="cardinals">St. Louis Cardinals (MLB)</option>
              <option value="blues">St. Louis Blues (NHL)</option>
              <option value="city-sc">St. Louis CITY SC (MLS)</option>
            </optgroup>
            
            <!-- Locals in the Pros -->
            <optgroup label="Hometown Legends Tracker" id="opt-pro-players" class="hidden">
              <option value="all-pro-players">All Pro Players</option>
              <option value="pro-major">Major US Leagues (NFL, NBA, MLB, WNBA)</option>
              <option value="pro-cfl-alt">Alternative Pro (CFL Canada, Arena Leagues)</option>
              <option value="pro-overseas">Global / International (EuroLeague, World Soccer)</option>
            </optgroup>
          </select>
        </div>
      </div>
    </div>

    <!-- Leaderboard & Main Athlete Grid -->
    <div class="space-y-4">
      <div id="leaderboard-header" class="p-4 bg-yellow-500/10 border-l-4 border-yellow-500 rounded-r-lg">
        <span class="text-xs text-yellow-500 uppercase font-black">Current Apex Predator</span>
        <h2 id="top-athlete-display" class="text-2xl md:text-3xl font-black text-white uppercase italic">
          Loading...
        </h2>
      </div>

      <div class="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/50">
        <table class="w-full text-left">
          <thead class="bg-gray-900 text-[10px] uppercase tracking-widest text-gray-500">
            <tr>
              <th class="p-3">Athlete</th>
              <th class="p-3 text-center">S1</th>
              <th class="p-3 text-center">S2</th>
              <th class="p-3 text-center text-yellow-500">Total</th>
              <th class="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody id="match-grid-body"></tbody>
        </table>
      </div>
    </div>

    <!-- Chat + Video Grid Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div id="chat-panel" class="bg-gray-900 p-6 rounded-2xl border border-gray-800 h-[500px] flex flex-col">
        <h3 class="text-yellow-500 font-black mb-4 uppercase italic">War Room Chat</h3>

        <div id="chat-messages" class="flex-1 overflow-y-auto space-y-3 mb-4">
          <div class="text-center text-sm text-gray-500 py-6">
            Log in to enter War Room Chat.
          </div>
        </div>

        <div class="flex gap-2">
          <input
            type="text"
            id="chat-message-input"
            class="grid-input"
            placeholder="Log in to chat..."
            disabled
          />
          <button
            id="send-chat-message-btn"
            class="bg-yellow-500 text-black px-4 rounded font-bold opacity-50 cursor-not-allowed"
            disabled
          >
            →
          </button>
        </div>
      </div>

      <div id="video-call-panel" class="bg-gray-900 p-6 rounded-2xl border border-gray-800">
        <h3 class="text-yellow-500 font-black mb-4 uppercase italic">Communication Grid</h3>
        <div class="grid grid-cols-2 gap-2">
          <div class="video-container rounded-lg border border-gray-700">
            <video id="local-video" autoplay muted playsinline></video>
          </div>
          <div class="video-container rounded-lg border border-gray-700">
            <video id="remote-video" autoplay playsinline></video>
          </div>
        </div>
      </div>
    </div>

    <!-- Secondary Dashboard Panels -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

      <!-- Live Feed -->
      <div class="bg-gray-900 p-6 rounded-2xl border border-gray-800">
        <h3 class="text-yellow-500 font-black mb-4 uppercase italic">Live Feed</h3>
        <p id="latest-data" class="text-white font-bold">No live data available.</p>
        <pre id="data-stream" class="mt-3 text-xs text-gray-400 whitespace-pre-wrap break-words">Waiting for updates...</pre>
      </div>

      <!-- Active Users -->
      <div class="bg-gray-900 p-6 rounded-2xl border border-gray-800">
        <h3 class="text-yellow-500 font-black mb-4 uppercase italic">Active Users</h3>
        <ul id="active-users-list" class="space-y-2">
          <li class="text-sm text-gray-500">Log in to view active users.</li>
        </ul>
      </div>

      <!-- Sports Data -->
      <div class="bg-gray-900 p-6 rounded-2xl border border-gray-800">
        <h3 class="text-yellow-500 font-black mb-4 uppercase italic">Community Scoreboard</h3>
        <div id="sports-data-display" class="space-y-3">
          <p class="text-sm text-gray-500">No sports data submitted yet.</p>
        </div>
      </div>

      <!-- Media Locker -->
      <div class="bg-gray-900 p-6 rounded-2xl border border-gray-800">
        <h3 class="text-yellow-500 font-black mb-4 uppercase italic">Media Locker</h3>

        <div class="flex flex-col gap-3">
          <input id="media-file-input" type="file" class="grid-input" />

          <button
            id="locker-upload-btn"
            type="button"
            class="bg-yellow-500 text-black font-bold py-2 rounded uppercase"
          >
            Upload to Grid
          </button>

          <div class="h-2 w-full bg-gray-800 rounded overflow-hidden">
            <div id="upload-progress-bar" class="h-full bg-yellow-500" style="width: 0%"></div>
          </div>

          <div class="flex justify-between text-xs text-gray-500">
            <span id="locker-status-text">Capacity: Log in to see status.</span>
            <span id="upload-counter-display">Uploads: 0</span>
          </div>

          <div id="locker-media-display" class="grid grid-cols-2 md:grid-cols-3 gap-3">
            <p class="col-span-full text-center text-sm text-gray-500">
              Log in to view your media.
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- Login Modal -->
  <div id="login-modal" class="hidden fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4">
    <div class="bg-gray-900 border border-yellow-500/30 p-8 rounded-3xl max-w-sm w-full shadow-2xl">
      <h2 class="text-2xl font-black text-yellow-500 mb-4 uppercase italic">Ascension</h2>

      <form id="login-form" class="space-y-4">
        <input
          type="email"
          id="login-email"
          placeholder="EMAIL"
          autocomplete="username"
          class="grid-input text-white bg-gray-900 border border-gray-700 w-full"
          style="color: white !important;"
          required
        />

        <input
          type="password"
          id="login-password"
          placeholder="PASSWORD"
          autocomplete="current-password"
          class="grid-input text-white bg-gray-900 border border-gray-700 w-full"
          style="color: white !important; background-color: #111 !important;"
          required
        />

        <p id="login-error" class="text-xs text-red-500 font-bold"></p>

        <button
          type="submit"
          id="login-submit-btn"
          class="w-full bg-yellow-500 text-black font-bold py-2 rounded uppercase hover:bg-yellow-400 transition-colors"
        >
          Sign In
        </button>
      </form>

      <button
        onclick="window.toggleLoginModal(false)"
        class="mt-4 w-full text-gray-500 uppercase text-xs"
      >
        Cancel
      </button>
    </div>
  </div>

  <!-- Account Modal -->
  <div id="account-modal" class="hidden fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4">
    <div class="bg-gray-900 border border-yellow-500/30 p-8 rounded-3xl max-w-md w-full shadow-2xl">
      <h2 class="text-2xl font-black text-yellow-500 mb-4 uppercase italic">My Grid</h2>

      <div class="space-y-3 text-sm">
        <div class="rounded-lg bg-black/40 border border-gray-800 p-3">
          <p class="text-[10px] uppercase tracking-widest text-gray-500">Email</p>
          <p id="account-email-display" class="text-white font-bold break-all">N/A</p>
        </div>

        <div class="rounded-lg bg-black/40 border border-gray-800 p-3">
          <label for="nickname-input" class="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">
            Nickname
          </label>
          <input id="nickname-input" type="text" class="grid-input" placeholder="Your nickname" />
          <button
            id="save-nickname-btn"
            type="button"
            class="mt-3 w-full bg-yellow-500 text-black font-bold py-2 rounded uppercase"
          >
            Save Nickname
          </button>
        </div>

        <form id="password-update-form" class="rounded-lg bg-black/40 border border-gray-800 p-3">
          <input type="text" name="username" autocomplete="username" class="hidden" aria-hidden="true" value="sntlmo_user">
          <label for="new-password-input" class="block text-[10px] uppercase tracking-widest text-gray-500 mb-2">
            Update Password
          </label>
          <input id="new-password-input" type="password" class="grid-input" placeholder="New password" autocomplete="new-password" />
          <button id="update-password-btn" type="button" class="mt-3 w-full border border-yellow-500 text-yellow-500 font-bold py-2 rounded uppercase">
            Update Password
          </button>
        </form>
      </div>

      <div class="mt-6 grid grid-cols-2 gap-3">
        <button
          id="logout-btn"
          type="button"
          class="border border-red-500 text-red-400 font-bold py-2 rounded uppercase"
        >
          Log Out
        </button>

        <button
          id="account-close-btn"
          type="button"
          onclick="window.toggleAccountModal(false)"
          class="text-gray-400 font-bold py-2 rounded uppercase border border-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  </div>

  <script type="module" src="./bundle.js"></script>

  <!-- Filter Initialization & Dropdown Sync Handler -->
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const mainFilter = document.getElementById('main-tier-filter');
      const subFilter = document.getElementById('sub-category-filter');

      const optGroupMap = {
        'highschool': 'opt-highschool',
        'college': 'opt-college',
        'pro-teams': 'opt-pro-teams',
        'pro-players': 'opt-pro-players'
      };

      if (mainFilter && subFilter) {
        const originalSubFilterMarkup = subFilter.innerHTML;

        mainFilter.addEventListener('change', (e) => {
          const selectedValue = e.target.value;
          const targetGroupId = optGroupMap[selectedValue];
          
          if (selectedValue === 'all') {
            subFilter.innerHTML = originalSubFilterMarkup;
            const optgroups = subFilter.getElementsByTagName('optgroup');
            for (let group of optgroups) {
              group.classList.add('hidden');
            }
            subFilter.value = 'all-sub';
            subFilter.dispatchEvent(new Event('change'));
            return;
          }

          const optgroups = subFilter.getElementsByTagName('optgroup');
          for (let group of optgroups) {
            group.classList.add('hidden');
          }

          const targetGroup = document.getElementById(targetGroupId);
          if (targetGroup) {
            targetGroup.classList.remove('hidden');
            const firstOptionVal = targetGroup.getElementsByTagName('option')[0].value;
            subFilter.value = firstOptionVal;
            subFilter.dispatchEvent(new Event('change'));
          }
        });
      }
    });
  </script>
</body>
</html>