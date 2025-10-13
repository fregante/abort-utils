# AbortMap, AbortWeakMap, AbortSet

These collection classes extend the native Map, WeakMap, and Set to automatically remove entries when their associated AbortSignal is aborted.

## AbortMap

A Map that automatically removes entries when their associated AbortSignal is aborted.

```ts
import {AbortMap} from 'abort-utils';

const map = new AbortMap<string, any>();

// Set a value that will be automatically removed after 40ms
map.setAbortable('key', AbortSignal.timeout(40), 'value');

// After 40ms, the entry is automatically removed
// map.has('key') === false

// You can still use the regular Map methods
map.set('regular-key', 'regular-value');
```

This replaces the manual cleanup pattern:

```ts
const map = new Map();
const signal = AbortSignal.timeout(40);
map.set('key', 'value');
signal.addEventListener('abort', () => {
	map.delete('key');
});
```

### .setAbortable(key, signal, value?)

Sets a value in the map with an associated AbortSignal. When the signal is aborted, the entry is automatically deleted.

- **key**: The key to set
- **signal**: The AbortSignal to associate with this entry
- **value**: The value to set (optional)

Returns `this` for method chaining.

## AbortWeakMap

A WeakMap that automatically removes entries when their associated AbortSignal is aborted.

```ts
import {AbortWeakMap} from 'abort-utils';

const weakMap = new AbortWeakMap<object, string>();
const obj = {};

// Set a value that will be automatically removed after 40ms
weakMap.setAbortable(obj, AbortSignal.timeout(40), 'value');

// After 40ms, the entry is automatically removed
// weakMap.has(obj) === false
```

### .setAbortable(key, signal, value?)

Sets a value in the weak map with an associated AbortSignal. When the signal is aborted, the entry is automatically deleted.

- **key**: The key to set (must be an object)
- **signal**: The AbortSignal to associate with this entry
- **value**: The value to set (optional)

Returns `this` for method chaining.

## AbortSet

A Set that automatically removes entries when their associated AbortSignal is aborted.

```ts
import {AbortSet} from 'abort-utils';

const set = new AbortSet<string>();

// Add a value that will be automatically removed after 40ms
set.addAbortable('item', AbortSignal.timeout(40));

// After 40ms, the entry is automatically removed
// set.has('item') === false

// You can still use the regular Set methods
set.add('regular-item');
```

### .addAbortable(value, signal)

Adds a value to the set with an associated AbortSignal. When the signal is aborted, the entry is automatically deleted.

- **value**: The value to add
- **signal**: The AbortSignal to associate with this entry

Returns `this` for method chaining.

## Use Cases

These classes are useful when you need to track temporary data that should be cleaned up automatically:

- Caching data with automatic expiration
- Tracking active requests or operations
- Managing temporary UI state
- Implementing timeout-based cleanup

## [Main page ⏎](../readme.md)
