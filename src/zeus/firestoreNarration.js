import { speak } from "./speech.js";

export function narrateFirestoreEvent(type, payload = {}) {
  const lines = {
    GRID_UPDATE: "The battlefield shifts.",
    SCORE_CHANGE: "The balance of power moves.",
    GAME_FINAL: "The contest is decided.",
    ADMIN_DEPLOY: "Olympus has been altered."
  };

  const line = lines[type];
  if (line) speak(line, { interrupt: false });
}
