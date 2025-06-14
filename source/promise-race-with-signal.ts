/* eslint-disable @typescript-eslint/prefer-promise-reject-errors, promise/prefer-catch, promise/prefer-await-to-then */

/**
 * Like `Promise.race()`, but it accepts `AbortSignal` or `AbortController` instances.
 * Think of this as a way to make a promise "abortable" (except that it doesn't actually abort the original promise).
 *
 * @param promise The promise to race against the signal
 * @param signal The signal to listen to. If you pass a controller, it will automatically extract its signal.
 * @param options.abortRejects If `false`, the promise will resolve instead of reject when the signal is aborted.
 */
export async function promiseRaceWithSignal<T, AbortRejects extends boolean = true, ReturnValue = AbortRejects extends false ? T | unknown : T>(
	promise: Promise<T>,
	signal: AbortSignal | AbortController | undefined,
	{abortRejects = true as AbortRejects}: {abortRejects?: AbortRejects} = {},
): Promise<ReturnValue> {
	if (!signal) {
		return promise as ReturnValue;
	}

	const trueSignal = signal instanceof AbortController ? signal.signal : signal;

	if (abortRejects) {
		trueSignal.throwIfAborted();
	} else if (trueSignal.aborted) {
		return trueSignal.reason as ReturnValue;
	}

	return new Promise((resolve, reject) => {
		const handleAbort = () => {
			if (abortRejects) {
				reject(trueSignal.reason);
			} else {
				resolve(trueSignal.reason);
			}
		};

		trueSignal.addEventListener('abort', handleAbort, {once: true});
		promise.then(resolve, reject).finally(() => {
			// Remove listener even if the promise is fulfilled first
			trueSignal.removeEventListener('abort', handleAbort);
		});
	}) as ReturnValue;
}
