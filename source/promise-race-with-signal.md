# promiseRaceWithSignal(promise, signal, {abortRejects})

Like `Promise.race()`, but it accepts `AbortSignal` or `AbortController` instances. Think of this as a way to make a promise "abortable" (except that it doesn't actually abort the original promise).

The promise will use the abort reason as a resolved/rejected value.

```ts
import {promiseRaceWithSignal} from 'abort-utils';

// Resolves with the value of `existingPromise` or with the abort reason if the signal is aborted first
await promiseRaceWithSignal(existingPromise, AbortSignal.timeout(100));

// The abort signal can reject instead of resolving
const promise = await promiseRaceWithSignal(
	existingPromise,
	AbortSignal.timeout(100),
	{abortRejects: true}
);

try {
	await promise;
} catch (error) {
	console.log('The signal failed with', error); // TimeoutError: signal timed out.
}
```

## promise

Type: `Promise`

The promise to race against the signal

## signal

Type: `AbortSignal`, `AbortController`

The signal to listen to. If you pass a controller, it will automatically extract its signal.

## options

Type: `object`

### abortRejects

Type: `boolean`

If `false`, the promise will resolve instead of reject when the signal is aborted.

## [Main page ⏎](../readme.md)
