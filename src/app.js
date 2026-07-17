// ======================================================
// PAGE RENDER IMPORTS
// ======================================================

import {
  renderAdminPage
} from "./pages/admin.js";

import {
  renderHomePage
} from "./pages/home.js";

import {
  renderSportsFeedPage
} from "./pages/feed.js";

import {
  renderAthletesDirectory
} from "./pages/athletes.js";

import {
  renderAthletePage
} from "./pages/athlete.js";

import {
  renderHighlightFeed
} from "./pages/highlights.js";

import {
  renderNationalDashboard
} from "./pages/national-dashboard.js";

import {
  renderSchoolsPage
} from "./pages/schools.js";

import {
  renderRankingsPage
} from "./pages/rankings.js";

import {
  renderRecruitingPage
} from "./pages/recruiting.js";

import {
  renderZeusAiPage
} from "./pages/zeus-ai.js";

import {
  renderLiveGamesPage
} from "./pages/live.js";

import {
  renderMarketplacePage
} from "./pages/marketplace.js";

import {
  renderAccountSetupPage
} from "./pages/account-setup.js";

import {
  renderZeusDashboard
} from "./pages/zeusDashboard.js";

// ======================================================
// FIREBASE SERVICE INSTANCES
// ======================================================

import {
  auth,
  db,
  rtdb,
  storage
} from "./services/firebaseService.js";

// ======================================================
// APPLICATION SERVICES
// ======================================================

import {
  deleteAthleteRecord,
  findDuplicateAthlete,
  purgeDuplicateAthletes,
  saveAthleteRecord,
  subscribeToAthleteRecords
} from "./services/athleteService.js";

import {
  uploadAthleteVideo
} from "./services/mediaService.js";

// ======================================================
// CONTROLLERS AND REPOSITORIES
// ======================================================

import {
  initializeSportsFeed
} from "./feed/feedController.js";

import {
  subscribeToFeedPosts
} from "./feed/feedRepository.js";

import {
  initializeAdminController
} from "./controllers/adminController.js";

import {
  initializeAuthController
} from "./controllers/authController.js";

import {
  registerAccountSetupHandlers
} from "./controllers/accountSetupController.js";

import {
  registerZeusBrainHandlers
} from "./controllers/zeusBrainController.js";

import {
  findAthleteRecord,
  initializeAthleteDirectoryController,
  openAthleteFromRecords,
  selectAthleteFilm,
  selectAthleteFromMatrix,
  selectAthleteRow
} from "./controllers/athleteController.js";

import {
  initializeRankingsController
} from "./controllers/rankingsController.js";

import {
  initializeMarketplaceController
} from "./controllers/marketplaceController.js";

import {
  initializeRecruitingController
} from "./controllers/recruitingController.js";

// ======================================================
// SHARED UTILITIES
// ======================================================

import {
  normalizeAthleteRecord
} from "./utils/normalizeAthlete.js";

import {
  calculateSquadAverage,
  getAthleteScoreTotal,
  getAthleteZeusRating
} from "./utils/scoring.js";

import {
  athleteHasFilm,
  filterAthleteRecords,
  getAthleteRecruitingStatus,
  getRecruitingStatusClasses,
  normalizeCommaList,
  normalizeFilterValue
} from "./utils/filters.js";

// ======================================================
// FIREBASE AUTHENTICATION FUNCTIONS
// ======================================================

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword
} from "firebase/auth";

// ======================================================
// FIRESTORE FUNCTIONS STILL USED BY APP.JS
// ======================================================

import {
  doc,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  onSnapshot,
  serverTimestamp,
  deleteDoc,
  limit,
  arrayUnion,
  getDocs
} from "firebase/firestore";

// ======================================================
// REALTIME DATABASE FUNCTIONS
// ======================================================

import {
  ref as rtdbRef,
  push,
  onValue,
  serverTimestamp as rtdbServerTimestamp,
  query as rtdbQuery,
  limitToLast
} from "firebase/database";

// ======================================================
// APPLICATION STATE
// ======================================================

let currentUser = null;
let currentProfile = null;

let allAthletesCache = [];
let allFeedPostsCache = [];

let unsubscribeAthletes = null;
let unsubscribeFeedPosts = null;
let unsubscribeChat = null;

let activeSelectedAthleteId = null;
let editingAthleteId = null;

let squadA = [];
let squadB = [];
let squadC = [];

window.appState = {
  currentUser: null,
  currentProfile: null,

  athletes: [],

  activeAthleteId: null,
  activeAthlete: null,
  activeSchool: null,
  activeVideo: null,

  activeView: "home"
};

// ======================================================
// ACTIVE ATHLETE STATE
// ======================================================

window.setActiveAthlete = function (
  id,
  athlete = {}
) {
  activeSelectedAthleteId = id;

  window.appState.activeAthleteId = id;

  window.appState.activeAthlete = {
    id,
    ...athlete
  };

  window.dispatchEvent(
    new CustomEvent(
      "sntlmo:athlete-selected",
      {
        detail:
          window.appState.activeAthlete
      }
    )
  );
};

// ======================================================
// SHARED UTILITIES
// ======================================================

const $ = (id) =>
  document.getElementById(id);

function escapeHtml(value = "") {
  return String(value ?? "")
    .replace(
      /[&<>"']/g,
      (character) => {
        const entities = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;"
        };

        return (
          entities[character] ||
          character
        );
      }
    );
}

function show(id) {
  $(id)?.classList.remove("hidden");
}

function hide(id) {
  $(id)?.classList.add("hidden");
}

function safeNumber(value) {
  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : 0;
}

function setText(id, text = "") {
  const element = $(id);

  if (element) {
    element.textContent =
      String(text ?? "");
  }
}

function isAdminProfile(profile) {
  return (
    profile?.role === "admin" ||
    profile?.role === "editor"
  );
}

function hasMainAccess(profile) {
  return (
    isAdminProfile(profile) ||
    profile?.isPro === true
  );
}

function isFirebaseStorageUrl(value = "") {
  const url =
    String(value || "");

  return (
    url.includes("firebasestorage") ||
    url.includes(".appspot.com")
  );
}

window.show = show;
window.hide = hide;

// ======================================================
// VIDEO URL HELPERS
// ======================================================

function getYouTubeVideoId(value = "") {
  const url =
    String(value || "").trim();

  if (!url) {
    return "";
  }

  try {
    const parsedUrl =
      new URL(
        url,
        window.location.origin
      );

    if (
      parsedUrl.hostname.includes(
        "youtu.be"
      )
    ) {
      return parsedUrl.pathname
        .replace(/^\/+/, "")
        .split("/")[0];
    }

    if (
      parsedUrl.hostname.includes(
        "youtube.com"
      )
    ) {
      if (
        parsedUrl.pathname.startsWith(
          "/embed/"
        )
      ) {
        return parsedUrl.pathname
          .split("/embed/")[1]
          ?.split("/")[0] || "";
      }

      if (
        parsedUrl.pathname.startsWith(
          "/shorts/"
        )
      ) {
        return parsedUrl.pathname
          .split("/shorts/")[1]
          ?.split("/")[0] || "";
      }

      return (
        parsedUrl.searchParams.get("v") ||
        ""
      );
    }
  } catch (error) {
    console.warn(
      "Unable to parse video URL:",
      value,
      error
    );
  }

  return "";
}

function getEmbedUrl(value = "") {
  const videoId =
    getYouTubeVideoId(value);

  if (!videoId) {
    return String(value || "");
  }

  return (
    `https://www.youtube.com/embed/` +
    `${encodeURIComponent(videoId)}`
  );
}

function normalizeAthleteVideos(
  athlete = {}
) {
  const videos = Array.isArray(
    athlete.videos
  )
    ? athlete.videos
        .map((video, index) => {
          if (typeof video === "string") {
            return {
              title:
                `Highlight ${index + 1}`,
              url: video
            };
          }

          return {
            title:
              video?.title ||
              `Highlight ${index + 1}`,

            url:
              video?.url ||
              video?.videoUrl ||
              ""
          };
        })
        .filter((video) =>
          Boolean(video.url)
        )
    : [];

  const fallbackHighlight =
    athlete.highlightUrl ||
    athlete.highlight ||
    athlete.higlightightUrl ||
    "";

  if (
    videos.length === 0 &&
    fallbackHighlight
  ) {
    videos.push({
      title: "Main Highlight",
      url: fallbackHighlight
    });
  }

  return videos;
}

// ======================================================
// DUAL-VIEW MEDIA THEATER
// ======================================================

function playHighlight(
  athlete = {}
) {
  const viewport =
    $("theater-media-viewport");

  const placeholder =
    $("video-placeholder");

  const titleBadge =
    $("now-playing-title");

  if (!viewport || !placeholder) {
    return;
  }

  const videoList =
    normalizeAthleteVideos(athlete);

  if (!videoList.length) {
    viewport.innerHTML = "";

    placeholder.classList.remove(
      "hidden"
    );

    if (titleBadge) {
      titleBadge.textContent =
        "Select a row to play";
    }

    return;
  }

  placeholder.classList.add(
    "hidden"
  );

  window.switchVideo = function (
    index = 0
  ) {
    const selectedVideo =
      videoList[index];

    if (!selectedVideo) {
      return;
    }

    const title =
      selectedVideo.title ||
      `Highlight ${index + 1}`;

    const url =
      selectedVideo.url || "";

    if (!url) {
      return;
    }

    if (titleBadge) {
      titleBadge.textContent =
        `Playing: ${title}`;
    }

    const playlistMarkup =
      videoList.length > 1
        ? `
            <div
              class="absolute top-0 left-0 z-20 flex w-full gap-2 overflow-x-auto bg-zeus-panel/90 p-2">

              ${videoList
                .map(
                  (
                    video,
                    videoIndex
                  ) => `
                    <button
                      type="button"
                      onclick="window.switchVideo(${videoIndex})"
                      class="${
                        videoIndex === index
                          ? "bg-zeus-gold text-black"
                          : "bg-gray-800 text-white"
                      } whitespace-nowrap rounded px-2 py-1 text-[9px] font-bold uppercase">

                      ${escapeHtml(
                        video.title ||
                        `Highlight ${videoIndex + 1}`
                      )}

                    </button>
                  `
                )
                .join("")}

            </div>
          `
        : "";

    const youtubeId =
      getYouTubeVideoId(url);

    if (youtubeId) {
      const embedUrl =
        getEmbedUrl(url);

      viewport.innerHTML = `
        ${playlistMarkup}

        <iframe
          src="${escapeHtml(
            `${embedUrl}?autoplay=1&mute=1&playsinline=1`
          )}"
          title="${escapeHtml(title)}"
          class="h-full w-full"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowfullscreen>
        </iframe>
      `;

      return;
    }

    viewport.innerHTML = `
      ${playlistMarkup}

      <video
        src="${escapeHtml(url)}"
        class="h-full w-full bg-black"
        controls
        autoplay
        muted
        playsinline>

        Your browser does not support
        this video format.

      </video>
    `;
  };

  window.switchVideo(0);
}

// ======================================================
// CLOUD STORAGE MEDIA LOCKER
// ======================================================

let mediaLockerInitialized = false;

function initializeMediaLockerEngine() {
  if (mediaLockerInitialized) {
    return;
  }

  const fileInput =
    $("media-locker-file-input");

  if (!fileInput) {
    return;
  }

  mediaLockerInitialized = true;

  fileInput.addEventListener(
    "change",
    async (event) => {
      const file =
        event.target.files?.[0];

      if (!file) {
        return;
      }

      if (
        !isAdminProfile(
          currentProfile
        )
      ) {
        alert("Admin access denied.");
        fileInput.value = "";
        return;
      }

      if (!activeSelectedAthleteId) {
        alert(
          "Select an athlete row first."
        );

        fileInput.value = "";
        return;
      }

      const progressLabel =
        $("upload-progress-sub");

      try {
        if (progressLabel) {
          progressLabel.textContent =
            "PREPARING VIDEO UPLOAD...";
        }

        await uploadAthleteVideo({
          storage,
          db,

          athleteId:
            activeSelectedAthleteId,

          file,

          onProgress: (percent) => {
            if (progressLabel) {
              progressLabel.textContent =
                `UPLOADING VIDEO: ${percent}%`;
            }
          },

          onComplete: () => {
            if (progressLabel) {
              progressLabel.textContent =
                "UPLOAD MATRIX SECURE.";
            }
          }
        });

        alert(
          "Video successfully attached to the athlete profile."
        );
      } catch (error) {
        console.error(
          "Media locker upload failed:",
          error
        );

        if (progressLabel) {
          progressLabel.textContent =
            "UPLOAD FAILED.";
        }

        alert(
          error?.message ||
          "Video upload failed."
        );
      } finally {
        fileInput.value = "";
      }
    }
  );
}

// ======================================================
// ATHLETE SCORING ENGINE
// ======================================================

function athleteTotal(
  athlete = {}
) {
  return getAthleteScoreTotal(
    athlete
  );
}

function mergeRosterScores(
  athlete = {}
) {
  return getAthleteScoreTotal(
    athlete
  );
}

function calculateSquadAverages() {
  setText(
    "squad-a-rating",
    `AVG: ${calculateSquadAverage(
      squadA
    )}`
  );

  setText(
    "squad-b-rating",
    `AVG: ${calculateSquadAverage(
      squadB
    )}`
  );

  setText(
    "squad-c-rating",
    `AVG: ${calculateSquadAverage(
      squadC
    )}`
  );
}

// ======================================================
// WAR ROOM DRAFT BOARD
// ======================================================

