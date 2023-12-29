export function mergeSignals(
	...signals: Array<AbortSignal | undefined>
): AbortSignal {
	const controller = new AbortController();
	for (const signal of signals) {
		if (signal?.aborted) {
			controller.abort(signal.reason);
			return controller.signal;
		}

		signal?.addEventListener('abort', () => {
			controller.abort(signal.reason);
		}, {once: true});
	}

	return controller.signal;
}
