// ======================================================
// MORTAL VISION MODULES COMPONENT
// Builds the Zeus AI command center feature cards.
// ======================================================

export function createMortalVisionModules(modules = []) {
  const cards = modules
    .map(
      (module) => `
        <article class="mortal-module-card">

          <div class="mortal-module-icon">
            ${module.icon}
          </div>

          <h3 class="mortal-module-title">
            ${module.title}
          </h3>

          <p class="mortal-module-description">
            ${module.description}
          </p>

        </article>
      `
    )
    .join("");

  return `
    <section
      class="mortal-modules-grid"
      aria-label="Zeus AI modules"
    >
      ${cards}
    </section>
  `;
}