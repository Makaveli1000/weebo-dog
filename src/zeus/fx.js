export function thunder() {
  const audio = document.getElementById("zeus-thunder");
  if (!audio) return;

  audio.volume = 0.4;
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

export function lightning() {
  const flash = document.getElementById("zeus-lightning");
  if (!flash) return;

  flash.classList.add("lightning-active");
  setTimeout(() => flash.classList.remove("lightning-active"), 150);
}
