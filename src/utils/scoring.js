// ======================================================
// SNT.L.MO. SCORING UTILITIES
// ======================================================

export function safeScoreNumber(
  value
) {
  const number =
    Number(value);

  return Number.isFinite(number)
    ? number
    : 0;
}

export function getAthleteScores(
  athlete = {}
) {
  if (
    Array.isArray(
      athlete.scores
    )
  ) {
    return athlete.scores.map(
      safeScoreNumber
    );
  }

  return [
    athlete.score0,
    athlete.score1,
    athlete.score2,
    athlete.score3,
    athlete.score4
  ].map(
    safeScoreNumber
  );
}

export function getAthleteScoreTotal(
  athlete = {}
) {
  return getAthleteScores(
    athlete
  ).reduce(
    (total, score) =>
      total + score,
    0
  );
}

export function getAthleteScoreAverage(
  athlete = {}
) {
  const scores =
    getAthleteScores(
      athlete
    );

  if (!scores.length) {
    return 0;
  }

  const total =
    scores.reduce(
      (sum, score) =>
        sum + score,
      0
    );

  return Math.round(
    total / scores.length
  );
}

export function getAthleteZeusRating(
  athlete = {}
) {
  const storedRating =
    Number(
      athlete.zeusRating
    );

  if (
    Number.isFinite(
      storedRating
    )
  ) {
    return storedRating;
  }

  return getAthleteScoreTotal(
    athlete
  );
}

export function compareAthletesByScore(
  firstRecord,
  secondRecord
) {
  const firstAthlete =
    firstRecord?.data ||
    firstRecord ||
    {};

  const secondAthlete =
    secondRecord?.data ||
    secondRecord ||
    {};

  return (
    getAthleteScoreTotal(
      secondAthlete
    ) -
    getAthleteScoreTotal(
      firstAthlete
    )
  );
}

export function calculateSquadAverage(
  squad = []
) {
  if (
    !Array.isArray(squad) ||
    !squad.length
  ) {
    return 0;
  }

  const total =
    squad.reduce(
      (
        sum,
        athlete
      ) =>
        sum +
        getAthleteScoreTotal(
          athlete
        ),
      0
    );

  return Math.round(
    total / squad.length
  );
}