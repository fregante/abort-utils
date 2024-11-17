async function watch(promise: Promise<unknown>, controller: AbortController) {
	try {
		await promise;
	} catch {
		// https://twitter.com/fregante/status/1777377935311213024
	} finally {
		controller.abort();
	}
}

/**
 * @param promise The promise to watch for resolution or rejection.
 * @returns An `AbortSignal` that aborts when the promise is resolved or rejected
 */
export function signalFromPromise(promise: Promise<unknown>): AbortSignal {
	const controller = new AbortController();
	void watch(promise, controller);
	return controller.signal;
}
