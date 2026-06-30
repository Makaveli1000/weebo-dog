function productCard(icon, title, price, tag) {
  return `
    <div class="market-product-card">
      <div class="market-product-image">${icon}</div>

      <div class="market-product-body">
        <span>${tag}</span>
        <h3>${title}</h3>
        <strong>$${price}</strong>

        <button class="athlete-card-btn">
          View Item
        </button>
      </div>
    </div>
  `;
}

export function renderMarketplacePage() {
  return `
    <section class="marketplace-page">
      <div class="section-header">
        <p class="network-kicker">Gear Vault</p>
        <h2>Marketplace & NIL Store</h2>
        <p>Team stores, athlete merch, tickets, NIL deals, alumni gear, and exclusive drops.</p>
      </div>

      <div class="marketplace-tabs">
        <button>All</button>
        <button>Team Stores</button>
        <button>Athlete Merch</button>
        <button>Tickets</button>
        <button>NIL Deals</button>
      </div>

      <div class="marketplace-grid">
        ${productCard("👕", "Wolverines Premium Tee", "30", "Team Store")}
        ${productCard("🧥", "Snt.L.Mo Elite Hoodie", "65", "Exclusive Drop")}
        ${productCard("🎟️", "Game Day Ticket", "12", "Live Event")}
        ${productCard("🏈", "Custom Player Jersey", "75", "Athlete Merch")}
      </div>
    </section>
  `;
}