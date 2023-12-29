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
	promiseFromSignal
} from 'abort-utils';
```

## Usage

This package exports various utilities, just import what you need.

- [onAbort](./source/on-abort.md): Add multiple callbacks, observers and other abort controllers to a single signal.
- [mergeSignals](./source/merge-signals.md): Create a new signal that aborts when any of the input signals aborts.
- [linkControllers](./source/link-controllers.md): Link multiple controllers so that when one aborts, they all abort with the same reason.
- [promiseFromSignal](./source/promise-from-signals.md): Create a Promise that resolves or rejects when the signal aborts.

## Demo

Here's a visual representation that might help understand how some of the methods differ and behave.

<img src="https://github.com/fregante/abort-utils/assets/1402241/e70d6ac6-f2e5-43d0-96b3-790a419b57c4" width="300">

## License

MIT © [Federico Brigante](https://fregante.com)
