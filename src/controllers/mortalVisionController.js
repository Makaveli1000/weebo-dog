// ======================================================
// MORTAL VISION CONTROLLER
// Renders the Zeus AI command center and connects
// the storm environment and lightning service.
// ======================================================

import {
  createMortalVisionEnvironment
} from "../components/mortalVisionEnvironment.js";

import {
  createMortalVisionPage
} from "../pages/mortalVisionPage.js";

import {
  startMortalLightning,
  stopMortalLightning
} from "../services/mortalLightningService.js";

import {
  initializeZeusAISearch
} from "./zeusAISearchController.js";

import {
  initializeLiveRankings
} from "./liveRankingsController.js";

export function initializeMortalVisionController() {
  const mortalStage = document.querySelector(
    ".mortal-vision-stage"
  );

  if (!mortalStage) {
    return;
  }

  mortalStage.innerHTML = `
    ${createMortalVisionEnvironment()}

    <div class="mortal-vision-content">
      ${createMortalVisionPage()}
    </div>
  `;

  const lightningFlash = mortalStage.querySelector(
    ".mortal-lightning-flash"
  );

  const lightningBolts = [
    mortalStage.querySelector(
      ".mortal-lightning-bolt-one"
    ),
    mortalStage.querySelector(
      ".mortal-lightning-bolt-two"
    )
  ].filter(Boolean);

    startMortalLightning({
  lightningFlash,
  lightningBolts
});

initializeLiveRankings();

initializeZeusAISearch();

console.log(
  "Mortal Vision controller initialized."
);
}

export function destroyMortalVisionController() {
  stopMortalLightning();
}