let recruitingControllerCleanup =
  null;

function normalizeRecruitingValue(
  value = ""
) {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

export function initializeRecruitingController({
  root = "recruiting-root",
  onOpenAthlete
} = {}) {
  if (
    typeof recruitingControllerCleanup ===
    "function"
  ) {
    recruitingControllerCleanup();
  }

  const recruitingRoot =
    typeof root === "string"
      ? document.getElementById(
          root
        )
      : root;

  if (!recruitingRoot) {
    return () => {};
  }

  const searchInput =
    recruitingRoot.querySelector(
      "#recruiting-search-input"
    );

  const sportFilter =
    recruitingRoot.querySelector(
      "#recruiting-sport-filter"
    );

  const positionFilter =
    recruitingRoot.querySelector(
      "#recruiting-position-filter"
    );

  const classFilter =
    recruitingRoot.querySelector(
      "#recruiting-class-filter"
    );

  const stateFilter =
    recruitingRoot.querySelector(
      "#recruiting-state-filter"
    );

  const athleteGrid =
    recruitingRoot.querySelector(
      "#recruiting-athlete-grid"
    );

  const emptyState =
    recruitingRoot.querySelector(
      "#recruiting-empty-state"
    );

  const resultsCount =
    recruitingRoot.querySelector(
      "#recruiting-results-count"
    );

  if (!athleteGrid) {
    return () => {};
  }

  const abortController =
    new AbortController();

  const signal =
    abortController.signal;

  function applyRecruitingFilters() {
    const searchQuery =
      normalizeRecruitingValue(
        searchInput?.value
      );

    const selectedSport =
      sportFilter?.value ||
      "all";

    const selectedPosition =
      positionFilter?.value ||
      "all";

    const selectedClass =
      classFilter?.value ||
      "all";

    const selectedState =
      stateFilter?.value ||
      "all";

    const cards =
      Array.from(
        athleteGrid.querySelectorAll(
          "[data-recruiting-athlete]"
        )
      );

    let visibleCount = 0;

    cards.forEach((card) => {
      const searchValue =
        normalizeRecruitingValue(
          card.dataset
            .recruitingSearch
        );

      const cardSport =
        card.dataset
          .recruitingSport ||
        "";

      const cardPosition =
        card.dataset
          .recruitingPosition ||
        "";

      const cardClass =
        card.dataset
          .recruitingClass ||
        "";

      const cardState =
        card.dataset
          .recruitingState ||
        "";

      const matchesSearch =
        !searchQuery ||
        searchValue.includes(
          searchQuery
        );

      const matchesSport =
        selectedSport === "all" ||
        cardSport ===
          selectedSport;

      const matchesPosition =
        selectedPosition === "all" ||
        cardPosition ===
          selectedPosition;

      const matchesClass =
        selectedClass === "all" ||
        cardClass ===
          selectedClass;

      const matchesState =
        selectedState === "all" ||
        cardState ===
          selectedState;

      const shouldShow =
        matchesSearch &&
        matchesSport &&
        matchesPosition &&
        matchesClass &&
        matchesState;

      card.hidden = !shouldShow;

      if (shouldShow) {
        visibleCount += 1;
      }
    });

    emptyState?.classList.toggle(
      "hidden",
      visibleCount > 0
    );

    if (resultsCount) {
      resultsCount.textContent =
        `Showing ${visibleCount} athlete${
          visibleCount === 1
            ? ""
            : "s"
        }`;
    }
  }

  recruitingRoot.addEventListener(
    "input",
    (event) => {
      if (
        event.target.id ===
        "recruiting-search-input"
      ) {
        applyRecruitingFilters();
      }
    },
    { signal }
  );

  recruitingRoot.addEventListener(
    "change",
    (event) => {
      if (
        [
          "recruiting-sport-filter",
          "recruiting-position-filter",
          "recruiting-class-filter",
          "recruiting-state-filter"
        ].includes(
          event.target.id
        )
      ) {
        applyRecruitingFilters();
      }
    },
    { signal }
  );

  recruitingRoot.addEventListener(
    "click",
    (event) => {
      const profileButton =
        event.target.closest(
          "[data-recruiting-view]"
        );

      if (!profileButton) {
        return;
      }

      const athleteId =
        profileButton.dataset
          .recruitingView;

      onOpenAthlete?.(
        athleteId
      );
    },
    { signal }
  );

  applyRecruitingFilters();

  recruitingControllerCleanup =
    () => {
      abortController.abort();

      recruitingControllerCleanup =
        null;
    };

  return recruitingControllerCleanup;
}