/**
 * Repetition Counter
 * Tracks exercise phases and counts valid repetitions
 */

import { Keypoint } from '../../types/pose.types';
import { Exercise, ExercisePhase, RepetitionState } from '../../types/exercise.types';
import {
    calculateKneeAngle,
    calculateElbowAngle,
    calculateHipAngle,
} from '../../utils/angleCalculator';
import { EXERCISE_THRESHOLDS } from '../../utils/constants';

export class RepCounter {
    private currentState: RepetitionState;
    private exercise: Exercise;
    private phaseHistory: ExercisePhase[];
    private holdStartTime: number | null;

    constructor(exercise: Exercise) {
        this.exercise = exercise;
        this.currentState = {
            currentPhase: 'starting',
            previousPhase: null,
            repCount: 0,
            setCount: 1,
            isValidRep: true,
            phaseStartTime: Date.now(),
        };
        this.phaseHistory = [];
        this.holdStartTime = null;
    }

    /**
     * Update rep counter with new pose data
     */
    public update(keypoints: Keypoint[]): RepetitionState {
        const newPhase = this.detectPhase(keypoints);

        // Check if phase has changed
        if (newPhase !== this.currentState.currentPhase) {
            this.onPhaseChange(newPhase);
        }

        // Check for completed rep
        if (this.isRepComplete()) {
            this.currentState.repCount++;
            this.phaseHistory = [];
        }

        return this.currentState;
    }

    /**
     * Detect current exercise phase based on keypoints
     */
    private detectPhase(keypoints: Keypoint[]): ExercisePhase {
        switch (this.exercise.type) {
            case 'squats':
                return this.detectSquatPhase(keypoints);
            case 'push_ups':
                return this.detectPushUpPhase(keypoints);
            case 'lunges':
                return this.detectLungePhase(keypoints);
            case 'planks':
                return this.detectPlankPhase(keypoints);
            default:
                return 'starting';
        }
    }

    /**
     * Detect squat phase
     */
    private detectSquatPhase(keypoints: Keypoint[]): ExercisePhase {
        const leftKneeAngle = calculateKneeAngle(keypoints, 'left');
        const rightKneeAngle = calculateKneeAngle(keypoints, 'right');

        if (leftKneeAngle === null || rightKneeAngle === null) {
            return this.currentState.currentPhase;
        }

        const avgKneeAngle = (leftKneeAngle + rightKneeAngle) / 2;

        // Determine phase based on knee angle
        if (avgKneeAngle > 160) {
            return 'starting'; // Standing position
        } else if (avgKneeAngle < EXERCISE_THRESHOLDS.SQUATS.DEPTH_THRESHOLD) {
            return 'bottom'; // Full squat depth
        } else {
            // Transitioning
            if (this.currentState.currentPhase === 'starting' ||
                this.currentState.currentPhase === 'descending') {
                return 'descending';
            } else {
                return 'ascending';
            }
        }
    }

    /**
     * Detect push-up phase
     */
    private detectPushUpPhase(keypoints: Keypoint[]): ExercisePhase {
        const leftElbowAngle = calculateElbowAngle(keypoints, 'left');
        const rightElbowAngle = calculateElbowAngle(keypoints, 'right');

        if (leftElbowAngle === null || rightElbowAngle === null) {
            return this.currentState.currentPhase;
        }

        const avgElbowAngle = (leftElbowAngle + rightElbowAngle) / 2;

        // Determine phase based on elbow angle
        if (avgElbowAngle > 160) {
            return 'top'; // Arms extended
        } else if (avgElbowAngle < EXERCISE_THRESHOLDS.PUSH_UPS.DEPTH_THRESHOLD) {
            return 'bottom'; // Chest near ground
        } else {
            // Transitioning
            if (this.currentState.currentPhase === 'top' ||
                this.currentState.currentPhase === 'descending') {
                return 'descending';
            } else {
                return 'ascending';
            }
        }
    }

    /**
     * Detect lunge phase
     */
    private detectLungePhase(keypoints: Keypoint[]): ExercisePhase {
        const leftKneeAngle = calculateKneeAngle(keypoints, 'left');
        const rightKneeAngle = calculateKneeAngle(keypoints, 'right');

        if (leftKneeAngle === null || rightKneeAngle === null) {
            return this.currentState.currentPhase;
        }

        // Determine which leg is forward (smaller knee angle)
        const frontKneeAngle = Math.min(leftKneeAngle, rightKneeAngle);

        if (frontKneeAngle > 160) {
            return 'starting'; // Standing position
        } else if (frontKneeAngle < 100) {
            return 'bottom'; // Deep lunge
        } else {
            // Transitioning
            if (this.currentState.currentPhase === 'starting' ||
                this.currentState.currentPhase === 'descending') {
                return 'descending';
            } else if (this.currentState.currentPhase === 'bottom' ||
                this.currentState.currentPhase === 'ascending') {
                return 'ascending';
            } else {
                return 'returning';
            }
        }
    }

