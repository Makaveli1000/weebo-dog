export function renderZeusPlayer() {
  return `
    <div class="zeus-audio-player">
      <div class="audio-face">
        <img src="assets/zeus-avatar.png" alt="Zeus Avatar">
      </div>

      <div class="audio-meta">

  <div class="zeus-intro-avatar">

    <img
      id="zeus-avatar"
      src="assets/zeus-avatar.gif"
      alt="Zeus AI">

    <div class="zeus-speaking-ring"></div>

  </div>

  <p class="network-kicker">ZEUS AI</p>

  <h3>National Recruiting Intelligence</h3>

  <p>
    I am Zeus... guardian of greatness.
    Welcome to the Snt.L.Mo. Sports Network.
    Every athlete has a story. Every play matters.
    Let's discover greatness.
  </p>

  <div class="audio-progress">
    <span></span>
  </div>

</div>

      <button>⏸</button>
      <button>🔊</button>
      <button>⛶</button>
    </div>
  `;
}