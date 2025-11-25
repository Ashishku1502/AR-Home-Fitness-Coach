/**
 * Kalman Filter
 * Smooths pose keypoint coordinates to reduce jitter
 */

export class KalmanFilter {
    private processNoise: number;
    private measurementNoise: number;
    private estimatedValue: number;
    private estimatedError: number;
    private isInitialized: boolean;

    constructor(processNoise: number = 0.01, measurementNoise: number = 0.1) {
        this.processNoise = processNoise;
        this.measurementNoise = measurementNoise;
        this.estimatedValue = 0;
        this.estimatedError = 1;
        this.isInitialized = false;
    }

    /**
     * Update the filter with a new measurement
     * @param measurement New measured value
     * @returns Filtered (smoothed) value
     */
    public filter(measurement: number): number {
        if (!this.isInitialized) {
            this.estimatedValue = measurement;
            this.isInitialized = true;
            return measurement;
        }

        // Prediction step
        const predictedError = this.estimatedError + this.processNoise;

        // Update step
        const kalmanGain = predictedError / (predictedError + this.measurementNoise);
        this.estimatedValue = this.estimatedValue + kalmanGain * (measurement - this.estimatedValue);
        this.estimatedError = (1 - kalmanGain) * predictedError;

        return this.estimatedValue;
    }

    /**
     * Reset the filter
     */
    public reset(): void {
        this.estimatedValue = 0;
        this.estimatedError = 1;
        this.isInitialized = false;
    }

    /**
     * Get current estimated value
     */
    public getValue(): number {
        return this.estimatedValue;
    }
}

/**
 * Keypoint Kalman Filter
 * Manages separate filters for x, y, and z coordinates
 */
export class KeypointKalmanFilter {
    private xFilter: KalmanFilter;
    private yFilter: KalmanFilter;
    private zFilter: KalmanFilter;

    constructor(processNoise: number = 0.01, measurementNoise: number = 0.1) {
        this.xFilter = new KalmanFilter(processNoise, measurementNoise);
        this.yFilter = new KalmanFilter(processNoise, measurementNoise);
        this.zFilter = new KalmanFilter(processNoise, measurementNoise);
    }

    /**
     * Filter a keypoint's coordinates
     */
    public filter(x: number, y: number, z?: number): { x: number; y: number; z?: number } {
        return {
            x: this.xFilter.filter(x),
            y: this.yFilter.filter(y),
            z: z !== undefined ? this.zFilter.filter(z) : undefined,
        };
    }

    /**
     * Reset all filters
     */
    public reset(): void {
        this.xFilter.reset();
        this.yFilter.reset();
        this.zFilter.reset();
    }
}

/**
 * Pose Kalman Filter Manager
 * Manages filters for all keypoints in a pose
 */
export class PoseKalmanFilterManager {
    private filters: Map<string, KeypointKalmanFilter>;
    private processNoise: number;
    private measurementNoise: number;

    constructor(processNoise: number = 0.01, measurementNoise: number = 0.1) {
        this.filters = new Map();
        this.processNoise = processNoise;
        this.measurementNoise = measurementNoise;
    }

    /**
     * Get or create a filter for a specific keypoint
     */
    private getFilter(keypointName: string): KeypointKalmanFilter {
        if (!this.filters.has(keypointName)) {
            this.filters.set(
                keypointName,
                new KeypointKalmanFilter(this.processNoise, this.measurementNoise)
            );
        }
        return this.filters.get(keypointName)!;
    }

    /**
     * Filter a single keypoint
     */
    public filterKeypoint(
        keypointName: string,
        x: number,
        y: number,
        z?: number
    ): { x: number; y: number; z?: number } {
        const filter = this.getFilter(keypointName);
        return filter.filter(x, y, z);
    }

    /**
     * Reset all filters
     */
    public reset(): void {
        this.filters.clear();
    }

    /**
     * Reset filter for a specific keypoint
     */
    public resetKeypoint(keypointName: string): void {
        const filter = this.filters.get(keypointName);
        if (filter) {
            filter.reset();
        }
    }
}