    /**
     * Detect plank phase (holding)
     */
    private detectPlankPhase(keypoints: Keypoint[]): ExercisePhase {
        const leftHipAngle = calculateHipAngle(keypoints, 'left');
        const rightHipAngle = calculateHipAngle(keypoints, 'right');

        if (leftHipAngle === null || rightHipAngle === null) {
            return this.currentState.currentPhase;
        }

        const avgHipAngle = (leftHipAngle + rightHipAngle) / 2;

        // Check if body is in plank position (straight line)
        if (avgHipAngle > 160 && avgHipAngle < 200) {
            if (this.holdStartTime === null) {
                this.holdStartTime = Date.now();
            }
            return 'holding';
        } else {
            this.holdStartTime = null;
            return 'starting';
        }
    }

    /**
     * Handle phase change
     */
    private onPhaseChange(newPhase: ExercisePhase): void {
        this.currentState.previousPhase = this.currentState.currentPhase;
        this.currentState.currentPhase = newPhase;
        this.currentState.phaseStartTime = Date.now();
        this.phaseHistory.push(newPhase);
    }

    /**
     * Check if a complete repetition has been performed
     */
    private isRepComplete(): boolean {
        switch (this.exercise.type) {
            case 'squats':
                return this.isSquatRepComplete();
            case 'push_ups':
                return this.isPushUpRepComplete();
            case 'lunges':
                return this.isLungeRepComplete();
            case 'planks':
                return this.isPlankRepComplete();
            default:
                return false;
        }
    }

    /**
     * Check if squat rep is complete
     * Complete cycle: starting -> descending -> bottom -> ascending -> starting
     */
    private isSquatRepComplete(): boolean {
        if (this.phaseHistory.length < 4) {
            return false;
        }

        const recentPhases = this.phaseHistory.slice(-4);
        return (
            recentPhases.includes('starting') &&
            recentPhases.includes('descending') &&
            recentPhases.includes('bottom') &&
            recentPhases.includes('ascending') &&
            this.currentState.currentPhase === 'starting'
        );
    }

    /**
     * Check if push-up rep is complete
     * Complete cycle: top -> descending -> bottom -> ascending -> top
     */
    private isPushUpRepComplete(): boolean {
        if (this.phaseHistory.length < 4) {
            return false;
        }

        const recentPhases = this.phaseHistory.slice(-4);
        return (
            recentPhases.includes('top') &&
            recentPhases.includes('descending') &&
            recentPhases.includes('bottom') &&
            recentPhases.includes('ascending') &&
            this.currentState.currentPhase === 'top'
        );
    }

    /**
     * Check if lunge rep is complete
     */
    private isLungeRepComplete(): boolean {
        if (this.phaseHistory.length < 5) {
            return false;
        }

        const recentPhases = this.phaseHistory.slice(-5);
        return (
            recentPhases.includes('starting') &&
            recentPhases.includes('descending') &&
            recentPhases.includes('bottom') &&
            recentPhases.includes('ascending') &&
            recentPhases.includes('returning') &&
            this.currentState.currentPhase === 'starting'
        );
    }

    /**
     * Check if plank hold is complete (based on time)
     */
    private isPlankRepComplete(): boolean {
        if (this.holdStartTime === null) {
            return false;
        }

        const holdDuration = (Date.now() - this.holdStartTime) / 1000; // seconds
        return holdDuration >= EXERCISE_THRESHOLDS.PLANKS.MIN_HOLD_TIME;
    }

    /**
     * Get current state
     */
    public getState(): RepetitionState {
        return { ...this.currentState };
    }

    /**
     * Reset counter
     */
    public reset(): void {
        this.currentState = {
            currentPhase: 'starting',
            previousPhase: null,
            repCount: 0,
            setCount: 1,
            isValidRep: true,
            phaseStartTime: Date.now(),
        };
        this.phaseHistory = [];
        this.holdStartTime = null;
    }

    /**
     * Get rep count
     */
    public getRepCount(): number {
        return this.currentState.repCount;
    }

    /**
     * Get current phase
     */
    public getCurrentPhase(): ExercisePhase {
        return this.currentState.currentPhase;
    }

    /**
     * Increment set count
     */
    public nextSet(): void {
        this.currentState.setCount++;
        this.currentState.repCount = 0;
        this.phaseHistory = [];
    }
}
