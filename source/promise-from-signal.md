# promiseFromSignal(signal, {rejects})

Returns a `Promise` that resolves or rejects when the signal is aborted. This lets you await a signal or combine it with other promises.

The promise will use the abort reason as a resolved/rejected value.

```ts
import {promiseFromSignal} from 'abort-utils';

// Resolves after 100ms
await promiseFromSignal(AbortSignal.timeout(100));

// It accepts controllers too, and it can reject instead of resolving
const newController = new AbortController();
const promise = promiseFromSignal(newController, {reject: true});

newController.abort(new Error('Rent is too damn high'));

try {
	await promise;
} catch (error) {
	console.log('The signal failed with', error); // Error: Rent is too damn high
}
```

## signal

Type: `AbortSignal`, `AbortController`

The signal to listen to. If you pass a controller, it will automatically extract its signal.

## options

Type: `object`

### rejects

Type: `boolean`

If `true`, the promise will reject instead of resolve when the signal is aborted.

## [Main page ⏎](../readme.md)
