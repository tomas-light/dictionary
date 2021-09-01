import { KeyValuePair } from './KeyValuePair';

interface Pair<Key = any, Value = any> {
  key: Key;
  value: Value;
}

interface IDictionary<Key = any, Value = any> {
  getKeys(): Key[];
  getValues(): Value[];

  get(key: Key): Value | undefined;
  getKey(value: Value): Key | undefined;
  getByKeys(keys: Key[]): Value[];

  add(key: Key, value: Value): void;
  remove(key: Key): void;
  any(): boolean;

  hasKey(key: Key): boolean;
  hasValue(value: Value): boolean;

  some(expression: (pair: KeyValuePair<Key, Value>) => boolean): boolean;
  find(expression: (pair: KeyValuePair<Key, Value>) => boolean): KeyValuePair<Key, Value> | undefined;
  forEach(expression: (pair: KeyValuePair<Key, Value>) => void): void;
  map<NewKey = Key, NewValue = Value>(expression: (pair: KeyValuePair<Key, Value>) => KeyValuePair<NewKey, NewValue>): IDictionary<NewKey, NewValue>;
  mapToArray<Expression extends (pair: KeyValuePair<Key, Value>) => any>(
    expression: Expression
  ): Expression extends (pair: KeyValuePair<Key, Value>) => infer Item ? Item[] : never[];

  toJson(): DictionaryJson<Key, Value>;
  toPairs(): Pair<Key, Value>[];
  toArray(): [Key, Value][];
}

interface DictionaryJson<Key = any, Value = any> {
  readonly pairs: Pair<Key, Value>[];
}

export type {
  Pair,
  IDictionary,
  DictionaryJson,
};
