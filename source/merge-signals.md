# mergeSignals(...signals)

It can combine multiple signals into new signal. Ideal when:

- you want to **add** a timeout signal
- you receive a `signal` and want to have your own internal abort controller.

```ts
import {mergeSignals} from 'abort-utils';

const timeout = AbortSignal.timeout(100);
const userAction = new AbortController();

cancelButton.addEventListener('click', () => {
	userAction.abort('User cancelled');
});

const mergedSignal = mergeSignals(timeout, userAction.signal);

mergedSignal.addEventListener('abort', () => {
	console.log('One of the signals was aborted', mergedSignal.reason);
});
```

## signals

Type: `AbortSignal`

## [Main page ⏎](../readme.md)
