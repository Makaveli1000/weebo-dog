function normalizeList(value) {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map(item => item.trim())
      .filter(Boolean);
  }

  return [];
}

export function renderAthleteAchievements(athlete = {}) {
  const achievements = normalizeList(
    athlete.achievements
  );

  const awards = normalizeList(
    athlete.awards
  );

  const championships = normalizeList(
    athlete.championships
  );

  const honors = [
    ...achievements,
    ...awards,
    ...championships
  ];

  return `
    <section class="athlete-panel athlete-achievements-panel">

      <div class="athlete-panel-heading">

        <div>
          <p class="network-kicker">
            Career Highlights
          </p>

          <h3>
            Achievements & Awards
          </h3>
        </div>

        <span class="athlete-measurement-badge">
          VERIFIED
        </span>

      </div>

      ${
        honors.length
          ? `
            <div class="athlete-achievement-grid">

              ${honors.map(item => `
                <div class="athlete-achievement-card">

                  <div class="athlete-achievement-icon">
                    🏆
                  </div>

                  <div>
                    <strong>
                      ${
                        typeof item === "string"
                          ? item
                          : item.title || "Achievement"
                      }
                    </strong>
                  </div>

                </div>
              `).join("")}

            </div>
          `
          : `
            <div class="athlete-empty-panel">

              <span>🏆</span>

              <h4>
                No achievements listed
              </h4>

              <p>
                Awards and honors will appear here.
              </p>

            </div>
          `
      }

    </section>
  `;
}