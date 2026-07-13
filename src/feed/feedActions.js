function getSavedPostIds() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(
        "sntlmo-saved-feed-posts"
      ) || "[]"
    );

    return Array.isArray(saved)
      ? saved
      : [];
  } catch {
    return [];
  }
}

function savePostIds(postIds = []) {
  localStorage.setItem(
    "sntlmo-saved-feed-posts",
    JSON.stringify(postIds)
  );
}

export function initializeFeedActions(feedRoot) {
  const posts = Array.from(
    feedRoot.querySelectorAll("[data-feed-post]")
  );

  let savedPostIds = getSavedPostIds();

  posts.forEach((post) => {
    const postId =
      post.dataset.feedPostId || "";

    const shareButton = post.querySelector(
      '[data-feed-action="share"]'
    );

    const saveButton = post.querySelector(
      '[data-feed-action="save"]'
    );

    const athleteButton = post.querySelector(
      ".sports-feed-athlete-link"
    );

    const profileButton = post.querySelector(
  "[data-feed-open-athlete]"
    );

    const title =
      post.querySelector("h3")
        ?.textContent
        ?.trim() ||
      "Snt.L.Mo. Sports Highlight";

    if (
      postId &&
      savedPostIds.includes(postId) &&
      saveButton
    ) {
      saveButton.classList.add("active");
      saveButton.textContent = "⭐ Saved";
    }

    shareButton?.addEventListener(
      "click",
      async () => {
        const athleteId =
          athleteButton?.dataset.athleteId || "";

        const shareUrl = new URL(
          window.location.href
        );

        shareUrl.searchParams.set(
          "feedPost",
          postId
        );

        if (athleteId) {
          shareUrl.searchParams.set(
            "athlete",
            athleteId
          );
        }

        const shareData = {
          title,
          text:
            "Watch this sports video on Snt.L.Mo. Sports Network.",
          url: shareUrl.toString()
        };

        try {
          if (navigator.share) {
            await navigator.share(shareData);
          } else if (navigator.clipboard) {
            await navigator.clipboard.writeText(
              shareUrl.toString()
            );

            alert("Sports Feed link copied.");
          } else {
            window.prompt(
              "Copy this Sports Feed link:",
              shareUrl.toString()
            );
          }
        } catch (error) {
          if (error?.name !== "AbortError") {
            console.error(
              "Unable to share Sports Feed post:",
              error
            );
          }
        }
      }
    );

    saveButton?.addEventListener(
      "click",
      () => {
        if (!postId) return;

        const alreadySaved =
          savedPostIds.includes(postId);

        if (alreadySaved) {
          savedPostIds =
            savedPostIds.filter(
              (savedId) =>
                savedId !== postId
            );

          saveButton.classList.remove("active");
          saveButton.textContent = "⭐ Save";
        } else {
          savedPostIds.push(postId);

          saveButton.classList.add("active");
          saveButton.textContent = "⭐ Saved";
        }

        savePostIds(savedPostIds);
      }
    );

    function openConnectedAthleteProfile(button) {
  const athleteId =
    button?.dataset.athleteId || "";

  if (!athleteId) {
    alert(
      "This video is not connected to an athlete profile yet."
    );

    return;
  }

  window.openAthleteFromDirectory?.(
    athleteId
  );
}

athleteButton?.addEventListener(
  "click",
  () => {
    openConnectedAthleteProfile(
      athleteButton
    );
  }
);

profileButton?.addEventListener(
  "click",
  () => {
    openConnectedAthleteProfile(
      profileButton
    );
  }
);
  });
}