let enabled = false;

export function toggleZeusDebug() {
  enabled = !enabled;
  console.log(`⚡ ZEUS DEBUG ${enabled ? "ENABLED" : "DISABLED"}`);
}

export function zeusLog(event, data = {}) {
  if (!enabled) return;
  console.log("⚡ ZEUS:", event, data);
}
