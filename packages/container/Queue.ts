import AdapterBase from "./AdapterBase";

export default class Queue<T> extends AdapterBase<T> {
    public remove(): T | undefined {
        if (this._arr.length > 0) {
            return this._arr.shift();
        } else {
            return undefined;
        }
    }
}
