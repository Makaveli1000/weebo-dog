export function initializeFeedInfiniteScroll(feedRoot) {
  const feedList = feedRoot.querySelector(
    "#sports-feed-list"
  );

  const loadMarker = feedRoot.querySelector(
    "#sports-feed-load-marker"
  );

  if (!feedList || !loadMarker) return;

  const allPosts = Array.from(
    feedList.querySelectorAll("[data-feed-post]")
  );

  const POSTS_PER_LOAD = 4;
  let visiblePostCount = POSTS_PER_LOAD;

  function showVisiblePosts() {
    const availablePosts = allPosts.filter(
      (post) => post.dataset.filteredOut !== "true"
    );

    availablePosts.forEach((post, index) => {
      post.hidden = index >= visiblePostCount;
    });

    loadMarker.hidden =
      visiblePostCount >= availablePosts.length;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const markerEntry = entries[0];

      if (!markerEntry?.isIntersecting) return;

      visiblePostCount += POSTS_PER_LOAD;
      showVisiblePosts();
    },
    {
      rootMargin: "300px"
    }
  );

  observer.observe(loadMarker);

  showVisiblePosts();

  feedRoot.addEventListener(
    "sntlmo:feed-filter-changed",
    () => {
      visiblePostCount = POSTS_PER_LOAD;
      showVisiblePosts();
    }
  );
}