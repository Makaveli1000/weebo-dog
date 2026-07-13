import {
  doc,
  onSnapshot,
  runTransaction,
  serverTimestamp
} from "firebase/firestore";

export function initializeFeedLikes(
  feedRoot,
  {
    db,
    currentUser
  } = {}
) {
  if (!db) {
    console.error(
      "Sports Feed likes cannot start because Firestore was not provided."
    );

    return;
  }

  const posts = Array.from(
    feedRoot.querySelectorAll("[data-feed-post]")
  );

  posts.forEach((post) => {
    const postId =
      post.dataset.feedPostId || "";

    if (!postId) return;

    const likeButton = post.querySelector(
      '[data-feed-action="like"]'
    );

    const countElement =
      likeButton?.querySelector("span");

    if (!likeButton || !countElement) return;

    const likeRef = doc(
      db,
      "feedPosts",
      postId
    );

    onSnapshot(
      likeRef,
      (snapshot) => {
        const data = snapshot.exists()
          ? snapshot.data()
          : {};

        countElement.textContent =
          Number(data.likes || 0).toLocaleString();

        const likedBy = Array.isArray(data.likedBy)
          ? data.likedBy
          : [];

        likeButton.classList.toggle(
          "active",
          Boolean(
            currentUser?.uid &&
            likedBy.includes(currentUser.uid)
          )
        );
      },
      (error) => {
        console.error(
          "Unable to load Sports Feed likes:",
          error
        );
      }
    );

    likeButton.addEventListener(
      "click",
      async () => {
        if (!currentUser) {
          alert(
            "Please log in before liking a video."
          );

          return;
        }

        likeButton.disabled = true;

        try {
          await runTransaction(
            db,
            async (transaction) => {
              const snapshot =
                await transaction.get(likeRef);

              const data = snapshot.exists()
                ? snapshot.data()
                : {};

              const likedBy = Array.isArray(
                data.likedBy
              )
                ? [...data.likedBy]
                : [];

              const alreadyLiked =
                likedBy.includes(currentUser.uid);

              const updatedLikedBy =
                alreadyLiked
                  ? likedBy.filter(
                      (uid) =>
                        uid !== currentUser.uid
                    )
                  : [
                      ...likedBy,
                      currentUser.uid
                    ];

              transaction.set(
                likeRef,
                {
                  likes:
                    updatedLikedBy.length,

                  likedBy:
                    updatedLikedBy,

                  updatedAt:
                    serverTimestamp()
                },
                {
                  merge: true
                }
              );
            }
          );
        } catch (error) {
          console.error(
            "Unable to update Sports Feed like:",
            error
          );

          alert(
            "The like could not be saved."
          );
        } finally {
          likeButton.disabled = false;
        }
      }
    );
  });
}