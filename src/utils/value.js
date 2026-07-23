// ======================================================
// VALUE UTILITIES
// Shared value and number normalization helpers.
// ======================================================

export function safeNumber(value) {
  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : 0;
}

export function isFirebaseStorageUrl(
  value = ""
) {
  const url =
    String(value || "");

  return (
    url.includes("firebasestorage") ||
    url.includes(".appspot.com")
  );
}