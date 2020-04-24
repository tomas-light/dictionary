import { IPair } from "./IPair";

export interface IKeyValuePair<TKey = any, TValue = any> extends IPair<TKey, TValue> {
    toString: () => string;
    toShortData: () => [ TKey, TValue ];
}
