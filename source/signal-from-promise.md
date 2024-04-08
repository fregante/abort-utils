# signalFromPromise(promise)

Returns an `AbortSignal` that aborts when the promise is resolved or rejected.

```ts
// Remove event listener after the animation is complete
window.addEventListener('keydown', cancelAnimation, {
	signal: signalFromPromise(animationPromise)
});
```

## promise

Type: `Promise`

The promise to watch for resolution or rejection.

## [Main page ⏎](../readme.md)
