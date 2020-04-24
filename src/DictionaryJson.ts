import { IPair } from "./IPair";

export abstract class DictionaryJson<TKey = any, TValue = any> {
    protected readonly pairs: IPair<TKey, TValue>[];

    protected constructor() {
        this.pairs = [];
    }
}
