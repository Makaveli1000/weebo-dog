// ======================================================
// SNT.L.MO. MARKETPLACE CONTROLLER
// Handles marketplace category filters.
// ======================================================

let marketplaceControllerCleanup = null;

export function initializeMarketplaceController({
  root = "marketplace-root"
} = {}) {
  if (
    typeof marketplaceControllerCleanup ===
    "function"
  ) {
    marketplaceControllerCleanup();
  }

  const marketplaceRoot =
    typeof root === "string"
      ? document.getElementById(root)
      : root;

  if (!marketplaceRoot) {
    return () => {};
  }

  const tabs =
    marketplaceRoot.querySelector(
      "#marketplace-tabs"
    );

  const grid =
    marketplaceRoot.querySelector(
      "#marketplace-grid"
    );

  const emptyState =
    marketplaceRoot.querySelector(
      "#marketplace-empty"
    );

  if (!tabs || !grid) {
    return () => {};
  }

  const abortController =
    new AbortController();

  const signal =
    abortController.signal;

  function applyMarketplaceFilter(
    selectedFilter = "All"
  ) {
    const buttons =
      Array.from(
        tabs.querySelectorAll(
          "[data-marketplace-filter]"
        )
      );

    const cards =
      Array.from(
        grid.querySelectorAll(
          "[data-marketplace-item]"
        )
      );

    let visibleCount = 0;

    buttons.forEach(
      (button) => {
        const buttonFilter =
          button.dataset
            .marketplaceFilter ||
          "All";

        button.classList.toggle(
          "active",
          buttonFilter ===
            selectedFilter
        );
      }
    );

    cards.forEach((card) => {
      const category =
        card.dataset
          .marketplaceCategory ||
        "";

      const shouldShow =
        selectedFilter === "All" ||
        category === selectedFilter;

      card.hidden = !shouldShow;

      if (shouldShow) {
        visibleCount += 1;
      }
    });

    emptyState?.classList.toggle(
      "hidden",
      visibleCount > 0
    );
  }

  tabs.addEventListener(
    "click",
    (event) => {
      const button =
        event.target.closest(
          "[data-marketplace-filter]"
        );

      if (!button) {
        return;
      }

      event.preventDefault();

      applyMarketplaceFilter(
        button.dataset
          .marketplaceFilter ||
        "All"
      );
    },
    { signal }
  );

  applyMarketplaceFilter("All");

  marketplaceControllerCleanup =
    () => {
      abortController.abort();
      marketplaceControllerCleanup =
        null;
    };

  return marketplaceControllerCleanup;
}