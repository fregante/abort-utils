export function signalFromPromise(promise: Promise<unknown>): AbortSignal {
	const controller = new AbortController();

	promise
		.finally(() => {
			controller.abort();
		})
		// https://twitter.com/fregante/status/1777377935311213024
		.catch(() => undefined);

	return controller.signal;
}
