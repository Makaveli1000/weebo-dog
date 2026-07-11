import { totalScore } from "../utils/helpers.js";

export function rankAthletes(athletes = []) {
  return [...athletes].sort((a, b) => {
    const athleteA = a.data || a;
    const athleteB = b.data || b;

    return totalScore(athleteB) - totalScore(athleteA);
  });
}