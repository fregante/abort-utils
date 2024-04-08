import {setTimeout} from 'node:timers/promises';
import {it, expect} from 'vitest';
import {signalFromPromise} from './signal-from-promise.js';

it('aborts when the promise resolves', async () => {
	const signal = signalFromPromise(setTimeout(1));

	expect(signal.aborted).toBe(false);
	await setTimeout(2);

	expect(signal.aborted).toBe(true);
});

it('aborts when the promise rejects', async () => {
	const failedPromise = (async () => {
		await setTimeout(1);
		throw new Error('x');
	})();

	const signal = signalFromPromise(failedPromise);

	expect(signal.aborted).toBe(false);

	await setTimeout(2);

	expect(signal.aborted).toBe(true);
});
