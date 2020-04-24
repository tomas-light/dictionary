import { DictionaryJson } from "./DictionaryJson";
import { IDictionary } from "./IDictionary";
import { IKeyValuePair } from "./IKeyValuePair";
import { IPair } from "./IPair";
import { KeyValuePair } from "./KeyValuePair";

export class Dictionary<TKey = any, TValue = any>
    extends DictionaryJson<TKey, TValue>
    implements IDictionary<TKey, TValue> {

    protected readonly pairs: IKeyValuePair<TKey, TValue>[];

    constructor() {
        super();
        this.pairs = [];
    }

    public static fromJson<TKey, TValue>(
        dictionaryJson: DictionaryJson
    ): Dictionary<TKey, TValue> | null {

        return Dictionary.fromPairs<TKey, TValue>(dictionaryJson["pairs"]);
    }

    public static fromPairs<TKey, TValue>(
        pairs: IPair<TKey, TValue>[]
    ): Dictionary<TKey, TValue> | null {

        if (!Array.isArray(pairs)) {
            return null;
        }

        const dictionary = new Dictionary<TKey, TValue>();

        pairs.forEach((value) => {
            dictionary.add(value.key, value.value);
        });

        return dictionary;
    }

    public static fromArray<TKey, TValue>(items: [ TKey, TValue ][]): Dictionary<TKey, TValue> | null {
        if (!Array.isArray(items)) {
            return null;
        }

        const atLeastOneItemIsNotArray = items.some((item: any) => !Array.isArray(item));
        if (atLeastOneItemIsNotArray) {
            return null;
        }

        const dictionary = new Dictionary<TKey, TValue>();

        items.forEach(
            ([ key, value ]) => {
                dictionary.add(key, value);
            }
        );

        return dictionary;
    }

    public static isDictionary(dictionary: any | Dictionary) {
        if (dictionary instanceof Dictionary) {
            return true;
        }

        if (typeof dictionary !== "object") {
            return false;
        }

        if (!Array.isArray(dictionary._pairs)) {
            return false;
        }

        if (dictionary._pairs.length === 0) {
            return true;
        }

        // old implementation
        // for (let i = 0; i < dictionary._pairs.length; i++) {
        //     if (!KeyValuePair.isKeyValuePair(dictionary._pairs[i])) {
        //         return false;
        //     }
        // }
        // return true;

        const atLeastOneItemIsNotKeyValuePair = dictionary._pairs.some(
            (pair: any) => !KeyValuePair.isKeyValuePair(pair)
        );
        const allItemsArePairs = !atLeastOneItemIsNotKeyValuePair;
        return allItemsArePairs;
    }

    public add(key: TKey, value: TValue): void {
        if (this.containsKey(key)) {
            throw new Error(`Cannot insert duplicate key ${key}`);
        }

        const pair = new KeyValuePair<TKey, TValue>({ key, value });
        this.pairs.push(pair);
    }

    public containsKey(key: TKey): boolean {
        return this.pairs.some((pair) => pair.key === key);
    }

    public getKeys(): TKey[] {
        return this.pairs.map((pair) => pair.key);
    }

    public static getKeys<TKey>(dictionary: any): TKey[] {
        return Dictionary.isDictionary(dictionary)
            && dictionary.pairs.map((pair: IPair) => pair.key);
    }

    public get(key: TKey): TValue | null {
        const pair = this.findByKey(key);
        return pair ? pair.value : null;
    }

    public getByKeys(keys: TKey[]): TValue[] {
        const pairs = this.pairs.filter((pair) => keys.indexOf(pair.key) > -1);
        return pairs.map((pair) => pair.value);
    }

    private static get<TKey, TValue>(dictionary: any, key: TKey): TValue | null {
        const pair = Dictionary.findByKey<TKey, TValue>(dictionary, key);
        return pair ? pair.value : null;
    }

    public getValues(): TValue[] {
        return this.pairs.map((pair) => pair.value);
    }

    public remove(key: TKey): void {
        const pair = this.findByKey(key);
        if (!pair) {
            return;
        }

        const index = this.pairs.indexOf(pair);
        if (index > -1) {
            this.pairs.splice(index, 1);
        }
    }

    public getKey(value: TValue): TKey | null {
        const pair = this.findByValue(value);
        return pair ? pair.key : null;
    }

    public any(): boolean {
        return this.pairs.length > 0;
    }

    public some(expression: (pair: IKeyValuePair<TKey, TValue>) => boolean): boolean {
        return this.pairs.some((pair) => expression(pair));
    }

    public enumerate(): IKeyValuePair<TKey, TValue>[] {
        const enumeration: IKeyValuePair<TKey, TValue>[] = [ ...this.pairs ];
        return enumeration;
    }

    public forEach(expression: (pair: IKeyValuePair<TKey, TValue>) => void): void {
        this.pairs.forEach((pair) => expression(pair));
    }

    public convertValuesToNewDictionary<TNewValue>(
        expression: (value: TValue) => TNewValue
    ): Dictionary<TKey, TNewValue> {

        const dictionary = new Dictionary<TKey, TNewValue>();

        this.forEach((pair) => {
            const newValue = expression(pair.value);
            dictionary.add(pair.key, newValue);
        });

        return dictionary;
    }

    private static findByKey<TKey, TValue>(
        dictionary: Dictionary<TKey, TValue>,
        key: TKey
    ): IKeyValuePair<TKey, TValue> | undefined {

        return dictionary.pairs.find((pair) => pair.key === key);
    }

    private static findByValue<TKey, TValue>(
        dictionary: Dictionary<TKey, TValue>,
        value: TValue
    ): IKeyValuePair<TKey, TValue> | undefined {

        return dictionary["pairs"].find((pair) => pair.value === value);
    }

    private findByKey(key: TKey): IKeyValuePair<TKey, TValue> | undefined {
        return Dictionary.findByKey<TKey, TValue>(this, key);
    }

    private findByValue(value: TValue): IKeyValuePair<TKey, TValue> | undefined {
        return Dictionary.findByValue<TKey, TValue>(this, value);
    }
}
