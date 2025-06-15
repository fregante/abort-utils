
type Handle =
	| {disconnect(): void}
	| {abort(reason: any): void}
	| {abortAndReset(reason: any): void}
	| ((reason: any) => void);

const createListener = (handle: Handle) => function (this: AbortSignal): void {
	if (typeof handle === 'function') {
		handle(this.reason);
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
): {[Symbol.dispose](): void} | undefined {
	if (!signal || handles.length === 0) {
		return;
	}

	const cleanup = new AbortController();
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
			signal: cleanup.signal,
		});
	}

	if (inputSignal.aborted) {
		preAbortedHelper.abort(inputSignal.reason);
	}

	return {
		[Symbol.dispose]: cleanup.abort.bind(cleanup),
	};
}
