# abort-utils [![][badge-gzip]][link-bundlephobia]

[badge-gzip]: https://img.shields.io/bundlephobia/minzip/abort-utils.svg?label=gzipped
[link-bundlephobia]: https://bundlephobia.com/result?p=abort-utils

> Utility functions to use and combine `AbortSignal` and `AbortController` with Promises

## Install

```sh
npm install abort-utils
```

## Usage

This package exports various utilities, just import what you need.

- [onAbort](./source/on-abort.md): Add multiple callbacks, observers and other abort controllers to a single signal.
- [mergeSignals](./source/merge-signals.md): Create a new signal that aborts when any of the input signals aborts.
- [promiseFromSignal](./source/promise-from-signals.md): Create a Promise that resolves or rejects when the signal aborts.

## License

MIT © [Federico Brigante](https://fregante.com)
