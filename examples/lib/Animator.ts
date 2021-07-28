interface AnimationOptions {
    duration: number;
    iterations: number;
    easing: <T>(p: T) => T;
}

export class Timing {
    public startTime: DOMHighResTimeStamp;
    public duration: number = 1;
    public iterations: number = 1;
    public easing: <T>(p: T) => T;

    constructor (options: AnimationOptions) {
        this.startTime = Date.now();
        this.duration = options.duration;
        this.iterations = options.iterations;
        this.easing = options.easing;
    }

    get time() {
        return Date.now() - this.startTime;
    }

    get p() {
        const progress = Math.min(this.time / this.duration, this.iterations);
        return this.isFinished ? 1 : this.easing(progress % 1);
    }

    get isFinished() {
        return this.time / this.duration >= this.iterations;
    }
}

interface UpdateCallback<T> {
    target: T;
    frameIndex: number;
    timing: Timing;
}

export default class Animator {
    public timing: AnimationOptions;

    constructor (options: AnimationOptions) {
        this.timing = options;
    }

    animate<T>(target: T, update: (param:UpdateCallback<T>) => boolean) {
        let frameIndex = 0;
        const timing = new Timing(this.timing);

        return new Promise((resolve) => {
            function next() {
                 if (update({ target, frameIndex, timing }) !== false && !timing.isFinished) {
                     requestAnimationFrame(next);
                 } else {
                     resolve(timing);
                 }
                 frameIndex++;
            }
            next();
        });
    }
}
