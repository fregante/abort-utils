# mergeSignals(...signals)

Like `AbortSignals.any()`, except it accepts `AbortController` and `undefined`, making it easier to use with optional signals. It requires `AbortSignals.any()` to be available in your browser/platform.

```ts
import {mergeSignals} from 'abort-utils';

// First signal
const userAction = new AbortController();
cancelButton.addEventListener('click', () => {
	userAction.abort('User cancelled');
});

// Second signal
const timeout = AbortSignal.timeout(100);

// Merged signal
const mergedSignal = mergeSignals(timeout, userAction);
mergedSignal.addEventListener('abort', () => {
	console.log('One of the signals was aborted', mergedSignal.reason);
});
```

## signals

Type: `AbortSignal`, `AbortController`, `undefined`

The signals to listen to. If you pass a controller, it will automatically extract its signal.

## Demo

<img src="https://github.com/fregante/abort-utils/assets/1402241/6f5368ca-de69-4ca3-862d-e73749ad3a31" width="300">

## [Main page ⏎](../readme.md)
