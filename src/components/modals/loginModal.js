// ======================================================
// LOGIN MODAL COMPONENT
// Creates the authentication access modal.
// ======================================================

export function createLoginModal() {
  return `
    <div
      id="login-modal"
      class="hidden fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-modal-pop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      <div
        class="border border-zeus-border bg-zeus-black max-w-sm w-full p-6 rounded-xl shadow-panel-deep relative"
      >
        <h3
          id="login-modal-title"
          class="text-base font-black text-white uppercase tracking-tight mb-4 font-mono text-center"
        >
          Establish Administrative Security
        </h3>

        <form
          id="login-form"
          class="space-y-3"
        >
          <input
            type="email"
            id="login-email"
            name="email"
            placeholder="Terminal Access Identity Key"
            autocomplete="email"
            required
            class="w-full bg-zeus-panel border border-zeus-border rounded p-2 text-sm text-white focus:outline-none focus:border-zeus-gold"
          />

          <input
            type="password"
            id="login-pass"
            name="password"
            placeholder="Authorization Pin Lock"
            autocomplete="current-password"
            required
            class="w-full bg-zeus-panel border border-zeus-border rounded p-2 text-sm text-white focus:outline-none focus:border-zeus-gold"
          />

          <button
  id="modal-submit-login"
  type="submit"
  class="w-full bg-zeus-gold hover:bg-yellow-400 text-black font-bold py-2 rounded transition font-mono uppercase text-xs tracking-wider"
>
  Verify Authority
</button>

<button
  id="google-login-btn"
  type="button"
  class="w-full bg-white hover:bg-gray-100 text-black font-bold py-2 rounded transition mt-3"
>
  Continue with Google
</button>

<button
  id="facebook-login-btn"
  type="button"
  class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition mt-2"
>
  Continue with Facebook
</button>

        <button
          type="button"
          data-login-modal-action="close"
          class="absolute top-3 right-3 text-gray-600 hover:text-white text-sm font-mono"
          aria-label="Close login modal"
        >
          &times;
        </button>
      </div>
    </div>
  `;
}