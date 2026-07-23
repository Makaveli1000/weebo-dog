// ======================================================
// MORTAL VISION STATS COMPONENT
// Builds the national platform statistics row.
// ======================================================

export function createMortalVisionStats(stats = []) {
  const statCards = stats
    .map(
      (stat) => `
        <article class="mortal-vision-stat-card">

          <strong class="mortal-vision-stat-value">
            ${stat.value}
          </strong>

          <span class="mortal-vision-stat-label">
            ${stat.label}
          </span>

        </article>
      `
    )
    .join("");

  return `
    <section
      class="mortal-vision-stats"
      aria-label="Mortal Vision network statistics"
    >
      ${statCards}
    </section>
  `;
}