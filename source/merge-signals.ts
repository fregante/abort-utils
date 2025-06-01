/** @deprecated Use AbortSignal.any() instead */
export function mergeSignals(
	...signals: Array<AbortSignal | AbortController | undefined>
): AbortSignal {
	const controller = new AbortController();
	for (const abort of signals) {
		const signal = abort instanceof AbortController ? abort.signal : abort;

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
