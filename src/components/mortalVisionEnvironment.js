// ======================================================
// MORTAL VISION ENVIRONMENT COMPONENT
// Builds the visual storm environment HTML.
// ======================================================

import {
  MORTAL_VISION_ASSETS
} from "../config/mortalVisionAssets.js";

export function createMortalVisionEnvironment() {
  return `
    <div
      class="mortal-environment"
      aria-hidden="true"
    >

      <div class="mortal-sky-depth"></div>

      <div class="mortal-cloud-layer mortal-cloud-layer-back"></div>
      <div class="mortal-cloud-layer mortal-cloud-layer-middle"></div>
      <div class="mortal-cloud-layer mortal-cloud-layer-front"></div>

      <div class="mortal-gold-particles"></div>

      <div class="mortal-lightning-flash"></div>

      <img
        class="mortal-lightning-bolt mortal-lightning-bolt-one"
        src="${MORTAL_VISION_ASSETS.lightningOne}"
        alt=""
      />

      <img
        class="mortal-lightning-bolt mortal-lightning-bolt-two"
        src="${MORTAL_VISION_ASSETS.lightningTwo}"
        alt=""
      />

      <div class="mortal-fog mortal-fog-back"></div>
      <div class="mortal-fog mortal-fog-front"></div>

      <div class="mortal-cinematic-shade"></div>

    </div>
  `;
}