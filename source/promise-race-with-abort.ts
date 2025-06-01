import {promiseFromSignal} from './promise-from-signal.js';

/**
 * Like `Promise.race()`, but it accepts `AbortSignal` or `AbortController` instances.
 * Think of this as a way to make a promise "abortable" (except that it doesn't actually abort the original promise).
 *
 * @param promise The promise to race against the signal
 * @param signal The signal to listen to. If you pass a controller, it will automatically extract its signal.
 * @param options.abortRejects If `true`, the promise will reject instead of resolve when the signal is aborted.
 */
export async function promiseRaceWithAbort(
	promise: Promise<unknown>,
	signal: AbortSignal | AbortController,
	{abortRejects = false}: {abortRejects?: boolean} = {},
): Promise<unknown> {
	return Promise.race([
		promise,
		promiseFromSignal(signal, {rejects: abortRejects})
	]);
}