function renderDraftBoards() {
  const slotA = $("squad-a-slots");
  const slotB = $("squad-b-slots");
  const slotC = $("squad-c-slots");

  if (slotA) {
    slotA.innerHTML =
      squadA.length === 0
        ? `
          <div class="text-[11px] text-gray-600 font-mono italic text-center my-auto py-4">
            Roster vacant. Select an athlete above to draft.
          </div>
        `
        : squadA
            .map(
              (player, index) => `
              <div class="flex justify-between items-center bg-zeus-panel border border-zeus-border/40 p-2 rounded text-xs font-mono">

                <span class="text-white font-bold">
                  ${escapeHtml(player.name)}
                </span>

                <button
                  onclick="window.dropFromSquad('A', ${index})"
                  class="text-red-400 hover:text-red-500 font-bold px-1">

                  &times;

                </button>

              </div>
            `
            )
            .join("");
  }

  if (slotB) {
    slotB.innerHTML =
      squadB.length === 0
        ? `
          <div class="text-[11px] text-gray-600 font-mono italic text-center my-auto py-4">
            Roster vacant. Select an athlete above to draft.
          </div>
        `
        : squadB
            .map(
              (player, index) => `
              <div class="flex justify-between items-center bg-zeus-panel border border-zeus-border/40 p-2 rounded text-xs font-mono">

                <span class="text-gray-300">
                  ${escapeHtml(player.name)}
                </span>

                <button
                  onclick="window.dropFromSquad('B', ${index})"
                  class="text-red-400 hover:text-red-500 font-bold px-1">

                  &times;

                </button>

              </div>
            `
            )
            .join("");
  }

  if (slotC) {
    slotC.innerHTML =
      squadC.length === 0
        ? `
          <div class="text-sm text-gray-600 font-mono italic text-center my-auto py-8">
            Roster vacant. Select National from the athlete matrix.
          </div>
        `
        : squadC
            .map(
              (player, index) => `
              <div class="flex justify-between items-center bg-zeus-panel border border-zeus-gold/20 p-2 rounded text-xs font-mono">

                <span class="text-zeus-gold font-bold">
                  ${escapeHtml(player.name)}
                </span>

                <button
                  onclick="window.dropFromSquad('C', ${index})"
                  class="text-red-400 hover:text-red-500 font-bold px-1">

                  &times;

                </button>

              </div>
            `
            )
            .join("");

  }

  calculateSquadAverages();
}

window.renderDraftBoards = renderDraftBoards;

window.dropFromSquad = (team, index) => {
  if (team === "A") {
    squadA.splice(index, 1);
  } else if (team === "B") {
    squadB.splice(index, 1);
  } else if (team === "C") {
    squadC.splice(index, 1);
  }

  renderDraftBoards();
};

window.inlineDraftDispatch = (athleteId, team) => {
  const athlete = allAthletesCache.find(
    (item) => item.id === athleteId
  );

  if (!athlete) return;

  if (team === 1) {
    if (squadA.some((p) => p.name === athlete.data.name)) {
      return alert("Athlete already drafted.");
    }

    squadA.push(athlete.data);
  }

  if (team === 2) {
    if (squadB.some((p) => p.name === athlete.data.name)) {
      return alert("Athlete already drafted.");
    }

    squadB.push(athlete.data);
  }

  if (team === 3) {
    if (squadC.some((p) => p.name === athlete.data.name)) {
      return alert("Athlete already drafted.");
    }

    squadC.push(athlete.data);
  }

  renderDraftBoards();
};

// ======================================================
// LIVE GAMES
// ======================================================

function renderLiveGames() {
  const container =
    document.getElementById("live-root");

  if (!container) {
    return;
  }

  container.innerHTML =
    renderLiveGamesPage();
}

// ======================================================
// MARKETPLACE
// ======================================================

function renderMarketplace() {
  const container =
    document.getElementById(
      "marketplace-root"
    );

  if (!container) {
    return;
  }

  container.innerHTML =
    renderMarketplacePage();

  initializeMarketplaceController({
    root: container
  });
}

// ======================================================
// ZEUS AI
// ======================================================

function renderZeusAI() {
  const container =
    document.getElementById(
      "zeus-ai-root"
    );

  if (!container) {
    return;
  }

  container.innerHTML =
    renderZeusAiPage();

  registerZeusBrainHandlers?.();
}

// ======================================================
// ADMIN ACTIONS
// ======================================================

window.directPurgeRow =
  async function (
    event,
    athleteId,
    athleteName = "this athlete"
  ) {
    event?.stopPropagation();

    if (
      !isAdminProfile(currentProfile)
    ) {
      alert("Admin access denied.");
      return;
    }

    const confirmed =
      window.confirm(
        `Are you sure you want to permanently erase ${athleteName} from the database?`
      );

    if (!confirmed) {
      return;
    }

    try {
      await deleteDoc(
        doc(
          db,
          "athletes",
          athleteId
        )
      );

      if (
        activeSelectedAthleteId ===
        athleteId
      ) {
        activeSelectedAthleteId =
          null;

        window.appState
          .activeAthleteId = null;

        window.appState
          .activeAthlete = null;
      }
    } catch (error) {
      console.error(
        "Purge system rejected:",
        error
      );

      alert(
        "The athlete could not be deleted."
      );
    }
  };

window.handleAdminAddVideo =
  async function () {
    const titleElement =
      $("new-vid-title");

    const urlElement =
      $("new-vid-url");

    const title =
      titleElement
        ?.value
        .trim() || "";

    const url =
      urlElement
        ?.value
        .trim() || "";

    if (
      !isAdminProfile(currentProfile)
    ) {
      alert("Admin access denied.");
      return;
    }

    if (!activeSelectedAthleteId) {
      alert(
        "Select an athlete profile row first from the matrix."
      );

      return;
    }

    if (!title || !url) {
      alert(
        "Enter both a video title and a valid URL."
      );

      return;
    }

    try {
      await addVideoToTitan(
        activeSelectedAthleteId,
        title,
        url
      );

      if (titleElement) {
        titleElement.value = "";
      }

      if (urlElement) {
        urlElement.value = "";
      }

      alert(
        "Video successfully added to the athlete profile."
      );
    } catch (error) {
      console.error(
        "Video save failed:",
        error
      );

      alert(
        "The video could not be saved."
      );
    }
  };

// ======================================================
// INITIAL ATHLETE SEED DATA
// ======================================================

const ST_LOUIS_INITIAL_SEEDS = [
  {
    name: "Vashon Elite Squad",
    sport: "Basketball",
    tier: "highschool",
    subCategory: "phsl",
    scores: [95, 92, 94, 96, 98],
    highlightUrl:
      "https://www.youtube.com/watch?v=ifiFShFX5Pg",
    recordType: "athlete"
  },
  {
    name: "Soldan Prep Leader",
    sport: "Basketball",
    tier: "highschool",
    subCategory: "phsl",
    scores: [88, 85, 90, 89, 91],
    highlightUrl: "",
    recordType: "athlete"
  },
  {
    name: "CBC Cadet Core",
    sport: "Football",
    tier: "highschool",
    subCategory: "mcc",
    scores: [94, 96, 95, 93, 97],
    highlightUrl: "",
    recordType: "athlete"
  },
  {
    name: "SLUH Jr. Billikens",
    sport: "Track & Field",
    tier: "highschool",
    subCategory: "mcc",
    scores: [89, 92, 91, 90, 94],
    highlightUrl: "",
    recordType: "athlete"
  },
  {
    name: "Macler Cody (Mac10)",
    sport: "Football",
    tier: "pro-players",
    subCategory: "pro-cfl-alt",
    scores: [98, 97, 99, 96, 98],
    highlightUrl: "",
    recordType: "athlete"
  },
  {
    name: "David Freese (Lafayette HS)",
    sport: "Baseball",
    tier: "pro-players",
    subCategory: "pro-major",
    scores: [95, 94, 96, 92, 95],
    highlightUrl: "",
    recordType: "athlete"
  },
  {
    name: "Pat Maroon (Oakville HS)",
    sport: "Hockey",
    tier: "pro-players",
    subCategory: "pro-major",
    scores: [93, 95, 94, 91, 96],
    highlightUrl: "",
    recordType: "athlete"
  },
  {
    name: "Bradley Beal (Chaminade)",
    sport: "Basketball",
    tier: "pro-players",
    subCategory: "pro-major",
    scores: [97, 98, 96, 95, 99],
    highlightUrl: "",
    recordType: "athlete"
  }
];

async function checkAndSeedDatabase() {
  const existingSnapshot =
    await getDocs(
      query(
        collection(db, "athletes"),
        limit(1)
      )
    );

  if (!existingSnapshot.empty) {
    return;
  }

  const athletesCollection =
    collection(db, "athletes");

  for (
    const athlete of
    ST_LOUIS_INITIAL_SEEDS
  ) {
    await addDoc(
      athletesCollection,
      {
        ...athlete,
        videos: [],
        createdAt:
          serverTimestamp(),
        updatedAt:
          serverTimestamp(),
        createdBy:
          "auto_init"
      }
    );
  }
}

// ======================================================
// ACCESS AND AUTHENTICATION UI
// ======================================================

function updateAccessUI(
  profile
) {
  const loginButton =
    $("header-auth-btn");

  const hasAccess =
    hasMainAccess(profile);

  if (hasAccess) {
    hide("paywall-content");
    show("main-content");
  } else {
    show("paywall-content");
    hide("main-content");
  }

  const isAdmin =
    isAdminProfile(profile);

  if (isAdmin) {
    show("admin-panel");
    show("admin-purge-btn");

    checkAndSeedDatabase()
      .catch((error) => {
        console.error(
          "Database seed check failed:",
          error
        );
      });
  } else {
    hide("admin-panel");
    hide("admin-purge-btn");
  }

  if (profile) {
    setText(
      "user-status",
      `Admin: ${
        profile.nickname ||
        profile.email ||
        "Authorized"
      }`
    );

    if (loginButton) {
      loginButton.textContent =
        "Logout";
    }
  } else {
    setText(
      "user-status",
      "The Home of Every Athlete"
    );

    if (loginButton) {
      loginButton.textContent =
        "Login";
    }
  }

  processAndRenderFilteredAthletes();
}

// ======================================================
// ATHLETE PROFILE MODAL
// ======================================================

function openAthleteProfile(
  athleteId,
  athlete = {}
) {
  const modal =
    document.getElementById(
      "athlete-profile-modal"
    );

  const content =
    document.getElementById(
      "athlete-profile-content"
    );

  if (!modal || !content) {
    return;
  }

  const activeAthlete = {
    id: athleteId,
    ...athlete
  };

  window.activeAthlete =
    activeAthlete;

  window.setActiveAthlete(
    athleteId,
    athlete
  );

  content.innerHTML = `
    <div class="recruiter-profile-layout">

      <div class="recruiter-profile-main">

        ${renderAthletePage(
          activeAthlete
        )}

      </div>

      <aside class="recruiter-zeus-sidebar">

        ${
          typeof buildZeusScoutingReport ===
          "function"
            ? buildZeusScoutingReport(
                activeAthlete
              )
            : ""
        }

        ${renderZeusDashboard(
          activeAthlete
        )}

      </aside>

    </div>
  `;

  modal.classList.remove(
    "hidden"
  );
}

window.openAthleteFromDirectory =
  function (athleteId) {
    try {
      return openAthleteFromRecords({
        athleteId,

        records:
          allAthletesCache,

        onOpenProfile:
          openAthleteProfile
      });
    } catch (error) {
      console.error(
        "Athlete profile open failed:",
        error
      );

      alert(
        error?.message ||
        "Athlete profile not found."
      );

      return null;
    }
  };

// ======================================================
// PAGE RENDERERS
// ======================================================

function renderSportsFeed() {
  const container =
    document.getElementById(
      "home-root"
    );

  if (!container) {
    return;
  }

  container.innerHTML =
    renderSportsFeedPage(
      allAthletesCache,
      allFeedPostsCache
    );

  initializeSportsFeed({
    db,
    storage,
    currentUser,
    currentProfile,
    isAdminProfile,
    athletes:
      allAthletesCache,

    onUploaded: () => {
      // Firestore subscription
      // refreshes the feed.
    }
  });
}

function renderHome() {
  const container =
    document.getElementById(
      "home-root"
    );

  if (!container) {
    return;
  }

  container.innerHTML =
    renderHomePage(
      allAthletesCache
    );

  initializeHomeSportFilters?.();

  const overlay =
    $("zeus-intro-overlay");

  const skipButton =
    $("skip-zeus-intro");

  const inlineSkipButton =
    $("skip-zeus-intro-inline");

  const introLine =
    $("zeus-intro-line");

  const introLines = [
    "Welcome to Snt.L.Mo. Sports Network...",
    "The home of every athlete...",
    "Every school...",
    "Every coach...",
    "Every recruiter...",
    "Every fan...",
    "Discover athletes from every city...",
    "Watch highlights from around the country...",
    "Explore school programs...",
    "Track national rankings...",
    "Connect through recruiting...",
    "Shop exclusive team gear...",
    "And let Zeus AI analyze the future of sports...",
    "Greatness is not born...",
    "It is discovered...",
    "Now... let's discover the next generation of greatness."
  ];

  let introIndex = 0;
  let introTimer = null;
  let closeTimer = null;

  const thunder =
    new Audio(
      "audio/thunder.mp3"
    );

  const voice =
    new Audio(
      "audio/zeus-intro.mp3"
    );

  const music =
    new Audio(
      "audio/ambient.mp3"
    );

  function stopIntroAudio() {
    [thunder, voice, music]
      .forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
  }

  function closeIntro() {
    overlay?.classList.add(
      "hidden"
    );

    stopIntroAudio();

    if (introTimer) {
      clearInterval(introTimer);
      introTimer = null;
    }

    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }

    animateHomeCounters();
  }

  skipButton?.addEventListener(
    "click",
    closeIntro,
    { once: true }
  );

  inlineSkipButton
    ?.addEventListener(
      "click",
      closeIntro,
      { once: true }
    );

  if (overlay) {
    thunder.volume = 0.6;
    voice.volume = 0.95;
    music.volume = 0.25;

    thunder.play().catch(() => {});
    voice.play().catch(() => {});
    music.play().catch(() => {});

    introTimer =
      window.setInterval(
        () => {
          introIndex += 1;

          if (
            introLine &&
            introLines[introIndex]
          ) {
            introLine.textContent =
              introLines[introIndex];
          }

          if (
            introIndex >=
            introLines.length - 1
          ) {
            clearInterval(
              introTimer
            );

            introTimer = null;

            closeTimer =
              window.setTimeout(
                closeIntro,
                4500
              );
          }
        },
        2800
      );
  }

  window.setTimeout(
    animateHomeCounters,
    900
  );
}

