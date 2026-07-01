function productCard(icon, title, price, tag, text) {
  return `
    <article class="market-product-card">
      <div class="market-product-image">${icon}</div>

      <div class="market-product-body">
        <span>${tag}</span>
        <h3>${title}</h3>
        <p>${text}</p>
        <strong>$${price}</strong>

        <button class="athlete-card-btn">View Item</button>
      </div>
    </article>
  `;
}

export function renderMarketplacePage() {
  return `
    <section class="marketplace-page">
      <div class="section-header">
        <p class="network-kicker">Marketplace</p>
        <h2>Team Stores & NIL Deals</h2>
        <p>Sell team gear, athlete merch, event tickets, sponsor packages, digital products, and exclusive drops.</p>
      </div>

      <div class="marketplace-tabs">
        <button>All</button>
        <button>Team Stores</button>
        <button>Athlete Merch</button>
        <button>Tickets</button>
        <button>NIL Deals</button>
        <button>Exclusive Drops</button>
      </div>

      <div class="marketplace-grid">
        ${productCard("👕", "Wolverines Premium Tee", "30", "Team Store", "Official team apparel for players, fans, alumni, and families.")}
        ${productCard("🧥", "Snt.L.Mo Elite Hoodie", "65", "Exclusive Drop", "Heavyweight hoodie for the Snt.L.Mo. Sports Network launch collection.")}
        ${productCard("🎟️", "Game Day Ticket", "12", "Live Event", "Sell tickets for school games, showcases, camps, and tournaments.")}
        ${productCard("🏈", "Custom Player Jersey", "75", "Athlete Merch", "Player-branded jerseys connected to athlete profile pages and NIL storefronts.")}
        ${productCard("📣", "Sponsor Spotlight", "150", "NIL Deal", "Local business sponsorship placement for athletes and teams.")}
        ${productCard("🎥", "Highlight Promo Package", "45", "Digital Product", "Promoted highlight posts across the network and recruiting feed.")}
      </div>
    </section>
  `;
}