import {setTimeout} from 'node:timers/promises';
import {it, expect} from 'vitest';
import {promiseFromSignal} from './promise-from-signal.js';

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace jest {
		// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
		interface Matchers<R> {
			toBePending: () => Promise<void>;
		}
	}
}

expect.extend({
	async toBePending(promise: Promise<unknown>) {
		const result = await Promise.race([promise, setTimeout(0, 10)]);
		if (result === 10) {
			return {
				message: () => 'Expected Promise to be pending.',
				pass: true,
			};
		}

		return {
			message: () => 'Expected Promise to be pending, but it resolved.',
			pass: false,
		};
	},
});

it('resolves when the signal is aborted', async () => {
	const controller = new AbortController();
	const promise = promiseFromSignal(controller.signal);
	await expect(promise).toBePending();
	controller.abort('boredom');
	await expect(promise).resolves.toBe('boredom');
});

it('rejects when the signal is aborted', async () => {
	const controller = new AbortController();
	const promise = promiseFromSignal(controller.signal, {rejects: true});
	await expect(promise).toBePending();
	controller.abort('boredom');
	await expect(promise).rejects.toBe('boredom');
});

it('resolves when the signal is already aborted', async () => {
	const controller = new AbortController();
	controller.abort('boredom');
	const promise = promiseFromSignal(controller.signal);
	await expect(promise).not.toBePending();
	await expect(promise).resolves.toBe('boredom');
});