function animateHomeCounters() {
  document
    .querySelectorAll(
      ".count-up"
    )
    .forEach((element) => {
      const target =
        Number(
          element.dataset.target ||
          0
        );

      if (!Number.isFinite(target)) {
        return;
      }

      let current = 0;

      const step =
        Math.max(
          1,
          Math.floor(
            target / 80
          )
        );

      const interval =
        window.setInterval(
          () => {
            current += step;

            if (current >= target) {
              current = target;

              clearInterval(
                interval
              );
            }

            element.textContent =
              current.toLocaleString();
          },
          25
        );
    });
}

function renderSchools() {
  const container =
    document.getElementById(
      "schools-root"
    );

  if (!container) {
    return;
  }

  container.innerHTML =
    renderSchoolsPage();
}

function renderAccountSetup() {
  const container =
    document.getElementById(
      "account-setup-root"
    );

  if (!container) {
    return;
  }

  container.innerHTML =
    renderAccountSetupPage();

  registerAccountSetupHandlers?.({
    auth,
    db,
    currentUser,
    currentProfile
  });
}

function renderAthleteDirectoryPage() {
  const container =
    document.getElementById(
      "athlete-directory-page"
    );

  if (!container) {
    return;
  }

  container.innerHTML =
    renderAthletesDirectory(
      allAthletesCache
    );

  initializeAthleteDirectoryController({
    root: container
  });
}

function renderHighlightFeedPage() {
  const container =
    document.getElementById(
      "highlights-root"
    );

  if (!container) {
    return;
  }

  container.innerHTML =
    renderHighlightFeed(
      allAthletesCache
    );

  initializeHighlightAutoplay();
} 

function renderRankings() {
  const container =
    document.getElementById(
      "rankings-root"
    );

  if (!container) {
    return;
  }

  container.innerHTML =
    renderRankingsPage(
      allAthletesCache
    );

  initializeRankingsController({
  root: container
  });
}

function renderRecruiting() {
  const container =
    document.getElementById(
      "recruiting-root"
    );

  if (!container) {
    return;
  }

  container.innerHTML =
    renderRecruitingPage(
      allAthletesCache
    );

  initializeRecruitingController({
    root: container,

    onOpenAthlete: (
      athleteId
    ) => {
      window
        .openAthleteFromDirectory
        ?.(athleteId);
    }
  });
}

// ======================================================
// BASIC FILTER EVENT BINDINGS
// ======================================================

let basicEventsBound = false;

function bindEvents() {
  if (basicEventsBound) {
    return;
  }

  basicEventsBound = true;

  $("tier-select")
    ?.addEventListener(
      "change",
      () => {
        refreshSubTierOptions();
        processAndRenderFilteredAthletes();
      }
    );

  $("sub-tier-select")
    ?.addEventListener(
      "change",
      processAndRenderFilteredAthletes
    );
}

// ======================================================
// FILTER MATRIX CONTROLLER
// ======================================================

const SUB_TIER_OPTIONS = {
  all: [
    ["all", "All Sub-Categories"]
  ],

  highschool: [
    ["all", "All High Schools"],
    ["phsl", "Public High League"],
    ["mcc", "Metro Catholic Conference"],
    ["suburban", "Suburban Programs"],
    ["independent", "Independent Programs"]
  ],

  college: [
    ["all", "All Colleges"],
    ["local-college", "Local Colleges"],
    ["national-college", "National Colleges"]
  ],

  "pro-teams": [
    ["all", "All Professional Teams"],
    ["mlb", "MLB"],
    ["nhl", "NHL"],
    ["mls", "MLS"],
    ["ufl", "UFL"]
  ],

  "pro-players": [
    ["all", "All Professional Athletes"],
    ["pro-major", "Major Professional Leagues"],
    ["pro-cfl-alt", "CFL / Alternative Pro"],
    ["pro-global", "Global Professionals"]
  ]
};

function refreshSubTierOptions() {
  const tierSelect =
    $("tier-select");

  const subTierSelect =
    $("sub-tier-select");

  if (!tierSelect || !subTierSelect) {
    return;
  }

  const previousValue =
    subTierSelect.value || "all";

  const selectedTier =
    tierSelect.value || "all";

  const options =
    SUB_TIER_OPTIONS[selectedTier] ||
    SUB_TIER_OPTIONS.all;

  subTierSelect.innerHTML =
    options
      .map(
        ([value, label]) => `
          <option value="${escapeHtml(value)}">
            ${escapeHtml(label)}
          </option>
        `
      )
      .join("");

  const previousValueStillExists =
    options.some(
      ([value]) =>
        value === previousValue
    );

  subTierSelect.value =
    previousValueStillExists
      ? previousValue
      : "all";
}

// ======================================================
// ATHLETE FILTER HELPERS
// ======================================================



// ======================================================
// FILTER ATHLETE DATABASE
// ======================================================

function getFilteredAthletes() {
  return filterAthleteRecords(
    allAthletesCache,
    {
      tier:
        $("tier-select")?.value ||
        "all",

      subTier:
        $("sub-tier-select")?.value ||
        "all",

      sport:
        $("admin-sport-filter")?.value ||
        "all",

      position:
        $("admin-position-filter")
          ?.value ||
        "",

      classYear:
        $("admin-class-filter")
          ?.value ||
        "",

      recruitingStatus:
        $("admin-recruiting-filter")
          ?.value ||
        "all",

      film:
        $("admin-film-filter")
          ?.value ||
        "all"
    }
  );
}

// ======================================================
// APEX ATHLETE PANEL
// ======================================================

function clearApexAthlete() {
  setText(
    "apex-predator-name",
    "No Apex Selected"
  );

  setText(
    "apex-predator-score",
    "---"
  );

  setText(
    "apex-athlete-school",
    "School N/A"
  );

  setText(
    "apex-athlete-sport-position",
    "Sport • Position"
  );

  setText(
    "apex-athlete-class",
    "Class N/A"
  );

  const apexAvatar =
    $("apex-athlete-avatar");

  if (apexAvatar) {
    apexAvatar.innerHTML = "👤";
  }

  const profileButton =
    $("apex-view-profile-btn");

  if (profileButton) {
    profileButton.onclick = null;
    profileButton.disabled = true;
  }
}

function updateApexAthlete(
  athleteRecord
) {
  if (!athleteRecord) {
    clearApexAthlete();
    return;
  }

  const athlete =
    athleteRecord.data || {};

  const athleteId =
    athleteRecord.id || "";

  const school =
    athlete.school ||
    athlete.schoolName ||
    athlete["school name"] ||
    "School N/A";

  const sport =
    athlete.sport ||
    "Sport";

  const position =
    athlete.position ||
    athlete.posion ||
    athlete.role ||
    "ATH";

  const classYear =
    athlete.classYear ||
    athlete.graduationYear ||
    athlete.gradYear ||
    "Class N/A";

  setText(
    "apex-predator-name",
    athlete.name ||
    "Unknown Athlete"
  );

  setText(
    "apex-predator-score",
    mergeRosterScores(athlete)
  );

  setText(
    "apex-athlete-school",
    school
  );

  setText(
    "apex-athlete-sport-position",
    `${sport} • ${position}`
  );

  setText(
    "apex-athlete-class",
    classYear
  );

  const apexAvatar =
    $("apex-athlete-avatar");

  if (apexAvatar) {
    const photoUrl =
      athlete.photoUrl ||
      athlete.profilePhoto ||
      "";

    apexAvatar.innerHTML =
      photoUrl
        ? `
            <img
              src="${escapeHtml(photoUrl)}"
              alt="${escapeHtml(
                athlete.name ||
                "Athlete"
              )}"
              class="h-full w-full object-cover">
          `
        : "👤";
  }

  const profileButton =
    $("apex-view-profile-btn");

  if (profileButton) {
    profileButton.disabled = false;

    profileButton.onclick =
      () => {
        window
          .openAthleteFromDirectory
          ?.(athleteId);
      };
  }
}

// ======================================================
// ATHLETE MATRIX ROW
// ======================================================

function renderAdminAthleteRow(
  athleteRecord
) {
  const id =
    athleteRecord.id || "";

  const athlete =
    athleteRecord.data || {};

  const athleteName =
    athlete.name ||
    "Unnamed Athlete";

  const school =
    athlete.school ||
    athlete.schoolName ||
    athlete["school name"] ||
    "School N/A";

  const sport =
    athlete.sport ||
    "Sport N/A";

  const position =
    athlete.position ||
    athlete.posion ||
    athlete.role ||
    "ATH";

  const classYear =
    athlete.classYear ||
    athlete.graduationYear ||
    athlete.gradYear ||
    "N/A";

  const zeusRating =
  getAthleteZeusRating(
    athlete
  );

  const offers =
    normalizeCommaList(
      athlete.offers
    );

  const recruitingStatus =
    getAthleteRecruitingStatus(
      athlete
    );

  const statusClasses =
    getRecruitingStatusClasses(
      recruitingStatus
    );

  const hasFilm =
    athleteHasFilm(athlete);

  const verified =
    Boolean(
      athlete.verified ||
      athlete.isVerified ||
      athlete.profileVerified
    );

  const photoUrl =
    athlete.photoUrl ||
    athlete.profilePhoto ||
    "assets/football1.jpg";

  const isSelected =
    activeSelectedAthleteId === id;

  const rowClasses =
    isSelected
      ? (
          "bg-zeus-gold/10 " +
          "border-l-2 " +
          "border-zeus-gold"
        )
      : (
          "border-t " +
          "border-zeus-border"
        );

  const cityState =
    [
      athlete.city,
      athlete.state
    ]
      .filter(Boolean)
      .join(", ");

  return `
    <tr
      class="${rowClasses} cursor-pointer transition hover:bg-zeus-gold/5"
      data-athlete-id="${escapeHtml(id)}">

      <td class="min-w-[210px] p-3">

        <div class="flex items-center gap-3">

          <img
            src="${escapeHtml(photoUrl)}"
            alt="${escapeHtml(athleteName)}"
            class="h-10 w-10 rounded-full border border-zeus-border bg-zeus-panel object-cover">

          <div class="min-w-0">

            <div class="flex items-center gap-1.5">

              <strong class="truncate text-xs text-white">
                ${escapeHtml(athleteName)}
              </strong>

              ${
                verified
                  ? `
                      <span
                        class="text-[10px] text-green-400"
                        title="Verified Athlete">

                        ✓

                      </span>
                    `
                  : ""
              }

            </div>

            <small class="block text-[9px] uppercase tracking-wide text-gray-600">
              ${
                escapeHtml(cityState) ||
                "Location N/A"
              }
            </small>

          </div>

        </div>

      </td>

      <td class="min-w-[160px] p-3">
        <span class="text-xs text-gray-300">
          ${escapeHtml(school)}
        </span>
      </td>

      <td class="whitespace-nowrap p-3 text-center">
        <span class="text-xs font-bold text-white">
          ${escapeHtml(sport)}
        </span>
      </td>

      <td class="p-3 text-center">
        <span
          class="inline-flex min-w-[38px] justify-center rounded border border-zeus-border bg-zeus-panel px-2 py-1 text-[10px] font-bold uppercase text-gray-300">

          ${escapeHtml(position)}

        </span>
      </td>

      <td class="p-3 text-center">
        <span class="text-xs text-gray-300">
          ${escapeHtml(classYear)}
        </span>
      </td>

      <td class="p-3 text-center">
        <strong class="text-sm font-black text-zeus-gold">
          ${zeusRating}
        </strong>
      </td>

      <td class="p-3 text-center">

        ${
          hasFilm
            ? `
                <button
                  type="button"
                  data-athlete-film="${escapeHtml(id)}"
                  class="inline-flex items-center gap-1 rounded border border-zeus-gold/20 bg-zeus-goldSoft px-2 py-1 text-[9px] font-bold uppercase text-zeus-gold transition hover:bg-zeus-gold hover:text-black">

                  🎥 Film

                </button>
              `
            : `
                <span class="text-[10px] uppercase text-gray-700">
                  None
                </span>
              `
        }

      </td>

      <td class="p-3 text-center">
        <span
          class="inline-flex min-w-[32px] justify-center rounded border border-zeus-border bg-zeus-panel px-2 py-1 text-[10px] font-black text-gray-300">

          ${offers.length}

        </span>
      </td>

      <td class="min-w-[120px] p-3 text-center">
        <span
          class="inline-flex rounded border px-2 py-1 text-[9px] font-bold uppercase tracking-wide ${statusClasses}">

          ${escapeHtml(
            recruitingStatus
          )}

        </span>
      </td>

      <td class="min-w-[240px] p-3 text-right">

        <div class="flex flex-wrap items-center justify-end gap-1">

          <button
            type="button"
            data-athlete-view="${escapeHtml(id)}"
            class="rounded border border-zeus-border bg-zeus-panel px-2 py-1 font-mono text-[9px] font-bold uppercase text-gray-300 transition hover:border-zeus-gold hover:text-zeus-gold">

            View

          </button>

          <button
            type="button"
            data-athlete-edit="${escapeHtml(id)}"
            class="rounded border border-blue-900/60 bg-blue-950/40 px-2 py-1 font-mono text-[9px] font-bold uppercase text-blue-300 transition hover:bg-blue-800 hover:text-white">

            Edit

          </button>

          <button
            type="button"
            data-athlete-draft="1"
            data-athlete-id="${escapeHtml(id)}"
            class="rounded border border-zeus-gold/20 bg-zeus-goldSoft px-2 py-1 font-mono text-[9px] font-bold uppercase text-zeus-gold transition hover:bg-zeus-gold hover:text-black">

            Draft A

          </button>

          <button
            type="button"
            data-athlete-draft="2"
            data-athlete-id="${escapeHtml(id)}"
            class="rounded border border-zeus-border bg-gray-900 px-2 py-1 font-mono text-[9px] font-bold uppercase text-gray-400 transition hover:bg-gray-700 hover:text-white">

            Draft B

          </button>

          <button
            type="button"
            data-athlete-draft="3"
            data-athlete-id="${escapeHtml(id)}"
            class="rounded border border-zeus-gold bg-zeus-gold px-2 py-1 font-mono text-[9px] font-bold uppercase text-black transition hover:bg-yellow-400">

            National

          </button>

        </div>

      </td>

    </tr>
  `;
}

