// ======================================================
// APPLICATION SHELL CONTROLLER
// Mounts the page containers used throughout the app.
// ======================================================

import {
  createApplicationShell
} from "../components/layout/applicationShell.js";

export function initializeApplicationShell() {
  const shellRoot = document.getElementById(
    "application-shell-root"
  );

  if (!shellRoot) {
    console.warn(
      "Application shell root was not found."
    );

    return false;
  }

  shellRoot.innerHTML =
    createApplicationShell();

  console.log(
    "Application shell initialized."
  );

  return true;
}

export function clearApplicationShell() {
  const shellRoot = document.getElementById(
    "application-shell-root"
  );

  if (!shellRoot) {
    return;
  }

  shellRoot.innerHTML = "";
}