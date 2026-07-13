import {
  getDownloadURL,
  ref,
  uploadBytesResumable
} from "firebase/storage";

import {
  createFeedPost
} from "./feedRepository.js";

const ALLOWED_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/quicktime"
];

const MAX_VIDEO_SIZE_BYTES =
  250 * 1024 * 1024;

function normalizeHashtags(value = "") {
  return String(value)
    .split(/[,\s]+/)
    .map((tag) =>
      tag
        .trim()
        .replace(/^#/, "")
    )
    .filter(Boolean)
    .slice(0, 12);
}

function getUploaderRole(profile = {}) {
  const role = String(
    profile?.role || "fan"
  ).toLowerCase();

  if (
    [
      "admin",
      "editor",
      "coach",
      "recruiter",
      "athlete"
    ].includes(role)
  ) {
    return role;
  }

  return "fan";
}

function validateVideoFile(file) {
  if (!file) {
    throw new Error(
      "Choose a sports video first."
    );
  }

  if (
    !ALLOWED_VIDEO_TYPES.includes(file.type)
  ) {
    throw new Error(
      "Use an MP4, WebM, or MOV video."
    );
  }

  if (
    file.size > MAX_VIDEO_SIZE_BYTES
  ) {
    throw new Error(
      "The video must be 250 MB or smaller."
    );
  }
}

export function initializeFeedUpload({
  db,
  storage,
  currentUser,
  currentProfile,
  athletes = [],
  onUploaded
} = {}) {
  const openButton = document.getElementById(
    "open-feed-upload-btn"
  );

  const modal = document.getElementById(
    "feed-upload-modal"
  );

  if (!openButton || !modal) return;

  const closeButton = modal.querySelector(
    "[data-close-feed-upload]"
  );

  const form = modal.querySelector(
    "#feed-upload-form"
  );

  const fileInput = modal.querySelector(
    "#feed-upload-file"
  );

  const titleInput = modal.querySelector(
    "#feed-upload-title"
  );

  const descriptionInput = modal.querySelector(
    "#feed-upload-description"
  );

  const categoryInput = modal.querySelector(
    "#feed-upload-category"
  );

  const athleteInput = modal.querySelector(
    "#feed-upload-athlete"
  );

  const sportInput = modal.querySelector(
    "#feed-upload-sport"
  );

  const schoolInput = modal.querySelector(
    "#feed-upload-school"
  );

  const stateInput = modal.querySelector(
    "#feed-upload-state"
  );

  const hashtagsInput = modal.querySelector(
    "#feed-upload-hashtags"
  );

  const progress = modal.querySelector(
    "#feed-upload-progress"
  );

  const progressText = modal.querySelector(
    "#feed-upload-progress-text"
  );

  const submitButton = form?.querySelector(
    'button[type="submit"]'
  );

  function openModal() {
    if (!currentUser) {
      alert(
        "Please log in before uploading a sports video."
      );

      return;
    }

    modal.classList.remove("hidden");
  }

  function closeModal() {
    modal.classList.add("hidden");
  }

  function populateAthletes() {
    if (!athleteInput) return;

    athleteInput.innerHTML = `
      <option value="">
        No athlete selected
      </option>

      ${athletes.map((item) => {
        const athlete = item.data || item;

        const athleteId =
          item.id ||
          athlete.id ||
          "";

        return `
          <option value="${athleteId}">
            ${athlete.name || "Athlete"}
          </option>
        `;
      }).join("")}
    `;
  }

  function applySelectedAthlete() {
    const athleteId =
      athleteInput?.value || "";

    const selected = athletes.find(
      (item) =>
        (item.id || item.data?.id) === athleteId
    );

    const athlete =
      selected?.data ||
      selected ||
      null;

    if (!athlete) return;

    if (sportInput) {
      sportInput.value =
        athlete.sport || "";
    }

    if (schoolInput) {
      schoolInput.value =
        athlete.school ||
        athlete.schoolName ||
        "";
    }

    if (stateInput) {
      stateInput.value =
        athlete.state ||
        "";
    }
  }

  populateAthletes();

  openButton.addEventListener(
    "click",
    openModal
  );

  closeButton?.addEventListener(
    "click",
    closeModal
  );

  athleteInput?.addEventListener(
    "change",
    applySelectedAthlete
  );

  form?.addEventListener(
    "submit",
    async (event) => {
      event.preventDefault();

      const file =
        fileInput?.files?.[0];

      try {
        validateVideoFile(file);

        if (!currentUser) {
          throw new Error(
            "Please log in before uploading."
          );
        }

        const title =
          titleInput?.value.trim() || "";

        if (!title) {
          throw new Error(
            "Enter a video title."
          );
        }

        if (
          submitButton
        ) {
          submitButton.disabled = true;
          submitButton.textContent =
            "Uploading...";
        }

        const storagePath = [
          "feedUploads",
          currentUser.uid,
          `${Date.now()}_${file.name}`
        ].join("/");

        const uploadTask =
          uploadBytesResumable(
            ref(storage, storagePath),
            file,
            {
              contentType:
                file.type
            }
          );

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const percent = Math.round(
              (
                snapshot.bytesTransferred /
                snapshot.totalBytes
              ) * 100
            );

            if (progress) {
              progress.value =
                percent;
            }

            if (progressText) {
              progressText.textContent =
                `${percent}% uploaded`;
            }
          },
          (error) => {
            console.error(
              "Sports Feed upload failed:",
              error
            );

            if (submitButton) {
              submitButton.disabled = false;
              submitButton.textContent =
                "Upload Video";
            }

            alert(
              "The video could not be uploaded."
            );
          },
          async () => {
            try {
              const videoUrl =
                await getDownloadURL(
                  uploadTask.snapshot.ref
                );

              const athleteId =
                athleteInput?.value || "";

              const selected = athletes.find(
                (item) =>
                  (
                    item.id ||
                    item.data?.id
                  ) === athleteId
              );

              const athlete =
                selected?.data ||
                selected ||
                {};

              const postId =
                await createFeedPost(
                  db,
                  {
                    title,

                    description:
                      descriptionInput
                        ?.value
                        .trim() ||
                      "",

                    category:
                      categoryInput
                        ?.value ||
                      "Highlight",

                    videoUrl,

                    athleteId,

                    athleteName:
                      athlete.name ||
                      "",

                    schoolName:
                      schoolInput
                        ?.value
                        .trim() ||
                      athlete.school ||
                      athlete.schoolName ||
                      "",

                    sport:
                      sportInput
                        ?.value
                        .trim() ||
                      athlete.sport ||
                      "",

                    state:
                      stateInput
                        ?.value
                        .trim() ||
                      athlete.state ||
                      "",

                    hashtags:
                      normalizeHashtags(
                        hashtagsInput?.value
                      ),

                    uploaderId:
                      currentUser.uid,

                    uploaderName:
                      currentProfile?.nickname ||
                      currentProfile?.displayName ||
                      currentUser.displayName ||
                      currentUser.email ||
                      "Sports Creator",

                    uploaderRole:
                      getUploaderRole(
                        currentProfile
                      )
                  }
                );

              form.reset();

              if (progress) {
                progress.value = 0;
              }

              if (progressText) {
                progressText.textContent =
                  "Upload complete";
              }

              closeModal();

              alert(
                "Sports video uploaded successfully."
              );

              onUploaded?.(postId);
            } catch (error) {
              console.error(
                "Unable to create Sports Feed post:",
                error
              );

              alert(
                "The video uploaded, but the Feed post could not be created."
              );
            } finally {
              if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent =
                  "Upload Video";
              }
            }
          }
        );
      } catch (error) {
        console.error(
          "Sports Feed upload validation failed:",
          error
        );

        alert(
          error.message ||
          "The video could not be uploaded."
        );

        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent =
            "Upload Video";
        }
      }
    }
  );
}