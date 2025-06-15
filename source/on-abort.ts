
type Handle =
	| {disconnect(): void}
	| {abort(reason: any): void}
	| {abortAndReset(reason: any): void}
	| (() => void);

const createListener = (handle: Handle) => function (this: AbortSignal): void {
	if (typeof handle === 'function') {
		handle();
	} else if ('disconnect' in handle) {
		handle.disconnect();
	} else if ('abort' in handle) {
		handle.abort(this.reason);
	} else if ('abortAndReset' in handle) {
		handle.abortAndReset(this.reason);
	} else {
		throw new TypeError('Invalid AbortSignal handle type');
	}
};

export function onAbort(
	signal: AbortController | AbortSignal | undefined,
	...handles: Handle[]
): void {
	if (!signal || handles.length === 0) {
		return;
	}

	const inputSignal = signal instanceof AbortController ? signal.signal : signal;

	// This pattern ensures that handlers are treated the same way even if the
	// signal is already aborted
	const preAbortedHelper = new AbortController();
	const targetSignal = inputSignal.aborted
		? preAbortedHelper.signal
		: inputSignal;

	for (const handle of handles) {
		// Attach one listener per handle so that failures by one handle don't affect others
		targetSignal.addEventListener('abort', createListener(handle), {
			once: true,
		});
	}

	if (inputSignal.aborted) {
		preAbortedHelper.abort(inputSignal.reason);
	}
}
