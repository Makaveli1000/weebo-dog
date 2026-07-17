// ======================================================
// SNT.L.MO. AUTH CONTROLLER
// Handles login modal, login submission, Enter key,
// logout button, and Firebase authentication messages.
// ======================================================

let authControllerCleanup = null;

function getElement(id) {
  return document.getElementById(id);
}

function showElement(id) {
  getElement(id)?.classList.remove(
    "hidden"
  );
}

function hideElement(id) {
  getElement(id)?.classList.add(
    "hidden"
  );
}

function getFirebaseAuthMessage(
  errorCode = ""
) {
  const messages = {
    "auth/invalid-credential":
      "The email or password is incorrect.",

    "auth/user-not-found":
      "No account was found for this email.",

    "auth/wrong-password":
      "The password is incorrect.",

    "auth/invalid-email":
      "The email address is not valid.",

    "auth/missing-password":
      "Enter your password.",

    "auth/too-many-requests":
      "Too many login attempts. Wait a few minutes and try again.",

    "auth/user-disabled":
      "This Firebase account has been disabled.",

    "auth/network-request-failed":
      "The login request could not reach Firebase. Check your internet connection.",

    "auth/operation-not-allowed":
      "Email and password login is not enabled in Firebase Authentication."
  };

  return (
    messages[errorCode] ||
    `Login failed: ${
      errorCode ||
      "unknown-error"
    }`
  );
}

function setLoginButtonState(
  isLoading
) {
  const loginButton =
    getElement(
      "modal-submit-login"
    );

  if (!loginButton) {
    return;
  }

  loginButton.disabled =
    isLoading;

  loginButton.textContent =
    isLoading
      ? "Verifying..."
      : "Verify Authority";
}

function readLoginCredentials() {
  return {
    email:
      getElement(
        "login-email"
      )?.value
        .trim() ||
      "",

    password:
      getElement(
        "login-pass"
      )?.value ||
      ""
  };
}

/**
 * Connects Firebase Authentication controls.
 *
 * @param {Object} options
 * @param {Object} options.auth
 * @param {Function} options.signIn
 * @param {Function} options.signOutUser
 * @param {Function} options.getCurrentUser
 * @param {Function} options.onLoginSuccess
 * @param {Function} options.onLogoutSuccess
 * @returns {Function} cleanup function
 */
export function initializeAuthController({
  auth,

  signIn,

  signOutUser,

  getCurrentUser =
    () => null,

  onLoginSuccess,

  onLogoutSuccess
} = {}) {
  if (
    typeof authControllerCleanup ===
    "function"
  ) {
    authControllerCleanup();
  }

  if (!auth) {
    console.warn(
      "Auth controller requires a Firebase Auth instance."
    );

    return () => {};
  }

  const abortController =
    new AbortController();

  const signal =
    abortController.signal;

  async function submitLogin() {
    const {
      email,
      password
    } =
      readLoginCredentials();

    if (!email || !password) {
      alert(
        "Enter your email and password."
      );

      return;
    }

    if (
      typeof signIn !==
      "function"
    ) {
      console.error(
        "Firebase sign-in handler is missing."
      );

      alert(
        "The login system is not connected."
      );

      return;
    }

    setLoginButtonState(true);

    try {
      const credential =
        await signIn(
          auth,
          email,
          password
        );

      hideElement(
        "login-modal"
      );

      const passwordInput =
        getElement(
          "login-pass"
        );

      if (passwordInput) {
        passwordInput.value = "";
      }

      onLoginSuccess?.(
        credential?.user ||
        null
      );
    } catch (error) {
      console.error(
        "Firebase login failed:",
        error
      );

      alert(
        getFirebaseAuthMessage(
          error?.code
        )
      );
    } finally {
      setLoginButtonState(false);
    }
  }

  async function handleHeaderAuth() {
    const currentUser =
      getCurrentUser?.();

    if (currentUser) {
      if (
        typeof signOutUser !==
        "function"
      ) {
        alert(
          "The logout system is not connected."
        );

        return;
      }

      try {
        await signOutUser(
          auth
        );

        onLogoutSuccess?.();
      } catch (error) {
        console.error(
          "Firebase logout failed:",
          error
        );

        alert(
          "Logout failed. Try again."
        );
      }

      return;
    }

    showElement(
      "login-modal"
    );

    window.setTimeout(
      () => {
        getElement(
          "login-email"
        )?.focus();
      },
      50
    );
  }

  getElement(
    "header-auth-btn"
  )?.addEventListener(
    "click",
    handleHeaderAuth,
    { signal }
  );

  getElement(
    "modal-submit-login"
  )?.addEventListener(
    "click",
    submitLogin,
    { signal }
  );

  getElement(
    "login-pass"
  )?.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key ===
        "Enter"
      ) {
        event.preventDefault();

        submitLogin();
      }
    },
    { signal }
  );

  getElement(
    "login-email"
  )?.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key ===
        "Enter"
      ) {
        event.preventDefault();

        getElement(
          "login-pass"
        )?.focus();
      }
    },
    { signal }
  );

  document
    .querySelectorAll(
      "[data-close-login-modal]"
    )
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          hideElement(
            "login-modal"
          );
        },
        { signal }
      );
    });

  authControllerCleanup =
    () => {
      abortController.abort();

      authControllerCleanup =
        null;
    };

  return authControllerCleanup;
}