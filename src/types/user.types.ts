/**
 * User Types
 * Defines structures for user profiles and authentication
 */

export interface User {
    id: string;
    email: string;
    displayName?: string;
    photoURL?: string;
    createdAt: string; // ISO date string
    lastLoginAt: string; // ISO date string
    preferences: UserPreferences;
    profile: UserProfile;
}

export interface UserProfile {
    age?: number;
    gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
    height?: number; // cm
    weight?: number; // kg
    fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
    goals: string[];
    injuries?: string[];
}

export interface UserPreferences {
    theme: 'light' | 'dark' | 'system';
    language: string; // ISO language code
    audioFeedback: boolean;
    voiceGuidance: boolean;
    cameraQuality: '720p' | '1080p';
    frameRate: 15 | 20 | 30;
    cloudSync: boolean;
    notifications: NotificationPreferences;
}

export interface NotificationPreferences {
    workoutReminders: boolean;
    achievementAlerts: boolean;
    weeklyReports: boolean;
    formTips: boolean;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    error: string | null;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SignupCredentials extends LoginCredentials {
    displayName: string;
    confirmPassword: string;
}
