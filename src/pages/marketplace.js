function escapeMarketplaceHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatMarketplacePrice(value) {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return "Contact Seller";
  }

  return new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: "USD"
    }
  ).format(amount);
}

function normalizeMarketplaceProducts(products = []) {
  if (!Array.isArray(products)) {
    return [];
  }

  return products
    .filter(Boolean)
    .map((item, index) => ({
      id:
        item.id ||
        `market-product-${index}`,

      icon:
        item.icon ||
        "🛍️",

      title:
        item.title ||
        item.name ||
        "Marketplace Item",

      price:
        item.price,

      category:
        item.category ||
        item.tag ||
        "Marketplace",

      description:
        item.description ||
        item.text ||
        "",

      athleteId:
        item.athleteId ||
        "",

      athleteName:
        item.athleteName ||
        "",

      schoolId:
        item.schoolId ||
        "",

      schoolName:
        item.schoolName ||
        "",

      sellerId:
        item.sellerId ||
        "",

      sellerName:
        item.sellerName ||
        "",

      sellerEmail:
        item.sellerEmail ||
        item.contactEmail ||
        "",

      sellerVerified:
        Boolean(
          item.sellerVerified ||
          item.verifiedSeller
        ),

      athleteVerified:
        Boolean(
          item.athleteVerified ||
          item.verifiedAthlete
        ),

      campaignStatus:
        item.campaignStatus ||
        item.status ||
        "Active",

      revenueBeneficiary:
        item.revenueBeneficiary ||
        item.beneficiary ||
        "",

      imageUrl:
        item.imageUrl ||
        item.photoUrl ||
        "",

      productUrl:
        item.productUrl ||
        item.checkoutUrl ||
        "",

      featured:
        Boolean(item.featured)
    }));
}

function getDefaultMarketplaceProducts() {
  return normalizeMarketplaceProducts([
    {
      icon: "👕",
      title: "Wolverines Premium Tee",
      price: 30,
      category: "Team Store",
      description:
        "Official team apparel for players, fans, alumni, and families.",
      schoolName: "Vashon High School",
      sellerName: "Vashon Team Store",
      sellerVerified: true,
      campaignStatus: "Active",
      revenueBeneficiary:
        "Vashon Football Program"
    },
    {
      icon: "🧥",
      title: "Snt.L.Mo Elite Hoodie",
      price: 65,
      category: "Exclusive Drop",
      description:
        "Heavyweight launch collection hoodie from Snt.L.Mo. Sports Network.",
      sellerName:
        "Snt.L.Mo. Sports Network",
      sellerVerified: true,
      campaignStatus: "Active"
    },
    {
      icon: "🎟️",
      title: "Game Day Ticket",
      price: 12,
      category: "Tickets",
      description:
        "Tickets for school games, showcases, camps, and tournaments.",
      campaignStatus: "Active"
    },
    {
      icon: "🏈",
      title: "Custom Player Jersey",
      price: 75,
      category: "Athlete Merch",
      description:
        "Player-branded jersey connected to an athlete profile and NIL storefront.",
      athleteName: "Featured Athlete",
      athleteVerified: true,
      campaignStatus: "Active",
      revenueBeneficiary:
        "Athlete NIL Campaign"
    },
    {
      icon: "📣",
      title: "Sponsor Spotlight",
      price: 150,
      category: "NIL Deal",
      description:
        "Local business sponsorship placement for a verified athlete or team.",
      sellerName:
        "Snt.L.Mo. Partnerships",
      sellerVerified: true,
      campaignStatus: "Open"
    },
    {
      icon: "🎥",
      title: "Highlight Promo Package",
      price: 45,
      category: "Digital Product",
      description:
        "Promoted highlight placement across the network and recruiting feed.",
      sellerName:
        "Snt.L.Mo. Media",
      sellerVerified: true,
      campaignStatus: "Active"
    }
  ]);
}

