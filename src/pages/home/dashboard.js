export function renderDashboard() {
  return `
    <div class="dashboard-title">National Dashboard</div>

    <div class="cinematic-stat-strip">
      <div><span>👤</span><p>Athletes</p><strong class="count-up" data-target="256852">0</strong><small>↑ 1,842 today</small></div>
      <div><span>🏫</span><p>Schools</p><strong class="count-up" data-target="12347">0</strong><small>↑ 72 today</small></div>
      <div><span>🎥</span><p>Highlights</p><strong class="count-up" data-target="1024381">0</strong><small>↑ 8,721 today</small></div>
      <div><span>📡</span><p>Live Games</p><strong class="count-up" data-target="87">0</strong><small>Live now</small></div>
      <div><span>🎓</span><p>Recruiters</p><strong class="count-up" data-target="25687">0</strong><small>↑ 203 today</small></div>
      <div><span>🤖</span><p>Zeus AI Reports</p><strong class="count-up" data-target="18932">0</strong><small>↑ 620 today</small></div>
      <div><span>💰</span><p>NIL Deals</p><strong class="count-up" data-target="3412">0</strong><small>↑ 115 today</small></div>
    </div>
  `;
}