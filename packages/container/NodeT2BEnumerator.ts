import { IAdapter } from "./AdapterBase";
import IEnumerator, { Indexer } from "./IEnumerator";
import { TreeNode } from "./TreeNode";

export default class NodeT2BEnumerator<T, 
IdxFunc extends Indexer, 
Adapter extends IAdapter<TreeNode<T>>> implements IEnumerator<TreeNode<T>> {
    private _node: TreeNode<T> | undefined;
    private _adapter!: IAdapter<TreeNode<T>>;
    private _currNode!: TreeNode<T> | undefined;
    private _indexer!: IdxFunc;

    public constructor(
        node: TreeNode<T> | undefined, 
        func: IdxFunc,
        adapter: new () => Adapter
    ) {
        if (node === undefined) return;

        this._node = node;
        this._indexer = func;
        this._adapter = new adapter();
        this._adapter.add(this._node);
        this._currNode = undefined;
    }

    public reset(): void {
        if (this._node === undefined) return;
        this._currNode = undefined;
        this._adapter.clear();
        this._adapter.add(this._node);
    }

    public moveNext(): boolean {
        if (this._adapter.isEmpty) return false;
        this._currNode = this._adapter.remove();

        if (this._currNode !== undefined) {
            let len: number = this._currNode.childCount;
            for (let i = 0; i < len; i++) {
                let childIdx: number = this._indexer(len, i);
                let child: TreeNode<T> | undefined = this._currNode.getChildAt(childIdx);
                if (child !== undefined) {
                    this._adapter.add(child);
                }
            }
        }
        return true;
    }
    
    public get current(): TreeNode<T> | undefined {
        return this._currNode;
    }
    
}
