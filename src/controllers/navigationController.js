// ======================================================
// SNT.L.MO. Sports Network NAVIGATION CONTROLLER
// Handles section scrolling, featured athlete navigation,
// highlight navigation, and marketplace navigation.
// ======================================================

export function scrollToSection({
  sectionId,
  onMissingSection
} = {}) {
  const section =
    document.getElementById(
      sectionId
    );

  if (!section) {
    onMissingSection?.(
      sectionId
    );

    return false;
  }

  section.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  return true;
}

export function openFirstAthleteProfile({
  athletes = [],
  onMissingAthlete,
  onSetActiveAthlete,
  onOpenAthlete
} = {}) {
  const firstAthlete =
    athletes[0];

  if (!firstAthlete) {
    onMissingAthlete?.(
      "Athlete profiles"
    );

    return null;
  }

  onSetActiveAthlete?.(
    firstAthlete.id,
    firstAthlete
  );

  onOpenAthlete?.(
    firstAthlete.id
  );

  return firstAthlete;
}

export function watchFeaturedHighlight({
  athletes = [],
  onMissingHighlight,
  onScrollToHighlights
} = {}) {
  const firstWithFilm =
    athletes.find(
      (athlete) =>
        athlete.highlightUrl ||
        athlete.highlight ||
        (
          Array.isArray(
            athlete.videos
          ) &&
          athlete.videos.length
        )
    );

  if (!firstWithFilm) {
    onMissingHighlight?.(
      "Highlight film"
    );

    return null;
  }

  onScrollToHighlights?.(
    "highlights-root"
  );

  return firstWithFilm;
}

export function openGearVault({
  modalId =
    "gear-lightbox-modal",
  marketplaceSectionId =
    "marketplace-root",
  onScrollToMarketplace
} = {}) {
  const modal =
    document.getElementById(
      modalId
    );

  if (modal) {
    modal.classList.remove(
      "hidden"
    );

    return "modal";
  }

  onScrollToMarketplace?.(
    marketplaceSectionId
  );

  return "section";
}

export function hideAllPlatformViews({
  platformViewIds = []
} = {}) {
  platformViewIds.forEach((id) => {
    document
      .getElementById(id)
      ?.classList.add("hidden");
  });
}

export function showPlatformView({
  id,
  platformViewIds = []
} = {}) {
  hideAllPlatformViews({
    platformViewIds
  });

  document
    .getElementById(id)
    ?.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

export function updateActiveNavigation(
  action
) {
  document
    .querySelectorAll(
      ".national-nav button"
    )
    .forEach((button) => {
      const clickCode =
        button.getAttribute(
          "onclick"
        ) || "";

      button.classList.toggle(
        "active",
        clickCode.includes(
          `platformAction('${action}')`
        )
      );
    });
}