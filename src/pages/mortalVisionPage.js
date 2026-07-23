// ======================================================
// MORTAL VISION PAGE
// Assembles the complete Zeus AI command center.
// ======================================================

import {
  MORTAL_VISION_CONTENT
} from "../config/mortalVision/mortalVisionContent.js";

import {
  createMortalVisionHero
} from "../components/mortalVision/mortalVisionHero.js";

import {
  createMortalVisionStats
} from "../components/mortalVision/mortalVisionStats.js";

import {
  createMortalVisionModules
} from "../components/mortalVision/mortalVisionModules.js";

import {
  createMortalVisionDashboard
} from "../components/mortalVision/mortalVisionDashboard.js";

import {
  createLiveRankingsWidget
} from "../components/mortalVision/liveRankingsWidget.js";

import {
  createZeusAISearchWidget
} from "../components/mortalVision/zeusAISearchWidget.js";

export function createMortalVisionPage() {
  return `
    ${createMortalVisionHero(
      MORTAL_VISION_CONTENT
    )}

    ${createMortalVisionStats(
      MORTAL_VISION_CONTENT.stats
    )}

    ${createMortalVisionModules(
      MORTAL_VISION_CONTENT.modules
    )}

    ${createLiveRankingsWidget()}

    ${createZeusAISearchWidget()}

    ${createMortalVisionDashboard()}
  `;
}