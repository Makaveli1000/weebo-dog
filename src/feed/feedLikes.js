export function initializeFeedLikes(feedRoot) {
  const likeButtons = feedRoot.querySelectorAll(
    '[data-feed-action="like"]'
  );

  likeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const countElement = button.querySelector("span");

      const currentCount = Number(
        String(countElement?.textContent || "0")
          .replace(/,/g, "")
      );

      const isLiked = button.classList.toggle("active");

      const nextCount = Math.max(
        0,
        currentCount + (isLiked ? 1 : -1)
      );

      if (countElement) {
        countElement.textContent =
          nextCount.toLocaleString();
      }
    });
  });
}