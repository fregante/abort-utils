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
