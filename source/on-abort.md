# onAbort(signal, ...handles)

It can link a signal to any number of controller, observer and callbacks. This will also automatically handle pre-aborted signals, unlike the standard `signal.addEventListener('abort', fn)` pattern.

```ts
import {onAbort} from 'abort-utils';

const signal = AbortSignal.timeout(100)

// It can call functions
onAbort(signal, () => {
	console.log('Timeout')
});

// It can call the `.disconnect()` method
const observer = new MutationObserver(yourHandler)
observer.observe(document.querySelector('button'));
onAbort(signal, observer);

// It can abort other controllers when `signal` aborts
const newController = new AbortController();
onAbort(signal, newController);

// It can do all of that at once
onAbort(signal, console.log, observer, newController);
```

## signal

Type: `AbortSignal`, `AbortController`, `undefined`

The signal to listen to. If you pass a controller, it will automatically extract its signal.

If `undefined` is received, nothing will happen. This matches the pattern `signal?.addEventListener()`, which listen to the `signal` only if it exists.

## handles

Type: `function`, `AbortController`, `MutationObserver`, `IntersectionObserver`, any object with a `disconnect` or `abort` method

Each received handle will be called, disconnected, or aborted, depending on its type.

## Demo

<img src="https://github.com/fregante/abort-utils/assets/1402241/6c7b6bd3-aca4-4b28-b804-84ba8a35048f" width="300">

## [Main page ⏎](../readme.md)
