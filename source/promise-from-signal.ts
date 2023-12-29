export async function promiseFromSignal(
	signal: AbortSignal | AbortController,
	{rejects = false} = {},
) {
	const trueSignal = signal instanceof AbortController ? signal.signal : signal;

	return new Promise((resolve, reject) => {
		const fulfill = () => {
			if (rejects) {
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
