export function renderZeusPlayer() {
  return `
    <div class="zeus-audio-player">
      <div class="audio-face">
        <img src="assets/zeus-avatar.png" alt="Zeus Avatar">
      </div>

      <div class="audio-meta">
        <p class="network-kicker">Cinematic Intro</p>
        <h3>Zeus Is Speaking...</h3>
        <p>I am Zeus... guardian of greatness. This is your platform.</p>
        <div class="audio-progress"><span></span></div>
      </div>

      <button>⏸</button>
      <button>🔊</button>
      <button>⛶</button>
    </div>
  `;
}