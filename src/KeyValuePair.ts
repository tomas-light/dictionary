import { Pair } from './types';

export class KeyValuePair<TKey = any, TValue = any> implements Pair<TKey, TValue> {
  key: TKey;
  value: TValue;

  constructor(pair?: Pair<TKey, TValue> | [TKey, TValue]) {
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

  static isPair(pair: any | Pair): pair is Pair {
    if (pair instanceof KeyValuePair) {
      return true;
    }

    if (typeof pair !== 'object') {
      return false;
    }

    return 'key' in pair && 'value' in pair;
  }

  toString(): string {
    return `{key: '${this.key}', value: ${this.value}}`;
  }

  toArray(): [TKey, TValue] {
    return [this.key, this.value];
  }
}
