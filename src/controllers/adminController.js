// ======================================================
// SNT.L.MO. ADMIN CONTROLLER
// Handles Admin form events, filters, edit cancellation,
// duplicate cleanup, and draft-board controls.
// ======================================================

let adminControllerCleanup = null;

function getElement(id) {
  return document.getElementById(id);
}

function safeNumber(value) {
  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : 0;
}

function normalizeCommaList(value = "") {
  if (Array.isArray(value)) {
    return value
      .map((item) =>
        String(item ?? "").trim()
      )
      .filter(Boolean);
  }

  return String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getFormValue(id, fallback = "") {
  return (
    getElement(id)?.value?.trim() ||
    fallback
  );
}

function getSelectValue(id, fallback = "") {
  return (
    getElement(id)?.value ||
    fallback
  );
}

function collectAthleteFormData() {
  const scores = [
    safeNumber(
      getElement("score-0")?.value
    ),
    safeNumber(
      getElement("score-1")?.value
    ),
    safeNumber(
      getElement("score-2")?.value
    ),
    safeNumber(
      getElement("score-3")?.value
    ),
    safeNumber(
      getElement("score-4")?.value
    )
  ];

  const zeusRating =
    scores.reduce(
      (sum, score) =>
        sum + score,
      0
    );

  return {
    name:
      getFormValue(
        "athlete-name"
      ),

    sport:
      getSelectValue(
        "athlete-sport",
        "Football"
      ),

    position:
      getFormValue(
        "athlete-position",
        "ATH"
      ),

    school:
      getFormValue(
        "athlete-school"
      ),

    city:
      getFormValue(
        "athlete-city"
      ),

    state:
      getFormValue(
        "athlete-state"
      ).toUpperCase(),

    height:
      getFormValue(
        "athlete-height"
      ),

    weight:
      getFormValue(
        "athlete-weight"
      ),

    classYear:
      getFormValue(
        "athlete-class-year"
      ),

    recruitingStatus:
      getSelectValue(
        "athlete-recruiting-status",
        "Open"
      ),

    tier:
      getSelectValue(
        "athlete-tier",
        "highschool"
      ),

    subCategory:
      getSelectValue(
        "sub-tier-select",
        "all"
      ),

    bio:
      getFormValue(
        "athlete-bio"
      ),

    offers:
      normalizeCommaList(
        getElement(
          "athlete-offers"
        )?.value
      ),

    achievements:
      normalizeCommaList(
        getElement(
          "athlete-achievements"
        )?.value
      ),

    photoUrl:
      getFormValue(
        "athlete-photo"
      ),

    highlightUrl:
      getFormValue(
        "athlete-highlight"
      ),

    scores,
    zeusRating,
    recordType: "athlete"
  };
}

function resetAthleteForm() {
  const form =
    getElement("athlete-form");

  form?.reset();

  getElement(
    "cancel-athlete-edit-btn"
  )?.classList.add("hidden");

  const submitButton =
    getElement(
      "athlete-submit-btn"
    );

  if (submitButton) {
    submitButton.disabled = false;
    submitButton.textContent =
      "Commit Titan to Grid";
  }
}

function resetAthleteFilters() {
  const resetValues = {
    "tier-select": "all",
    "sub-tier-select": "all",
    "admin-sport-filter": "all",
    "admin-position-filter": "",
    "admin-class-filter": "",
    "admin-recruiting-filter": "all",
    "admin-film-filter": "all"
  };

  Object.entries(
    resetValues
  ).forEach(
    ([id, value]) => {
      const element =
        getElement(id);

      if (element) {
        element.value = value;
      }
    }
  );
}

function isAthleteFilterElement(
  target
) {
  return [
    "tier-select",
    "sub-tier-select",
    "admin-sport-filter",
    "admin-position-filter",
    "admin-class-filter",
    "admin-recruiting-filter",
    "admin-film-filter"
  ].includes(target?.id);
}

/**
 * Initializes Admin Center events.
 *
 * @param {Object} options
 * @param {HTMLElement|string} options.root
 * @param {(athleteData:Object) => Promise<void>} options.onSaveAthlete
 * @param {() => void} options.onCancelEdit
 * @param {() => void} options.onFiltersChanged
 * @param {() => void} options.onTierChanged
 * @param {() => Promise<void>} options.onPurgeDuplicates
 * @param {() => void} options.onResetDraft
 * @param {() => boolean} options.canManage
 * @returns {() => void} cleanup function
 */
export function initializeAdminController({
  root = "admin-platform",

  onSaveAthlete,
  onCancelEdit,
  onFiltersChanged,
  onTierChanged,
  onPurgeDuplicates,
  onResetDraft,

  canManage = () => true
} = {}) {
  if (
    typeof adminControllerCleanup ===
    "function"
  ) {
    adminControllerCleanup();
  }

  const adminRoot =
    typeof root === "string"
      ? getElement(root)
      : root;

  if (!adminRoot) {
    console.warn(
      "Admin controller could not find the Admin root."
    );

    return () => {};
  }

  const abortController =
    new AbortController();

  const signal =
    abortController.signal;

  adminRoot.addEventListener(
    "submit",
    async (event) => {
      const form =
        event.target.closest(
          "#athlete-form"
        );

      if (!form) {
        return;
      }

      event.preventDefault();

      if (!canManage()) {
        alert(
          "Admin access denied."
        );

        return;
      }

      const athleteData =
        collectAthleteFormData();

      if (!athleteData.name) {
        alert(
          "Enter an athlete name."
        );

        return;
      }

      const submitButton =
        getElement(
          "athlete-submit-btn"
        );

      if (submitButton) {
        submitButton.disabled =
          true;

        submitButton.textContent =
          "Saving Athlete...";
      }

      try {
        if (
          typeof onSaveAthlete !==
          "function"
        ) {
          throw new Error(
            "Admin save handler has not been connected."
          );
        }

        await onSaveAthlete(
          athleteData
        );

        resetAthleteForm();
      } catch (error) {
        console.error(
          "Athlete save failed:",
          error
        );

        alert(
          error?.message ||
          "The athlete could not be saved."
        );

        if (submitButton) {
          submitButton.disabled =
            false;

          submitButton.textContent =
            "Commit Titan to Grid";
        }
      }
    },
    { signal }
  );

  adminRoot.addEventListener(
    "click",
    async (event) => {
      const button =
        event.target.closest(
          "button"
        );

      if (!button) {
        return;
      }

      if (
        button.id ===
        "cancel-athlete-edit-btn"
      ) {
        event.preventDefault();

        resetAthleteForm();

        onCancelEdit?.();

        return;
      }

      if (
        button.id ===
        "reset-athlete-filters-btn"
      ) {
        event.preventDefault();

        resetAthleteFilters();

        onTierChanged?.();
        onFiltersChanged?.();

        return;
      }

      if (
        button.id ===
        "reset-draft-btn"
      ) {
        event.preventDefault();

        onResetDraft?.();

        return;
      }

      if (
        button.id ===
        "admin-purge-btn"
      ) {
        event.preventDefault();

        if (!canManage()) {
          alert(
            "Admin access denied."
          );

          return;
        }

        const confirmed =
          window.confirm(
            "Remove duplicate athlete profiles from the database?"
          );

        if (!confirmed) {
          return;
        }

        try {
          await onPurgeDuplicates?.();
        } catch (error) {
          console.error(
            "Duplicate purge failed:",
            error
          );

          alert(
            "Duplicate cleanup failed."
          );
        }
      }
    },
    { signal }
  );

  adminRoot.addEventListener(
    "input",
    (event) => {
      if (
        !isAthleteFilterElement(
          event.target
        )
      ) {
        return;
      }

      if (
        event.target.tagName ===
        "INPUT"
      ) {
        onFiltersChanged?.();
      }
    },
    { signal }
  );

  adminRoot.addEventListener(
    "change",
    (event) => {
      if (
        !isAthleteFilterElement(
          event.target
        )
      ) {
        return;
      }

      if (
        event.target.id ===
        "tier-select"
      ) {
        onTierChanged?.();
      }

      onFiltersChanged?.();
    },
    { signal }
  );

  adminControllerCleanup =
    () => {
      abortController.abort();
      adminControllerCleanup =
        null;
    };

  return adminControllerCleanup;
}

// ======================================================
// DIRECT ATHLETE DELETE ACTION
// Handles permission, confirmation, deletion,
// and post-delete state cleanup.
// ======================================================

export async function handleDirectAthletePurge({
  event,
  athleteId,
  athleteName = "this athlete",
  canManage = () => false,
  onDeleteAthlete,
  onAthleteDeleted
} = {}) {
  event?.stopPropagation();

  if (!canManage()) {
    alert(
      "Admin access denied."
    );

    return false;
  }

  if (!athleteId) {
    alert(
      "Athlete ID is required."
    );

    return false;
  }

  const confirmed =
    window.confirm(
      `Are you sure you want to permanently erase ${athleteName} from the database?`
    );

  if (!confirmed) {
    return false;
  }

  try {
    if (
      typeof onDeleteAthlete !==
      "function"
    ) {
      throw new Error(
        "Athlete delete handler has not been connected."
      );
    }

    await onDeleteAthlete(
      athleteId
    );

    onAthleteDeleted?.(
      athleteId
    );

    return true;
  } catch (error) {
    console.error(
      "Purge system rejected:",
      error
    );

    alert(
      error?.message ||
      "The athlete could not be deleted."
    );

    return false;
  }
}

export {
  collectAthleteFormData,
  resetAthleteForm,
  resetAthleteFilters
};