import AdapterBase from "./AdapterBase";

export default class Stack<T> extends AdapterBase<T> {
    public remove(): T | undefined {
        if (this._arr.length > 0) {
            return this._arr.pop();
        } else {
            return undefined;
        }
    }
}
