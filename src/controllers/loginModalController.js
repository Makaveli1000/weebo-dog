// ======================================================
// LOGIN MODAL CONTROLLER
// Renders and controls the global login modal.
// Authentication submission remains owned by the
// existing authentication controller.
// ======================================================

import {
  createLoginModal
} from "../components/modals/loginModal.js";

export function initializeLoginModal() {
  const modalRoot =
    document.getElementById(
      "login-modal-root"
    );

  if (!modalRoot) {
    console.warn(
      "Login modal root was not found."
    );

    return false;
  }

  modalRoot.innerHTML =
    createLoginModal();

  const modal =
    document.getElementById(
      "login-modal"
    );

  const closeButton =
    modal?.querySelector(
      "[data-login-modal-action='close']"
    );

  closeButton?.addEventListener(
    "click",
    closeLoginModal
  );

  modal?.addEventListener(
    "click",
    event => {
      if (event.target === modal) {
        closeLoginModal();
      }
    }
  );

  document.addEventListener(
    "keydown",
    handleLoginModalKeydown
  );

  window.openLoginModal =
    openLoginModal;

  window.closeLoginModal =
    closeLoginModal;

  console.log(
    "Login modal initialized."
  );

  return true;
}

export function openLoginModal() {
  const modal =
    document.getElementById(
      "login-modal"
    );

  if (!modal) {
    console.warn(
      "Login modal was not found."
    );

    return;
  }

  modal.classList.remove("hidden");

  requestAnimationFrame(
    () => {
      document
        .getElementById("login-email")
        ?.focus();
    }
  );
}

export function closeLoginModal() {
  document
    .getElementById("login-modal")
    ?.classList.add("hidden");
}

function handleLoginModalKeydown(
  event
) {
  if (event.key !== "Escape") {
    return;
  }

  closeLoginModal();
}