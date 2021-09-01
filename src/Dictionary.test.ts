import { Dictionary } from './Dictionary';
import { KeyValuePair } from './KeyValuePair';
import { DictionaryJson } from './types';

describe('getKeys', () => {
  test('case 1', () => {
    const dictionary = new Dictionary();
    expect(dictionary.getKeys()).toEqual([]);
  });

  test('case 2', () => {
    const dictionary = new Dictionary();
    dictionary.add(1, 11);
    dictionary.add(2, 22);

    expect(dictionary.getKeys()).toEqual([1, 2]);
  });
});

describe('getValues', () => {
  test('case 1', () => {
    const dictionary = new Dictionary();
    expect(dictionary.getValues()).toEqual([]);
  });

  test('case 2', () => {
    const dictionary = new Dictionary();
    dictionary.add(1, 11);
    dictionary.add(2, 22);

    const output = [11, 22];
    const result = dictionary.getValues();
    expect(result).toEqual(output);
  });
});

describe('get', () => {
  test('case 1', () => {
    const dictionary = new Dictionary();
    expect(dictionary.get(1)).toBe(undefined);
  });

  test('case 2', () => {
    const dictionary = new Dictionary();
    dictionary.add(1, 11);
    dictionary.add(2, 22);

    expect(dictionary.get(1)).toBe(11);
    expect(dictionary.get(2)).toBe(22);
  });
});

describe('getKey', () => {
  test('case 1', () => {
    const dictionary = new Dictionary();
    expect(dictionary.getKey(1)).toBe(undefined);
  });

  test('case 2', () => {
    const dictionary = new Dictionary();
    dictionary.add(1, 11);
    dictionary.add(2, 22);

    expect(dictionary.getKey(11)).toBe(1);
    expect(dictionary.getKey(22)).toBe(2);
  });
});

describe('add & remove & any', () => {
  test('case 1', () => {
    const dictionary = new Dictionary();
    dictionary.add(1, 11);
    expect(dictionary.any()).toBe(true);
    expect(dictionary.get(1)).toBe(11);
    expect(dictionary.pairs[0] instanceof KeyValuePair).toBe(true);

    dictionary.remove(1);
    expect(dictionary.get(1)).toBe(undefined);
    expect(dictionary.any()).toBe(false);
  });

  test('case 2', () => {
    const dictionary = new Dictionary();
    dictionary.add(2, 22);
    dictionary.add(1, 11);

    expect(dictionary.any()).toBe(true);
    expect(dictionary.get(1)).toBe(11);
    expect(dictionary.get(2)).toBe(22);
    expect(dictionary.pairs[0] instanceof KeyValuePair).toBe(true);
    expect(dictionary.pairs[1] instanceof KeyValuePair).toBe(true);

    dictionary.remove(1);
    expect(dictionary.get(1)).toBe(undefined);
    expect(dictionary.get(2)).toBe(22);
    expect(dictionary.any()).toBe(true);

    dictionary.remove(2);
    expect(dictionary.get(1)).toBe(undefined);
    expect(dictionary.get(2)).toBe(undefined);
    expect(dictionary.any()).toBe(false);
  });
});

describe('hasKey', () => {
  test('case 1', () => {
    const dictionary = new Dictionary();
    expect(dictionary.hasKey(1)).toBe(false);
  });

  test('case 2', () => {
    const dictionary = new Dictionary();
    dictionary.add(1, 11);
    expect(dictionary.hasKey(1)).toBe(true);
  });
});

describe('hasValue', () => {
  test('case 1', () => {
    const dictionary = new Dictionary();
    expect(dictionary.hasValue(1)).toBe(false);
  });

  test('case 2', () => {
    const dictionary = new Dictionary();
    dictionary.add(1, 11);
    expect(dictionary.hasValue(11)).toBe(true);
  });
});

describe('some', () => {
  test('case 1', () => {
    const dictionary = new Dictionary();
    expect(dictionary.some(pair => pair.key)).toBe(false);
  });

  test('case 2', () => {
    const dictionary = new Dictionary();
    dictionary.add(1, 11);
    expect(dictionary.some(pair => pair.key)).toBe(true);
  });
});

