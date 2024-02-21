# RepeatableAbortController

This class is like `AbortController`, but it can be reused after it's aborted. The previous `signal` is aborted and discarded, and a new one takes its place.

```ts
import {RepeatableAbortController} from 'abort-utils';

const controller = new RepeatableAbortController();
const firstSignal = controller.signal;

fetch('/api/ping', {
	signal: firstSignal
});

// The fetch request will be cancelled
controller.abortAndReset();
console.log(firstSignal.aborted)
// ^ true


// This will get a new signal, that is not aborted
const secondSignal = controller.signal;
console.log(secondSignal.aborted)
// ^ false

fetch('/api/ping', {
	signal: secondSignal
});
```

## .abortAndReset(reason?: any)

Just like `AbortController.abort`, it takes an optional `reason` argument. After the signal is aborted, a new one is created and takes its place.

## .signal

The signal that is currently active. It's a `AbortSignal` instance. It will be recreated after `.abortAndReset` is called. Existing references to the previous signal will stay `aborted`.

Note that accessing `controller.signal.aborted` directly will always be `false`. The property changes only in previously-extracted signals.

## [Main page ⏎](../readme.md)
