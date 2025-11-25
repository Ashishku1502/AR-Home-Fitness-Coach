/**
 * Exercise Definitions
 * Predefined exercise configurations with motion patterns and form requirements
 */

import { Exercise, ExerciseType, MuscleGroup } from '../../types/exercise.types';

export const EXERCISE_LIBRARY: Record<ExerciseType, Exercise> = {
    squats: {
        id: 'squats',
        type: 'squats',
        name: 'Squats',
        description: 'A fundamental lower body exercise that targets quads, glutes, and hamstrings.',
        difficulty: 'beginner',
        targetMuscles: ['legs', 'glutes', 'core'],
        instructions: [
            'Stand with feet shoulder-width apart',
            'Keep your back straight and chest up',
            'Lower your body by bending knees and hips',
            'Go down until thighs are parallel to ground',
            'Push through heels to return to starting position',
        ],
        keyAngles: {
            left_knee: { min: 70, max: 170, ideal: 90 },
            right_knee: { min: 70, max: 170, ideal: 90 },
            left_hip: { min: 60, max: 180, ideal: 90 },
            right_hip: { min: 60, max: 180, ideal: 90 },
        },
        phases: ['starting', 'descending', 'bottom', 'ascending'],
    },

    push_ups: {
        id: 'push_ups',
        type: 'push_ups',
        name: 'Push-Ups',
        description: 'Classic upper body exercise targeting chest, shoulders, and triceps.',
        difficulty: 'beginner',
        targetMuscles: ['chest', 'shoulders', 'arms', 'core'],
        instructions: [
            'Start in plank position with hands shoulder-width apart',
            'Keep your body in a straight line from head to heels',
            'Lower your body by bending elbows',
            'Go down until chest nearly touches the ground',
            'Push back up to starting position',
        ],
        keyAngles: {
            left_elbow: { min: 70, max: 170, ideal: 90 },
            right_elbow: { min: 70, max: 170, ideal: 90 },
            left_shoulder: { min: 60, max: 180, ideal: 90 },
            right_shoulder: { min: 60, max: 180, ideal: 90 },
        },
        phases: ['top', 'descending', 'bottom', 'ascending'],
    },

    lunges: {
        id: 'lunges',
        type: 'lunges',
        name: 'Lunges',
        description: 'Unilateral leg exercise that improves balance and leg strength.',
        difficulty: 'intermediate',
        targetMuscles: ['legs', 'glutes', 'core'],
        instructions: [
            'Stand with feet hip-width apart',
            'Step forward with one leg',
            'Lower your hips until both knees are bent at 90 degrees',
            'Front knee should be directly above ankle',
            'Push back to starting position',
        ],
        keyAngles: {
            left_knee: { min: 70, max: 110, ideal: 90 },
            right_knee: { min: 70, max: 170, ideal: 90 },
            left_hip: { min: 60, max: 180, ideal: 90 },
            right_hip: { min: 60, max: 180, ideal: 90 },
        },
        phases: ['starting', 'descending', 'bottom', 'ascending', 'returning'],
    },

    planks: {
        id: 'planks',
        type: 'planks',
        name: 'Planks',
        description: 'Isometric core exercise that builds stability and endurance.',
        difficulty: 'beginner',
        targetMuscles: ['core', 'shoulders', 'back'],
        instructions: [
            'Start in forearm plank position',
            'Keep your body in a straight line',
            'Engage your core and glutes',
            'Hold the position without letting hips sag',
            'Breathe steadily throughout',
        ],
        keyAngles: {
            left_shoulder: { min: 80, max: 100, ideal: 90 },
            right_shoulder: { min: 80, max: 100, ideal: 90 },
            left_hip: { min: 170, max: 190, ideal: 180 },
            right_hip: { min: 170, max: 190, ideal: 180 },
        },
        phases: ['holding'],
    },

    deadlifts: {
        id: 'deadlifts',
        type: 'deadlifts',
        name: 'Deadlifts',
        description: 'Compound exercise targeting posterior chain muscles.',
        difficulty: 'advanced',
        targetMuscles: ['back', 'legs', 'glutes', 'core'],
        instructions: [
            'Stand with feet hip-width apart',
            'Bend at hips and knees to grip the bar',
            'Keep back straight and chest up',
            'Lift by extending hips and knees',
            'Lower the bar with control',
        ],
        keyAngles: {
            left_knee: { min: 100, max: 170, ideal: 135 },
            right_knee: { min: 100, max: 170, ideal: 135 },
            left_hip: { min: 80, max: 180, ideal: 120 },
            right_hip: { min: 80, max: 180, ideal: 120 },
        },
        phases: ['starting', 'ascending', 'top', 'descending'],
    },

    burpees: {
        id: 'burpees',
        type: 'burpees',
        name: 'Burpees',
        description: 'Full-body cardio exercise combining squat, plank, and jump.',
        difficulty: 'intermediate',
        targetMuscles: ['full_body'],
        instructions: [
            'Start standing',
            'Drop into squat position',
            'Kick feet back into plank',
            'Do a push-up (optional)',
            'Jump feet back to squat',
            'Jump up explosively',
        ],
        keyAngles: {
            left_knee: { min: 70, max: 170, ideal: 90 },
            right_knee: { min: 70, max: 170, ideal: 90 },
            left_elbow: { min: 70, max: 170, ideal: 90 },
            right_elbow: { min: 70, max: 170, ideal: 90 },
        },
        phases: ['starting', 'descending', 'bottom', 'ascending', 'top'],
    },

    jumping_jacks: {
        id: 'jumping_jacks',
        type: 'jumping_jacks',
        name: 'Jumping Jacks',
        description: 'Cardio exercise that elevates heart rate and improves coordination.',
        difficulty: 'beginner',
        targetMuscles: ['full_body'],
        instructions: [
            'Stand with feet together, arms at sides',
            'Jump while spreading legs shoulder-width apart',
            'Simultaneously raise arms overhead',
            'Jump back to starting position',
            'Repeat in a continuous motion',
        ],
        keyAngles: {
            left_shoulder: { min: 0, max: 180, ideal: 180 },
            right_shoulder: { min: 0, max: 180, ideal: 180 },
            left_hip: { min: 0, max: 45, ideal: 30 },
            right_hip: { min: 0, max: 45, ideal: 30 },
        },
        phases: ['starting', 'ascending', 'top', 'descending'],
    },

    custom: {
        id: 'custom',
        type: 'custom',
        name: 'Custom Exercise',
        description: 'User-defined exercise with custom motion pattern.',
        difficulty: 'beginner',
        targetMuscles: [],
        instructions: ['Follow your custom exercise pattern'],
        keyAngles: {},
        phases: ['starting'],
    },
};

export function getExerciseByType(type: ExerciseType): Exercise {
    return EXERCISE_LIBRARY[type];
}

export function getAllExercises(): Exercise[] {
    return Object.values(EXERCISE_LIBRARY).filter(ex => ex.type !== 'custom');
}

export function getExercisesByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): Exercise[] {
    return getAllExercises().filter(ex => ex.difficulty === difficulty);
}

export function getExercisesByMuscleGroup(muscleGroup: MuscleGroup): Exercise[] {
    return getAllExercises().filter(ex => ex.targetMuscles.includes(muscleGroup));
}
