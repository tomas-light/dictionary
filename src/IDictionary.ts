import { IKeyValuePair } from "./IKeyValuePair";

export interface IDictionary<TKey = any, TValue = any> {
    getKeys(): TKey[];

    getValues(): TValue[];

    get(key: TKey): TValue| null;

    getByKeys(keys: TKey[]): TValue[];

    getKey(value: TValue): TKey | null;

    add(key: TKey, value: TValue): void;

    remove(key: TKey): void;

    containsKey(key: TKey): boolean;

    any(): boolean;

    some(expression: (pair: IKeyValuePair<TKey, TValue>) => boolean): boolean;

    enumerate(): IKeyValuePair<TKey, TValue>[];

    forEach(expression: (pair: IKeyValuePair<TKey, TValue>) => void): void;

    convertValuesToNewDictionary<TNewValue>(expression: (value: TValue) => TNewValue): IDictionary<TKey, TNewValue>;
}
