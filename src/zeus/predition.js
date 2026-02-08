import { speak } from "./speech.js";

export function zeusPredict(game) {
  if (!game) return;

  const confidence = Math.round(game.winProb * 100);

  let line;
  if (confidence > 70) {
    line = `The omens favor ${game.favorite}. Victory is likely.`;
  } else if (confidence < 40) {
    line = `The winds resist ${game.favorite}. Fate is uncertain.`;
  } else {
    line = `The battle hangs in balance. No god dares claim it.`;
  }

  speak(line, { interrupt: false });
}
