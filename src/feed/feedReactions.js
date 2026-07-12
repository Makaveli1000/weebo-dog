export function initializeFeedReactions(feedRoot) {
  const reactionButtons = feedRoot.querySelectorAll(
    "[data-zeus-reaction]"
  );

  reactionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const countElement = button.querySelector("span");

      const currentCount = Number(
        String(countElement?.textContent || "0")
          .replace(/,/g, "")
      );

      const isActive = button.classList.toggle("active");

      const nextCount = Math.max(
        0,
        currentCount + (isActive ? 1 : -1)
      );

      if (countElement) {
        countElement.textContent =
          nextCount.toLocaleString();
      }
    });
  });
}