// ======================================================
// ATHLETE MATRIX RENDERER
// ======================================================

function processAndRenderFilteredAthletes() {
  const gridBody =
    $("match-grid-body");

  if (!gridBody) {
    return;
  }

  const filteredAthletes =
    getFilteredAthletes();

  setText(
    "grid-count-badge",
    `${filteredAthletes.length} Active Athletes`
  );

  if (!filteredAthletes.length) {
    gridBody.innerHTML = `
      <tr>

        <td
          colspan="10"
          class="p-8 text-center">

          <div class="flex flex-col items-center gap-2">

            <span class="text-3xl">
              👤
            </span>

            <strong class="text-sm text-white">
              No athletes found
            </strong>

            <p class="text-xs text-gray-500">
              No athlete profiles match
              the selected filters.
            </p>

          </div>

        </td>

      </tr>
    `;

    clearApexAthlete();
    return;
  }

  const sortedAthletes =
    [...filteredAthletes].sort(
      (first, second) =>
        mergeRosterScores(
          second.data
        ) -
        mergeRosterScores(
          first.data
        )
    );

  updateApexAthlete(
    sortedAthletes[0]
  );

  gridBody.innerHTML =
    sortedAthletes
      .map(renderAdminAthleteRow)
      .join("");

  gridBody.onclick = (
    event
  ) => {
    const viewButton =
      event.target.closest(
        "[data-athlete-view]"
      );

    if (viewButton) {
      event.stopPropagation();

      window
        .openAthleteFromDirectory
        ?.(viewButton.dataset.athleteView);

      return;
    }

    const editButton =
      event.target.closest(
        "[data-athlete-edit]"
      );

    if (editButton) {
      event.stopPropagation();

      window
        .editAthleteFromGrid
        ?.(editButton.dataset.athleteEdit);

      return;
    }

    const filmButton =
      event.target.closest(
        "[data-athlete-film]"
      );

    if (filmButton) {
      event.stopPropagation();

      const athleteId =
        filmButton.dataset
          .athleteFilm;

      activeSelectedAthleteId =
        athleteId;

      selectAthleteFilm({
        athleteId,

        records:
          allAthletesCache,

        onSetActiveAthlete:
          window.setActiveAthlete,

        onPlayHighlight:
          playHighlight
      });

      return;
    }

    const draftButton =
      event.target.closest(
        "[data-athlete-draft]"
      );

    if (draftButton) {
      event.stopPropagation();

      window.inlineDraftDispatch?.(
        draftButton.dataset
          .athleteId,

        Number(
          draftButton.dataset
            .athleteDraft
        )
      );

      return;
    }

    const row =
      event.target.closest(
        "tr[data-athlete-id]"
      );

    if (!row) {
      return;
    }

    const athleteId =
      row.dataset.athleteId;

    const record =
      allAthletesCache.find(
        (item) =>
          item.id === athleteId
      );

    if (!record) {
      return;
    }

    const selection =
      selectAthleteFromMatrix({
        athleteId,

        records:
          allAthletesCache,

        tableBody:
          gridBody,

        onSetActiveAthlete:
          window.setActiveAthlete,

        onPlayHighlight:
          playHighlight,

        onSelectionChange: ({
          athlete,
          athleteId:
            selectedAthleteId,
          videoCount
        }) => {
          activeSelectedAthleteId =
            selectedAthleteId;

          setText(
            "upload-progress-sub",
            `BOUNDING TARGET: ${
              (
                athlete.name ||
                "Athlete"
              ).substring(0, 20)
            }`
          );

          setText(
            "upload-count-badge",
            `Uploads: ${videoCount}`
          );

          $("media-locker-container")
            ?.classList.add(
              "border-zeus-gold",
              "shadow-[0_0_15px_rgba(212,175,55,0.15)]"
            );
        }
      });

    if (!selection) {
      console.warn(
        "Athlete matrix selection failed:",
        athleteId
      );
    }
  };
}                  

// ======================================================
// HIGHLIGHT AUTOPLAY
// ======================================================

let highlightObserver = null;

function initializeHighlightAutoplay() {
  if (highlightObserver) {
    highlightObserver.disconnect();
  }

  const videos = Array.from(
    document.querySelectorAll(
      ".highlight-reel-video"
    )
  );

  if (!videos.length) {
    return;
  }

  highlightObserver =
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video =
            entry.target;

          if (
            entry.isIntersecting
          ) {
            video
              .play()
              .catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.65
      }
    );

  videos.forEach((video) => {
    highlightObserver.observe(video);
  });
}

// ======================================================
// ATHLETE DATA NORMALIZATION
// ======================================================

function buildAthleteDuplicateKey(
  athlete = {}
) {
  const normalize = (
    value = ""
  ) =>
    String(value ?? "")
      .trim()
      .toLowerCase();

  return [
    normalize(athlete.name),
    normalize(athlete.sport),
    normalize(
      athlete.school ||
      athlete.schoolName ||
      athlete["school name"]
    ),
    normalize(
      athlete.classYear ||
      athlete.graduationYear ||
      athlete.gradYear
    )
  ].join("|");
}

function buildUniqueAthleteCache(
  records = []
) {
  const uniqueAthletes =
    new Map();

  records.forEach((item) => {
    const athlete =
      item?.data || {};

    if (
      athlete.recordType &&
      athlete.recordType !==
        "athlete"
    ) {
      return;
    }

    const duplicateKey =
      buildAthleteDuplicateKey(
        athlete
      );

    const existing =
      uniqueAthletes.get(
        duplicateKey
      );

    if (!existing) {
      uniqueAthletes.set(
        duplicateKey,
        item
      );

      return;
    }

    const existingScore =
      mergeRosterScores(
        existing.data
      );

    const incomingScore =
      mergeRosterScores(
        athlete
      );

    if (
      incomingScore >
      existingScore
    ) {
      uniqueAthletes.set(
        duplicateKey,
        item
      );
    }
  });

  return Array.from(
    uniqueAthletes.values()
  ).sort(
    (first, second) =>
      mergeRosterScores(
        second.data
      ) -
      mergeRosterScores(
        first.data
      )
  );
}

function refreshAthleteDependentViews() {
  processAndRenderFilteredAthletes();

  renderAthleteDirectoryPage();
  renderHighlightFeedPage();
  renderRankings();
  renderSchools();
  renderRecruiting();
  renderLiveGames();
  renderMarketplace();
  renderZeusAI();

  updateAdminAnalytics();

  setText(
    "athlete-count",
    allAthletesCache.length
  );

  if (!activeSelectedAthleteId) {
    return;
  }

  const selectedRecord =
    allAthletesCache.find(
      (item) =>
        item.id ===
        activeSelectedAthleteId
    );

  if (!selectedRecord) {
    activeSelectedAthleteId =
      null;

    window.appState
      .activeAthleteId = null;

    window.appState
      .activeAthlete = null;

    setText(
      "upload-count-badge",
      "Uploads: 0"
    );

    return;
  }

  const videoCount =
    Array.isArray(
      selectedRecord.data.videos
    )
      ? selectedRecord
          .data
          .videos
          .length
      : athleteHasFilm(
            selectedRecord.data
          )
        ? 1
        : 0;

  setText(
    "upload-count-badge",
    `Uploads: ${videoCount}`
  );
}

// ======================================================
// FIRESTORE ATHLETE SUBSCRIPTION
// ======================================================

function subscribeToAthletes() {
  if (unsubscribeAthletes) {
    return;
  }

  unsubscribeAthletes =
    subscribeToAthleteRecords({
      db,

      normalizeRecord:
        normalizeAthleteRecord,

      maxResults: 120,

      onData: (
        athleteRecords
      ) => {
        allAthletesCache =
          athleteRecords;

        window.appState.athletes =
          allAthletesCache.map(
            (item) => ({
              id: item.id,
              ...item.data
            })
          );

        refreshAthleteDependentViews();
      },

      onError: (error) => {
        console.error(
          "Unable to load athletes:",
          error
        );
      }
    });
}

// ======================================================
// SPORTS FEED SUBSCRIPTION
// ======================================================

function subscribeToSportsFeed() {
  if (unsubscribeFeedPosts) {
    return;
  }

  unsubscribeFeedPosts =
    subscribeToFeedPosts(
      db,

      (posts) => {
        allFeedPostsCache =
          Array.isArray(posts)
            ? posts
            : [];

        window.appState.feedPosts =
          allFeedPostsCache;

        const feedPage =
          document.getElementById(
            "sports-feed-page"
          );

        if (feedPage) {
          renderSportsFeed();
        }
      },

      {
        maxResults: 100,
        status: "published"
      }
    );
}

// ======================================================
// ADMIN VIDEO MANAGEMENT
// ======================================================

async function addVideoToTitan(
  athleteId,
  videoTitle,
  videoUrl
) {
  if (
    !isAdminProfile(
      currentProfile
    )
  ) {
    throw new Error(
      "Admin access denied."
    );
  }

  const normalizedTitle =
    String(
      videoTitle || ""
    ).trim();

  const normalizedUrl =
    String(
      videoUrl || ""
    ).trim();

  if (
    !athleteId ||
    !normalizedTitle ||
    !normalizedUrl
  ) {
    throw new Error(
      "Athlete ID, video title, and URL are required."
    );
  }

  const athleteReference =
    doc(
      db,
      "athletes",
      athleteId
    );

  await updateDoc(
    athleteReference,
    {
      videos:
        arrayUnion({
          title:
            normalizedTitle,

          url:
            normalizedUrl,

          createdAt:
            new Date()
              .toISOString(),

          createdBy:
            currentUser?.uid ||
            "unknown"
        }),

      updatedAt:
        serverTimestamp()
    }
  );
}

// ======================================================
// AUTHENTICATED USER LIFECYCLE
// ======================================================

async function handleSignedInUser(
  user
) {
  currentUser = user;

  window.appState.currentUser =
    user;

  try {
    const profileSnapshot =
      await getDoc(
        doc(
          db,
          "users",
          user.uid
        )
      );

    currentProfile =
      profileSnapshot.exists()
        ? profileSnapshot.data()
        : {
            uid: user.uid,
            email:
              user.email || "",
            role: "fan",
            nickname:
              user.displayName ||
              user.email ||
              "Sports Fan"
          };

    window.appState.currentProfile =
      currentProfile;

    updateAccessUI(
      currentProfile
    );

    subscribeToAthletes();
    subscribeToSportsFeed();
    subscribeToChat();
  } catch (error) {
    console.error(
      "Signed-in user initialization failed:",
      error
    );

    currentProfile = null;

    window.appState.currentProfile =
      null;

    updateAccessUI(null);
  } finally {
    hide("loading-overlay");
  }
}

// ======================================================
// WAR ROOM CHAT
// ======================================================

function renderChatMessage(
  message = {}
) {
  const display =
    $("chat-box-display");

  if (!display) {
    return;
  }

  const nickname =
    message.nickname ||
    message.email ||
    "User";

  const text =
    message.text || "";

  const row =
    document.createElement(
      "div"
    );

  row.className =
    "animate-feed-slide " +
    "font-mono text-[11px] " +
    "leading-relaxed text-gray-300";

  row.innerHTML = `
    <span class="font-bold text-zeus-gold">
      [${escapeHtml(nickname)}]:
    </span>

    <span>
      ${escapeHtml(text)}
    </span>
  `;

  display.appendChild(row);

  display.scrollTop =
    display.scrollHeight;
}

function subscribeToChat() {
  if (unsubscribeChat) {
    return;
  }

  const messagesQuery =
    rtdbQuery(
      rtdbRef(
        rtdb,
        "warRoomMessages"
      ),
      limitToLast(40)
    );

  unsubscribeChat =
    onValue(
      messagesQuery,

      (snapshot) => {
        const display =
          $("chat-box-display");

        if (!display) {
          return;
        }

        display.innerHTML = `
          <div class="text-gray-600">
            [System]: Connection secure.
            Welcome to the Admin War Room.
          </div>
        `;

        snapshot.forEach(
          (childSnapshot) => {
            renderChatMessage(
              childSnapshot.val()
            );
          }
        );
      },

      (error) => {
        console.error(
          "Chat subscription failed:",
          error
        );
      }
    );
}

async function sendChatMessage() {
  const input =
    $("chat-message-input");

  const text =
    input?.value
      .trim() || "";

  if (
    !text ||
    !currentUser ||
    !currentProfile
  ) {
    return;
  }

  try {
    await push(
      rtdbRef(
        rtdb,
        "warRoomMessages"
      ),
      {
        text,

        uid:
          currentUser.uid,

        email:
          currentUser.email ||
          "",

        nickname:
          currentProfile.nickname ||
          currentProfile.email ||
          "User",

        createdAt:
          rtdbServerTimestamp()
      }
    );

    if (input) {
      input.value = "";
    }
  } catch (error) {
    console.error(
      "Chat message failed:",
      error
    );

    alert(
      "Your chat message could not be sent."
    );
  }
}

// ======================================================
// REAL-TIME SPORTS TICKER
// ======================================================

