import {
  IDictionary,
  Pair,
  DictionaryJson,
} from './types';
import { KeyValuePair } from './KeyValuePair';

export class Dictionary<Key = any, Value = any> implements IDictionary<Key, Value> {
  readonly pairs: KeyValuePair<Key, Value>[] = [];

  getKeys(): Key[] {
    return this.pairs.map((pair) => pair.key);
  }
  getValues(): Value[] {
    return this.pairs.map((pair) => pair.value);
  }


  get(key: Key): Value | undefined {
    const pair = this.findByKey(key);
    return pair?.value;
  }
  getKey(value: Value): Key | undefined {
    const pair = this.findByValue(value);
    return pair?.key;
  }
  getByKeys(keys: Key[]): Value[] {
    const pairs = this.pairs.filter((pair) => keys.indexOf(pair.key) > -1);
    return pairs.map((pair) => pair.value);
  }


  add(key: Key, value: Value): void {
    if (this.hasKey(key)) {
      throw new Error(`Cannot insert duplicate key ${key}`);
    }

    const pair = new KeyValuePair<Key, Value>({ key, value });
    this.pairs.push(pair);
  }

  remove(key: Key): void {
    const pair = this.findByKey(key);
    if (!pair) {
      return;
    }

    const index = this.pairs.indexOf(pair);
    if (index > -1) {
      this.pairs.splice(index, 1);
    }
  }

  any(): boolean {
    return this.pairs.length > 0;
  }


  hasKey(key: Key): boolean {
    return this.pairs.some((pair) => pair.key === key);
  }
  hasValue(value: Value): boolean {
    return this.pairs.some((pair) => pair.value === value);
  }


  some(expression: (pair: KeyValuePair<Key, Value>) => boolean): boolean {
    return this.pairs.some((pair) => expression(pair));
  }

  forEach(expression: (pair: KeyValuePair<Key, Value>) => void): void {
    this.pairs.forEach((pair) => expression(pair));
  }

  map<NewKey = Key, NewValue = Value>(
    expression: (pair: KeyValuePair<Key, Value>) => KeyValuePair<NewKey, NewValue>
  ): Dictionary<NewKey, NewValue> {

    const pairs = this.mapToArray(expression);

    const dictionary = pairs.reduce((_dictionary, pair) => {
      _dictionary.pairs.push(pair);
      return _dictionary;
    }, new Dictionary<NewKey, NewValue>());

    return dictionary;
  }

  mapToArray<NewKey = Key, NewValue = Value>(
    expression: (pair: KeyValuePair<Key, Value>) => KeyValuePair<NewKey, NewValue>
  ): KeyValuePair<NewKey, NewValue>[] {

    const pairs: KeyValuePair<NewKey, NewValue>[] = [];

    this.forEach((pair) => {
      const mappedPair = expression(pair);
      pairs.push(mappedPair);
    });

    return pairs;
  }


  toJson(): DictionaryJson<Key, Value> {
    const json: DictionaryJson<Key, Value> = {
      pairs: this.toPairs(),
    };
    return json;
  }

  toPairs(): Pair<Key, Value>[] {
    const pairs: Pair<Key, Value>[] = [];

    this.forEach((value) => {
      pairs.push({ key: value.key, value: value.value });
    });

    return pairs;
  }

  toArray(): [Key, Value][] {
    const items: [Key, Value][] = [];

    this.forEach(pair => {
      items.push([pair.key, pair.value]);
    });

    return items;
  }


  static fromJson<Key, Value>(dictionaryJson: DictionaryJson): Dictionary<Key, Value> {
    return Dictionary.fromPairs<Key, Value>(dictionaryJson.pairs);
  }

  static fromPairs<Key, Value>(pairs: Pair<Key, Value>[]): Dictionary<Key, Value> {
    if (!Array.isArray(pairs)) {
      throw new Error('Dictionary: pairs are not array');
    }

    const dictionary = new Dictionary<Key, Value>();

    pairs.forEach((value) => {
      dictionary.add(value.key, value.value);
    });

    return dictionary;
  }

  static fromArray<Key, Value>(items: [Key, Value][]): Dictionary<Key, Value> {
    if (!Array.isArray(items)) {
      throw new Error('Dictionary: items are not array');
    }

    const atLeastOneItemIsNotArray = items.some((item: any) => !Array.isArray(item));
    if (atLeastOneItemIsNotArray) {
      throw new Error('Dictionary: each item should be an array -> [key, value]');
    }

    const dictionary = new Dictionary<Key, Value>();

    items.forEach(
      ([key, value]) => {
        dictionary.add(key, value);
      }
    );

    return dictionary;
  }

  static isDictionary(dictionary: any): dictionary is DictionaryJson {
    if (dictionary instanceof Dictionary) {
      return true;
    }

    if (typeof dictionary !== 'object') {
      return false;
    }

    if (!Array.isArray(dictionary.pairs)) {
      return false;
    }

    if (dictionary.pairs.length === 0) {
      return true;
    }

    const atLeastOneItemIsNotKeyValuePair = dictionary.pairs.some(
      (pair: any) => !KeyValuePair.isPair(pair)
    );
    return !atLeastOneItemIsNotKeyValuePair;
  }

  private findByKey(key: Key): KeyValuePair<Key, Value> | undefined {
    return this.pairs.find((pair) => pair.key === key)
  }

  private findByValue(value: Value): KeyValuePair<Key, Value> | undefined {
    return this.pairs.find((pair) => pair.value === value);
  }
}