function marketplaceProductCard(product = {}) {
  const profileButton = product.athleteId
    ? `
        <button
          type="button"
          class="market-product-secondary-btn"
          onclick="window.openAthleteFromDirectory?.(
            '${escapeMarketplaceHtml(product.athleteId)}'
          )">

          View Athlete

        </button>
      `
    : "";

  const emailButton = product.sellerEmail
    ? `
        <a
          class="market-product-secondary-btn"
          href="mailto:${escapeMarketplaceHtml(
            product.sellerEmail
          )}?subject=${encodeURIComponent(
            `Marketplace inquiry: ${product.title}`
          )}">

          Contact Seller

        </a>
      `
    : "";

  const checkoutButton = product.productUrl
    ? `
        <a
          class="market-product-primary-btn"
          href="${escapeMarketplaceHtml(
            product.productUrl
          )}"
          target="_blank"
          rel="noopener noreferrer">

          View Item

        </a>
      `
    : `
        <button
          type="button"
          class="market-product-primary-btn"
          onclick="window.openMarketplaceItem?.(
            '${escapeMarketplaceHtml(product.id)}'
          )">

          View Item

        </button>
      `;

  return `
    <article
      class="market-product-card"
      data-marketplace-item
      data-marketplace-category="${escapeMarketplaceHtml(
        product.category
      )}"
      data-marketplace-athlete-id="${escapeMarketplaceHtml(
        product.athleteId
      )}"
      data-marketplace-school="${escapeMarketplaceHtml(
        product.schoolName
      )}">

      <div class="market-product-image">

        ${
          product.imageUrl
            ? `
                <img
                  src="${escapeMarketplaceHtml(
                    product.imageUrl
                  )}"
                  alt="${escapeMarketplaceHtml(
                    product.title
                  )}">
              `
            : `
                <span>
                  ${escapeMarketplaceHtml(product.icon)}
                </span>
              `
        }

        ${
          product.featured
            ? `
                <em class="market-product-featured">
                  Featured
                </em>
              `
            : ""
        }

      </div>

      <div class="market-product-body">

        <div class="market-product-topline">

          <span>
            ${escapeMarketplaceHtml(
              product.category
            )}
          </span>

          <em class="market-campaign-status">
            ${escapeMarketplaceHtml(
              product.campaignStatus
            )}
          </em>

        </div>

        <h3>
          ${escapeMarketplaceHtml(product.title)}
        </h3>

        <p>
          ${escapeMarketplaceHtml(
            product.description
          )}
        </p>

        ${
          product.athleteName
            ? `
                <div class="market-product-connection">

                  <span>
                    👤 Athlete
                  </span>

                  <strong>
                    ${escapeMarketplaceHtml(
                      product.athleteName
                    )}
                  </strong>

                  ${
                    product.athleteVerified
                      ? `
                          <em>
                            ✓ Verified
                          </em>
                        `
                      : ""
                  }

                </div>
              `
            : ""
        }

        ${
          product.schoolName
            ? `
                <div class="market-product-connection">

                  <span>
                    🏫 School
                  </span>

                  <strong>
                    ${escapeMarketplaceHtml(
                      product.schoolName
                    )}
                  </strong>

                </div>
              `
            : ""
        }

        ${
          product.sellerName
            ? `
                <div class="market-product-seller">

                  <span>
                    Sold by
                  </span>

                  <strong>
                    ${escapeMarketplaceHtml(
                      product.sellerName
                    )}
                  </strong>

                  ${
                    product.sellerVerified
                      ? `
                          <em>
                            ✓ Verified Seller
                          </em>
                        `
                      : ""
                  }

                </div>
              `
            : ""
        }

        ${
          product.revenueBeneficiary
            ? `
                <div class="market-product-beneficiary">

                  <span>
                    Revenue supports
                  </span>

                  <strong>
                    ${escapeMarketplaceHtml(
                      product.revenueBeneficiary
                    )}
                  </strong>

                </div>
              `
            : ""
        }

        <strong class="market-product-price">
          ${formatMarketplacePrice(product.price)}
        </strong>

        <div class="market-product-actions">

          ${checkoutButton}

          ${profileButton}

          ${emailButton}

        </div>

      </div>

    </article>
  `;
}

export function renderMarketplacePage(
  products = []
) {
  const marketplaceProducts =
    normalizeMarketplaceProducts(products);

  const displayedProducts =
    marketplaceProducts.length
      ? marketplaceProducts
      : getDefaultMarketplaceProducts();

  const activeNilDeals =
    displayedProducts.filter(
      (product) =>
        product.category === "NIL Deal"
    ).length;

  const athleteProducts =
    displayedProducts.filter(
      (product) =>
        Boolean(product.athleteId) ||
        product.category === "Athlete Merch"
    ).length;

  const verifiedSellers =
    displayedProducts.filter(
      (product) =>
        product.sellerVerified
    ).length;

  return `
    <section
      id="marketplace-page"
      class="marketplace-page">

      <div class="section-header">

        <p class="network-kicker">
          Marketplace
        </p>

        <h2>
          Team Stores & NIL Opportunities
        </h2>

        <p>
          Shop official team gear, athlete merchandise,
          tickets, digital products, sponsor campaigns,
          and verified NIL opportunities.
        </p>

      </div>

      <div class="marketplace-summary-grid">

        <div>
          <span>
            Active Listings
          </span>

          <strong>
            ${displayedProducts.length}
          </strong>
        </div>

        <div>
          <span>
            NIL Opportunities
          </span>

          <strong>
            ${activeNilDeals}
          </strong>
        </div>

        <div>
          <span>
            Athlete Products
          </span>

          <strong>
            ${athleteProducts}
          </strong>
        </div>

        <div>
          <span>
            Verified Sellers
          </span>

          <strong>
            ${verifiedSellers}
          </strong>
        </div>

      </div>

      <div
        id="marketplace-tabs"
        class="marketplace-tabs">

        <button
          type="button"
          class="active"
          data-marketplace-filter="All">

          All

        </button>

        <button
          type="button"
          data-marketplace-filter="Team Store">

          Team Stores

        </button>

        <button
          type="button"
          data-marketplace-filter="Athlete Merch">

          Athlete Merch

        </button>

        <button
          type="button"
          data-marketplace-filter="Tickets">

          Tickets

        </button>

        <button
          type="button"
          data-marketplace-filter="NIL Deal">

          NIL Deals

        </button>

        <button
          type="button"
          data-marketplace-filter="Exclusive Drop">

          Exclusive Drops

        </button>

        <button
          type="button"
          data-marketplace-filter="Digital Product">

          Digital Products

        </button>

      </div>

      <div
        id="marketplace-grid"
        class="marketplace-grid">

        ${displayedProducts
          .map(marketplaceProductCard)
          .join("")}

      </div>

      <div
        id="marketplace-empty"
        class="marketplace-empty hidden">

        <span>
          🛍️
        </span>

        <h3>
          No listings found
        </h3>

        <p>
          No marketplace listings are currently
          available in this category.
        </p>

      </div>

      <div class="marketplace-nil-disclosure">

        <strong>
          NIL Disclosure
        </strong>

        <p>
          Product prices, campaign values, sponsorship
          opportunities, and projected NIL potential are
          not guaranteed earnings. Athletes, families,
          schools, sellers, and sponsors are responsible
          for following applicable school, association,
          state, tax, and contract requirements.
        </p>

      </div>

    </section>
  `;
}