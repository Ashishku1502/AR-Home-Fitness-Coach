/**
 * Angle Calculator Utilities
 * Functions to calculate angles between joints for pose analysis
 */

import { Keypoint } from '../types/pose.types';

/**
 * Calculate the angle between three points (in degrees)
 * @param a First point (e.g., shoulder)
 * @param b Middle point (e.g., elbow) - the vertex of the angle
 * @param c Third point (e.g., wrist)
 * @returns Angle in degrees (0-180)
 */
export function calculateAngle(
    a: { x: number; y: number },
    b: { x: number; y: number },
    c: { x: number; y: number }
): number {
    const radians =
        Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);

    if (angle > 180.0) {
        angle = 360 - angle;
    }

    return angle;
}

/**
 * Calculate angle for a specific joint using keypoints
 * @param keypoints Array of detected keypoints
 * @param joint1Name Name of first keypoint
 * @param joint2Name Name of middle keypoint (vertex)
 * @param joint3Name Name of third keypoint
 * @returns Angle in degrees or null if keypoints not found
 */
export function calculateJointAngle(
    keypoints: Keypoint[],
    joint1Name: string,
    joint2Name: string,
    joint3Name: string
): number | null {
    const joint1 = keypoints.find(kp => kp.name === joint1Name);
    const joint2 = keypoints.find(kp => kp.name === joint2Name);
    const joint3 = keypoints.find(kp => kp.name === joint3Name);

    if (!joint1 || !joint2 || !joint3) {
        return null;
    }

    // Check visibility threshold
    if (joint1.visibility < 0.5 || joint2.visibility < 0.5 || joint3.visibility < 0.5) {
        return null;
    }

    return calculateAngle(
        { x: joint1.x, y: joint1.y },
        { x: joint2.x, y: joint2.y },
        { x: joint3.x, y: joint3.y }
    );
}

/**
 * Calculate knee angle (hip-knee-ankle)
 */
export function calculateKneeAngle(keypoints: Keypoint[], side: 'left' | 'right'): number | null {
    return calculateJointAngle(
        keypoints,
        `${side}_hip`,
        `${side}_knee`,
        `${side}_ankle`
    );
}

/**
 * Calculate elbow angle (shoulder-elbow-wrist)
 */
export function calculateElbowAngle(keypoints: Keypoint[], side: 'left' | 'right'): number | null {
    return calculateJointAngle(
        keypoints,
        `${side}_shoulder`,
        `${side}_elbow`,
        `${side}_wrist`
    );
}

/**
 * Calculate hip angle (shoulder-hip-knee)
 */
export function calculateHipAngle(keypoints: Keypoint[], side: 'left' | 'right'): number | null {
    return calculateJointAngle(
        keypoints,
        `${side}_shoulder`,
        `${side}_hip`,
        `${side}_knee`
    );
}

/**
 * Calculate shoulder angle (hip-shoulder-elbow)
 */
export function calculateShoulderAngle(keypoints: Keypoint[], side: 'left' | 'right'): number | null {
    return calculateJointAngle(
        keypoints,
        `${side}_hip`,
        `${side}_shoulder`,
        `${side}_elbow`
    );
}

/**
 * Calculate distance between two points
 */
export function calculateDistance(
    point1: { x: number; y: number },
    point2: { x: number; y: number }
): number {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Calculate the slope of a line between two points
 */
export function calculateSlope(
    point1: { x: number; y: number },
    point2: { x: number; y: number }
): number {
    if (point2.x === point1.x) {
        return Infinity; // Vertical line
    }
    return (point2.y - point1.y) / (point2.x - point1.x);
}

/**
 * Check if a point is within a certain threshold of a line
 */
export function isPointNearLine(
    point: { x: number; y: number },
    lineStart: { x: number; y: number },
    lineEnd: { x: number; y: number },
    threshold: number
): boolean {
    const distance = pointToLineDistance(point, lineStart, lineEnd);
    return distance <= threshold;
}

/**
 * Calculate perpendicular distance from a point to a line
 */
function pointToLineDistance(
    point: { x: number; y: number },
    lineStart: { x: number; y: number },
    lineEnd: { x: number; y: number }
): number {
    const A = point.x - lineStart.x;
    const B = point.y - lineStart.y;
    const C = lineEnd.x - lineStart.x;
    const D = lineEnd.y - lineStart.y;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;

    if (lenSq !== 0) {
        param = dot / lenSq;
    }

    let xx, yy;

    if (param < 0) {
        xx = lineStart.x;
        yy = lineStart.y;
    } else if (param > 1) {
        xx = lineEnd.x;
        yy = lineEnd.y;
    } else {
        xx = lineStart.x + param * C;
        yy = lineStart.y + param * D;
    }

    const dx = point.x - xx;
    const dy = point.y - yy;

    return Math.sqrt(dx * dx + dy * dy);
}
