/**
 * Form Analyzer
 * Evaluates exercise form and generates feedback
 */

import { Keypoint } from '../../types/pose.types';
import { Exercise, FormError } from '../../types/exercise.types';
import {
    calculateKneeAngle,
    calculateElbowAngle,
    calculateHipAngle,
    calculateShoulderAngle,
} from '../../utils/angleCalculator';
import { FORM_FEEDBACK } from '../../utils/constants';

export interface FormAnalysisResult {
    isCorrect: boolean;
    score: number;
    errors: FormError[];
    jointColors: Map<string, string>;
    feedback: string[];
}

export class FormAnalyzer {
    public static analyze(
        exercise: Exercise,
        keypoints: Keypoint[],
        _currentPhase: string
    ): FormAnalysisResult {
        const errors: FormError[] = [];
        const jointColors = new Map<string, string>();
        const feedback: string[] = [];
        let totalDeviation = 0;
        let checkedAngles = 0;

        for (const [jointName, angleConfig] of Object.entries(exercise.keyAngles)) {
            const angle = this.getJointAngle(keypoints, jointName);

            if (angle === null) {
                jointColors.set(jointName, FORM_FEEDBACK.COLOR_MINOR_ERROR);
                continue;
            }

            const { min, max, ideal } = angleConfig;
            const deviation = Math.abs(angle - ideal);
            totalDeviation += deviation;
            checkedAngles++;

            if (angle < min || angle > max) {
                const error: FormError = {
                    timestamp: Date.now(),
                    errorType: `${jointName}_out_of_range`,
                    severity: 'major',
                    message: this.getErrorMessage(exercise.type, jointName, angle, angleConfig),
                    affectedJoints: [jointName],
                };
                errors.push(error);
                jointColors.set(jointName, FORM_FEEDBACK.COLOR_MAJOR_ERROR);
                feedback.push(error.message);
            } else if (deviation > FORM_FEEDBACK.MAJOR_ANGLE_DEVIATION) {
                const error: FormError = {
                    timestamp: Date.now(),
                    errorType: `${jointName}_major_deviation`,
                    severity: 'moderate',
                    message: this.getErrorMessage(exercise.type, jointName, angle, angleConfig),
                    affectedJoints: [jointName],
                };
                errors.push(error);
                jointColors.set(jointName, FORM_FEEDBACK.COLOR_MAJOR_ERROR);
                feedback.push(error.message);
            } else if (deviation > FORM_FEEDBACK.MINOR_ANGLE_DEVIATION) {
                const error: FormError = {
                    timestamp: Date.now(),
                    errorType: `${jointName}_minor_deviation`,
                    severity: 'minor',
                    message: this.getErrorMessage(exercise.type, jointName, angle, angleConfig),
                    affectedJoints: [jointName],
                };
                errors.push(error);
                jointColors.set(jointName, FORM_FEEDBACK.COLOR_MINOR_ERROR);
            } else {
                jointColors.set(jointName, FORM_FEEDBACK.COLOR_CORRECT);
            }
        }

        const averageDeviation = checkedAngles > 0 ? totalDeviation / checkedAngles : 0;
        const score = Math.max(0, Math.min(100, 100 - averageDeviation));

        const specificErrors = this.checkExerciseSpecificForm(exercise, keypoints);
        errors.push(...specificErrors);
        specificErrors.forEach(error => feedback.push(error.message));

        return {
            isCorrect: errors.filter(e => e.severity !== 'minor').length === 0,
            score,
            errors,
            jointColors,
            feedback: [...new Set(feedback)],
        };
    }

    private static getJointAngle(keypoints: Keypoint[], jointName: string): number | null {
        const [side, joint] = this.parseJointName(jointName);

        switch (joint) {
            case 'knee':
                return calculateKneeAngle(keypoints, side);
            case 'elbow':
                return calculateElbowAngle(keypoints, side);
            case 'hip':
                return calculateHipAngle(keypoints, side);
            case 'shoulder':
                return calculateShoulderAngle(keypoints, side);
            default:
                return null;
        }
    }

    private static parseJointName(jointName: string): ['left' | 'right', string] {
        const parts = jointName.split('_');
        const side = parts[0] as 'left' | 'right';
        const joint = parts[1];
        return [side, joint];
    }

