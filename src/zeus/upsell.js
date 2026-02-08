import { speak } from "./speech.js";

export function zeusUpsell(reason = "default") {
  const lines = {
    timer: "Only the chosen may see beyond the mortal clock.",
    grid: "The War Room awaits those who ascend.",
    oracle: "The Oracle sees what others cannot.",
    default: "Ascend to Pro. Olympus rewards the bold."
  };

  speak(lines[reason] || lines.default);
}
