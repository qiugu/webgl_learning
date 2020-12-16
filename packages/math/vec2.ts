export default class vec2 {

    public values = new Float32Array(16);

    public get x(): number {
        return this.values[0];
    }

    public get y(): number {
        return this.values[1];
    }

    public set x(value: number) {
        this.values[0] = value;
    }

    public set y(value: number) {
        this.values[1] = value;
    }

    public constructor(values: number[]) {
        if (values) {
            this.x = values[0];
            this.y = values[1];
        } else {
            this.x = this.y = 0;
        }
    }
}