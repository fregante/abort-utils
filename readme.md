# abort-utils [![][badge-gzip]][link-bundlephobia]

[badge-gzip]: https://img.shields.io/bundlephobia/minzip/abort-utils.svg?label=gzipped
[link-bundlephobia]: https://bundlephobia.com/result?p=abort-utils

> Utility functions to use and combine `AbortSignal` and `AbortController` with Promises

## Install

```sh
npm install abort-utils
```

## Usage

### onAbort(signal, ...handlers)

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

#### signal

Type: `AbortSignal`, `AbortController`, `undefined`

The signal to listen to. If you pass a controller, it will automatically extract its signal.

If `undefined` is received, nothing will happen. This matches the pattern `signal?.addEventListener()`, which listen to the `signal` only if it exists.

#### handlers

Type: `function`, `AbortController`, `MutationObserver`, `IntersectionObserver`, any object with a `disconnect` or `abort` method

Each received handler will be called, disconnected, or aborted, depending on its type.

## License

MIT © [Federico Brigante](https://fregante.com)
