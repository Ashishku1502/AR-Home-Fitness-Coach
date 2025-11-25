/**
 * Pose Detection Types
 * Defines structures for body keypoints and pose estimation
 */

export interface Keypoint {
  x: number; // Normalized x coordinate (0-1)
  y: number; // Normalized y coordinate (0-1)
  z?: number; // Depth (optional, for 3D pose)
  visibility: number; // Confidence score (0-1)
  name: KeypointName;
}

export type KeypointName =
  | 'nose'
  | 'left_eye_inner'
  | 'left_eye'
  | 'left_eye_outer'
  | 'right_eye_inner'
  | 'right_eye'
  | 'right_eye_outer'
  | 'left_ear'
  | 'right_ear'
  | 'mouth_left'
  | 'mouth_right'
  | 'left_shoulder'
  | 'right_shoulder'
  | 'left_elbow'
  | 'right_elbow'
  | 'left_wrist'
  | 'right_wrist'
  | 'left_pinky'
  | 'right_pinky'
  | 'left_index'
  | 'right_index'
  | 'left_thumb'
  | 'right_thumb'
  | 'left_hip'
  | 'right_hip'
  | 'left_knee'
  | 'right_knee'
  | 'left_ankle'
  | 'right_ankle'
  | 'left_heel'
  | 'right_heel'
  | 'left_foot_index'
  | 'right_foot_index';

export interface Pose {
  keypoints: Keypoint[];
  timestamp: number;
  confidence: number; // Overall pose detection confidence
}

export interface JointAngle {
  joint: string; // e.g., 'left_knee', 'right_elbow'
  angle: number; // Angle in degrees
  timestamp: number;
}

export interface PoseDetectionConfig {
  modelComplexity: 0 | 1 | 2; // 0=lite, 1=full, 2=heavy
  smoothLandmarks: boolean;
  minDetectionConfidence: number; // 0-1
  minTrackingConfidence: number; // 0-1
}

export interface PoseDetectionResult {
  pose: Pose | null;
  processingTime: number; // milliseconds
  fps: number;
}
