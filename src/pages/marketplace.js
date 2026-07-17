function escapeMarketplaceHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function formatMarketplacePrice(value) {
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

export function normalizeMarketplaceProduct(
  product = {}
) {
  const name =
    product.name ||
    product.title ||
    "Untitled Product";

  const numericPrice =
    Number(product.price);

  return {
    ...product,

    name,

    price:
      Number.isFinite(
        numericPrice
      )
        ? numericPrice
        : 0,

    image:
      product.image ||
      product.imageUrl ||
      "assets/gear-placeholder.png",

    location:
      product.location ||
      "US Shipping",

    storeName:
      product.storeName ||
      "Snt.L.Mo. Exclusive",

    isExternal:
      product.isExternal === true
  };
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

export function renderGlobalGearMarketplace(
  products = [],
  {
    normalizeProduct,
    openProduct
  } = {}
) {
  const container =
    document.getElementById(
      "gear-grid-container"
    );

  if (!container) {
    return;
  }

  const normalizedProducts =
    Array.isArray(products)
      ? products.map(
          (product) =>
            typeof normalizeProduct ===
            "function"
              ? normalizeProduct(
                  product
                )
              : product
        )
      : [];

  if (
    !normalizedProducts.length
  ) {
    container.innerHTML = `
      <div class="col-span-full rounded-xl border border-zeus-border bg-zeus-black/60 p-8 text-center">

        <span class="text-3xl">
          🛍️
        </span>

        <strong class="mt-3 block text-sm text-white">
          No marketplace items available
        </strong>

        <p class="mt-1 text-xs text-gray-500">
          Products will appear here when inventory is published.
        </p>

      </div>
    `;

    return;
  }

  container.innerHTML =
    normalizedProducts
      .map(
        (product, index) => `
          <article
            class="group flex flex-col justify-between rounded-xl border border-zeus-border bg-zeus-black/60 p-3 transition hover:border-zeus-gold/30"
            data-marketplace-card="${index}">

            <div>

              <div class="mb-2 flex items-center justify-between gap-2">

                <span class="font-mono text-[8px] uppercase tracking-wider text-gray-500">
                  ${escapeMarketplaceHtml(
                    product.location
                  )}
                </span>

                <span
                  class="rounded border border-zeus-gold/20 bg-zeus-goldSoft px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wide text-zeus-gold">

                  ${
                    product.isExternal
                      ? escapeMarketplaceHtml(
                          product.storeName
                        )
                      : "Snt.L.Mo. Exclusive"
                  }

                </span>

              </div>

              <div
                class="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded border border-zeus-border bg-zeus-panel p-2">

                <img
                  src="${escapeMarketplaceHtml(
                    product.image
                  )}"
                  alt="${escapeMarketplaceHtml(
                    product.name
                  )}"
                  class="absolute inset-0 h-full w-full object-cover"
                  loading="lazy">

              </div>

              <div class="mt-2">

                <h3
                  class="truncate text-[10px] font-bold tracking-tight text-white"
                  title="${escapeMarketplaceHtml(
                    product.name
                  )}">

                  ${escapeMarketplaceHtml(
                    product.name
                  )}

                </h3>

                <p class="mt-0.5 font-mono text-xs font-black text-zeus-gold">
                  ${formatMarketplacePrice(
                    product.price
                  )}
                </p>

              </div>

            </div>

            <button
              type="button"
              data-marketplace-open="${index}"
              class="mt-3 w-full rounded border border-zeus-border bg-zeus-panel px-2 py-1.5 font-mono text-[9px] font-bold uppercase text-gray-400 transition hover:bg-zeus-gold hover:text-black">

              View Details

            </button>

          </article>
        `
      )
      .join("");

  container.onclick = (
    event
  ) => {
    const button =
      event.target.closest(
        "[data-marketplace-open]"
      );

    if (!button) {
      return;
    }

    const productIndex =
      Number(
        button.dataset
          .marketplaceOpen
      );

    const product =
      normalizedProducts[
        productIndex
      ];

    if (
      product &&
      typeof openProduct ===
        "function"
    ) {
      openProduct(product);
    }
  };
}

export function openGearLightbox(
  product = {},
  {
    normalizeProduct
  } = {}
) {
  const modal =
    document.getElementById(
      "gear-lightbox-modal"
    );

  if (!modal) {
    return;
  }

  const normalizedProduct =
    typeof normalizeProduct ===
    "function"
      ? normalizeProduct(product)
      : product;

  const titleElement =
    document.getElementById(
      "lightbox-title"
    );

  if (titleElement) {
    titleElement.textContent =
      normalizedProduct.name ||
      "Marketplace Item";
  }

  const priceElement =
    document.getElementById(
      "lightbox-price"
    );

  if (priceElement) {
    priceElement.textContent =
      formatMarketplacePrice(
        normalizedProduct.price
      );
  }

  const subtitle =
    normalizedProduct.isExternal
      ? `Available via ${
          normalizedProduct.storeName ||
          "External Store"
        } (${
          normalizedProduct.location ||
          "Global"
        })`
      : (
          normalizedProduct.sub ||
          '"Dominate Today" Edition'
        );

  const subtitleElement =
    document.getElementById(
      "lightbox-sub"
    );

  if (subtitleElement) {
    subtitleElement.textContent =
      subtitle;
  }

  const iconElement =
    document.getElementById(
      "lightbox-icon"
    );

  if (iconElement) {
    iconElement.textContent =
      normalizedProduct.isExternal
        ? "👟"
        : (
            normalizedProduct.icon ||
            "🧥"
          );
  }

  const checkoutButton =
    document.getElementById(
      "lightbox-checkout-btn"
    );

  if (checkoutButton) {
    checkoutButton.dataset
      .productPayload =
      JSON.stringify(
        normalizedProduct
      );

    checkoutButton.textContent =
      normalizedProduct.isExternal
        ? `Buy via ${
            normalizedProduct.storeName ||
            "External Store"
          }`
        : "Secure Local Checkout";

    checkoutButton.className =
      normalizedProduct.isExternal
        ? (
            "block w-full cursor-pointer rounded-lg " +
            "bg-white py-3 text-center text-xs font-black " +
            "uppercase tracking-wider text-black transition-all"
          )
        : (
            "block w-full cursor-pointer rounded-lg " +
            "bg-zeus-gold py-3 text-center text-xs font-black " +
            "uppercase tracking-wider text-black transition-all " +
            "hover:bg-yellow-400"
          );
  }

  modal.classList.remove(
    "hidden"
  );
}

let gearLightboxInitialized = false;

export function initializeGearLightbox({
  normalizeProduct,
  redirectToCheckout
} = {}) {
  if (gearLightboxInitialized) {
    return;
  }

  gearLightboxInitialized = true;

  const getElement = (id) =>
    document.getElementById(id);

  getElement("gear-view-tee")
    ?.addEventListener(
      "click",
      () => {
        openGearLightbox(
          {
            name:
              "Wolverines Premium Tee",

            sub:
              '"Outwork Yesterday" Edition',

            price: 30,

            isExternal: false,

            stripePriceId:
              "price_tee_123",

            icon: "👕"
          },
          {
            normalizeProduct
          }
        );
      }
    );

  getElement("gear-view-hoodie")
    ?.addEventListener(
      "click",
      () => {
        openGearLightbox(
          {
            name:
              "Snt.L.Mo Elite Hoodie",

            sub:
              '"Dominate Today" Heavyweight',

            price: 65,

            isExternal: false,

            stripePriceId:
              "price_1QxXYZ123456",

            icon: "🧥"
          },
          {
            normalizeProduct
          }
        );
      }
    );

  getElement("gear-lightbox-close")
    ?.addEventListener(
      "click",
      () => {
        getElement(
          "gear-lightbox-modal"
        )?.classList.add(
          "hidden"
        );
      }
    );

  getElement("gear-lightbox-modal")
    ?.addEventListener(
      "click",
      (event) => {
        if (
          event.target.id ===
          "gear-lightbox-modal"
        ) {
          event.currentTarget
            .classList.add(
              "hidden"
            );
        }
      }
    );

  document
  .getElementById(
    "lightbox-checkout-btn"
  )
  ?.addEventListener(
    "click",
    (event) => {
      const payloadRaw =
        event.currentTarget
          .dataset
          .productPayload;

      if (!payloadRaw) {
        return;
      }

      let product;

      try {
        product =
          JSON.parse(
            payloadRaw
          );
      } catch (error) {
        console.error(
          "Marketplace product payload is invalid:",
          error
        );

        return;
      }

      if (product.isExternal) {
        if (product.affiliateUrl) {
          window.open(
            product.affiliateUrl,
            "_blank",
            "noopener,noreferrer"
          );
        } else {
          alert(
            "This external product does not have a valid purchase link."
          );
        }

        return;
      }

      if (
        typeof redirectToCheckout ===
        "function"
      ) {
        redirectToCheckout(
          product.stripePriceId
        );

        return;
      }

      alert(
        `Launching checkout for ${
          product.name ||
          "this product"
        }...`
      );
    }
  );
}

let unsubscribeMarketplace = null;

export function loadLiveGearMarketplace({
  db,
  collection,
  onSnapshot
} = {}) {
  if (unsubscribeMarketplace) {
    return;
  }

  if (
    !db ||
    typeof collection !== "function" ||
    typeof onSnapshot !== "function"
  ) {
    console.error(
      "Marketplace Firebase dependencies are unavailable."
    );

    renderGlobalGearMarketplace(
      [],
      {
        normalizeProduct:
          normalizeMarketplaceProduct,

        openProduct:
          openGearLightbox
      }
    );

    return;
  }

  const merchandiseCollection =
    collection(
      db,
      "merchandise"
    );

  unsubscribeMarketplace =
    onSnapshot(
      merchandiseCollection,

      (snapshot) => {
        const products =
          snapshot.docs.map(
            (productDocument) => ({
              id:
                productDocument.id,

              ...productDocument.data()
            })
          );

        renderGlobalGearMarketplace(
          products,
          {
            normalizeProduct:
              normalizeMarketplaceProduct,

            openProduct:
              (product) =>
                openGearLightbox(
                  product,
                  {
                    normalizeProduct:
                      normalizeMarketplaceProduct
                  }
                )
          }
        );
      },

      (error) => {
        console.error(
          "Marketplace inventory subscription failed:",
          error
        );

        renderGlobalGearMarketplace(
          [],
          {
            normalizeProduct:
              normalizeMarketplaceProduct,

            openProduct:
              (product) =>
                openGearLightbox(
                  product,
                  {
                    normalizeProduct:
                      normalizeMarketplaceProduct
                  }
                )
          }
        );
      }
    );
}