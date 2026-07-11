export function renderZeusScoreCard(athlete = {}) {
  const score =
    athlete.zeusRating ||
    athlete.score ||
    athlete.total ||
    "N/A";

  const numericScore = Number(score);

  const nationalRank =
    athlete.nationalRank ||
    athlete.rankNational ||
    "—";

  const stateRank =
    athlete.stateRank ||
    athlete.rankState ||
    "—";

  const positionRank =
    athlete.positionRank ||
    athlete.rankPosition ||
    "—";

  const recruitingStatus =
    athlete.recruitingStatus ||
    athlete.commitmentStatus ||
    "Open";

  const starRating =
    Number.isFinite(numericScore)
      ? numericScore >= 480
        ? 5
        : numericScore >= 450
          ? 4
          : numericScore >= 400
            ? 3
            : 2
      : 0;

  const starDisplay =
    starRating
      ? "★".repeat(starRating) +
        "☆".repeat(5 - starRating)
      : "☆☆☆☆☆";

  return `
    <aside class="athlete-hero-v3-rating">

      <div class="athlete-zeus-score-card">

        <span>
          ZEUS RATING
        </span>

        <strong>
          ${score}
        </strong>

        <div class="athlete-zeus-stars">
          ${starDisplay}
        </div>

        <small>
          National Recruiting Projection
        </small>

      </div>

      <div class="athlete-ranking-grid">

        <div>
          <span>National Rank</span>
          <strong>${nationalRank}</strong>
        </div>

        <div>
          <span>State Rank</span>
          <strong>${stateRank}</strong>
        </div>

        <div>
          <span>Position Rank</span>
          <strong>${positionRank}</strong>
        </div>

      </div>

      <div class="athlete-recruiting-status">

        <span>
          Recruiting Status
        </span>

        <strong>
          ${recruitingStatus}
        </strong>

      </div>

    </aside>
  `;
}