describe('find', () => {
  test('case 1', () => {
    const dictionary = new Dictionary();
    expect(dictionary.find(pair => pair.key)).toBe(undefined);
  });

  test('case 2', () => {
    const dictionary = new Dictionary();
    dictionary.add(1, 11);
    expect(dictionary.find(pair => pair.key)).toBe(dictionary.pairs[0]);
  });
});

describe('forEach', () => {
  test('case 1', () => {
    const dictionary = new Dictionary();
    dictionary.add(1, 11);
    dictionary.add(2, 22);

    const output = [1, 11, 2, 22];
    const result: number[] = [];
    dictionary.forEach(pair => {
      result.push(pair.key);
      result.push(pair.value);
    });

    expect(result).toEqual(output);
  });
});

describe('map', () => {
  test('case 1', () => {
    const dictionary = new Dictionary<number, number>();
    dictionary.add(1, 11);
    dictionary.add(2, 22);

    const newDictionary = dictionary.map(pair => new KeyValuePair({
      key: pair.key,
      value: pair.value,
    }));

    expect(newDictionary).toEqual(dictionary);
  });

  test('case 2', () => {
    const dictionary = new Dictionary<number, number>();
    dictionary.add(1, 11);
    dictionary.add(2, 22);

    const output = new Dictionary<string, string>();
    output.add('1', '11');
    output.add('2', '22');

    const newDictionary = dictionary.map(pair => new KeyValuePair({
      key: pair.key.toString(),
      value: pair.value.toString(),
    }));

    expect(newDictionary).toEqual(output);
  });
});

describe('mapToArray', () => {
  test('case 1', () => {
    const dictionary = new Dictionary<number, number>();
    dictionary.add(1, 11);
    dictionary.add(2, 22);

    const result = dictionary.mapToArray(pair => new KeyValuePair({
      key: pair.key,
      value: pair.value,
    }));

    expect(result).toEqual(dictionary.pairs);
  });

  test('case 2', () => {
    const dictionary = new Dictionary<number, number>();
    dictionary.add(1, 11);
    dictionary.add(2, 22);

    const output = [
      { key: '1', value: '11' },
      { key: '2', value: '22' },
    ];

    const result = dictionary.mapToArray(pair => new KeyValuePair({
      key: pair.key.toString(),
      value: pair.value.toString(),
    }));

    expect(result).toEqual(output);
  });
});

describe('json', () => {
  describe('to', () => {
    test('empty', () => {
      const output: DictionaryJson = {
        pairs: [],
      };

      const dictionary = new Dictionary();
      const result = dictionary.toJson();
      expect(result).toEqual(output);
    });

    test('case 1', () => {
      const output: DictionaryJson = {
        pairs: [
          { key: 1, value: 11 },
          { key: 2, value: 22 },
          { key: '1', value: '11' },
          { key: '2', value: '22' },
        ],
      };

      const dictionary = new Dictionary();
      dictionary.add(output.pairs[0].key, output.pairs[0].value);
      dictionary.add(output.pairs[1].key, output.pairs[1].value);
      dictionary.add(output.pairs[2].key, output.pairs[2].value);
      dictionary.add(output.pairs[3].key, output.pairs[3].value);

      const result = dictionary.toJson();
      expect(result).toEqual(dictionary);
    });
  });

  describe('from', () => {
    test('invalid structure', () => {
      expect(() => Dictionary.fromJson('' as any)).toThrow();
      expect(() => Dictionary.fromJson({ pairs: '' } as any)).toThrow();
      expect(() => Dictionary.fromJson({ pairs: 'asdasd' } as any)).toThrow();
      expect(() => Dictionary.fromJson({ pairs: 0 } as any)).toThrow();
      expect(() => Dictionary.fromJson({ pairs: 25 } as any)).toThrow();
      expect(() => Dictionary.fromJson({ pairs: true } as any)).toThrow();
      expect(() => Dictionary.fromJson({ pairs: new Date() } as any)).toThrow();
    });

    test('empty', () => {
      const input: DictionaryJson = {
        pairs: [],
      };

      const output = new Dictionary();
      const result = Dictionary.fromJson(input);

      expect(result instanceof Dictionary).toBe(true);
      expect(result).toEqual(output);
    });

    test('case 1', () => {
      const input: DictionaryJson = {
        pairs: [
          { key: 1, value: 11 },
          { key: 2, value: 22 },
          { key: '1', value: '11' },
          { key: '2', value: '22' },
        ],
      };

      const output = new Dictionary();
      output.add(input.pairs[0].key, input.pairs[0].value);
      output.add(input.pairs[1].key, input.pairs[1].value);
      output.add(input.pairs[2].key, input.pairs[2].value);
      output.add(input.pairs[3].key, input.pairs[3].value);

      const result = Dictionary.fromJson(input);

      expect(result instanceof Dictionary).toBe(true);
      expect(result).toEqual(output);
    });
  });
});

