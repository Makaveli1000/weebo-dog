import { speak } from "./speech.js";

const ORACLE_UID = "cEQQHNVXPQfXFhOzO1xBXWZcGy52";

export function oracleSpeak(user, text) {
  if (!user) return;
  if (user.uid !== ORACLE_UID) return;

  speak(text, { interrupt: false });
}
