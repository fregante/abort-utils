# signalFromEvent(target, eventName, listenerOptions?)

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

## [Main page ⏎](../readme.md)
