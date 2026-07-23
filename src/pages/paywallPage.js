// ======================================================
// PAYWALL PAGE
// Pre-login Mortal Vision introduction screen.
// ======================================================

export function createPaywallPage() {
  return `
    <section
  class="mortal-vision-page"
  aria-labelledby="mortal-paywall-title"
>

<div class="mortal-vision-stage">

  <!-- LEFT OLYMPUS LOGO -->
  <img
    src="./sn-olympus-logo.png"
    alt=""
    class="
      mortal-large-crest
      mortal-large-crest-left
    "
    aria-hidden="true"
  />

  <!-- RIGHT OLYMPUS LOGO -->
  <img
    src="./sn-olympus-logo.png"
    alt=""
    class="
      mortal-large-crest
      mortal-large-crest-right
    "
    aria-hidden="true"
  />

  <div class="mortal-vision-panel">

    <div class="mortal-orbit-system">

      <!-- Rotating ring -->
      <div
        class="mortal-icon-orbit"
        aria-hidden="true"
      >

        <div class="mortal-icon-position mortal-icon-position-one">
          <img
            src="./icons/spartan-helmet.png"
            alt=""
            class="mortal-custom-icon"
          />
        </div>

        <div class="mortal-icon-position mortal-icon-position-two">
          <img
            src="./icons/africa-pyramid.png"
            alt=""
            class="mortal-custom-icon"
          />
        </div>

        <div class="mortal-icon-position mortal-icon-position-three">
          <img
            src="./icons/lightning-sn.png"
            alt=""
            class="mortal-custom-icon"
          />
        </div>

        <div class="mortal-icon-position mortal-icon-position-four">
          <img
            src="./icons/sn-shield.png"
            alt=""
            class="mortal-custom-icon"
          />
        </div>

      </div>


      <!-- Center card -->
      <div class="mortal-stationary-content">

        <p class="mortal-network-name">
          Snt.L.Mo. Sports Network
        </p>

        <div class="mortal-crown">
          👑
        </div>

        <h1
          id="mortal-paywall-title"
          class="mortal-small-title"
        >
          <span>Mortal Vision</span>
          <strong>Active</strong>
        </h1>

        <div class="mortal-small-divider"></div>

        <p class="mortal-small-description">
          Enter the national athlete intelligence system for live rankings,
          scouting, recruiting, highlights, projections, and access to the
          Olympus War Room.
        </p>

        <button
          type="button"
          class="mortal-small-button"
          data-paywall-action="establish-connection"
        >
          Establish Connection
        </button>

      </div>

    </div>

  </div>

</div>

</section>
  `;
}