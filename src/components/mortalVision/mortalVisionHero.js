// ======================================================
// MORTAL VISION HERO COMPONENT
// Builds the complete Zeus AI command-center introduction.
// ======================================================

export function createMortalVisionHero(content) {
  return `
    <section class="mortal-vision-hero">

      <div
        class="mortal-corner-logo mortal-corner-logo-left"
        aria-hidden="true"
      >
        <img
          src="./sn-olympus-logo.png"
          alt=""
        />
      </div>

      <div
        class="mortal-corner-logo mortal-corner-logo-right"
        aria-hidden="true"
      >
        <img
          src="./sn-olympus-logo.png"
          alt=""
        />
      </div>

      <div
        class="mortal-symbol mortal-symbol-left"
        aria-hidden="true"
      >
        ⚡
      </div>

      <div
        class="mortal-symbol mortal-symbol-right"
        aria-hidden="true"
      >
        ⚡
      </div>

      <div class="mortal-vision-hero-content">

        <p class="mortal-vision-eyebrow">
          ${content.eyebrow}
        </p>

        <h1 class="mortal-vision-title">
          ${content.title}
        </h1>

        <p class="mortal-vision-description">
          ${content.description}
        </p>

        <div class="mortal-vision-actions">

          <button
            type="button"
            class="mortal-vision-button mortal-vision-button-primary"
            data-mortal-action="${content.primaryButton.action}"
          >
            ${content.primaryButton.label}
          </button>

          <button
            type="button"
            class="mortal-vision-button mortal-vision-button-secondary"
            data-mortal-action="${content.secondaryButton.action}"
          >
            ${content.secondaryButton.label}
          </button>

        </div>

      </div>

    </section>
  `;
}