const ST_LOUIS_TICKER_ALERTS = [
  {
    prefix: "🏈 [NFL]",
    text:
      "Mini-camp intensity spiking; veteran defensive sets showing +12% efficiency.",
    color: "text-zeus-gold"
  },
  {
    prefix: "🏀 [NBA]",
    text:
      "Finals series intensity reaching apex levels; court-side telemetry data locked.",
    color: "text-white"
  },
  {
    prefix: "⚾ [MLB]",
    text:
      "Mid-season pitching rotation adjusted for high-heat summer weather.",
    color: "text-gray-300"
  },
  {
    prefix: "🏒 [NHL]",
    text:
      "Stanley Cup playoffs entering high-stakes overtime simulation mode.",
    color: "text-white"
  },
  {
    prefix: "⚽ [MLS]",
    text:
      "CITY SC maintaining aggressive high-press transition against defensive lines.",
    color: "text-zeus-gold"
  },
  {
    prefix: "🎾 [ATP/WTA]",
    text:
      "Grand Slam circuit updates: baseline rally duration trending upward.",
    color: "text-gray-400"
  },
  {
    prefix: "🎓 [COLLEGE]",
    text:
      "Spring camp drills concluding; incoming roster depth charts finalized.",
    color: "text-zeus-gold"
  },
  {
    prefix: "🦅 [CFL]",
    text:
      "Pre-season training camp coverage hitting peak operational velocity.",
    color: "text-zeus-gold"
  },
  {
    prefix: "🚨 [SYSTEM]",
    text:
      "Cross-league data ingestion: all global sports tickers synchronized.",
    color: "text-red-400"
  }
];

let liveTickerInterval = null;

function initializeLiveSportsTicker() {
  const container =
    $("live-feed-container");

  if (!container) {
    return;
  }

  if (liveTickerInterval) {
    clearInterval(
      liveTickerInterval
    );

    liveTickerInterval = null;
  }

  container.innerHTML = `
    <div class="animate-feed-slide text-zeus-gold/80">
      🛰️ [SYSTEM]: Global Feed Sync active...
    </div>
  `;

  liveTickerInterval =
    window.setInterval(
      () => {
        const item =
          ST_LOUIS_TICKER_ALERTS[
            Math.floor(
              Math.random() *
              ST_LOUIS_TICKER_ALERTS.length
            )
          ];

        if (!item) {
          return;
        }

        const alertRow =
          document.createElement(
            "div"
          );

        alertRow.className = [
          "animate-feed-slide",
          "mt-1",
          "flex",
          "flex-col",
          "border-t",
          "border-zeus-border/40",
          "pt-1",
          "font-mono",
          "text-xs",
          "sm:flex-row",
          "sm:space-x-2",
          item.color
        ].join(" ");

        alertRow.innerHTML = `
          <span class="shrink-0 font-bold">
            ${escapeHtml(item.prefix)}
          </span>

          <span class="text-gray-300">
            ${escapeHtml(item.text)}
          </span>
        `;

        container.appendChild(
          alertRow
        );

        while (
          container.children.length >
          20
        ) {
          container.removeChild(
            container.firstElementChild
          );
        }

        container.scrollTop =
          container.scrollHeight;
      },
      3000
    );
}

// ======================================================
// MARKETPLACE PRODUCT HELPERS
// ======================================================

function normalizeMarketplaceProduct(
  product = {}
) {
  const name =
    product.name ||
    product.title ||
    "Untitled Product";

  const numericPrice =
    Number(product.price);

  return {
    ...product,

    name,

    price:
      Number.isFinite(
        numericPrice
      )
        ? numericPrice
        : 0,

    image:
      product.image ||
      product.imageUrl ||
      "assets/gear-placeholder.png",

    location:
      product.location ||
      "US Shipping",

    storeName:
      product.storeName ||
      "Snt.L.Mo. Exclusive",

    isExternal:
      product.isExternal === true
  };
}

function formatMarketplacePrice(
  price
) {
  const numericPrice =
    Number(price);

  return Number.isFinite(
    numericPrice
  )
    ? `$${numericPrice.toFixed(2)}`
    : "$0.00";
}

// ======================================================
// MARKETPLACE GRID
// ======================================================

function renderGlobalGearMarketplace(
  products = []
) {
  const container =
    $("gear-grid-container");

  if (!container) {
    return;
  }

  const normalizedProducts =
    Array.isArray(products)
      ? products.map(
          normalizeMarketplaceProduct
        )
      : [];

  if (
    !normalizedProducts.length
  ) {
    container.innerHTML = `
      <div class="col-span-full rounded-xl border border-zeus-border bg-zeus-black/60 p-8 text-center">

        <span class="text-3xl">
          🛍️
        </span>

        <strong class="mt-3 block text-sm text-white">
          No marketplace items available
        </strong>

        <p class="mt-1 text-xs text-gray-500">
          Products will appear here when inventory is published.
        </p>

      </div>
    `;

    return;
  }

  container.innerHTML =
    normalizedProducts
      .map(
        (product, index) => `
          <article
            class="group flex flex-col justify-between rounded-xl border border-zeus-border bg-zeus-black/60 p-3 transition hover:border-zeus-gold/30"
            data-marketplace-card="${index}">

            <div>

              <div class="mb-2 flex items-center justify-between gap-2">

                <span class="font-mono text-[8px] uppercase tracking-wider text-gray-500">
                  ${escapeHtml(
                    product.location
                  )}
                </span>

                <span
                  class="rounded border border-zeus-gold/20 bg-zeus-goldSoft px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wide text-zeus-gold">

                  ${
                    product.isExternal
                      ? escapeHtml(
                          product.storeName
                        )
                      : "Snt.L.Mo. Exclusive"
                  }

                </span>

              </div>

              <div
                class="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded border border-zeus-border bg-zeus-panel p-2">

                <img
                  src="${escapeHtml(
                    product.image
                  )}"
                  alt="${escapeHtml(
                    product.name
                  )}"
                  class="absolute inset-0 h-full w-full object-cover"
                  loading="lazy">

              </div>

              <div class="mt-2">

                <h3
                  class="truncate text-[10px] font-bold tracking-tight text-white"
                  title="${escapeHtml(
                    product.name
                  )}">

                  ${escapeHtml(
                    product.name
                  )}

                </h3>

                <p class="mt-0.5 font-mono text-xs font-black text-zeus-gold">
                  ${formatMarketplacePrice(
                    product.price
                  )}
                </p>

              </div>

            </div>

            <button
              type="button"
              data-marketplace-open="${index}"
              class="mt-3 w-full rounded border border-zeus-border bg-zeus-panel px-2 py-1.5 font-mono text-[9px] font-bold uppercase text-gray-400 transition hover:bg-zeus-gold hover:text-black">

              View Details

            </button>

          </article>
        `
      )
      .join("");

  container.onclick = (
    event
  ) => {
    const button =
      event.target.closest(
        "[data-marketplace-open]"
      );

    if (!button) {
      return;
    }

    const productIndex =
      Number(
        button.dataset
          .marketplaceOpen
      );

    const product =
      normalizedProducts[
        productIndex
      ];

    if (product) {
      openGearLightbox(
        product
      );
    }
  };
}

// ======================================================
// MARKETPLACE LIGHTBOX
// ======================================================

function openGearLightbox(
  product = {}
) {
  const modal =
    $("gear-lightbox-modal");

  if (!modal) {
    return;
  }

  const normalizedProduct =
    normalizeMarketplaceProduct(
      product
    );

  setText(
    "lightbox-title",
    normalizedProduct.name
  );

  setText(
    "lightbox-price",
    formatMarketplacePrice(
      normalizedProduct.price
    )
  );

  const subtitle =
    normalizedProduct.isExternal
      ? `Available via ${
          normalizedProduct.storeName
        } (${
          normalizedProduct.location ||
          "Global"
        })`
      : (
          normalizedProduct.sub ||
          '"Dominate Today" Edition'
        );

  setText(
    "lightbox-sub",
    subtitle
  );

  const iconElement =
    $("lightbox-icon");

  if (iconElement) {
    iconElement.textContent =
      normalizedProduct.isExternal
        ? "👟"
        : (
            normalizedProduct.icon ||
            "🧥"
          );
  }

  const checkoutButton =
    $("lightbox-checkout-btn");

  if (checkoutButton) {
    checkoutButton.dataset
      .productPayload =
      JSON.stringify(
        normalizedProduct
      );

    checkoutButton.textContent =
      normalizedProduct.isExternal
        ? `Buy via ${
            normalizedProduct.storeName
          }`
        : "Secure Local Checkout";

    checkoutButton.className =
      normalizedProduct.isExternal
        ? (
            "block w-full cursor-pointer rounded-lg " +
            "bg-white py-3 text-center text-xs font-black " +
            "uppercase tracking-wider text-black transition-all"
          )
        : (
            "block w-full cursor-pointer rounded-lg " +
            "bg-zeus-gold py-3 text-center text-xs font-black " +
            "uppercase tracking-wider text-black transition-all " +
            "hover:bg-yellow-400"
          );
  }

  modal.classList.remove(
    "hidden"
  );
}

let gearLightboxInitialized =
  false;

function initializeGearLightbox() {
  if (gearLightboxInitialized) {
    return;
  }

  gearLightboxInitialized =
    true;

  $("gear-view-tee")
    ?.addEventListener(
      "click",
      () => {
        openGearLightbox({
          name:
            "Wolverines Premium Tee",

          sub:
            '"Outwork Yesterday" Edition',

          price: 30,

          isExternal: false,

          stripePriceId:
            "price_tee_123",

          icon: "👕"
        });
      }
    );

  $("gear-view-hoodie")
    ?.addEventListener(
      "click",
      () => {
        openGearLightbox({
          name:
            "Snt.L.Mo Elite Hoodie",

          sub:
            '"Dominate Today" Heavyweight',

          price: 65,

          isExternal: false,

          stripePriceId:
            "price_1QxXYZ123456",

          icon: "🧥"
        });
      }
    );

  $("gear-lightbox-close")
    ?.addEventListener(
      "click",
      () => {
        $("gear-lightbox-modal")
          ?.classList.add(
            "hidden"
          );
      }
    );

  $("gear-lightbox-modal")
    ?.addEventListener(
      "click",
      (event) => {
        if (
          event.target.id ===
          "gear-lightbox-modal"
        ) {
          event.currentTarget
            .classList.add(
              "hidden"
            );
        }
      }
    );

  $("lightbox-checkout-btn")
    ?.addEventListener(
      "click",
      (event) => {
        const payloadRaw =
          event.currentTarget
            .dataset
            .productPayload;

        if (!payloadRaw) {
          return;
        }

        let product;

        try {
          product =
            JSON.parse(
              payloadRaw
            );
        } catch (error) {
          console.error(
            "Marketplace product payload is invalid:",
            error
          );

          return;
        }

        if (
          product.isExternal
        ) {
          if (
            product.affiliateUrl
          ) {
            window.open(
              product.affiliateUrl,
              "_blank",
              "noopener,noreferrer"
            );
          } else {
            alert(
              "This external product does not have a valid purchase link."
            );
          }

          return;
        }

        if (
          typeof redirectToStripeCheckout ===
          "function"
        ) {
          redirectToStripeCheckout(
            product.stripePriceId
          );
        } else {
          alert(
            `Launching checkout for ${
              product.name ||
              "this product"
            }...`
          );
        }
      }
    );
}

// ======================================================
// CLOUD INVENTORY SUBSCRIPTION
// ======================================================

let unsubscribeMarketplace = null;

function loadLiveGearMarketplace() {
  if (unsubscribeMarketplace) {
    return;
  }

  const merchandiseCollection =
    collection(
      db,
      "merchandise"
    );

  unsubscribeMarketplace =
    onSnapshot(
      merchandiseCollection,

      (snapshot) => {
        const products =
          snapshot.docs.map(
            (productDocument) => ({
              id:
                productDocument.id,

              ...productDocument.data()
            })
          );

        renderGlobalGearMarketplace(
          products
        );
      },

      (error) => {
        console.error(
          "Marketplace inventory subscription failed:",
          error
        );

        renderGlobalGearMarketplace(
          []
        );
      }
    );
}

// ======================================================
// ADMIN PAGE RENDERER
// ======================================================

function renderAdmin() {
  const root =
    document.getElementById(
      "admin-platform"
    );

  if (!root) {
    return;
  }

  root.innerHTML =
    renderAdminPage();

  updateAdminAnalytics();

  processAndRenderFilteredAthletes();

  renderDraftBoards();

  initializeMediaLockerEngine();
}

// ======================================================
// ADMIN ANALYTICS HELPERS
// ======================================================

function normalizeAnalyticsValue(
  value = ""
) {
  return String(value ?? "")
    .trim();
}

function getAthleteVideos(
  athlete = {}
) {
  return Array.isArray(
    athlete.videos
  )
    ? athlete.videos.filter(
        Boolean
      )
    : [];
}

function getAthleteVideoCount(
  athlete = {}
) {
  const videos =
    getAthleteVideos(athlete);

  if (videos.length) {
    return videos.length;
  }

  return athleteHasFilm(athlete)
    ? 1
    : 0;
}

function getAthleteVideoMetric(
  athlete = {},
  metricName
) {
  return getAthleteVideos(
    athlete
  ).reduce(
    (total, video) =>
      total +
      safeNumber(
        video?.[metricName]
      ),
    0
  );
}

function buildFrequencyMap(
  values = []
) {
  return values.reduce(
    (totals, value) => {
      const normalized =
        normalizeAnalyticsValue(
          value
        );

      if (!normalized) {
        return totals;
      }

      totals[normalized] =
        (
          totals[normalized] ||
          0
        ) + 1;

      return totals;
    },
    {}
  );
}

function getTopFrequencyEntry(
  frequencyMap = {}
) {
  return (
    Object.entries(
      frequencyMap
    )
      .sort(
        (first, second) =>
          second[1] -
          first[1]
      )[0] ||
    ["None", 0]
  );
}

function getTrendingAthlete(
  athletes = []
) {
  return athletes.reduce(
    (
      currentLeader,
      athlete
    ) => {
      const likes =
        getAthleteVideoMetric(
          athlete,
          "likes"
        );

      const views =
        getAthleteVideoMetric(
          athlete,
          "views"
        );

      const zeusRating =
        safeNumber(
          athlete.zeusRating ||
          athlete.total ||
          mergeRosterScores(
            athlete
          )
        );

      const trendScore =
        zeusRating +
        likes +
        Math.floor(
          views / 100
        );

      if (
        trendScore <=
        currentLeader.score
      ) {
        return currentLeader;
      }

      return {
        name:
          athlete.name ||
          "Unknown Athlete",

        sport:
          athlete.sport ||
          "Sport",

        score:
          trendScore
      };
    },
    {
      name: "None",
      sport: "",
      score: 0
    }
  );
}

