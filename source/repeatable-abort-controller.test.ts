import {it, expect} from 'vitest';
import {RepeatableAbortController} from './repeatable-abort-controller.js';

it('should initially work like a regular AbortController', async () => {
	const controller = new RepeatableAbortController();
	expect(controller.signal).toBe(controller.signal);
	const {signal} = controller; // Save signal
	expect(signal.aborted).toBe(false);
	controller.abortAndReset();
	expect(signal.aborted).toBe(true);
});

it('should reset the signal after aborting', async () => {
	const controller = new RepeatableAbortController();
	controller.abortAndReset();
	expect(controller.signal.aborted).toBe(false);
	controller.abortAndReset();
	expect(controller.signal.aborted).toBe(false);
});
