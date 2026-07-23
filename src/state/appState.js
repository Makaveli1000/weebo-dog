// ======================================================
// GLOBAL APPLICATION STATE
// Stores shared platform data used across pages,
// controllers, and services.
// ======================================================

const DEFAULT_APP_STATE = {
  currentUser: null,
  currentProfile: null,

  athletes: [],

  activeAthleteId: null,
  activeAthlete: null,
  activeSchool: null,
  activeVideo: null,

  activeView: "home"
};

export function initializeAppState() {
  const existingState =
    window.appState &&
    typeof window.appState === "object"
      ? window.appState
      : {};

  window.appState = {
    ...DEFAULT_APP_STATE,
    ...existingState
  };

  return window.appState;
}

export function getAppState() {
  if (!window.appState) {
    return initializeAppState();
  }

  return window.appState;
}

export function updateAppState(
  updates = {}
) {
  const state = getAppState();

  Object.assign(
    state,
    updates
  );

  window.dispatchEvent(
    new CustomEvent(
      "sntlmo:state-updated",
      {
        detail: {
          ...updates
        }
      }
    )
  );

  return state;
}

export function resetAppState() {
  window.appState = {
    ...DEFAULT_APP_STATE
  };

  window.dispatchEvent(
    new CustomEvent(
      "sntlmo:state-reset",
      {
        detail: window.appState
      }
    )
  );

  return window.appState;
}