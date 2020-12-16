import IEnumerator from "./IEnumerator";
import { TreeNode } from "./TreeNode";

export default class NodeB2TEnumerator<T> implements IEnumerator<TreeNode<T>> {
    private _iter: IEnumerator<TreeNode<T>>;
    private _arr!: Array<TreeNode<T> | undefined>;
    private _arrIdx!: number;

    public constructor(iter: IEnumerator<TreeNode<T>>) {
        this._iter = iter;
        this.reset();
    }

    public reset(): void {
        this._arr = [];
        while(this._iter.moveNext()) {
            this._arr.push(this._iter.current);
        }
        this._arrIdx = this._arr.length;
    }

    public moveNext(): boolean {
        this._arrIdx--;
        return this._arrIdx >= 0 && this._arrIdx < this._arr.length;
    }
    
    public get current(): TreeNode<T> | undefined {
        if (this._arrIdx >= this._arr.length) {
            return undefined;
        } else {
            return this._arr[this._arrIdx];
        }
    }
    
}
