// ======================================================
// ATHLETE CONTROLLER
// Handles athlete selection, profile opening,
// highlight playback, and selected-row styling.
// ======================================================

export function selectAthleteRow({
  athleteId,
  athlete,
  tableBody,
  onSetActiveAthlete,
  onPlayHighlight,
  onOpenProfile,
  openProfile = false
} = {}) {
  if (!athleteId || !athlete) {
    return;
  }

  if (tableBody) {
    tableBody
      .querySelectorAll(
        "tr[data-athlete-id]"
      )
      .forEach((row) => {
        row.classList.remove(
          "bg-zeus-gold/10",
          "border-l-2",
          "border-zeus-gold"
        );
      });

    const selectedRow =
      tableBody.querySelector(
        `[data-athlete-id="${CSS.escape(
          athleteId
        )}"]`
      );

    selectedRow?.classList.add(
      "bg-zeus-gold/10",
      "border-l-2",
      "border-zeus-gold"
    );
  }

  onSetActiveAthlete?.(
    athleteId,
    athlete
  );

  onPlayHighlight?.(
    athlete
  );

  if (openProfile) {
    onOpenProfile?.(
      athleteId,
      athlete
    );
  }
}

export function openAthleteFromRecords({
  athleteId,
  records = [],
  onOpenProfile
} = {}) {
  const record =
    records.find(
      (item) =>
        item.id === athleteId
    );

  if (!record) {
    throw new Error(
      "Athlete profile not found."
    );
  }

  onOpenProfile?.(
    record.id,
    record.data || {}
  );

  return record;
}

export function findAthleteRecord(
  records = [],
  athleteId
) {
  return (
    records.find(
      (item) =>
        item.id === athleteId
    ) || null
  );
}

// ======================================================
// ATHLETE DIRECTORY CONTROLLER
// Handles athlete-directory search and sport filtering.
// ======================================================

let athleteDirectoryCleanup = null;

export function initializeAthleteDirectoryController({
  root = "athlete-directory-page"
} = {}) {
  if (
    typeof athleteDirectoryCleanup ===
    "function"
  ) {
    athleteDirectoryCleanup();
  }

  const directoryRoot =
    typeof root === "string"
      ? document.getElementById(
          root
        )
      : root;

  if (!directoryRoot) {
    return () => {};
  }

  const searchInput =
    directoryRoot.querySelector(
      "#athlete-directory-search"
    );

  const sportFilter =
    directoryRoot.querySelector(
      "#athlete-directory-sport"
    );

  const cards = () =>
    Array.from(
      directoryRoot.querySelectorAll(
        ".athlete-directory-card"
      )
    );

  const abortController =
    new AbortController();

  const signal =
    abortController.signal;

  function applyDirectoryFilters() {
    const searchQuery =
      String(
        searchInput?.value || ""
      )
        .trim()
        .toLowerCase();

    const selectedSport =
      sportFilter?.value ||
      "all";

    cards().forEach((card) => {
      const searchableText =
        String(
          card.dataset.search ||
          ""
        ).toLowerCase();

      const cardSport =
        card.dataset.sport ||
        "";

      const matchesSearch =
        !searchQuery ||
        searchableText.includes(
          searchQuery
        );

      const matchesSport =
        selectedSport === "all" ||
        cardSport === selectedSport;

      card.hidden =
        !(
          matchesSearch &&
          matchesSport
        );
    });
  }

  searchInput?.addEventListener(
    "input",
    applyDirectoryFilters,
    { signal }
  );

  sportFilter?.addEventListener(
    "change",
    applyDirectoryFilters,
    { signal }
  );

  applyDirectoryFilters();

  athleteDirectoryCleanup =
    () => {
      abortController.abort();

      athleteDirectoryCleanup =
        null;
    };

  return athleteDirectoryCleanup;
}

export function selectAthleteFilm({
  athleteId,
  records = [],
  onSetActiveAthlete,
  onPlayHighlight
} = {}) {
  const record =
    records.find(
      (item) =>
        item.id === athleteId
    );

  if (!record) {
    return null;
  }

  onSetActiveAthlete?.(
    record.id,
    record.data || {}
  );

  onPlayHighlight?.(
    record.data || {}
  );

  return record;
}

