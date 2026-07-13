function normalizeFeedValue(value = "") {
  return String(value)
    .trim()
    .toLowerCase();
}

export function initializeFeedFilters(feedRoot) {
  const tabs = feedRoot.querySelector(
    "#sports-feed-tabs"
  );

  const feedList = feedRoot.querySelector(
    "#sports-feed-list"
  );

  if (!tabs || !feedList) return;

  const buttons = Array.from(
    tabs.querySelectorAll("[data-feed-filter]")
  );

  const posts = Array.from(
    feedList.querySelectorAll("[data-feed-post]")
  );

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter =
        button.dataset.feedFilter || "All";

      const normalizedFilter =
        normalizeFeedValue(selectedFilter);

      buttons.forEach((item) => {
        item.classList.toggle(
          "active",
          item === button
        );
      });

      posts.forEach((post) => {
        const category = normalizeFeedValue(
          post.dataset.feedCategory || ""
        );

        const showPost =
          normalizedFilter === "all" ||
          normalizedFilter === "trending" ||
          normalizedFilter === "latest" ||
          category === normalizedFilter;

        if (showPost) {
          delete post.dataset.filteredOut;
        } else {
          post.dataset.filteredOut = "true";
          post.hidden = true;
        }
      });

      if (normalizedFilter === "trending") {
        [...posts]
          .sort(
            (a, b) =>
              Number(b.dataset.trendingScore || 0) -
              Number(a.dataset.trendingScore || 0)
          )
          .forEach((post) => {
            feedList.appendChild(post);
          });
      }

      if (normalizedFilter === "latest") {
        [...posts]
          .sort(
            (a, b) =>
              Number(b.dataset.feedCreatedAt || 0) -
              Number(a.dataset.feedCreatedAt || 0)
          )
          .forEach((post) => {
            feedList.appendChild(post);
          });
      }

      feedRoot.dispatchEvent(
        new CustomEvent(
          "sntlmo:feed-filter-changed",
          {
            detail: {
              filter: selectedFilter
            }
          }
        )
      );
    });
  });
}