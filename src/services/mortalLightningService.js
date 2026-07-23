// ======================================================
// MORTAL LIGHTNING SERVICE
// Controls visual lightning timing and animation.
// Does not control or change Zeus audio.
// ======================================================

import {
  MORTAL_VISION_SETTINGS
} from "../config/mortalVisionSettings.js";

let mortalLightningTimer = null;

export function startMortalLightning({
  lightningFlash,
  lightningBolts
}) {
  if (
    !lightningFlash ||
    !Array.isArray(lightningBolts) ||
    lightningBolts.length === 0
  ) {
    return;
  }

  stopMortalLightning();

  function createLightningFlash() {
    if (document.hidden) {
      scheduleNextLightning();
      return;
    }

    const selectedBolt =
      lightningBolts[
        Math.floor(
          Math.random() * lightningBolts.length
        )
      ];

    lightningFlash.animate(
      [
        { opacity: 0 },
        { opacity: 0.75 },
        { opacity: 0.12 },
        { opacity: 0.95 },
        { opacity: 0 }
      ],
      {
        duration:
  MORTAL_VISION_SETTINGS.lightning.flashDuration,
        easing: "ease-out"
      }
    );

    selectedBolt.animate(
      [
        { opacity: 0 },
        { opacity: 1 },
        { opacity: 0.35 },
        { opacity: 1 },
        { opacity: 0 }
      ],
      {
        duration:
  MORTAL_VISION_SETTINGS.lightning.boltDuration,
        easing: "ease-out"
      }
    );

    scheduleNextLightning();
  }

  function scheduleNextLightning() {
    clearTimeout(mortalLightningTimer);

    const {
  minDelay,
  maxDelay
} = MORTAL_VISION_SETTINGS.lightning;

const delay =
  Math.floor(
    Math.random() * (maxDelay - minDelay)
  ) + minDelay;

    mortalLightningTimer = setTimeout(
      createLightningFlash,
      delay
    );
  }

  scheduleNextLightning();
}

export function stopMortalLightning() {
  clearTimeout(mortalLightningTimer);
  mortalLightningTimer = null;
}