let voiceReady = false;
let selectedVoice = null;

function initVoice() {
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return;

  selectedVoice =
    voices.find(v => v.name.toLowerCase().includes("male")) ||
    voices.find(v => v.lang.startsWith("en")) ||
    voices[0];

  voiceReady = true;
}

window.speechSynthesis.onvoiceschanged = initVoice;

export function speak(text, options = {}) {
  if (!text) return;

  if (!voiceReady) {
    initVoice();
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = selectedVoice;
  utterance.rate = options.rate || 0.95;
  utterance.pitch = options.pitch || 0.9;
  utterance.volume = options.volume || 1;

  if (options.interrupt !== false) {
    window.speechSynthesis.cancel();
  }

  window.speechSynthesis.speak(utterance);
}
