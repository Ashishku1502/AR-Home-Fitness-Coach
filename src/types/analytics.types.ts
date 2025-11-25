/**
 * Analytics Types
 * Defines structures for performance tracking and recommendations
 */

export interface WorkoutHistory {
    sessions: WorkoutSessionSummary[];
    totalWorkouts: number;
    totalReps: number;
    totalDuration: number; // seconds
    averagePostureScore: number;
    bestPostureScore: number;
    favoriteExercise?: string;
}

export interface WorkoutSessionSummary {
    id: string;
    exerciseType: string;
    date: string; // ISO date string
    reps: number;
    sets: number;
    duration: number; // seconds
    postureScore: number;
    caloriesBurned?: number;
}

export interface PerformanceMetrics {
    exerciseType: string;
    totalSessions: number;
    totalReps: number;
    averageRepsPerSession: number;
    averagePostureScore: number;
    postureScoreTrend: 'improving' | 'stable' | 'declining';
    commonErrors: ErrorFrequency[];
    personalBest: {
        maxReps: number;
        bestPostureScore: number;
        date: string;
    };
}

export interface ErrorFrequency {
    errorType: string;
    count: number;
    percentage: number;
    lastOccurrence: string; // ISO date string
}

export interface ProgressDataPoint {
    date: string; // ISO date string
    value: number;
    label?: string;
}

export interface ChartData {
    labels: string[];
    datasets: {
        data: number[];
        color?: (opacity: number) => string;
        strokeWidth?: number;
    }[];
}

export interface Recommendation {
    id: string;
    type: 'form_improvement' | 'exercise_suggestion' | 'goal_setting' | 'rest_day';
    priority: 'low' | 'medium' | 'high';
    title: string;
    description: string;
    actionable: boolean;
    relatedExercise?: string;
    createdAt: string; // ISO date string
}

export interface UserGoal {
    id: string;
    type: 'reps' | 'sets' | 'duration' | 'posture_score' | 'streak';
    target: number;
    current: number;
    deadline?: string; // ISO date string
    exerciseType?: string;
    achieved: boolean;
}

export interface AchievementBadge {
    id: string;
    name: string;
    description: string;
    iconUrl?: string;
    unlockedAt?: string; // ISO date string
    isUnlocked: boolean;
    progress?: number; // 0-100
}
