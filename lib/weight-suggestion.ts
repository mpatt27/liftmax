// This file contains the algorithm for suggesting weights based on previous performance

export interface WorkoutSet {
  weight: number
  reps: number
  completed: boolean
}

export interface ExerciseHistory {
  date: Date
  sets: WorkoutSet[]
}

/**
 * Calculate the suggested weight for the next workout based on previous performance
 *
 * @param history Array of previous workout data for a specific exercise
 * @param goal The training goal (strength, hypertrophy, endurance)
 * @returns Suggested weight for the next workout
 */
export function calculateSuggestedWeight(
  history: ExerciseHistory[],
  goal: "strength" | "hypertrophy" | "endurance" = "hypertrophy",
): number {
  if (!history.length) return 0

  // Sort history by date (newest first)
  const sortedHistory = [...history].sort((a, b) => b.date.getTime() - a.date.getTime())

  // Get the most recent workout
  const latestWorkout = sortedHistory[0]

  // Calculate the average weight of completed sets in the latest workout
  const completedSets = latestWorkout.sets.filter((set) => set.completed)
  if (!completedSets.length) return 0

  const avgWeight = completedSets.reduce((sum, set) => sum + set.weight, 0) / completedSets.length
  const avgReps = completedSets.reduce((sum, set) => sum + set.reps, 0) / completedSets.length

  // Calculate suggested weight based on goal
  let suggestedWeight = avgWeight

  if (goal === "strength") {
    // For strength: If all sets were completed with good form, increase by 5-10 lbs
    const allSetsCompleted = latestWorkout.sets.every((set) => set.completed)
    if (allSetsCompleted) {
      suggestedWeight += avgWeight < 100 ? 5 : 10
    }
  } else if (goal === "hypertrophy") {
    // For hypertrophy: If average reps > 12, increase weight by 5-10 lbs
    if (avgReps > 12) {
      suggestedWeight += avgWeight < 100 ? 5 : 10
    }
    // If average reps < 8, decrease weight by 5 lbs
    else if (avgReps < 8) {
      suggestedWeight -= 5
    }
  } else if (goal === "endurance") {
    // For endurance: If average reps > 15, increase weight by 2.5-5 lbs
    if (avgReps > 15) {
      suggestedWeight += 2.5
    }
  }

  // Round to nearest 2.5 lbs
  return Math.round(suggestedWeight / 2.5) * 2.5
}

/**
 * Calculate one-rep max (1RM) based on weight and reps
 * Uses the Brzycki formula: 1RM = weight × (36 / (37 - reps))
 *
 * @param weight Weight used in the set
 * @param reps Number of reps performed
 * @returns Estimated one-rep max
 */
export function calculateOneRepMax(weight: number, reps: number): number {
  if (reps <= 0) return 0
  if (reps === 1) return weight

  return weight * (36 / (37 - reps))
}

/**
 * Get weight recommendations for different rep ranges based on 1RM
 *
 * @param oneRepMax Estimated one-rep max
 * @returns Object with weight recommendations for different rep ranges
 */
export function getWeightRecommendations(oneRepMax: number): {
  strength: number
  hypertrophy: number
  endurance: number
} {
  return {
    strength: Math.round((oneRepMax * 0.85) / 2.5) * 2.5, // 85% of 1RM for 5-6 reps (strength)
    hypertrophy: Math.round((oneRepMax * 0.75) / 2.5) * 2.5, // 75% of 1RM for 8-12 reps (hypertrophy)
    endurance: Math.round((oneRepMax * 0.65) / 2.5) * 2.5, // 65% of 1RM for 15-20 reps (endurance)
  }
}
