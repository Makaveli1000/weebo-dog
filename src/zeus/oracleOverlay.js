const ORACLE_UID = "cEQQHNVXPQfXFhOzO1xBXWZcGy52";

export function injectOracleOverlay(user, stats = {}) {
  if (!user || user.uid !== ORACLE_UID) return;

  let panel = document.getElementById("oracle-overlay");
  if (!panel) {
    panel = document.createElement("div");
    panel.id = "oracle-overlay";
    panel.className =
      "fixed bottom-4 right-4 bg-black/80 text-yellow-400 text-xs font-mono p-3 rounded shadow-lg z-[9999]";
    document.body.appendChild(panel);
  }

  panel.innerHTML = Object.entries(stats)
    .map(([k, v]) => `<div>${k}: <span class="text-white">${v}</span></div>`)
    .join("");
}
