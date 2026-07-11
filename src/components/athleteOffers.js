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

export function renderAthleteOffers(athlete = {}) {
  const offers = normalizeList(athlete.offers);

  const interest = normalizeList(
    athlete.interest ||
    athlete.collegeInterest
  );

  const combinedOffers = [
    ...offers.map(name => ({
      name,
      status: "Offer"
    })),
    ...interest.map(name => ({
      name,
      status: "Interest"
    }))
  ];

  return `
    <section class="athlete-panel athlete-offers-panel">

      <div class="athlete-panel-heading">

        <div>
          <p class="network-kicker">
            Recruiting Activity
          </p>

          <h3>
            College Offers & Interest
          </h3>
        </div>

        <span class="athlete-measurement-badge">
          ${combinedOffers.length} TOTAL
        </span>

      </div>

      ${
        combinedOffers.length
          ? `
            <div class="athlete-offer-grid">

              ${combinedOffers.map(item => `
                <div class="athlete-offer-card">

                  <div class="athlete-offer-icon">
                    🎓
                  </div>

                  <div class="athlete-offer-copy">

                    <strong>
                      ${item.name}
                    </strong>

                    <span>
                      ${item.status}
                    </span>

                  </div>

                  <div
                    class="athlete-offer-status ${
                      item.status === "Offer"
                        ? "is-offer"
                        : "is-interest"
                    }">

                    ${item.status}

                  </div>

                </div>
              `).join("")}

            </div>
          `
          : `
            <div class="athlete-empty-panel">

              <span>
                🎓
              </span>

              <h4>
                No recruiting activity listed
              </h4>

              <p>
                College offers and recruiting interest
                will appear here.
              </p>

            </div>
          `
      }

    </section>
  `;
}