// ======================================================
// ADMIN ANALYTICS
// ======================================================

function updateAdminAnalytics() {
  const athletes =
    allAthletesCache.map(
      (item) =>
        item?.data || {}
    );

  const totalAthletes =
    athletes.length;

  const schoolNames =
    athletes
      .map(
        (athlete) =>
          athlete.school ||
          athlete.schoolName ||
          athlete["school name"] ||
          ""
      )
      .map(
        normalizeAnalyticsValue
      )
      .filter(Boolean);

  const stateNames =
    athletes
      .map(
        (athlete) =>
          normalizeAnalyticsValue(
            athlete.state
          ).toUpperCase()
      )
      .filter(Boolean);

  const schools =
    new Set(
      schoolNames.map(
        (school) =>
          school.toLowerCase()
      )
    );

  const states =
    new Set(stateNames);

  const totalVideos =
    athletes.reduce(
      (
        total,
        athlete
      ) =>
        total +
        getAthleteVideoCount(
          athlete
        ),
      0
    );

  const totalLikes =
    athletes.reduce(
      (
        total,
        athlete
      ) =>
        total +
        getAthleteVideoMetric(
          athlete,
          "likes"
        ),
      0
    );

  const totalViews =
    athletes.reduce(
      (
        total,
        athlete
      ) =>
        total +
        getAthleteVideoMetric(
          athlete,
          "views"
        ),
      0
    );

  const recruiterCount =
    Math.max(
      Math.round(
        totalAthletes *
        0.35
      ),
      0
    );

  const reportCount =
    Math.round(
      totalVideos *
      1.4
    );

  const sportFrequency =
    buildFrequencyMap(
      athletes.map(
        (athlete) =>
          athlete.sport ||
          "Unknown"
      )
    );

  const fastestSport =
    getTopFrequencyEntry(
      sportFrequency
    );

  const schoolFrequency =
    buildFrequencyMap(
      schoolNames
    );

  const topSchool =
    getTopFrequencyEntry(
      schoolFrequency
    );

  const trendingAthlete =
    getTrendingAthlete(
      athletes
    );

  // ====================================================
  // PRIMARY ANALYTICS CARDS
  // ====================================================

  setText(
    "admin-athlete-count",
    totalAthletes.toLocaleString()
  );

  setText(
    "admin-school-count",
    schools.size.toLocaleString()
  );

  setText(
    "admin-state-count",
    states.size.toLocaleString()
  );

  setText(
    "admin-video-count",
    totalVideos.toLocaleString()
  );

  setText(
    "admin-like-count",
    totalLikes.toLocaleString()
  );

  setText(
    "admin-view-count",
    totalViews.toLocaleString()
  );

  setText(
    "admin-recruiter-count",
    recruiterCount.toLocaleString()
  );

  setText(
    "admin-report-count",
    reportCount.toLocaleString()
  );

  setText(
    "admin-map-state-count",
    states.size.toLocaleString()
  );

  // ====================================================
  // PLATFORM LEADERS
  // ====================================================

  setText(
    "admin-fastest-sport",
    fastestSport[0]
  );

  setText(
    "admin-fastest-sport-detail",
    `${fastestSport[1]} athletes represented`
  );

  setText(
    "admin-trending-athlete",
    trendingAthlete.name
  );

  setText(
    "admin-trending-athlete-detail",
    trendingAthlete.score
      ? `${trendingAthlete.sport} • Trend score ${trendingAthlete.score}`
      : "No athlete activity yet"
  );

  setText(
    "admin-top-school",
    topSchool[0]
  );

  setText(
    "admin-top-school-detail",
    `${topSchool[1]} athletes represented`
  );

  renderAdminStateDistribution(
    athletes
  );
}

// ======================================================
// ADMIN STATE DISTRIBUTION
// ======================================================

const STATE_ALIASES = {
  alabama: "AL",
  alaska: "AK",
  arizona: "AZ",
  arkansas: "AR",
  california: "CA",
  colorado: "CO",
  connecticut: "CT",
  delaware: "DE",
  florida: "FL",
  georgia: "GA",
  hawaii: "HI",
  idaho: "ID",
  illinois: "IL",
  indiana: "IN",
  iowa: "IA",
  kansas: "KS",
  kentucky: "KY",
  louisiana: "LA",
  maine: "ME",
  maryland: "MD",
  massachusetts: "MA",
  michigan: "MI",
  minnesota: "MN",
  mississippi: "MS",
  missouri: "MO",
  montana: "MT",
  nebraska: "NE",
  nevada: "NV",
  "new hampshire": "NH",
  "new jersey": "NJ",
  "new mexico": "NM",
  "new york": "NY",
  "north carolina": "NC",
  "north dakota": "ND",
  ohio: "OH",
  oklahoma: "OK",
  oregon: "OR",
  pennsylvania: "PA",
  "rhode island": "RI",
  "south carolina": "SC",
  "south dakota": "SD",
  tennessee: "TN",
  texas: "TX",
  utah: "UT",
  vermont: "VT",
  virginia: "VA",
  washington: "WA",
  "west virginia": "WV",
  wisconsin: "WI",
  wyoming: "WY",
  "district of columbia": "DC"
};

function normalizeStateCode(value = "") {
  const cleaned =
    String(value ?? "")
      .trim();

  if (!cleaned) {
    return "";
  }

  if (cleaned.length === 2) {
    return cleaned.toUpperCase();
  }

  return (
    STATE_ALIASES[
      cleaned.toLowerCase()
    ] ||
    cleaned.toUpperCase()
  );
}

function renderAdminStateDistribution(
  athletes = []
) {
  const mapRoot =
    $("admin-us-map");

  const breakdownRoot =
    $("admin-state-breakdown");

  if (!mapRoot || !breakdownRoot) {
    return;
  }

  const stateTotals = {};

  athletes.forEach((athlete) => {
    const state =
      normalizeStateCode(
        athlete?.state
      );

    if (!state) {
      return;
    }

    stateTotals[state] =
      (stateTotals[state] || 0) + 1;
  });

  const stateEntries =
    Object.entries(stateTotals)
      .sort(
        (first, second) =>
          second[1] - first[1]
      );

  const athleteStateTotal =
    stateEntries.reduce(
      (total, [, count]) =>
        total + count,
      0
    );

  if (!stateEntries.length) {
    mapRoot.innerHTML = `
      <div class="admin-map-placeholder">

        <span>🇺🇸</span>

        <strong>
          No State Data Yet
        </strong>

        <p>
          Add state information to athlete profiles
          to activate the national distribution dashboard.
        </p>

      </div>
    `;

    breakdownRoot.innerHTML = `
      <div class="admin-empty-analytics">
        No state data available yet.
      </div>
    `;

    return;
  }

  const highestStateCount =
    stateEntries[0]?.[1] || 1;

  mapRoot.innerHTML = `
    <div class="admin-state-map-grid">

      ${stateEntries
        .map(
          ([state, count], index) => {
            const strength =
              Math.max(
                0.2,
                count /
                  highestStateCount
              );

            const percentage =
              athleteStateTotal
                ? Math.round(
                    (
                      count /
                      athleteStateTotal
                    ) * 100
                  )
                : 0;

            return `
              <button
                type="button"
                class="admin-state-map-tile"
                style="--state-strength:${strength}"
                data-admin-state="${escapeHtml(
                  state
                )}">

                <span class="admin-state-rank">
                  #${index + 1}
                </span>

                <strong>
                  ${escapeHtml(state)}
                </strong>

                <small>
                  ${count}
                  Athlete${count === 1 ? "" : "s"}
                </small>

                <em>
                  ${percentage}%
                </em>

              </button>
            `;
          }
        )
        .join("")}

    </div>
  `;

  breakdownRoot.innerHTML =
    stateEntries
      .map(
        ([state, count], index) => {
          const percentage =
            athleteStateTotal
              ? Math.round(
                  (
                    count /
                    athleteStateTotal
                  ) * 100
                )
              : 0;

          return `
            <div class="admin-state-breakdown-row">

              <div class="admin-state-breakdown-rank">
                ${index + 1}
              </div>

              <div class="admin-state-breakdown-name">

                <strong>
                  ${escapeHtml(state)}
                </strong>

                <span>
                  ${count}
                  athlete${count === 1 ? "" : "s"}
                </span>

              </div>

              <div class="admin-state-breakdown-bar">
                <i style="width:${percentage}%"></i>
              </div>

              <div class="admin-state-breakdown-percent">
                ${percentage}%
              </div>

            </div>
          `;
        }
      )
      .join("");

  mapRoot.onclick = (event) => {
    const stateButton =
      event.target.closest(
        "[data-admin-state]"
      );

    if (!stateButton) {
      return;
    }

    window.openAdminStateDetails?.(
      stateButton.dataset.adminState
    );
  };
}

window.openAdminStateDetails =
  function (state) {
    const normalizedState =
      normalizeStateCode(state);

    const athletesInState =
      allAthletesCache.filter(
        ({ data }) =>
          normalizeStateCode(
            data?.state
          ) === normalizedState
      );

    if (!athletesInState.length) {
      alert(
        `No athlete profiles found for ${normalizedState}.`
      );

      return;
    }

    const names =
      athletesInState
        .slice(0, 12)
        .map(
          ({ data }) =>
            `• ${
              data?.name ||
              "Unknown Athlete"
            }`
        )
        .join("\n");

    const remaining =
      athletesInState.length - 12;

    alert(
      `${normalizedState} Athlete Distribution\n\n` +
      names +
      (
        remaining > 0
          ? `\n\n+ ${remaining} more athlete${
              remaining === 1 ? "" : "s"
            }`
          : ""
      )
    );
  };

// ======================================================
// ADMIN SAVE HELPER
// ======================================================

async function saveAthleteFromAdmin(
  athleteData
) {
  const existingRecord =
    editingAthleteId
      ? allAthletesCache.find(
          (item) =>
            item.id ===
            editingAthleteId
        )
      : null;

  if (!editingAthleteId) {
    const duplicateRecord =
      findDuplicateAthlete(
        allAthletesCache,
        athleteData
      );

    if (duplicateRecord) {
      throw new Error(
        "This athlete already exists. Use Edit instead."
      );
    }
  }

  const result =
    await saveAthleteRecord({
      db,

      athleteData,

      athleteId:
        editingAthleteId,

      currentUserId:
        currentUser?.uid ||
        "unknown",

      existingRecord:
        existingRecord?.data ||
        null
    });

  editingAthleteId = null;

  alert(
    result.mode === "updated"
      ? "Athlete profile updated."
      : "Athlete added to the grid."
  );
}
        
// ======================================================
// RUNTIME INITIALIZATION
// ======================================================

const nationalDashboardRoot =
  document.getElementById(
    "national-dashboard-root"
  );

if (nationalDashboardRoot) {
  nationalDashboardRoot.innerHTML =
    renderNationalDashboard();
}

// ======================================================
// APPLICATION START
// ======================================================

initializePublicPlatform();

// ======================================================
// AUTHENTICATION STATE
// ======================================================

onAuthStateChanged(
  auth,
  async (user) => {
    const adminPlatform =
      document.getElementById(
        "admin-platform"
      );

    if (user) {
      await handleSignedInUser(user);

      if (
        isAdminProfile(
          currentProfile
        )
      ) {
        initializeAuthenticatedAdmin();
      } else if (adminPlatform) {
        adminPlatform.style.display =
          "none";
      }

      return;
    }

    currentUser = null;
    currentProfile = null;

    window.appState.currentUser =
      null;

    window.appState.currentProfile =
      null;

    updateAccessUI(null);
    hide("loading-overlay");

    if (adminPlatform) {
      adminPlatform.style.display =
        "none";
    }
  }
);

// ==========================================
// HIGHLIGHT FILM CENTER CONTROLS
// ==========================================

window.likeHighlight = function (
  id
) {
  const likesElement =
    document.getElementById(
      `likes-${id}`
    );

  if (!likesElement) {
    return;
  }

  const currentTotal =
    Number.parseInt(
      likesElement.textContent,
      10
    ) || 0;

  likesElement.textContent =
    String(currentTotal + 1);
};

window.shareHighlight =
  async function (id) {
    const highlightUrl =
      `${window.location.origin}` +
      `${window.location.pathname}` +
      `?highlight=${encodeURIComponent(id)}`;

    try {
      await navigator.clipboard.writeText(
        highlightUrl
      );

      alert(
        "Highlight link copied!"
      );
    } catch (error) {
      console.error(
        "Highlight link copy failed:",
        error
      );

      window.prompt(
        "Copy this highlight link:",
        highlightUrl
      );
    }
  };

window.zeusAnalyze = function (
  id
) {
  if (id) {
    const athleteRecord =
      allAthletesCache.find(
        (item) => item.id === id
      );

    if (athleteRecord) {
      window.setActiveAthlete(
        athleteRecord.id,
        athleteRecord.data
      );
    }
  }

  window
    .generateZeusScoutingReport
    ?.();
};

window.toggleReelSound =
  function (button) {
    const card =
      button?.closest(
        ".reel-card"
      );

    const video =
      card?.querySelector(
        "video"
      );

    if (!video) {
      return;
    }

    video.muted = !video.muted;

    button.textContent =
      video.muted
        ? "🔇"
        : "🔊";
  };

// ======================================================
// APPLICATION BOOT
// ======================================================

function initializePublicPlatform() {
  refreshSubTierOptions();
  bindEvents();

  show("main-content");
  hide("paywall-content");
  hide("loading-overlay");

  renderHome();
  renderAthleteDirectoryPage();
  renderSchools();
  renderRankings();
  renderRecruiting();
  renderHighlightFeedPage();
  renderLiveGames();
  renderMarketplace();
  renderZeusAI();

  subscribeToSportsFeed();

  initializeLiveSportsTicker();
  initializeGearLightbox();
  loadLiveGearMarketplace();
}

