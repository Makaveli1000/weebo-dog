export function renderZeus2() {
  return `
    <section class="zeus2-stage">

      <div class="zeus2-bg"></div>
      <div class="zeus2-lightning"></div>
      <div class="zeus2-fog"></div>

      <div class="zeus2-copy">
        <h1>ZEUS 2.0</h1>
        <h2>IS SPEAKING...</h2>

        <p>I am Zeus... guardian of greatness.</p>
        <p>This is your platform.</p>
        <p>Every athlete. Every school.</p>
        <p>Every coach. Every fan.</p>
        <p class="zeus2-gold">Now... let’s discover the next generation of greatness.</p>

        <button id="zeus2-speak-btn" class="zeus2-btn">⚡ Speak Zeus</button>
      </div>

      <div class="zeus2-figure">
        <img src="assets/zeus-avatar.png" alt="Zeus Avatar">
        <div class="zeus2-eyes"></div>
        <div id="zeus2-mouth" class="zeus2-mouth"></div>
      </div>

      <div class="zeus2-wave">
        <span></span><span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span><span></span>
      </div>

      <div class="zeus2-ai-box">
        <h3>⚡ Zeus AI</h3>
        <div id="zeus2-response">Ask Zeus anything about athletes, rankings, highlights, or recruiting.</div>
        <input id="zeus2-question" placeholder="Ask Zeus anything...">
        <button id="zeus2-ask-btn">➤</button>
      </div>

    </section>
  `;
}