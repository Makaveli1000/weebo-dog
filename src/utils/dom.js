// ======================================================
// DOM UTILITIES
// Shared helpers for finding, showing, hiding,
// and updating elements.
// ======================================================

export function getElement(id) {
  return document.getElementById(id);
}

export function showElement(id) {
  getElement(id)?.classList.remove("hidden");
}

export function hideElement(id) {
  getElement(id)?.classList.add("hidden");
}

export function setElementText(
  id,
  text = ""
) {
  const element = getElement(id);

  if (!element) {
    return;
  }

  element.textContent =
    String(text ?? "");
}

export function escapeHtml(
  value = ""
) {
  return String(value ?? "")
    .replace(
      /[&<>"']/g,
      character => {
        const entities = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;"
        };

        return (
          entities[character] ||
          character
        );
      }
    );
}