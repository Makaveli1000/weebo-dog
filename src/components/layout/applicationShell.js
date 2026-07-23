// ======================================================
// APPLICATION SHELL
// Creates the mounting containers used by platform pages.
// Keeps page roots out of index.html.
// ======================================================

export function createApplicationShell() {
  return `
    <section
      id="home-root"
      class="network-section"
    ></section>

    <section
      id="account-setup-root"
      class="network-section hidden"
    ></section>

    <section
      id="national-dashboard-root"
      class="network-section"
    ></section>

    <section
      id="athlete-directory-page"
      class="network-section"
    ></section>

    <section
      id="schools-root"
      class="network-section"
    ></section>

    <section
      id="rankings-root"
      class="network-section"
    ></section>

    <section
      id="recruiting-root"
      class="network-section"
    ></section>

    <section
      id="highlights-root"
      class="network-section"
    ></section>

    <section
      id="live-root"
      class="network-section"
    ></section>

    <section
      id="marketplace-root"
      class="network-section"
    ></section>

    <section
      id="zeus-ai-root"
      class="network-section"
    ></section>
  `;
}