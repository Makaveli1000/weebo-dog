// ======================================================
// LIVE RANKINGS WIDGET
// Displays live athlete rankings from Firestore.
// ======================================================

export function createLiveRankingsWidget() {
  return `
    <section
      class="mortal-widget live-rankings-widget"
      aria-labelledby="live-rankings-title"
    >
      <header class="mortal-widget-header">
        <div>
          <span class="mortal-widget-eyebrow">
            National Intelligence
          </span>

          <h2 id="live-rankings-title">
            Live Rankings
          </h2>

          <p>
            Current athlete rankings powered by the
            Zeus performance evaluation system.
          </p>
        </div>

        <button
          class="mortal-widget-action"
          type="button"
          data-mortal-action="open-rankings"
        >
          View Full Rankings
        </button>
      </header>

      <div
        class="live-rankings-list"
        id="live-rankings-list"
        aria-live="polite"
      >
        <div class="live-rankings-loading">
          Loading live athlete rankings...
        </div>
      </div>
    </section>
  `;
}