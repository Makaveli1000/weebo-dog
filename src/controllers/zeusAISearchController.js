// ======================================================
// ZEUS AI SEARCH CONTROLLER
// Handles Zeus AI search interactions and communicates
// with the central Zeus data service.
// ======================================================

import {
  searchZeus
} from "../services/zeusDataService.js";

// Prevents HTML from being inserted through a search query.
function escapeHTML(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function createEmptySearchMessage() {
  return `
    <div class="zeus-ai-response-icon">
      ⚠️
    </div>

    <div>
      <strong>No search entered.</strong>

      <p>
        Enter an athlete, school, sport, ranking,
        recruiting question, or highlight search.
      </p>
    </div>
  `;
}

function createLoadingMessage(query) {
  return `
    <div class="zeus-ai-response-icon">
      ⚡
    </div>

    <div>
      <strong>Zeus is searching...</strong>

      <p>
        Searching PROJECTSPORTS for
        “${escapeHTML(query)}”.
      </p>
    </div>
  `;
}

function createErrorMessage() {
  return `
    <div class="zeus-ai-response-icon">
      ⚠️
    </div>

    <div>
      <strong>Zeus search failed.</strong>

      <p>
        The search could not be completed.
        Please try again.
      </p>
    </div>
  `;
}

function getResultCount(results) {
  return (
    results.athletes.length +
    results.schools.length +
    results.highlights.length +
    results.recruiting.length
  );
}

function createResultSummary(results) {
  const totalResults = getResultCount(results);

  if (totalResults === 0) {
    return `
      <div class="zeus-ai-response-icon">
        🤖
      </div>

      <div>
        <strong>No matching records found.</strong>

        <p>
          Zeus searched athletes, schools,
          highlights, and recruiting records,
          but no matching live data was returned.
        </p>
      </div>
    `;
  }

  return `
    <div class="zeus-ai-response-icon">
      ⚡
    </div>

    <div>
      <strong>
        Zeus found ${totalResults}
        ${totalResults === 1 ? "result" : "results"}.
      </strong>

      <p>
        Athletes: ${results.athletes.length}
        &nbsp;•&nbsp;
        Schools: ${results.schools.length}
        &nbsp;•&nbsp;
        Highlights: ${results.highlights.length}
        &nbsp;•&nbsp;
        Recruiting: ${results.recruiting.length}
      </p>
    </div>
  `;
}

function normalizeSearchResults(results = {}) {
  return {
    athletes: Array.isArray(results.athletes)
      ? results.athletes
      : [],

    schools: Array.isArray(results.schools)
      ? results.schools
      : [],

    highlights: Array.isArray(results.highlights)
      ? results.highlights
      : [],

    recruiting: Array.isArray(results.recruiting)
      ? results.recruiting
      : []
  };
}

export function initializeZeusAISearch() {
  const form = document.getElementById(
    "zeus-ai-search-form"
  );

  const input = document.getElementById(
    "zeus-ai-search-input"
  );

  const response = document.getElementById(
    "zeus-ai-search-response"
  );

  const submitButton = form?.querySelector(
    ".zeus-ai-search-button"
  );

  if (!form || !input || !response) {
    return;
  }

  form.addEventListener(
    "submit",
    async (event) => {
      event.preventDefault();

      const query = input.value.trim();

      if (!query) {
        response.innerHTML =
          createEmptySearchMessage();

        input.focus();

        return;
      }

      response.innerHTML =
        createLoadingMessage(query);

      input.disabled = true;

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Searching...";
      }

      try {
        const searchResults =
          await searchZeus(query);

        const normalizedResults =
          normalizeSearchResults(searchResults);

        response.innerHTML =
          createResultSummary(
            normalizedResults
          );
      } catch (error) {
        console.error(
          "Zeus AI search error:",
          error
        );

        response.innerHTML =
          createErrorMessage();
      } finally {
        input.disabled = false;

        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent =
            "Ask Zeus";
        }

        input.focus();
      }
    }
  );

  document
    .querySelectorAll("[data-zeus-prompt]")
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          const prompt =
            button.dataset.zeusPrompt?.trim();

          if (!prompt) {
            return;
          }

          input.value = prompt;

          form.requestSubmit();
        }
      );
    });
}