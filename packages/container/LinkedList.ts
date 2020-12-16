export class ListNode<T> {
    public next: ListNode<T> | null;
    public prev: ListNode<T> | null;
    public data: T | undefined;

    public constructor(data: T | undefined = undefined) {
        this.next = this.prev = null;
        this.data = data;
    }
}

export default class LinkedList<T> {
    private _headNode: ListNode<T>;
    private _length: number;

    public constructor() {
        this._headNode = new ListNode<T>();
        this._headNode.next = this._headNode;
        this._headNode.prev = this._headNode;
        this._length = 0;
    }

    public empty(): boolean {
        return this._headNode.next === this._headNode;
    }

    public get length(): number {
        return this._length;
    }

    public begin(): ListNode<T> {
        if (this._headNode.next === null) {
            throw new Error('head node can not be null');
        }
        return this._headNode.next;
    }

    public end(): ListNode<T> {
        return this._headNode;
    }

    public contains(data: T): boolean {
        for (let link: ListNode<T> | null = this._headNode.next;
            link !== null && link !== this._headNode; link = link.next) {
                if (link.data !== undefined) {
                    if (data === link.data) {
                        return true;
                    }
                }
            }
        return false;
    }

    public forNext(cb: (data: T) => void): void {
        for (let link: ListNode<T> | null = this._headNode.next;
            link !== null && link !== this._headNode; link = link.next) {
                if (link.data !== undefined) {
                    cb(link.data);
                }
            }
    }

    public forPrev(cb: (data: T) => void): void {
        for (let link: ListNode<T> | null = this._headNode.prev;
            link !== null && link !== this._headNode; link = link.prev) {
                if (link.data !== undefined) {
                    cb(link.data);
                }
            }
    }

    public insertBefore(node: ListNode<T>, data: T): ListNode<T> {
        let ret: ListNode<T> = new ListNode<T>(data);
        ret.next = node;
        ret.prev = node.prev;

        if (node.prev !== null) {
            node.prev.next = ret;
        }
        node.prev = ret;
        this._length++;
        return ret;
    }

    public remove(node: ListNode<T>): void {
        let next: ListNode<T> | null = node.next;
        let prev: ListNode<T> | null = node.prev;
        if (prev !== null) {
            prev.next = next;
        }
        if (next !== null) {
            next.prev = prev;
        }
        this._length--;
    }

    public push(data: T): void {
        this.insertBefore(this.end(), data);
    }

    public pop(): T | undefined {
        let prev: ListNode<T> | null = this.end().prev;
        if (prev !== null) {
            let ret: T | undefined = prev.data;
            this.remove(prev);
            return ret;
        }
        return undefined;
    }

    public unshift(data: T): void {
        this.insertBefore(this.begin(), data);
    }

    public shift(): T | undefined {
        let ret: T | undefined = this.begin().data;
        this.remove(this.begin());
        return ret;
    }
}
