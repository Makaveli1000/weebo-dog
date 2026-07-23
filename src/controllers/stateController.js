// ======================================================
// SNT.L.MO. Sports Network STATE CONTROLLER
// Synchronizes application state with UI.
// ======================================================

export function synchronizeAthletes({
  athleteRecords = [],
  appState,
  onRefresh
}) {
  const cache = athleteRecords;

  if (appState) {
    appState.athletes = cache.map(
      (item) => ({
        id: item.id,
        ...item.data
      })
    );
  }

  onRefresh?.();

  return cache;
}

export function synchronizeCurrentUser({
  user = null,
  appState
} = {}) {
  if (appState) {
    appState.currentUser =
      user;
  }

  return user;
}

export function synchronizeCurrentProfile({
  profile = null,
  appState,
  onAccessUpdate
} = {}) {
  if (appState) {
    appState.currentProfile =
      profile;
  }

  onAccessUpdate?.(
    profile
  );

  return profile;
}

export function clearAuthenticatedState({
  appState,
  onAccessUpdate
} = {}) {
  if (appState) {
    appState.currentUser = null;
    appState.currentProfile = null;
  }

  onAccessUpdate?.(null);
}