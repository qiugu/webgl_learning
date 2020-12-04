import LinkedList from "./LinkedList";

export interface IAdapter<T> {
    add(t: T): void;
    remove(): T | undefined;
    clear(): void;
    length: number;
    isEmpty: boolean;
}

export default abstract class AdapterBase<T> {
    protected _arr: Array<T> | LinkedList<T>;

    public constructor(useList: boolean = true) {
        if (useList) {
            this._arr = new LinkedList<T>();
        } else {
            this._arr = new Array<T>();
        }
    }

    public add(t: T): void {
        this._arr.push(t);
    }

    public abstract remove(): T | undefined;

    public get length(): number {
        return this._arr.length;
    }

    public get isEmpty(): boolean {
        return this._arr.length <= 0;
    }

    public clear(): void {
        if (this._arr instanceof LinkedList) {
            this._arr = new LinkedList<T>();
        } else {
            this._arr = new Array<T>();
        }
    }
}
