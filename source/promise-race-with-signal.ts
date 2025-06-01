import {promiseFromSignal} from './promise-from-signal.js';

/**
 * Like `Promise.race()`, but it accepts `AbortSignal` or `AbortController` instances.
 * Think of this as a way to make a promise "abortable" (except that it doesn't actually abort the original promise).
 *
 * @param promise The promise to race against the signal
 * @param signal The signal to listen to. If you pass a controller, it will automatically extract its signal.
 * @param options.abortRejects If `false`, the promise will resolve instead of reject when the signal is aborted.
 */
async function promiseRaceWithSignal<T, AbortRejects extends boolean = true>(
	promise: Promise<T>,
	signal: AbortSignal | AbortController | undefined,
	{abortRejects = true as AbortRejects}: {abortRejects?: AbortRejects} = {},
): Promise<AbortRejects extends false ? T | unknown : T> {
	if (!signal) {
		return promise;
	}

	return Promise.race([
		promise,
		promiseFromSignal(signal, {rejects: abortRejects}),
	]) as Promise<AbortRejects extends false ? T | unknown : T>;
}

export {promiseRaceWithSignal};