describe('array', () => {
  describe('to', () => {
    test('empty', () => {
      const output: any[] = [];

      const dictionary = new Dictionary();
      const result = dictionary.toArray();
      expect(result).toEqual(output);
    });

    test('case 1', () => {
      const output = [
        [1, 11],
        [2, 22],
        ['1', '11'],
        ['2', '22'],
      ] as [number | string, number | string][];

      const dictionary = new Dictionary<number | string, number | string>();
      dictionary.add(output[0][0], output[0][1]);
      dictionary.add(output[1][0], output[1][1]);
      dictionary.add(output[2][0], output[2][1]);
      dictionary.add(output[3][0], output[3][1]);

      const result = dictionary.toArray();
      expect(result).toEqual(output);
    });
  });

  describe('from', () => {
    test('invalid structure', () => {
      expect(() => Dictionary.fromArray('' as any)).toThrow();
      expect(() => Dictionary.fromArray('asdasd' as any)).toThrow();
      expect(() => Dictionary.fromArray(0 as any)).toThrow();
      expect(() => Dictionary.fromArray(25 as any)).toThrow();
      expect(() => Dictionary.fromArray(true as any)).toThrow();
      expect(() => Dictionary.fromArray(new Date() as any)).toThrow();
    });

    test('empty', () => {
      const input: any[] = [];

      const output = new Dictionary();
      const result = Dictionary.fromArray(input);

      expect(result instanceof Dictionary).toBe(true);
      expect(result).toEqual(output);
    });

    test('case 1', () => {
      const input = [
        [1, 11],
        [2, 22],
        ['1', '11'],
        ['2', '22'],
      ] as [number | string, number | string][];

      const output = new Dictionary<number | string, number | string>();
      output.add(input[0][0], input[0][1]);
      output.add(input[1][0], input[1][1]);
      output.add(input[2][0], input[2][1]);
      output.add(input[3][0], input[3][1]);

      const result = Dictionary.fromArray(input);

      expect(result instanceof Dictionary).toBe(true);
      expect(result).toEqual(output);
    });
  });
});

describe('isDictionary', () => {
  test('invalid structure', () => {
    expect(Dictionary.isDictionary('' as any)).toBe(false);
    expect(Dictionary.isDictionary({ pairs: '' } as any)).toBe(false);
    expect(Dictionary.isDictionary({ pairs: 'asdasd' } as any)).toBe(false);
    expect(Dictionary.isDictionary({ pairs: 0 } as any)).toBe(false);
    expect(Dictionary.isDictionary({ pairs: 25 } as any)).toBe(false);
    expect(Dictionary.isDictionary({ pairs: true } as any)).toBe(false);
    expect(Dictionary.isDictionary({ pairs: new Date() } as any)).toBe(false);
  });

  test('case 1', () => {
    expect(Dictionary.isDictionary({ pairs: [] })).toBe(true);
  });

  test('case 2', () => {
    const input = {
      pairs: [
        { key: 1, value: 11 },
        { key: 2, value: 22 },
        { key: 3, value: 33 },
      ],
    };
    expect(Dictionary.isDictionary(input)).toBe(true);
  });

  test('case 3', () => {
    const input = {
      pairs: [
        { key: 1, value: 11 },
        { key: 2, value: 22 },
        { key: 3, value3: 33 }, // broken pair
      ],
    };
    expect(Dictionary.isDictionary(input)).toBe(false);
  });

  test('case 4', () => {
    const dictionary = new Dictionary();
    dictionary.add(1, 11);

    expect(Dictionary.isDictionary(dictionary)).toBe(true);
  });
});
