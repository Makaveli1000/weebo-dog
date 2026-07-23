// ======================================================
// SNT.L.MO. Sports Network APPLICATION CONTROLLER
// Controls application startup and global UI mounting.
// ======================================================

import {
  initializeApplicationShell
} from "./applicationShellController.js";

import {
  initializeNationalHeader
} from "./nationalHeaderController.js";

import {
  initializePaywall
} from "./paywallController.js";

import {
  initializeLoginModal
} from "./loginModalController.js";

import {
  initializeMortalVisionController
} from "./mortalVisionController.js";

export async function initializeAppController() {
  initializeApplicationShell();

  initializeNationalHeader();

  // The login modal must exist before
  // the paywall button can open it.
  initializeLoginModal();

  initializePaywall();

  window.initializeWarRoom =
    initializeMortalVisionController;

  console.log(
    "Application controller initialized."
  );
}