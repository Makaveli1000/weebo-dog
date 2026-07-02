import { collection, getDocs, limit, query } from "firebase/firestore";

function getTopAthletes(athletes, count = 5) {
  return athletes
    .sort((a, b) => {
      const ar = Number(a.zeusRating || a.score || 0);
      const br = Number(b.zeusRating || b.score || 0);
      return br - ar;
    })
    .slice(0, count);
}

function answerFromAthletes(question, athletes) {
  const q = question.toLowerCase();

  if (!athletes.length) {
    return "I do not see any athlete data in the grid yet. Add athletes in the Admin Command Center, then I can analyze rankings, sports, schools, and recruiting.";
  }

  if (q.includes("top") || q.includes("best") || q.includes("rank")) {
    const top = getTopAthletes(athletes, 5);

    return `
Zeus has analyzed the grid.

Top athletes right now:

${top.map((a, i) => `${i + 1}. ${a.name || "Unknown Athlete"} — ${a.sport || "Sport"} — Zeus Rating: ${a.zeusRating || a.score || "N/A"}`).join("\n")}
    `.trim();
  }

  if (q.includes("football")) {
    const football = athletes.filter(a => String(a.sport || "").toLowerCase().includes("football")).slice(0, 5);

    if (!football.length) return "I do not see football athletes in the grid yet.";

    return `
Football athletes found:

${football.map((a, i) => `${i + 1}. ${a.name || "Unknown"} — ${a.position || "Position N/A"} — ${a.schoolName || a.school || "School N/A"}`).join("\n")}
    `.trim();
  }

  if (q.includes("vashon")) {
    const vashon = athletes.filter(a => String(a.schoolName || a.school || "").toLowerCase().includes("vashon")).slice(0, 5);

    if (!vashon.length) return "I do not see Vashon athletes in the grid yet.";

    return `
Vashon athletes in the grid:

${vashon.map((a, i) => `${i + 1}. ${a.name || "Unknown"} — ${a.sport || "Sport N/A"} — ${a.position || "Position N/A"}`).join("\n")}
    `.trim();
  }

  return "Zeus is connected to the live grid. Ask me about top athletes, football, Vashon, rankings, schools, or recruiting.";
}

export function registerZeusBrainHandlers(db) {
  window.askZeusBrain = async function(question) {
    const response = document.getElementById("zeus2-response");
    const mouth = document.getElementById("zeus2-mouth");

    if (!question?.trim()) {
      if (response) response.textContent = "Ask Zeus a question first.";
      return;
    }

    mouth?.classList.add("talking");
    if (response) response.textContent = "Zeus is analyzing the live grid...";

    try {
      const snap = await getDocs(query(collection(db, "athletes"), limit(200)));
      const athletes = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const answer = answerFromAthletes(question, athletes);

      if (response) response.textContent = answer;

    } catch (err) {
      console.error("Zeus Brain failed:", err);
      if (response) response.textContent = "Zeus could not reach the live grid right now.";
    }

    setTimeout(() => {
      mouth?.classList.remove("talking");
    }, 4500);
  };
}