# linkControllers(...controllers)

It can link multiple controllers so that when one aborts, they all abort with the same reason.

```ts
import {linkControllers} from 'abort-utils';

// First signal
const userAction = new AbortController();

// Second signal
const timeout = AbortSignal.timeout(100);

// Merged signal
const mergedSignal = mergeSignals(timeout, userAction.signal);
mergedSignal.addEventListener('abort', () => {
	console.log('One of the signals was aborted', mergedSignal.reason);
});
```

## controllers

Type: `AbortController`, `AbortSignal`

The controllers or signals to listen to and abort. `linkControllers` only makes sense if you pass at least one controller because abort signals cannot be aborted by this function.

If you only have signals, prefer [`mergeSignals`](./merge-signals.md) instead.

## [Main page ⏎](../readme.md)
