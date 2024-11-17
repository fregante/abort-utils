# abortAllAndClear(controllers)

Aborts all controllers in an Array/Set and empties it.

```ts
import {abortAllAndClear} from 'abort-utils';

const controllers = [];
controllers.push(new AbortController());
controllers.push(new AbortController());

abortAllAndClear(controllers);

console.log(controllers.length);
// => 0
```

## controllers

Type: `AbortController[]` | `Set<AbortController>`

The list of controllers to abort and empty.

## [Main page ⏎](../readme.md)
