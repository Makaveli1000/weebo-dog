// ======================================================
// ATHLETE CONTROLLER
// Handles athlete selection, profile opening,
// highlight playback, and selected-row styling.
// ======================================================

export function selectAthleteRow({
  athleteId,
  athlete,
  tableBody,
  onSetActiveAthlete,
  onPlayHighlight,
  onOpenProfile,
  openProfile = false
} = {}) {
  if (!athleteId || !athlete) {
    return;
  }

  if (tableBody) {
    tableBody
      .querySelectorAll(
        "tr[data-athlete-id]"
      )
      .forEach((row) => {
        row.classList.remove(
          "bg-zeus-gold/10",
          "border-l-2",
          "border-zeus-gold"
        );
      });

    const selectedRow =
      tableBody.querySelector(
        `[data-athlete-id="${CSS.escape(
          athleteId
        )}"]`
      );

    selectedRow?.classList.add(
      "bg-zeus-gold/10",
      "border-l-2",
      "border-zeus-gold"
    );
  }

  onSetActiveAthlete?.(
    athleteId,
    athlete
  );

  onPlayHighlight?.(
    athlete
  );

  if (openProfile) {
    onOpenProfile?.(
      athleteId,
      athlete
    );
  }
}

export function openAthleteFromRecords({
  athleteId,
  records = [],
  onOpenProfile
} = {}) {
  const record =
    records.find(
      (item) =>
        item.id === athleteId
    );

  if (!record) {
    throw new Error(
      "Athlete profile not found."
    );
  }

  onOpenProfile?.(
    record.id,
    record.data || {}
  );

  return record;
}

export function findAthleteRecord(
  records = [],
  athleteId
) {
  return (
    records.find(
      (item) =>
        item.id === athleteId
    ) || null
  );
}