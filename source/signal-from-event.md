# signalFromEvent(target, eventName, options?)

Returns an `AbortSignal` that aborts when the event is dispatched. This lets abort an operation following an event.

```ts
// Abort request when the user clicks the cancel button
void fetch('https://example.com', {
	signal: signalFromEvent(cancelButton, 'click')
});
```

## target

Type: [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)

The target to attach the listener to. This can be any Element or other object that implements the `EventTarget` interface.

## eventName

Type: `string`

The name of the event to listen for.

## options

Type: `object`

Options to pass to the `addEventListener` method (except `once`, which is always set to `true`). This can be used to specify the `capture` option or `passive` option or to specify a `signal`.

### filter

Type: `(event: Event) => boolean`

A filter function that will be called with the event that triggered the listener. The signal will resolve only once the filter returns `true`. This function can also be `async`.

```js
// Remove listeners after the 5th click
let count = 0;
cancelButton.addEventListener('click', () => {
	count++;
}, {
	signal: signalFromEvent(cancelButton, 'click', {
		filter: () => count >= 5
	})
});
```

### capture
### passive
### signal

See https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#options

An aborted signal will not abort the return value of signalFromEvent, it just removes the listener.

### once

Type: `never`

This is always set to `true` and cannot be changed. The listener will be removed after the first event.

## [Main page ⏎](../readme.md)
