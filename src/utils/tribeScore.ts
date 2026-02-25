export interface Achievement {
  type: "fitness" | "reading";
  value: number; // e.g., workouts completed or books/chapters read
}

export interface TribeScoreResult {
  total: number;
  fitnessScore: number;
  readingScore: number;
}

const WEIGHTS = {
  fitness: 0.6,
  reading: 0.4,
} as const;

/**
 * Calculates a tribe score from a list of user achievements
 * using a weighted sum of fitness and reading goals.
 */
export function calculateTribeScore(
  achievements: Achievement[],
): TribeScoreResult {
  let fitnessTotal = 0;
  let readingTotal = 0;

  for (const a of achievements) {
    if (a.type === "fitness") {
      fitnessTotal += a.value;
    } else {
      readingTotal += a.value;
    }
  }

  const fitnessScore = fitnessTotal * WEIGHTS.fitness;
  const readingScore = readingTotal * WEIGHTS.reading;

  return {
    total: Math.round((fitnessScore + readingScore) * 100) / 100,
    fitnessScore: Math.round(fitnessScore * 100) / 100,
    readingScore: Math.round(readingScore * 100) / 100,
  };
}

/**
 * Calculates the combined tribe score for a group of members.
 */
export function calculateGroupTribeScore(
  memberAchievements: Achievement[][],
): TribeScoreResult {
  const allAchievements = memberAchievements.flat();
  return calculateTribeScore(allAchievements);
}
