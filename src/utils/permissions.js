// ======================================================
// PERMISSION UTILITIES
// Shared profile access checks.
// ======================================================

export function isAdminProfile(
  profile
) {
  return (
    profile?.role === "admin" ||
    profile?.role === "editor"
  );
}

export function hasMainAccess(
  profile
) {
  return (
    isAdminProfile(profile) ||
    profile?.isPro === true
  );
}