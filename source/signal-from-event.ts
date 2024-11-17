/**
 * Create an abort signal that will be aborted when the specified event is triggered on the target.
 * @param target The target to attach the listener to. This can be any `Element` or other object that implements the `EventTarget` interface.
 * @param event The event to listen for.
 * @param options Options to pass to the `addEventListener` method (except `once`, which is always set to `true`). This can be used to specify the `capture` option or `passive` option or to specify a `signal`.
 * @returns
 */
export function signalFromEvent(
	target: EventTarget,
	event: string,
	options?: Omit<AddEventListenerOptions, 'once'>,
): AbortSignal {
	const controller = new AbortController();

	target.addEventListener(event, controller.abort.bind(controller), {
		...options,
		once: true,
	});

	return controller.signal;
}