// ==========================================
// HIGHLIGHT FILM CENTER CONTROLS
// ==========================================

window.selectFilm = function(videoId) {

  const athlete = window.appState.activeAthlete;

  if (!athlete) return;

  const videos = athlete.videos || [];

  let selected = null;

  if (videoId.includes("-main")) {

    selected = {
      title: "Main Highlight",
      url: athlete.highlightUrl
    };

  } else {

    const index = Number(videoId.split("-").pop());

    selected = videos[index];

  }

  if (!selected) return;

  window.appState.activeVideo = selected;

  renderHighlightFeedPage();

};

window.askZeusScout = function (presetQuestion = "") {

  const input = document.getElementById("zeus-scout-question");
  const output = document.getElementById("zeus-scout-chat-output");

  if (!output) return;

  const question =
    presetQuestion ||
    input?.value ||
    "";

  const athlete =
    window.activeAthlete ||
    window.currentAthlete ||
    {};

  const name = athlete.name || "This athlete";
  const position = athlete.position || athlete.posion || "ATH";
  const school =
    athlete.school ||
    athlete.schoolName ||
    athlete["school name"] ||
    "Unknown School";

  const score =
    athlete.zeusRating ||
    athlete.total ||
    90;

  let answer = "";

  if (/30|summary|summarize/i.test(question)) {

    answer =
`${name} projects as a high-upside ${position} from ${school}. Zeus currently grades this athlete at ${score}. The profile shows strong athletic traits, verified film, and continued development potential. Recommended recruiting level: Power Conference / National Prospect.`;

  }

  else if (/strength/i.test(question)) {

    answer =
`Primary strengths include athletic ability, competitiveness, positional upside, and coachability. Zeus recommends continuing to add verified film, measurable testing, and seasonal production.`;

  }

  else if (/college|fit/i.test(question)) {

    answer =
`Best current program matches include Missouri, Memphis, Illinois, Kansas State, and Notre Dame based on athletic profile, projected development, and recruiting fit.`;

  }

  else if (/compare/i.test(question)) {

    answer =
`Zeus comparison mode is coming next. Soon recruiters will compare this athlete against any athlete on the network using Zeus ratings, testing, production, and film analysis.`;

  }

  else {

    answer =
`Zeus understands your question and will soon answer using full AI scouting analysis, film review, statistics, and athlete comparisons.`;

  }

  output.innerHTML = `
    <strong>Zeus AI:</strong><br><br>
    ${answer}
  `;

  if (input) input.value = "";

};

window.shareHighlight = function(id) {

  navigator.clipboard.writeText(location.href);

  alert("🔗 Link copied.");

};

// ==========================================
// GLOBAL CLICK HELPERS
// ==========================================

window.comingSoon = function (feature = "This feature") {
  alert(`${feature} is coming soon in the next Snt.L.Mo. update.`);
};

window.scrollToSection = function (sectionId) {
  const el = document.getElementById(sectionId);
  if (!el) {
    window.comingSoon(sectionId);
    return;
  }

  el.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
};

window.openFirstAthleteProfile = function () {
  const first = window.appState?.athletes?.[0];

  if (!first) {
    window.comingSoon("Athlete profiles");
    return;
  }

  window.setActiveAthlete(first.id, first);
  window.openAthleteFromDirectory(first.id);
};

window.watchFeaturedHighlight = function () {
  const firstWithFilm =
    (window.appState?.athletes || []).find(a =>
      a.highlightUrl ||
      a.highlight ||
      (Array.isArray(a.videos) && a.videos.length)
    );

  if (!firstWithFilm) {
    window.comingSoon("Highlight film");
    return;
  }

  window.scrollToSection("highlights-root");
};

window.openGearVault = function () {
  const modal = document.getElementById("gear-lightbox-modal");

  if (modal) {
    modal.classList.remove("hidden");
    return;
  }

  window.scrollToSection("marketplace-root");
};

// ==========================================
// PLATFORM BUTTON ACTION SYSTEM
// ==========================================

const PLATFORM_VIEW_IDS = [
  "home-root",
  "account-setup-root",
  "national-dashboard-root",
  "athlete-directory-page",
  "schools-root",
  "rankings-root",
  "recruiting-root",
  "highlights-root",
  "live-root",
  "marketplace-root",
  "zeus-ai-root",
  "platform-features"
];

function hideAllPlatformViews() {
  PLATFORM_VIEW_IDS.forEach((id) => {
    document
      .getElementById(id)
      ?.classList.add("hidden");
  });
}

