# mergeSignals(...signals)

It can combine multiple signals into new signal. Ideal when:

- you want to **add** a timeout signal
- you receive a `signal` and want to have your own internal abort controller.

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
const mergedSignal = mergeSignals(timeout, userAction.signal);
mergedSignal.addEventListener('abort', () => {
	console.log('One of the signals was aborted', mergedSignal.reason);
});
```

## signals

Type: `AbortSignal`, `AbortController`

The signals to listen to. If you pass a controller, it will automatically extract its signal.

## [Main page ⏎](../readme.md)
