export function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char] || char));
}

export function safeNumber(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

export function totalScore(athlete = {}) {
  const scores = Array.isArray(athlete.scores)
    ? athlete.scores
    : [athlete.score0, athlete.score1, athlete.score2, athlete.score3, athlete.score4];

  return scores.reduce((sum, value) => sum + safeNumber(value), 0);
}