# Installation

```
npm install @tomas_light/dictionary
```

# How to use

```ts
import {
  Dictionary,
  Pair,
} from "@tomas_light/dictionary";

// init
let dictionary = new Dictionary<number, string>();
dictionary.add(1, 'my data');
dictionary.add(2, 'another data');
dictionary.add(3, 'some');

// or
dictionary = Dictionary.fromArray<number, string>([
  [1, 'my data'],
  [2, 'another data'],
  [3, 'some'],
]);

// or
dictionary = Dictionary.fromPairs<number, string>([
  { key: 1, value: 'my data' },
  { key: 2, value: 'another data' },
  { key: 3, value: 'some' },
]);


dictionary.getValues(); // ["my data", "another data", "some"]

dictionary.getByKeys([1, 3]); // ["my data", "some"]

dictionary.get(1); // "my data"
dictionary.get(15); // undefined

// remove value by key
dictionary.remove(1);

// search in dictionary

dictionary.some((pair: Pair<number, string>) => pair.value === 'another data'); // true

dictionary.hasKey(1); // false - because it was removed by `dictionary.remove(1);`


// enumeration

let someValue = 0;
dictionary.forEach(
  (pair: Pair<number, string>) => someValue += pair.key
);

console.log(someValue); // 5

```

## Get key for react fragment

```tsx
import {
  IDictionary,
  KeyValuePair,
} from "@tomas_light/dictionary";

type Props = {
  // <id, name>
  userNames: IDictionary<number, string>;
}

const UserNameList = ({ userNames }: Props) => (
  <div>
    {userNames.mapToArray(pair => (
      <p key={pair.key}>
        {pair.value}
      </p>
    ))}
  </div>
);
```
