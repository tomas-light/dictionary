import { IKeyValuePair } from "./IKeyValuePair";
import { IPair } from "./IPair";

export class KeyValuePair<TKey = any, TValue = any> implements IKeyValuePair<TKey, TValue> {
    public key: TKey;
    public value: TValue;

    constructor(pair?: IPair<TKey, TValue> | [ TKey, TValue ]) {
        if (!pair) {
            this.key = null as any;
            this.value = null as any;
        }
        else if (Array.isArray(pair)) {
            this.key = pair[0];
            this.value = pair[1];
        }
        else {
            this.key = pair.key;
            this.value = pair.value;
        }
    }

    public toString(): string {
        return `{key: ${this.key}, value: ${this.value}}`;
    }

    public toShortData(): [ TKey, TValue ] {
        return [ this.key, this.value ];
    }

    public static isKeyValuePair(pair: any | KeyValuePair) {
        if (pair instanceof KeyValuePair) {
            return true;
        }

        if (typeof pair !== "object") {
            return false;
        }

        return "key" in pair && "value" in pair;
    }
}
