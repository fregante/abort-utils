export type SignalFromEventOptions<T extends Event> = Omit<AddEventListenerOptions, 'once'> & {
	filter?: (event: T) => boolean | Promise<boolean>;
};

/**
 * Create an abort signal that will be aborted when the specified event is triggered on the target.
 * @param target The target to attach the listener to. This can be any `Element` or other object that implements the `EventTarget` interface.
 * @param event The event to listen for.
 * @param options Options to pass to the `addEventListener` method (except `once`, which is always set to `true`). This can be used to specify the `capture` option or `passive` option or to specify a `signal`.
 * @param options.filter A function that will be called with the event. The signal will only be aborted if this function returns `true`.
 */
export function signalFromEvent<K extends string, T extends Event = K extends keyof HTMLElementEventMap ? HTMLElementEventMap[K] : Event>(
	target: EventTarget,
	event: K,
	{filter, ...options}: SignalFromEventOptions<T> = {},
): AbortSignal {
	const controller = new AbortController();
	const listener = filter
		? async (event: T) => {
			let shouldAbort = filter(event);
			if (typeof shouldAbort === 'object' && 'then' in shouldAbort) {
				shouldAbort = await shouldAbort;
			}

			if (shouldAbort) {
				controller.abort(event);
			}
		} : () => {
			controller.abort();
		};

	target.addEventListener(event, listener as EventListener, {
		...options,
		once: !filter,
	});

	return controller.signal;
}
