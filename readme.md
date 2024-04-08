# abort-utils [![][badge-gzip]][link-bundlephobia]

[badge-gzip]: https://img.shields.io/bundlephobia/minzip/abort-utils.svg?label=gzipped
[link-bundlephobia]: https://bundlephobia.com/result?p=abort-utils

> Utility functions to use and combine `AbortSignal` and `AbortController` with Promises

## Install

```sh
npm install abort-utils
```
```js
import {
	onAbort,
	mergeSignals,
	linkControllers,
	promiseFromSignal,
	ReusableAbortController
} from 'abort-utils';
```

## Usage

This package exports various utilities, just import what you need.

- [onAbort](./source/on-abort.md): Add multiple callbacks, observers and other abort controllers to a single signal.
- [mergeSignals](./source/merge-signals.md): Create a new signal that aborts when any of the input signals aborts.
- [linkControllers](./source/link-controllers.md): Link multiple controllers so that when one aborts, they all abort with the same reason.
- [signalFromEvent](./source/signal-from-event.md): Create an `AbortSignal` that is aborted when an event is dispatched.
- [signalFromPromise](./source/signal-from-promise.md): Create an `AbortSignal` that is aborted when a Promise is resolved or rejected.
- [promiseFromSignal](./source/promise-from-signals.md): Create a Promise that resolves or rejects when the signal aborts.
- [ReusableAbortController](./source/reusable-abort-controller.md): Like `AbortController`, but it generates a new signal after it's aborted.

## Demo

Here's a visual representation that might help understand how some of the methods differ and behave.

[<img src="https://github.com/fregante/abort-utils/assets/1402241/e70d6ac6-f2e5-43d0-96b3-790a419b57c4" width="400">](https://codepen.io/fregante/pen/mdoJKMo)

## License

MIT © [Federico Brigante](https://fregante.com)
