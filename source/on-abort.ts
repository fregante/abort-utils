type Handle =
	| {disconnect: VoidFunction}
	| {abort: VoidFunction}
	| VoidFunction;

function addListeners(signal: AbortSignal, handles: Handle[]) {
	// Add one listener per `handle` because error don't block other listeners
	for (const handle of handles) {
		const options = {once: true};
		if ('disconnect' in handle) {
			// Like MutationObserver
			signal.addEventListener('abort', handle.disconnect.bind(handle), options);
		} else if ('abort' in handle) {
			// Like AbortController
			signal.addEventListener('abort', handle.abort.bind(handle), options);
		} else if (typeof handle === 'function') {
			signal.addEventListener('abort', handle, options);
		} else {
			throw new TypeError('Invalid AbortSignal handle type');
		}
	}
}

export function onAbort(
	// Accept `undefined` to replicate the common `signal?.addEventListener()` pattern
	abort: AbortController | AbortSignal | undefined,
	...handles: Handle[]
): void {
	if (!abort) {
		return;
	}

	const signal = abort instanceof AbortController ? abort.signal : abort;
	if (signal.aborted) {
		// This pattern ensures that handlers are treated the same way even if the
		// signal is already aborted. AbortSignal.abort()/.timeout() don't work the same way
		const controller = new AbortController();
		addListeners(controller.signal, handles);
		controller.abort(controller.signal.reason);
	} else {
		addListeners(signal, handles);
	}
}
