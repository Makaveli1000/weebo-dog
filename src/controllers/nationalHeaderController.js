// ======================================================
// NATIONAL HEADER CONTROLLER
// Renders the header and connects navigation actions.
// ======================================================

import {
  createNationalHeader
} from "../components/layout/nationalHeader.js";

export function initializeNationalHeader() {
  const header = document.getElementById(
    "national-header-root"
  );

  if (!header) {
    console.warn(
      "National header container was not found."
    );

    return;
  }

  header.innerHTML =
    createNationalHeader();

  header.addEventListener(
    "click",
    handleHeaderClick
  );

  const searchInput =
    header.querySelector(
      "#global-search-input"
    );

  searchInput?.addEventListener(
    "input",
    event => {
      window.runGlobalSearch?.(
        event.target.value
      );
    }
  );

  searchInput?.addEventListener(
    "keydown",
    event => {
      if (event.key !== "Enter") {
        return;
      }

      window.openGlobalSearchResults?.(
        event.target.value
      );
    }
  );
}

function handleHeaderClick(event) {
  const routeButton =
    event.target.closest(
      "[data-platform-route]"
    );

  if (routeButton) {
    window.platformAction?.(
      routeButton.dataset.platformRoute
    );

    return;
  }

  const actionButton =
    event.target.closest(
      "[data-header-action]"
    );

  if (!actionButton) {
    return;
  }

  const action =
    actionButton.dataset.headerAction;

  if (action === "home") {
    window.scrollToSection?.(
      "home-root"
    );

    return;
  }

  if (action === "back") {
    window.history.back();
    return;
  }

  if (action === "notifications") {
    window.comingSoon?.(
      "Notifications"
    );

    return;
  }

  if (action === "auth") {
  window.openLoginModal?.();
}
}