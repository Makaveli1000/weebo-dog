// ======================================================
// SNT.L.MO. Sports Network SESSION CONTROLLER
// Owns Firebase authentication session lifecycle.
// Login modal and login form behavior remain in
// authController.js.
// ======================================================

export async function initializeSignedInSession({
  user,
  onSynchronizeUser,
  onLoadProfile,
  onSynchronizeProfile,
  onSubscribeToAthletes,
  onSubscribeToSportsFeed,
  onSubscribeToChat,
  onSessionError,
  onSessionComplete
} = {}) {
  onSynchronizeUser?.(user);

  try {
    const profile =
      await onLoadProfile?.(user);

    onSynchronizeProfile?.(
      profile
    );

    onSubscribeToAthletes?.();
    onSubscribeToSportsFeed?.();
    onSubscribeToChat?.();

    return profile;
  } catch (error) {
    onSessionError?.(error);

    return null;
  } finally {
    onSessionComplete?.();
  }
}

export function initializeSignedOutSession({
  onClearState,
  onHideAdminPlatform,
  onSessionComplete
} = {}) {
  onClearState?.();

  onHideAdminPlatform?.();

  onSessionComplete?.();
}