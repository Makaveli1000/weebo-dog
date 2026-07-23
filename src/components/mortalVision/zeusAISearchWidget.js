// ======================================================
// ZEUS AI SEARCH WIDGET
// Athlete, school, recruiting, and highlight search.
// ======================================================

export function createZeusAISearchWidget() {
  return `
    <section
      class="mortal-widget zeus-ai-search-widget"
      aria-labelledby="zeus-ai-search-title"
    >
      <header class="mortal-widget-header">
        <div>
          <span class="mortal-widget-eyebrow">
            Zeus Intelligence
          </span>

          <h2 id="zeus-ai-search-title">
            Zeus AI Search
          </h2>

          <p>
            Search athletes, schools, rankings, recruiting
            profiles, highlights, and national sports data.
          </p>
        </div>

        <span class="zeus-ai-status">
          <span class="zeus-ai-status-dot"></span>
          AI Online
        </span>
      </header>

      <form
        class="zeus-ai-search-form"
        id="zeus-ai-search-form"
      >
        <label
          class="zeus-ai-search-label"
          for="zeus-ai-search-input"
        >
          What do you want Zeus to find?
        </label>

        <div class="zeus-ai-search-bar">
          <input
            id="zeus-ai-search-input"
            class="zeus-ai-search-input"
            type="search"
            name="zeusSearch"
            placeholder="Example: Top football athletes in Missouri"
            autocomplete="off"
          />

          <button
            class="zeus-ai-search-button"
            type="submit"
          >
            Ask Zeus
          </button>
        </div>
      </form>

      <div class="zeus-ai-search-prompts">
        <button
          type="button"
          data-zeus-prompt="Top national athletes"
        >
          Top National Athletes
        </button>

        <button
          type="button"
          data-zeus-prompt="Football recruiting prospects"
        >
          Football Prospects
        </button>

        <button
          type="button"
          data-zeus-prompt="Highest ranked schools"
        >
          Top Schools
        </button>

        <button
          type="button"
          data-zeus-prompt="Trending sports highlights"
        >
          Trending Highlights
        </button>
      </div>

      <div
        class="zeus-ai-search-response"
        id="zeus-ai-search-response"
        aria-live="polite"
      >
        <div class="zeus-ai-response-icon">
          ⚡
        </div>

        <div>
          <strong>Zeus is ready.</strong>

          <p>
            Enter a question or select one of the suggested
            searches above.
          </p>
        </div>
      </div>
    </section>
  `;
}