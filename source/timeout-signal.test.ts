import {test, expect} from 'vitest';
import {TimeoutError, timeoutSignal} from './timeout-signal.js';

test('aborts signal after timeout', async () => {
	const signal = timeoutSignal(10);
	expect(signal.aborted).toBe(false);

	await new Promise(resolve => {
		setTimeout(resolve, 20);
	});
	expect(signal.aborted).toBe(true);
	expect(signal.reason).toBeInstanceOf(TimeoutError);
	expect((signal.reason as TimeoutError).message).toBe('The operation timed out');
});

test('aborts signal with custom error message', async () => {
	const message = 'timeout expired';
	const signal = timeoutSignal(10, message);
	expect(signal.aborted).toBe(false);

	await new Promise(resolve => {
		setTimeout(resolve, 20);
	});
	expect(signal.aborted).toBe(true);
	expect(signal.reason).toBeInstanceOf(TimeoutError);
	expect((signal.reason as TimeoutError).message).toBe(message);
});
