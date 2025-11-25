/**
 * Application Constants
 * Centralized configuration values
 */

// Pose Detection
export const POSE_DETECTION = {
    MIN_DETECTION_CONFIDENCE: 0.7,
    MIN_TRACKING_CONFIDENCE: 0.7,
    MODEL_COMPLEXITY: 1, // 0=lite, 1=full, 2=heavy
    SMOOTH_LANDMARKS: true,
    TARGET_FPS: 15,
    MIN_VISIBILITY_THRESHOLD: 0.5,
} as const;

// Camera Settings
export const CAMERA = {
    DEFAULT_QUALITY: '720p',
    DEFAULT_FPS: 15,
    SUPPORTED_QUALITIES: ['720p', '1080p'] as const,
    SUPPORTED_FPS: [15, 20, 30] as const,
} as const;

// Exercise Thresholds
export const EXERCISE_THRESHOLDS = {
    SQUATS: {
        KNEE_ANGLE_MIN: 70,
        KNEE_ANGLE_MAX: 170,
        HIP_ANGLE_MIN: 60,
        HIP_ANGLE_MAX: 180,
        DEPTH_THRESHOLD: 90, // Knee angle for valid squat depth
    },
    PUSH_UPS: {
        ELBOW_ANGLE_MIN: 70,
        ELBOW_ANGLE_MAX: 170,
        SHOULDER_ANGLE_MIN: 60,
        SHOULDER_ANGLE_MAX: 180,
        DEPTH_THRESHOLD: 90, // Elbow angle for valid push-up depth
    },
    LUNGES: {
        FRONT_KNEE_ANGLE_MIN: 70,
        FRONT_KNEE_ANGLE_MAX: 110,
        BACK_KNEE_ANGLE_MIN: 70,
        BACK_KNEE_ANGLE_MAX: 170,
    },
    PLANKS: {
        MIN_HOLD_TIME: 10, // seconds
        MAX_HIP_SAG: 15, // degrees deviation from straight line
    },
} as const;

// Form Feedback
export const FORM_FEEDBACK = {
    COLOR_CORRECT: '#00FF00', // Green
    COLOR_MINOR_ERROR: '#FFFF00', // Yellow
    COLOR_MAJOR_ERROR: '#FF0000', // Red
    MINOR_ANGLE_DEVIATION: 10, // degrees
    MAJOR_ANGLE_DEVIATION: 20, // degrees
} as const;

// Analytics
export const ANALYTICS = {
    MAX_HISTORY_DAYS: 90,
    CHART_DATA_POINTS: 30,
    MIN_SESSIONS_FOR_RECOMMENDATIONS: 5,
} as const;

// Audio Feedback
export const AUDIO = {
    DEFAULT_SPEECH_RATE: 1.0,
    DEFAULT_PITCH: 1.0,
    FEEDBACK_COOLDOWN_MS: 3000, // Minimum time between audio feedback
} as const;

// Gamification
export const GAMIFICATION = {
    POINTS_PER_CORRECT_REP: 10,
    POINTS_PER_PERFECT_FORM: 5,
    STREAK_BONUS_MULTIPLIER: 1.5,
    ACHIEVEMENT_THRESHOLDS: {
        TOTAL_REPS: [100, 500, 1000, 5000],
        PERFECT_REPS: [10, 50, 100, 500],
        WORKOUT_STREAK: [7, 14, 30, 90],
    },
} as const;

// Database
export const DATABASE = {
    NAME: 'ar_fitness_coach.db',
    VERSION: 1,
    TABLES: {
        WORKOUTS: 'workouts',
        FORM_ERRORS: 'form_errors',
        ACHIEVEMENTS: 'achievements',
        GOALS: 'goals',
    },
} as const;

// Firebase
export const FIREBASE = {
    COLLECTIONS: {
        USERS: 'users',
        WORKOUTS: 'workouts',
        ACHIEVEMENTS: 'achievements',
    },
    SYNC_INTERVAL_MS: 60000, // 1 minute
} as const;

// UI
export const UI = {
    COLORS: {
        PRIMARY: '#6366F1', // Indigo
        SECONDARY: '#8B5CF6', // Purple
        SUCCESS: '#10B981', // Green
        WARNING: '#F59E0B', // Amber
        ERROR: '#EF4444', // Red
        BACKGROUND_LIGHT: '#F9FAFB',
        BACKGROUND_DARK: '#111827',
        TEXT_LIGHT: '#1F2937',
        TEXT_DARK: '#F9FAFB',
    },
    SPACING: {
        XS: 4,
        SM: 8,
        MD: 16,
        LG: 24,
        XL: 32,
    },
    BORDER_RADIUS: {
        SM: 4,
        MD: 8,
        LG: 12,
        XL: 16,
    },
    FONT_SIZES: {
        XS: 12,
        SM: 14,
        MD: 16,
        LG: 18,
        XL: 24,
        XXL: 32,
    },
} as const;

// Performance
export const PERFORMANCE = {
    MAX_FRAME_PROCESSING_TIME_MS: 100,
    KALMAN_FILTER_PROCESS_NOISE: 0.01,
    KALMAN_FILTER_MEASUREMENT_NOISE: 0.1,
} as const;

// Permissions
export const PERMISSIONS = {
    CAMERA: 'camera',
    MICROPHONE: 'microphone',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
    CAMERA_PERMISSION_DENIED: 'Camera permission is required to use this app',
    POSE_DETECTION_FAILED: 'Failed to detect pose. Please ensure good lighting and full body visibility',
    MODEL_LOAD_FAILED: 'Failed to load AI model. Please restart the app',
    NETWORK_ERROR: 'Network error. Please check your connection',
    AUTH_FAILED: 'Authentication failed. Please try again',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
    WORKOUT_SAVED: 'Workout saved successfully!',
    PROFILE_UPDATED: 'Profile updated successfully!',
    ACHIEVEMENT_UNLOCKED: 'Achievement unlocked!',
    GOAL_ACHIEVED: 'Goal achieved! Congratulations!',
} as const;
