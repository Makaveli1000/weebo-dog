// ======================================================
// SNT.L.MO. Sports Network RANKINGS CONTROLLER
// Handles Rankings sport, class, search, and scope filters.
// ======================================================

let rankingsControllerCleanup = null;

function getElement(id) {
  return document.getElementById(id);
}

function normalizeValue(value = "") {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

export function initializeRankingsController({
  root = "rankings-root"
} = {}) {
  if (
    typeof rankingsControllerCleanup ===
    "function"
  ) {
    rankingsControllerCleanup();
  }

  const rankingsRoot =
    typeof root === "string"
      ? getElement(root)
      : root;

  if (!rankingsRoot) {
    return () => {};
  }

  const sportFilter =
    rankingsRoot.querySelector(
      "#rankings-sport-filter"
    );

  const classFilter =
    rankingsRoot.querySelector(
      "#rankings-class-filter"
    );

  const searchInput =
    rankingsRoot.querySelector(
      "#rankings-search-input"
    );

  const tableBody =
    rankingsRoot.querySelector(
      "#rankings-table-body"
    );

  const emptyState =
    rankingsRoot.querySelector(
      "#rankings-empty-state"
    );

  const tableWrapper =
    tableBody?.closest(
      ".rankings-table-wrapper"
    );

  if (!tableBody) {
    return () => {};
  }

  const abortController =
    new AbortController();

  const signal =
    abortController.signal;

  function applyRankingsFilters() {
    const selectedSport =
      sportFilter?.value ||
      "all";

    const selectedClass =
      classFilter?.value ||
      "all";

    const searchQuery =
      normalizeValue(
        searchInput?.value
      );

    const rows = Array.from(
      tableBody.querySelectorAll(
        "[data-ranking-row]"
      )
    );

    let visibleCount = 0;

    rows.forEach((row) => {
      const rowSport =
        row.dataset.rankingSport ||
        "";

      const rowClass =
        row.dataset.rankingClass ||
        "";

      const rowName =
        normalizeValue(
          row.dataset.rankingName
        );

      const rowText =
        normalizeValue(
          row.textContent
        );

      const matchesSport =
        selectedSport === "all" ||
        rowSport === selectedSport;

      const matchesClass =
        selectedClass === "all" ||
        rowClass === selectedClass;

      const matchesSearch =
        !searchQuery ||
        rowName.includes(
          searchQuery
        ) ||
        rowText.includes(
          searchQuery
        );

      const shouldShow =
        matchesSport &&
        matchesClass &&
        matchesSearch;

      row.hidden = !shouldShow;

      if (shouldShow) {
        visibleCount += 1;
      }
    });

    emptyState?.classList.toggle(
      "hidden",
      visibleCount > 0
    );

    tableWrapper?.classList.toggle(
      "hidden",
      visibleCount === 0
    );
  }

  sportFilter?.addEventListener(
    "change",
    applyRankingsFilters,
    { signal }
  );

  classFilter?.addEventListener(
    "change",
    applyRankingsFilters,
    { signal }
  );

  searchInput?.addEventListener(
    "input",
    applyRankingsFilters,
    { signal }
  );

  applyRankingsFilters();

  rankingsControllerCleanup =
    () => {
      abortController.abort();
      rankingsControllerCleanup =
        null;
    };

  return rankingsControllerCleanup;
}