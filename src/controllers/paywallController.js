// ======================================================
// PAYWALL CONTROLLER
// Renders and controls the pre-login introduction.
// ======================================================

import {
  createPaywallPage
} from "../pages/paywallPage.js";

export function initializePaywall() {
  const paywall = document.getElementById(
    "paywall-content"
  );

  if (!paywall) {
    console.warn(
      "Paywall container was not found."
    );

    return;
  }

  paywall.innerHTML =
    createPaywallPage();

  paywall.classList.remove("hidden");

  const connectionButton =
    paywall.querySelector(
      "[data-paywall-action='establish-connection']"
    );

  connectionButton?.addEventListener(
    "click",
    () => {
      if (
  typeof window.openLoginModal ===
  "function"
) {
  window.openLoginModal();
  return;
}

console.warn(
  "The login modal controller is not available."
);
    }
  );

  console.log(
    "Paywall controller initialized."
  );
}

export function destroyPaywall() {
  const paywall = document.getElementById(
    "paywall-content"
  );

  if (!paywall) {
    return;
  }

  paywall.innerHTML = "";
  paywall.classList.add("hidden");
}