// ======================================================
// ADMIN ATHLETE MATRIX SELECTION
// Handles selected-row styling, Media Locker information,
// active athlete state, upload count, and film preview.
// ======================================================

export function selectAthleteFromMatrix({
  athleteId,
  records = [],
  tableBody,
  onSetActiveAthlete,
  onPlayHighlight,
  onSelectionChange
} = {}) {
  if (!athleteId) {
    return null;
  }

  const record =
    records.find(
      (item) =>
        item.id === athleteId
    );

  if (!record) {
    return null;
  }

  const athlete =
    record.data || {};

  if (tableBody) {
    tableBody
      .querySelectorAll(
        "tr[data-athlete-id]"
      )
      .forEach((row) => {
        row.classList.remove(
          "bg-zeus-gold/10",
          "border-l-2",
          "border-zeus-gold"
        );
      });

    const selectedRow =
      Array.from(
        tableBody.querySelectorAll(
          "tr[data-athlete-id]"
        )
      ).find(
        (row) =>
          row.dataset.athleteId ===
          athleteId
      );

    selectedRow?.classList.add(
      "bg-zeus-gold/10",
      "border-l-2",
      "border-zeus-gold"
    );
  }

  const videos =
    Array.isArray(
      athlete.videos
    )
      ? athlete.videos
      : [];

  const hasFallbackFilm =
    Boolean(
      athlete.highlightUrl ||
      athlete.highlight ||
      athlete.higlightightUrl
    );

  const videoCount =
    videos.length ||
    (
      hasFallbackFilm
        ? 1
        : 0
    );

  onSetActiveAthlete?.(
    record.id,
    athlete
  );

  onPlayHighlight?.(
    athlete
  );

  onSelectionChange?.({
    record,
    athlete,
    athleteId:
      record.id,
    videoCount
  });

  return {
    record,
    athlete,
    athleteId:
      record.id,
    videoCount
  };
}

// ======================================================
// ATHLETE PROFILE MODAL
// Handles athlete lookup, active state, profile rendering,
// Zeus sidebar rendering, and modal opening.
// ======================================================

export function openAthleteProfileModal({
  athleteId,
  athlete = {},
  modalId = "athlete-profile-modal",
  contentId = "athlete-profile-content",
  onSetActiveAthlete,
  renderProfile,
  renderZeusDashboard,
  renderZeusReport
} = {}) {
  if (!athleteId) {
    throw new Error(
      "Athlete ID is required."
    );
  }

  const modal =
    document.getElementById(
      modalId
    );

  const content =
    document.getElementById(
      contentId
    );

  if (!modal || !content) {
    throw new Error(
      "Athlete profile modal could not be found."
    );
  }

  const activeAthlete = {
    id: athleteId,
    ...athlete
  };

  window.activeAthlete =
    activeAthlete;

  onSetActiveAthlete?.(
    athleteId,
    athlete
  );

  const profileMarkup =
    typeof renderProfile ===
    "function"
      ? renderProfile(
          activeAthlete
        )
      : "";

  const reportMarkup =
    typeof renderZeusReport ===
    "function"
      ? renderZeusReport(
          activeAthlete
        )
      : "";

  const dashboardMarkup =
    typeof renderZeusDashboard ===
    "function"
      ? renderZeusDashboard(
          activeAthlete
        )
      : "";

  content.innerHTML = `
    <div class="recruiter-profile-layout">

      <div class="recruiter-profile-main">
        ${profileMarkup}
      </div>

      <aside class="recruiter-zeus-sidebar">
        ${reportMarkup}
        ${dashboardMarkup}
      </aside>

    </div>
  `;

  modal.classList.remove(
    "hidden"
  );

  return activeAthlete;
}

export function openAthleteProfileFromRecords({
  athleteId,
  records = [],
  onSetActiveAthlete,
  renderProfile,
  renderZeusDashboard,
  renderZeusReport
} = {}) {
  const record =
    findAthleteRecord(
      records,
      athleteId
    );

  if (!record) {
    throw new Error(
      "Athlete profile not found."
    );
  }

  return openAthleteProfileModal({
    athleteId:
      record.id,

    athlete:
      record.data || {},

    onSetActiveAthlete,
    renderProfile,
    renderZeusDashboard,
    renderZeusReport
  });
}