function showPlatformView(id) {
  hideAllPlatformViews();

  document
    .getElementById(id)
    ?.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function updateActiveNavigation(action) {
  document
    .querySelectorAll(".national-nav button")
    .forEach((button) => {
      const clickCode =
        button.getAttribute("onclick") || "";

      button.classList.toggle(
        "active",
        clickCode.includes(
          `platformAction('${action}')`
        )
      );
    });
}

window.platformAction = function (
  action = "home",
  options = {}
) {
  const shouldPushHistory =
    options.pushHistory !== false;

  switch (action) {
    case "home":
      renderHome();
      hideAllPlatformViews();

      $("home-root")
        ?.classList.remove("hidden");

      $("national-dashboard-root")
        ?.classList.remove("hidden");

      $("platform-features")
        ?.classList.remove("hidden");
      break;

    case "feed":
      renderSportsFeed();
      showPlatformView("home-root");
      break;

    case "athletes":
      renderAthleteDirectoryPage();
      showPlatformView(
        "athlete-directory-page"
      );
      break;

    case "schools":
      renderSchools();
      showPlatformView("schools-root");
      break;

    case "rankings":
      renderRankings();
      showPlatformView("rankings-root");
      break;

    case "highlights":
      renderHighlightFeedPage();
      showPlatformView("highlights-root");
      break;

    case "recruiting":
      renderRecruiting();
      showPlatformView("recruiting-root");
      break;

    case "live":
      renderLiveGames();
      showPlatformView("live-root");
      break;

    case "gear":
    case "marketplace":
      renderMarketplace();
      showPlatformView("marketplace-root");
      action = "gear";
      break;

    case "zeus":
      renderZeusAI();
      showPlatformView("zeus-ai-root");
      break;

    default:
      window.comingSoon(
        String(action || "This feature")
      );

      return;
  }

  window.appState.activeView = action;
  updateActiveNavigation(action);

  if (shouldPushHistory) {
    window.history.pushState(
      { platformView: action },
      "",
      `#${action}`
    );
  }
};

window.addEventListener(
  "popstate",
  (event) => {
    const previousView =
      event.state?.platformView ||
      location.hash.replace("#", "") ||
      "home";

    window.platformAction(
      previousView,
      {
        pushHistory: false
      }
    );
  }
);

// ==========================================
// RECRUITER WORKFLOW
// ==========================================

window.recruiterWatchlist =
  JSON.parse(localStorage.getItem("sntlmoRecruiterWatchlist") || "[]");

window.saveAthleteToWatchlist = function () {
  const athlete = window.activeAthlete || window.appState?.activeAthlete;

  if (!athlete) {
    window.comingSoon("Save Athlete");
    return;
  }

  const exists = window.recruiterWatchlist.some(a => a.id === athlete.id);

  if (!exists) {
    window.recruiterWatchlist.push({
      id: athlete.id,
      name: athlete.name,
      sport: athlete.sport,
      position: athlete.position || athlete.posion || "ATH",
      school: athlete.school || athlete.schoolName || "School N/A",
      rating: athlete.zeusRating || athlete.total || "N/A"
    });

    localStorage.setItem(
      "sntlmoRecruiterWatchlist",
      JSON.stringify(window.recruiterWatchlist)
    );
  }

  alert(`${athlete.name || "Athlete"} saved to recruiter watchlist.`);
};

window.openContactCoach = function () {
  const athlete = window.activeAthlete || window.appState?.activeAthlete;

  if (!athlete) {
    window.comingSoon("Contact Coach");
    return;
  }

  const coachEmail = athlete.coachEmail || "";

  if (coachEmail) {
    window.location.href = `mailto:${coachEmail}?subject=Recruiting Interest: ${athlete.name || "Athlete"}`;
  } else {
    alert("Coach contact is not available yet for this athlete.");
  }
};

window.openRecruiterNotes = function () {
  const athlete = window.activeAthlete || window.appState?.activeAthlete;

  if (!athlete) {
    window.comingSoon("Recruiter Notes");
    return;
  }

  const modal = document.getElementById("recruiter-notes-modal");

  if (!modal) return;

  modal.classList.remove("hidden");

  window.renderRecruiterNotesBoard();
};

window.saveRecruiterNote2 = function () {
  const athlete = window.activeAthlete || window.appState?.activeAthlete;

  if (!athlete) {
    alert("Select an athlete first.");
    return;
  }

  const board = JSON.parse(localStorage.getItem("sntlmoRecruiterBoard") || "[]");

  board.push({
    athleteId: athlete.id,
    athleteName: athlete.name || "Unknown Athlete",
    sport: athlete.sport || "Sport",
    position: athlete.position || athlete.posion || "ATH",
    school: athlete.school || athlete.schoolName || "School N/A",
    rating: document.getElementById("notes-rating")?.value || "★★★",
    priority: document.getElementById("notes-priority")?.value || "Medium",
    status: document.getElementById("notes-status")?.value || "Not Contacted",
    note: document.getElementById("notes-text")?.value || "",
    createdAt: new Date().toLocaleString()
  });

  localStorage.setItem("sntlmoRecruiterBoard", JSON.stringify(board));

  const noteBox = document.getElementById("notes-text");
  if (noteBox) noteBox.value = "";

  window.renderRecruiterNotesBoard();

  alert("Recruiter note saved.");
};

window.renderRecruiterNotesBoard = function () {
  const results = document.getElementById("recruiter-notes-results");
  const filter = document.getElementById("notes-filter")?.value || "all";

  if (!results) return;

  let board = JSON.parse(localStorage.getItem("sntlmoRecruiterBoard") || "[]");

  if (filter !== "all") {
    board = board.filter(item => item.priority === filter);
  }

  if (!board.length) {
    results.innerHTML = `
      <div class="empty-watchlist">
        <h3>No Recruiter Notes Yet</h3>
        <p>Save notes from athlete profiles to build your scouting board.</p>
      </div>
    `;
    return;
  }

  results.innerHTML = board.map(item => `
    <div class="recruiter-note-card">

      <div>
        <h3>${item.athleteName}</h3>
        <p>${item.position} • ${item.sport} • ${item.school}</p>
        <small>${item.createdAt}</small>
      </div>

      <div class="note-tags">
        <span>${item.rating}</span>
        <span>${item.priority}</span>
        <span>${item.status}</span>
      </div>

      <p class="note-body">${item.note || "No note text added."}</p>

    </div>
  `).join("");
};

window.exportRecruiterBoard = function () {
  const board = JSON.parse(localStorage.getItem("sntlmoRecruiterBoard") || "[]");

  if (!board.length) {
    alert("No recruiter board data to export.");
    return;
  }

  const rows = [
    ["Athlete", "Sport", "Position", "School", "Rating", "Priority", "Status", "Note", "Created"],
    ...board.map(item => [
      item.athleteName,
      item.sport,
      item.position,
      item.school,
      item.rating,
      item.priority,
      item.status,
      item.note,
      item.createdAt
    ])
  ];

  const csv = rows.map(row =>
    row.map(cell => `"${String(cell || "").replace(/"/g, '""')}"`).join(",")
  ).join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "sntlmo-recruiter-board.csv";
  a.click();

  URL.revokeObjectURL(url);
};

// ==========================================
// GLOBAL SEARCH
// ==========================================

window.runGlobalSearch = function (query = "") {
  const box = document.getElementById("global-search-results");
  if (!box) return;

  const q = query.trim().toLowerCase();

  if (!q) {
    box.classList.add("hidden");
    box.innerHTML = "";
    return;
  }

  const athletes = (window.appState?.athletes || [])
    .filter(a => {
      const searchable = `
        ${a.name || ""}
        ${a.school || a.schoolName || a["school name"] || ""}
        ${a.sport || ""}
        ${a.position || a.posion || ""}
        ${a.city || ""}
        ${a.state || ""}
      `.toLowerCase();

      return searchable.includes(q);
    })
    .slice(0, 8);

  if (!athletes.length) {
    box.innerHTML = `
      <div class="global-search-empty">
        No results found for <strong>${query}</strong>.
      </div>
    `;
    box.classList.remove("hidden");
    return;
  }

  box.innerHTML = athletes.map(a => `
    <button
      class="global-search-result"
      onclick="
        window.openAthleteFromDirectory('${a.id}');
        document.getElementById('global-search-results').classList.add('hidden');
        document.getElementById('global-search-input').value='';
      ">

      <span>👤</span>

      <div>
        <strong>${a.name || "Unknown Athlete"}</strong>
        <small>
          ${a.sport || "Sport"} •
          ${a.position || a.posion || "ATH"} •
          ${a.school || a.schoolName || a["school name"] || "School N/A"}
        </small>
      </div>

    </button>
  `).join("");

  box.classList.remove("hidden");
};

window.openGlobalSearchResults = function (query = "") {
  if (!query.trim()) return;
  window.platformAction("athletes");
};

// ==========================================
// ZEUS COMPARE
// ==========================================

window.openZeusCompare = function () {

    const modal = document.getElementById("zeus-compare-modal");
    const select = document.getElementById("zeus-compare-select");

    if (!modal || !select) return;

    select.innerHTML = "";

    (window.appState.athletes || []).forEach(a => {

        if (a.id === window.activeAthlete?.id) return;

        select.innerHTML += `
            <option value="${a.id}">
                ${a.name}
            </option>
        `;

    });

    modal.classList.remove("hidden");

};

window.runZeusComparison = function () {

    const id =
        document.getElementById("zeus-compare-select").value;

    const opponent =
        (window.appState.athletes || [])
            .find(a => a.id === id);

    const current = window.activeAthlete;

    if (!current || !opponent) return;

    const currentRating =
        current.zeusRating ||
        current.total ||
        mergeRosterScores(current);

    const opponentRating =
        opponent.zeusRating ||
        opponent.total ||
        mergeRosterScores(opponent);

    const winner =
        Number(currentRating) >= Number(opponentRating)
            ? current.name
            : opponent.name;

    document.getElementById("zeus-compare-results").innerHTML = `

<div class="zeus-verdict-card">

<h3>⚡ Zeus Verdict</h3>

<p>
<b>${winner}</b> currently projects as the stronger prospect
based on Zeus Rating, production, verified film,
and overall recruiting projection.
</p>

</div>

<table class="zeus-compare-table">

<tr>
<th>Category</th>
<th>${current.name}</th>
<th>${opponent.name}</th>
</tr>

<tr>
<td>Zeus Rating</td>
<td>${currentRating}</td>
<td>${opponentRating}</td>
</tr>

<tr>
<td>Position</td>
<td>${current.position || "ATH"}</td>
<td>${opponent.position || "ATH"}</td>
</tr>

<tr>
<td>School</td>
<td>${current.school || "N/A"}</td>
<td>${opponent.school || "N/A"}</td>
</tr>

<tr>
<td>Sport</td>
<td>${current.sport || "N/A"}</td>
<td>${opponent.sport || "N/A"}</td>
</tr>

</table>

`;

};

window.zeusAnalyze = function(id) {

  const response = document.getElementById("zeus2-response");

  if (!response) return;

  const athlete = window.appState.activeAthlete;

  response.innerHTML = `
    <h3 class="text-zeus-gold text-xl font-bold">
      Zeus Film Analysis
    </h3>

    <p class="mt-3">

      Athlete:
      <strong>${athlete.name}</strong>

    </p>

    <p>

      Speed ★★★★★

    </p>

    <p>

      Technique ★★★★☆

    </p>

    <p>

      Explosiveness ★★★★★

    </p>

    <p>

      College Projection:
      High-Level Prospect

    </p>
  `;
  
   response.innerHTML += renderZeusDashboard(athlete);

};

window.addEventListener("sntlmo:athlete-selected", (e) => {
  const athlete = e.detail;

  console.log("Zeus Active Athlete:", athlete.name);

  const response = document.getElementById("zeus2-response");

  if (response) {
    response.innerHTML = `
<h3 class="text-zeus-gold font-bold text-lg">
${athlete.name}
</h3>

<div>${athlete.position || "ATH"} • ${athlete.school || "Unknown School"}</div>

<div class="mt-2">
⚡ Zeus Rating: ${mergeRosterScores(athlete)}
</div>

<div class="text-gray-400 mt-2">
Ready for film analysis.
</div>
`;  
   
   }
}); 

// ==========================================
// ZEUS SCOUTING CENTER
// ==========================================

function buildZeusScoutingReport(athlete = {}) {
  const scores = Array.isArray(athlete.scores)
    ? athlete.scores
    : [
        athlete.score0 || 0,
        athlete.score1 || 0,
        athlete.score2 || 0,
        athlete.score3 || 0,
        athlete.score4 || 0
      ];

  const total = scores.reduce((sum, v) => sum + (Number(v) || 0), 0);
  const average = scores.length ? Math.round(total / scores.length) : 0;

  const projection =
    average >= 95 ? "★★★★★ National Power Prospect" :
    average >= 90 ? "★★★★ High-Level College Prospect" :
    average >= 85 ? "★★★ Regional College Prospect" :
    average >= 75 ? "Developmental College Prospect" :
    "Emerging Prospect";

  return `
    <div class="zeus-scouting-report">

  <div class="zeus-report-avatar-row">
    <img src="zeus-avatar.png" alt="Zeus Avatar" class="zeus-report-avatar">
    <div>
      <h3>⚡ ZEUS SCOUTING REPORT</h3>
      <p>AI scouting intelligence powered by Zeus.</p>
    </div>
  </div>

      <div class="zeus-scouting-header">
        <strong>${athlete.name || "Unknown Athlete"}</strong>
        <span>${athlete.position || "ATH"} • ${athlete.school || "Unknown School"} • ${athlete.sport || "Sport"}</span>
      </div>

      <div class="zeus-score-grid">
        <div><span>Speed</span><strong>${scores[0] || "--"}</strong></div>
        <div><span>Power</span><strong>${scores[1] || "--"}</strong></div>
        <div><span>IQ</span><strong>${scores[2] || "--"}</strong></div>
        <div><span>Technique</span><strong>${scores[3] || "--"}</strong></div>
        <div><span>Impact</span><strong>${scores[4] || "--"}</strong></div>
      </div>

      <div class="zeus-projection-box">
        <span>Projection</span>
        <strong>${projection}</strong>
      </div>

      <div class="zeus-report-section">
        <h4>Strengths</h4>
        <p>
          ${athlete.name || "This athlete"} shows strong competitive traits,
          verified performance upside, and profile momentum through film,
          rankings, and development tracking.
        </p>
      </div>

      <div class="zeus-report-section">
        <h4>Development Plan</h4>
        <ul>
          <li>Continue building verified highlight film.</li>
          <li>Track measurable stats by season.</li>
          <li>Add coach/recruiter notes to strengthen profile credibility.</li>
          <li>Update offers, achievements, and academic profile.</li>
        </ul>
      </div>

      <div class="zeus-report-section">
        <h4>Recruiting Fit</h4>
        <p>
          Current projection: ${projection}. Zeus recommends continued exposure,
          updated film, verified stats, and recruiter engagement.
        </p>
      </div>
    </div>
  `;
}

// ==========================================
// CLOSE SEARCH WHEN CLICKING AWAY
// ==========================================

document.addEventListener("click", e => {

  const search =
    document.querySelector(".national-search-wrapper");

  const results =
    document.getElementById("global-search-results");

  if (!search || !results) return;

  if (!search.contains(e.target)) {

    results.classList.add("hidden");

  }

});

window.generateZeusScoutingReport = function() {
  const athlete = window.appState?.activeAthlete;

  if (!athlete) {
    alert("Select an athlete first.");
    return;
  }

  const response = document.getElementById("zeus2-response");

  if (response) {
    response.innerHTML = buildZeusScoutingReport(athlete);
    response.innerHTML += renderZeusDashboard(athlete);
  }
};

// ==========================================
// NATIONAL ZEUS AI CENTER
// ==========================================

window.runZeusCenterTool = function (tool = "scout") {
  const output = document.getElementById("zeus-center-output");
  const prompt = document.getElementById("zeus-center-prompt")?.value || "";
  const athlete = window.activeAthlete || window.appState?.activeAthlete || {};

  if (!output) return;

  const name = athlete.name || "Selected Athlete";
  const sport = athlete.sport || "Sport";
  const position = athlete.position || athlete.posion || "ATH";
  const school = athlete.school || athlete.schoolName || "School N/A";
  const rating =
    athlete.zeusRating ||
    athlete.total ||
    mergeRosterScores?.(athlete) ||
    "N/A";

  let title = "⚡ Zeus Scout";
  let body = "";

  if (tool === "scout") {
    title = "🤖 Zeus Scout";
    body = `
      <p><strong>${name}</strong> profiles as a ${position} in ${sport} from ${school}.</p>
      <p>Zeus currently grades this prospect at <strong>${rating}</strong>.</p>
      <p>${prompt || "Zeus recommends continued film updates, verified measurements, coach notes, and active recruiting exposure."}</p>
    `;
  }

  if (tool === "film") {
    title = "🎥 AI Film Breakdown";
    body = `
      <p>Zeus film review focuses on burst, speed, physicality, decision-making, body control, effort, and repeatable impact plays.</p>
      <ul>
        <li>Explosiveness: High upside</li>
        <li>Technique: Developing toward verified elite traits</li>
        <li>Game Impact: Strong profile momentum</li>
        <li>Next Step: Add full-game clips and verified timestamps</li>
      </ul>
    `;
  }

  if (tool === "projection") {
    title = "📊 Recruiting Projection";
    body = `
      <p><strong>${name}</strong> projects as a recruitable prospect with continued exposure.</p>
      <p>Current Zeus tier: <strong>${rating}</strong></p>
      <p>Recommended recruiting path: camps, updated verified film, coach references, academic profile, and target-school outreach.</p>
    `;
  }

  if (tool === "compare") {
    title = "🏆 National Player Comparison";
    body = `
      <p>Use the athlete profile comparison engine to compare Zeus Rating, school, sport, position, film, testing, and recruiting projection.</p>
      <button class="zeus-action-btn" onclick="window.openZeusCompare()">Open Zeus Compare</button>
    `;
  }

  if (tool === "nil") {
    title = "📈 NIL Projection";
    body = `
      <p>NIL outlook is based on profile visibility, highlight engagement, local market strength, school brand, athlete story, and social reach.</p>
      <p>Zeus recommendation: build athlete merch, short-form highlights, verified bio, and sponsor-ready media kit.</p>
    `;
  }

  if (tool === "college") {
    title = "🎓 College Fit Predictor";
    body = `
      <p>Best-fit schools should match position need, region, playing style, academic fit, culture, and development path.</p>
      <p>Starter fit examples: Missouri, Memphis, Illinois, Kansas State, Notre Dame.</p>
    `;
  }

  if (tool === "strengths") {
    title = "🧠 Strengths & Weaknesses";
    body = `
      <p><strong>Strengths:</strong> athletic upside, competitiveness, film potential, impact profile, coachability.</p>
      <p><strong>Development Areas:</strong> verified testing, updated stats, academic profile, full-game film, recruiter notes.</p>
    `;
  }

  if (tool === "pdf") {
    title = "📄 AI Scouting Report PDF";
    body = `
      <p>Preparing printable recruiter report for <strong>${name}</strong>.</p>
      <p>Use the browser print window to save as PDF.</p>
    `;

    setTimeout(() => window.print(), 500);
  }

  output.innerHTML = `
    <h3>${title}</h3>
    ${body}
  `;
};

window.selectAthleteProfileFilm = function(encodedUrl, encodedTitle) {
  const url = decodeURIComponent(encodedUrl || "");
  const title = decodeURIComponent(encodedTitle || "Highlight Film");

  const player = document.getElementById("athlete-featured-player");
  const titleElement = document.getElementById("athlete-featured-film-title");

  if (!player || !url) return;

  let playerHtml = "";

  if (
    url.includes("youtube.com") ||
    url.includes("youtu.be")
  ) {
    let videoId = "";

    if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1]?.split("&")[0] || "";
    } else {
      videoId = url.split("youtu.be/")[1]?.split("?")[0] || "";
    }

    playerHtml = `
      <iframe
        src="https://www.youtube.com/embed/${videoId}"
        title="${title}"
        allowfullscreen>
      </iframe>
    `;
  } else {
    playerHtml = `
      <video
        src="${url}"
        controls
        autoplay
        playsinline>
      </video>
    `;
  }

  player.innerHTML = playerHtml;

  if (titleElement) {
    titleElement.textContent = title;
  }
};

window.filterAthleteFilm = function(category) {
  document
    .querySelectorAll(".athlete-film-category-tabs button")
    .forEach(button => {
      button.classList.toggle(
        "active",
        button.textContent.trim() === category
      );
    });

  document
    .querySelectorAll(".athlete-film-card")
    .forEach(card => {
      const cardCategory =
        card.dataset.filmCategory || "Featured";

      const shouldShow =
        category === "Featured" ||
        cardCategory === category;

      card.style.display = shouldShow
        ? "block"
        : "none";
    });
};

window.shareAthleteProfile = function() {
  navigator.clipboard
    .writeText(window.location.href)
    .then(() => {
      alert("Athlete profile link copied.");
    })
    .catch(() => {
      alert("Unable to copy the profile link.");
    });
};

function normalizeHomeSport(value = "") {
  const cleanedSport = String(value)
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, " ");

  const sportAliases = {
    football: "football",

    "girls flag": "girls flag football",
    "girl flag football": "girls flag football",
    "girls flag football": "girls flag football",
    "flag football": "girls flag football",

    basketball: "basketball",

    baseball: "baseball",

    softball: "softball",

    soccer: "soccer",

    volleyball: "volleyball",

    track: "track and field",
    "track field": "track and field",
    "track and field": "track and field",

    wrestling: "wrestling",

    boxing: "boxing",

    hockey: "hockey",

    swimming: "swimming",
    swim: "swimming",

    golf: "golf",

    lacrosse: "lacrosse",

    cheer: "cheer",
    cheerleading: "cheer",

    dance: "dance",

    "all sports": "all sports",
    all: "all sports"
  };

  return sportAliases[cleanedSport] || cleanedSport;
}

function initializeHomeSportFilters() {
  const tabBar = document.getElementById("home-sports-tabs");

  if (!tabBar) return;

  const buttons = Array.from(
    tabBar.querySelectorAll("[data-sport]")
  );

  const athleteCards = Array.from(
    document.querySelectorAll("[data-athlete-card]")
  );

  const emptyMessage = document.getElementById(
    "home-athlete-filter-empty"
  );

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedSport =
        button.dataset.sport || "All Sports";

      const normalizedSelected =
        normalizeHomeSport(selectedSport);

      let visibleCount = 0;

      buttons.forEach((item) => {
        item.classList.toggle(
          "active",
          item === button
        );
      });

      athleteCards.forEach((card) => {
        const athleteSport =
          normalizeHomeSport(
            card.dataset.athleteSport || ""
          );

        const showCard =
          normalizedSelected === "all sports" ||
          athleteSport === normalizedSelected;

        card.hidden = !showCard;

        if (showCard) {
          visibleCount += 1;
        }
      });

      if (emptyMessage) {
        emptyMessage.classList.toggle(
          "hidden",
          visibleCount > 0
        );
      }
    });
  });
}

window.initializeHomeSportFilters =
  initializeHomeSportFilters;

