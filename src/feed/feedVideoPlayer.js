export function initializeFeedVideoPlayer(feedRoot) {
  const posts = Array.from(
    feedRoot.querySelectorAll("[data-feed-post]")
  );

  if (!posts.length) return;

  const autoplayObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target.querySelector("video");

        if (!video) return;

        if (
          entry.isIntersecting &&
          entry.intersectionRatio >= 0.7
        ) {
          feedRoot
            .querySelectorAll("video")
            .forEach((otherVideo) => {
              if (otherVideo !== video) {
                otherVideo.pause();
              }
            });

          video.muted = true;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    {
      threshold: [0.25, 0.7]
    }
  );

  posts.forEach((post) => {
    autoplayObserver.observe(post);
  });

  let touchStartY = 0;

  feedRoot.addEventListener(
    "touchstart",
    (event) => {
      touchStartY =
        event.changedTouches[0]?.clientY || 0;
    },
    {
      passive: true
    }
  );

  feedRoot.addEventListener(
    "touchend",
    (event) => {
      const touchEndY =
        event.changedTouches[0]?.clientY || 0;

      const difference =
        touchStartY - touchEndY;

      if (Math.abs(difference) < 50) return;

      const visiblePosts = posts.filter(
        (post) => !post.hidden
      );

      const currentIndex = visiblePosts.findIndex(
        (post) => {
          const rect = post.getBoundingClientRect();

          return (
            rect.top >= -100 &&
            rect.top <= window.innerHeight / 2
          );
        }
      );

      const safeCurrentIndex =
        currentIndex === -1 ? 0 : currentIndex;

      const nextIndex =
        difference > 0
          ? Math.min(
              safeCurrentIndex + 1,
              visiblePosts.length - 1
            )
          : Math.max(
              safeCurrentIndex - 1,
              0
            );

      visiblePosts[nextIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    },
    {
      passive: true
    }
  );
}