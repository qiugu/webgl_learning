import { Indexer, IndexerL2R } from "./IEnumerator";

export type NodeCallback<T> = (node: TreeNode<T>) => void;
export class TreeNode<T> {
    // 当前节点的父节点，如果当前节点就是根节点，则其父节点是undefined
    private _parent: TreeNode<T> | undefined;
    // 当前节点的子节点，如果当前节点是叶子节点，则此属性为undefined
    private _children: Array<TreeNode<T>> | undefined;

    // 当前节点的名称，用于调试输出
    public name: string;
    // 当前节点引用的数据对象
    public data: T | undefined;

    public constructor(
        data: T | undefined = undefined, 
        parent: TreeNode<T> | undefined = undefined,
        name: string = ''
    ) {
        this._parent = parent;
        this._children = undefined;
        this.name = name;
        this.data = data;
        if (this._parent !== undefined) {
            this._parent.addChild(this);
        }
    }

    public isDescendantOf(ancestor: TreeNode<T> | undefined): boolean {
        if (ancestor === undefined) {
            return false;
        }
        let node: TreeNode<T> | undefined = this._parent;
        for (;node !== undefined; node = node._parent) {
                if (node === ancestor) {
                    return true;
                }
            }
        return false;
    }

    public removeChildAt(index: number): TreeNode<T> | undefined {
        if (this._children === undefined) {
            return undefined;
        }
        let child: TreeNode<T> | undefined = this.getChildAt(index);
        if (child === undefined) {
            return undefined;
        }
        this._children.slice(index, 1);
        child._parent = undefined;
        return child;
    }

    public removeChild(child: TreeNode<T> | undefined): TreeNode<T> | undefined {
        if (child === undefined) {
            return undefined;
        }
        if (this._children === undefined) {
            return undefined;
        }
        let index: number = -1;
        for (let i = 0; i < this._children.length; i++) {
            if (this.getChildAt(i) === child) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            return undefined;
        }

        return this.removeChildAt(index);
    }

    public remove(): TreeNode<T> | undefined {
        if (this._parent !== undefined) {
            return this._parent.removeChild(this);
        }
        return undefined;
    }

    public addChildAt(child: TreeNode<T>, index: number): TreeNode<T> | undefined {
        if (this.isDescendantOf(child)) {
            return undefined;
        }

        if (this._children === undefined) {
            this._children = [];
        }

        if (index < 0 || index > this._children.length) {
            if (child._parent !== undefined) {
                child._parent.removeChild(child);
            }
            child._parent = this;
            this._children.splice(index, 0, child);
            return child;
        } else {
            return undefined;
        }
    }

    public addChild(child: TreeNode<T>): TreeNode<T> | undefined {
        if (this._children === undefined) {
            this._children = [];
        }
        return this.addChildAt(child, this._children.length);
    }

    public get parent(): TreeNode<T> | undefined {
        return this._parent;
    }

    public getChildAt(index: number): TreeNode<T> | undefined {
        if (this._children === undefined) {
            return undefined;
        }
        if (index < 0 || index > this._children.length) {
            return undefined;
        }
        return this._children[index];
    }

    public get childCount(): number {
        if (this._children !== undefined) {
            return this._children.length;
        } else {
            return 0;
        }
    }

    public hasChild(): boolean {
        return this._children !== undefined && this._children.length > 0;
    }

    public get root(): TreeNode<T> | undefined {
        let curr: TreeNode<T> | undefined = this;
        while(curr !== undefined && curr.parent !== undefined) {
            curr = curr.parent;
        }
        return curr;
    }

    public get depth(): number {
        let curr: TreeNode<T> | undefined = this;
        let level: number = 0;
        while(curr !== undefined && curr.parent !== undefined) {
            curr = curr.parent;
            level++;
        }
        return level;
    }

    public visit(
        preOrderFunc: NodeCallback<T> | null = null,
        postOrderFunc: NodeCallback<T> | null = null,
        indexFunc: Indexer = IndexerL2R
    ): void {
        if (preOrderFunc !== null) {
            preOrderFunc(this);
        }

        let arr: Array<TreeNode<T>> | undefined = this._children;
        if (arr !== undefined) {
            for (let i: number = 0; i < arr.length; i++) {
                let child: TreeNode<T> | undefined = this.getChildAt(indexFunc(arr.length, i));
                if (child !== undefined) {
                    child.visit(preOrderFunc, postOrderFunc, indexFunc);
                }
            }
        }
        if (postOrderFunc !== null) {
            postOrderFunc(this);
        }
    }
}