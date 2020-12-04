export default class Dictionary<T> {
    private _items: ({ [k: string]: T }) | Map<string, T>;
    private _count: number = 0;

    public constructor(useES6Map: boolean = true) {
        if (useES6Map) {
            this._items = new Map<string, T>();
        } else {
            this._items = {};
        }
    }

    public get length(): number {
        return this._count;
    }

    public contains(key: string): boolean {
        if (this._items instanceof Map) {
            return this._items.has(key);
        } else {
            return this._items[key] !== undefined;
        }
    }

    public find(key: string): T | undefined {
        if (this._items instanceof Map) {
            return this._items.get(key);
        } else {
            return this._items[key];
        }
    }

    public insert(key: string, value: T): void {
        if (this._items instanceof Map) {
            this._items.set(key, value);
        } else {
            this._items[key] = value;
        }
        this._count++;
    }

    public remove(key: string): boolean {
        let ret: T | undefined = this.find(key);
        if (ret === undefined) {
            return false;
        }
        if (this._items instanceof Map) {
            this._items.delete(key);
        } else {
            delete this._items[key];
        }
        this._count--;
        return true;
    }

    public get keys(): string[] {
        let keys: string[] = [];
        if (this._items instanceof Map) {
            let keyArray = this._items.keys();
            for (let key of keyArray) {
                keys.push(key);
            }
        } else {
            for (let prop in this._items) {
                if (this._items.hasOwnProperty(prop)) {
                    keys.push(prop);
                }
            }
        }
        return keys;
    }

    public get values(): T[] {
        let values: T[] = [];
        if (this._items instanceof Map) {
            let valuesArray = this._items.values();
            for (let value of valuesArray) {
                values.push(value);
            }
        } else {
            for (let prop in this._items) {
                if (this._items.hasOwnProperty(prop)) {
                    values.push(this._items[prop]);
                }
            }
        }
        return values;
    }

    public toString(): string {
        return JSON.stringify(this._items as Map<string, T>);
    }
}