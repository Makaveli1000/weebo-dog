export function initializeFeedComments(feedRoot) {
  const posts = feedRoot.querySelectorAll(
    "[data-feed-post]"
  );

  posts.forEach((post) => {
    const commentButton = post.querySelector(
      '[data-feed-action="comments"]'
    );

    const commentsPanel = post.querySelector(
      "[data-feed-comments-panel]"
    );

    const commentForm = post.querySelector(
      "[data-feed-comment-form]"
    );

    const commentInput = post.querySelector(
      "[data-feed-comment-input]"
    );

    const commentsList = post.querySelector(
      "[data-feed-comments-list]"
    );

    commentButton?.addEventListener("click", () => {
      commentsPanel?.classList.toggle("hidden");

      if (
        commentsPanel &&
        !commentsPanel.classList.contains("hidden")
      ) {
        commentInput?.focus();
      }
    });

    commentForm?.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();

        const text =
          commentInput?.value.trim() || "";

        if (!text || !commentsList) return;

        const comment = document.createElement("div");

        comment.className =
          "sports-feed-comment";

        comment.innerHTML = `
          <div class="sports-feed-comment-author">
            <strong>Fan</strong>
            <span class="is-fan">Fan</span>
          </div>

          <p></p>
        `;

        const paragraph =
          comment.querySelector("p");

        if (paragraph) {
          paragraph.textContent = text;
        }

        commentsList.appendChild(comment);

        if (commentInput) {
          commentInput.value = "";
        }

        const countElement =
          commentButton?.querySelector("span");

        if (countElement) {
          const currentCount = Number(
            String(countElement.textContent || "0")
              .replace(/,/g, "")
          );

          countElement.textContent =
            (currentCount + 1).toLocaleString();
        }
      }
    );
  });
}