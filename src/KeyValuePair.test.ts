import { KeyValuePair } from './KeyValuePair';

test('toString', () => {
  const pair = new KeyValuePair(['key', 2]);

  const output = `{key: 'key', value: 2}`;
  const result = pair.toString()
  expect(result).toBe(output);
});

test('toArray', () => {
  const pair = new KeyValuePair(['key', 2]);

  const output = ['key', 2];
  const result = pair.toArray();
  expect(result).toEqual(output);
});
