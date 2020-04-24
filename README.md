# Installation
```bush
npm install @tomas_light/dictionary
```

# How to use

```ts
import { 
    Dictionary,
    IDictionary, 
    IPair, 
} from "@tomas_light/dictionary"; 

// init
let dictionary: IDictionary<number, string>;

dictionary = new Dictionary<number, string>();
dictionary.add(1, "my data");
dictionary.add(2, "another data");

// or
dictionary = Dictionary.fromArray<number, string>([
    [ 1, "my data" ],
    [ 2, "another data" ],
]);

// or
dictionary = Dictionary.fromPairs<number, string>([
    { key: 1, value: "my data" },
    { key: 2, value: "another data" },
]);


// get all values
const allValues: string[] = dictionary.getValues();
console.log(allValues); // ["my data", "another data"]

// get values by keys
const values: string[] = dictionary.getByKeys([ 1, 2 ]);
console.log(values); // ["my data", "another data"]

// get value by key
const data: string = dictionary.get(1);
console.log(data); // "my data"


// remove value by key
dictionary.remove(1);


// search in dictionary

const isDictionaryContainsAnotherData = dictionary.some(
    (pair: IPair<number, string>) => pair.value === "another data"
);
console.log(isDictionaryContainsAnotherData); // true

const isDictionaryContainsKey = dictionary.containsKey(2);
console.log(isDictionaryContainsAnotherData); // true

// enumeration
let someValue = 0;
dictionary.forEach(
    (pair: IPair<number, string>) => someValue += pair.key
); 
console.log(someValue); // 2
```

## Get key for react fragment

If you render your dictionary you will need to add `key` property to react fragment. You can use `toString()` method of `IKeyValuePair`
```tsx
import React, { FunctionComponent } from "react";
import { 
    IDictionary, 
    IKeyValuePair,
} from "@tomas_light/dictionary"; 

interface IMyComponentProps {
    // <id, name>
    userNames: IDictionary<number, string>;
}

const UserNameList: FunctionComponent = (props) => {
    const {userNames} = props;

    return (
        <div>
            {userNames.getKeyValuePairs().map(
                (pair: IKeyValuePair<number, string>) => {
                    <p key={pair.toString()}>
                        {pair.value}
                    </p>
                }
            )}
        </div>
    )
};

```
