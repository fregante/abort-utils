/**
 * Returns a `Promise` that resolves or rejects when the signal is aborted. This lets you await a signal or combine it with other promises.
 *
 * The promise will use the abort reason as a resolved/rejected value.
 *
 * @param signal The signal to listen to. If you pass a controller, it will automatically extract its signal.
 * @param options.rejects If `true`, the promise will reject instead of resolve when the signal is aborted.
 * @returns
 */
export async function promiseFromSignal(
	signal: AbortSignal | AbortController,
	{rejects = false} = {},
) {
	const trueSignal = signal instanceof AbortController ? signal.signal : signal;

	return new Promise((resolve, reject) => {
		const fulfill = () => {
			if (rejects) {
				// eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors -- Passed as is
				reject(trueSignal.reason);
			} else {
				resolve(trueSignal.reason);
			}
		};

		if (trueSignal.aborted) {
			fulfill();
		} else {
			trueSignal.addEventListener('abort', fulfill);
		}
	});
}
