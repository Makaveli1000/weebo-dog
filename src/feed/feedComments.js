import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";

function escapeCommentHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getCommentRole(profile, isAdminProfile) {
  if (isAdminProfile?.(profile)) {
    return "admin";
  }

  if (profile?.role === "coach") {
    return "coach";
  }

  if (profile?.role === "recruiter") {
    return "recruiter";
  }

  return "fan";
}

function getRoleLabel(role = "fan") {
  switch (role) {
    case "admin":
      return "Network Admin";

    case "coach":
      return "Verified Coach";

    case "recruiter":
      return "Verified Recruiter";

    default:
      return "Fan";
  }
}

function getRoleClass(role = "fan") {
  switch (role) {
    case "admin":
      return "is-admin";

    case "coach":
      return "is-coach";

    case "recruiter":
      return "is-recruiter";

    default:
      return "is-fan";
  }
}

export function initializeFeedComments(
  feedRoot,
  {
    db,
    currentUser,
    currentProfile,
    isAdminProfile
  } = {}
) {
  if (!db) {
    console.error(
      "Sports Feed comments cannot start because Firestore was not provided."
    );

    return;
  }

  const posts = feedRoot.querySelectorAll(
    "[data-feed-post]"
  );

  posts.forEach((post) => {
    const postId =
      post.dataset.feedPostId || "";

    if (!postId) return;

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

    if (!commentsList) return;

    const commentsRef = collection(
      db,
      "feedPosts",
      postId,
      "comments"
    );

    commentButton?.addEventListener(
      "click",
      () => {
        commentsPanel?.classList.toggle("hidden");

        if (
          commentsPanel &&
          !commentsPanel.classList.contains("hidden")
        ) {
          commentInput?.focus();
        }
      }
    );

    onSnapshot(
      commentsRef,
      (snapshot) => {
        const comments = snapshot.docs
          .map((commentDoc) => ({
            id: commentDoc.id,
            ...commentDoc.data()
          }))
          .sort((a, b) => {
            const aTime =
              a.createdAt?.toMillis?.() ||
              Number(a.createdAt?.seconds || 0) * 1000;

            const bTime =
              b.createdAt?.toMillis?.() ||
              Number(b.createdAt?.seconds || 0) * 1000;

            return aTime - bTime;
          });

        commentsList.innerHTML = comments.length
          ? comments
              .map((comment) => {
                const role =
                  comment.role || "fan";

                return `
                  <div class="sports-feed-comment">

                    <div class="sports-feed-comment-author">

                      <strong>
                        ${escapeCommentHtml(
                          comment.displayName ||
                          comment.email ||
                          "Sports Fan"
                        )}
                      </strong>

                      <span class="${getRoleClass(role)}">
                        ${getRoleLabel(role)}
                      </span>

                    </div>

                    <p>
                      ${escapeCommentHtml(
                        comment.text || ""
                      )}
                    </p>

                  </div>
                `;
              })
              .join("")
          : `
              <div class="sports-feed-comment-empty">
                No comments yet. Start the conversation.
              </div>
            `;

        const countElement =
          commentButton?.querySelector("span");

        if (countElement) {
          countElement.textContent =
            comments.length.toLocaleString();
        }
      },
      (error) => {
        console.error(
          "Unable to load Sports Feed comments:",
          error
        );

        commentsList.innerHTML = `
          <div class="sports-feed-comment-empty">
            Comments could not be loaded.
          </div>
        `;
      }
    );

    commentForm?.addEventListener(
      "submit",
      async (event) => {
        event.preventDefault();

        const text =
          commentInput?.value.trim() || "";

        if (!text) return;

        if (!currentUser) {
          alert(
            "Please log in before posting a comment."
          );

          return;
        }

        const role = getCommentRole(
          currentProfile,
          isAdminProfile
        );

        const submitButton =
          commentForm.querySelector(
            'button[type="submit"]'
          );

        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = "Posting...";
        }

        try {
          await addDoc(commentsRef, {
            text,
            role,

            userId:
              currentUser.uid,

            email:
              currentUser.email ||
              currentProfile?.email ||
              "",

            displayName:
              currentProfile?.nickname ||
              currentProfile?.displayName ||
              currentUser.displayName ||
              currentUser.email ||
              "Sports Fan",

            createdAt:
              serverTimestamp()
          });

          if (commentInput) {
            commentInput.value = "";
          }
        } catch (error) {
          console.error(
            "Unable to post Sports Feed comment:",
            error
          );

          alert(
            "The comment could not be posted."
          );
        } finally {
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = "Post";
          }
        }
      }
    );
  });
}