/**
 * Exercise Types
 * Defines structures for exercises, reps, and workout sessions
 */

export type ExerciseType =
    | 'squats'
    | 'push_ups'
    | 'lunges'
    | 'planks'
    | 'deadlifts'
    | 'burpees'
    | 'jumping_jacks'
    | 'custom';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export type MuscleGroup =
    | 'chest'
    | 'back'
    | 'shoulders'
    | 'arms'
    | 'core'
    | 'legs'
    | 'glutes'
    | 'full_body';

export interface Exercise {
    id: string;
    type: ExerciseType;
    name: string;
    description: string;
    difficulty: DifficultyLevel;
    targetMuscles: MuscleGroup[];
    thumbnailUrl?: string;
    videoUrl?: string;
    instructions: string[];
    keyAngles: ExerciseKeyAngles;
    phases: ExercisePhase[];
}

export interface ExerciseKeyAngles {
    [jointName: string]: {
        min: number; // Minimum acceptable angle (degrees)
        max: number; // Maximum acceptable angle (degrees)
        ideal: number; // Ideal angle for perfect form
    };
}

export type ExercisePhase =
    | 'starting'
    | 'descending'
    | 'bottom'
    | 'ascending'
    | 'top'
    | 'holding'
    | 'returning';

export interface RepetitionState {
    currentPhase: ExercisePhase;
    previousPhase: ExercisePhase | null;
    repCount: number;
    setCount: number;
    isValidRep: boolean;
    phaseStartTime: number;
}

export interface WorkoutSet {
    setNumber: number;
    targetReps: number;
    completedReps: number;
    averageFormScore: number;
    duration: number; // seconds
    errors: FormError[];
}

export interface WorkoutSession {
    id: string;
    exerciseId: string;
    exerciseType: ExerciseType;
    startTime: number;
    endTime?: number;
    sets: WorkoutSet[];
    totalReps: number;
    averagePostureScore: number;
    duration: number; // seconds
    caloriesBurned?: number;
}

export interface FormError {
    timestamp: number;
    errorType: string;
    severity: 'minor' | 'moderate' | 'major';
    message: string;
    affectedJoints: string[];
}

export interface ExerciseRecognitionResult {
    exerciseType: ExerciseType;
    confidence: number; // 0-1
    timestamp: number;
}