    private static getErrorMessage(
        exerciseType: string,
        jointName: string,
        currentAngle: number,
        angleConfig: { min: number; max: number; ideal: number }
    ): string {
        const [side, joint] = this.parseJointName(jointName);
        const deviation = currentAngle - angleConfig.ideal;

        switch (exerciseType) {
            case 'squats':
                if (joint === 'knee') {
                    if (currentAngle > angleConfig.ideal) {
                        return 'Go deeper - squat down more';
                    } else {
                        return 'Good depth! Keep it up';
                    }
                } else if (joint === 'hip') {
                    return 'Keep your back straight';
                }
                break;

            case 'push_ups':
                if (joint === 'elbow') {
                    if (currentAngle > angleConfig.ideal) {
                        return 'Lower your chest closer to the ground';
                    } else {
                        return 'Good depth!';
                    }
                } else if (joint === 'shoulder') {
                    return 'Keep your body in a straight line';
                }
                break;

            case 'lunges':
                if (joint === 'knee') {
                    if (side === 'left') {
                        return 'Front knee should be at 90 degrees';
                    } else {
                        return 'Back knee should lower towards ground';
                    }
                }
                break;

            case 'planks':
                if (joint === 'hip') {
                    if (deviation < 0) {
                        return 'Raise your hips - avoid sagging';
                    } else {
                        return 'Lower your hips slightly';
                    }
                }
                break;
        }

        return 'Adjust your position';
}

    private static checkExerciseSpecificForm(
    exercise: Exercise,
    keypoints: Keypoint[]
): FormError[] {
    const errors: FormError[] = [];

    switch (exercise.type) {
        case 'squats':
            errors.push(...this.checkSquatForm(keypoints));
            break;
        case 'push_ups':
            errors.push(...this.checkPushUpForm(keypoints));
            break;
        case 'planks':
            errors.push(...this.checkPlankForm(keypoints));
            break;
    }

    return errors;
}

    private static checkSquatForm(keypoints: Keypoint[]): FormError[] {
    const errors: FormError[] = [];

    const leftKnee = keypoints.find(kp => kp.name === 'left_knee');
    const leftAnkle = keypoints.find(kp => kp.name === 'left_ankle');

    if (leftKnee && leftAnkle && leftKnee.x > leftAnkle.x + 0.05) {
        errors.push({
            timestamp: Date.now(),
            errorType: 'knees_over_toes',
            severity: 'major',
            message: 'Keep knees behind toes',
            affectedJoints: ['left_knee', 'right_knee'],
        });
    }

    return errors;
}

    private static checkPushUpForm(keypoints: Keypoint[]): FormError[] {
    const errors: FormError[] = [];

    const leftShoulder = keypoints.find(kp => kp.name === 'left_shoulder');
    const leftHip = keypoints.find(kp => kp.name === 'left_hip');
    const leftAnkle = keypoints.find(kp => kp.name === 'left_ankle');

    if (leftShoulder && leftHip && leftAnkle) {
        const hipDeviation = Math.abs(
            leftHip.y - (leftShoulder.y + leftAnkle.y) / 2
        );

        if (hipDeviation > 0.1) {
            errors.push({
                timestamp: Date.now(),
                errorType: 'back_not_straight',
                severity: 'major',
                message: 'Keep your back straight - engage core',
                affectedJoints: ['left_hip', 'right_hip'],
            });
        }
    }

    return errors;
}

    private static checkPlankForm(keypoints: Keypoint[]): FormError[] {
    const errors: FormError[] = [];

    const leftShoulder = keypoints.find(kp => kp.name === 'left_shoulder');
    const leftHip = keypoints.find(kp => kp.name === 'left_hip');
    const leftAnkle = keypoints.find(kp => kp.name === 'left_ankle');

    if (leftShoulder && leftHip && leftAnkle) {
        const expectedHipY = (leftShoulder.y + leftAnkle.y) / 2;
        const hipSag = leftHip.y - expectedHipY;

        if (hipSag > 0.05) {
            errors.push({
                timestamp: Date.now(),
                errorType: 'hips_sagging',
                severity: 'major',
                message: 'Raise your hips - engage your core',
                affectedJoints: ['left_hip', 'right_hip'],
            });
        } else if (hipSag < -0.05) {
            errors.push({
                timestamp: Date.now(),
                errorType: 'hips_too_high',
                severity: 'moderate',
                message: 'Lower your hips slightly',
                affectedJoints: ['left_hip', 'right_hip'],
            });
        }
    }

    return errors;
}
}
