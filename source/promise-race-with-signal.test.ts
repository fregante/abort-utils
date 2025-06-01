import {setTimeout} from 'node:timers/promises';
import {it, expect} from 'vitest';
import {promiseRaceWithSignal} from './promise-race-with-signal.js';

it('resolves with promise result when promise wins', async () => {
	const controller = new AbortController();
	const result = promiseRaceWithSignal(
		Promise.resolve('success'),
		controller.signal,
	);
	await expect(result).resolves.toBe('success');
});

it('rejects with AbortError when signal aborts first', async () => {
	const result = promiseRaceWithSignal(
		setTimeout(100, 'too-late'),
		AbortSignal.timeout(50),
	);
	await expect(result).rejects.toThrow(DOMException);
});

it('resolves when signal aborts first and abortRejects is false', async () => {
	await expect(promiseRaceWithSignal(
		setTimeout(100, 'too-late'),
		AbortSignal.timeout(50),
		{abortRejects: false},
	)).resolves.toBeInstanceOf(DOMException);
});

it('accepts AbortController directly', async () => {
	const controller = new AbortController();
	const result = promiseRaceWithSignal(
		setTimeout(100, 'too-late'),
		controller,
	);

	controller.abort('based');
	await expect(result).rejects.toThrow('based');
});

it('propagates promise rejection', async () => {
	const controller = new AbortController();
	await expect(promiseRaceWithSignal(
		Promise.reject(new Error('test error')),
		controller.signal,
	)).rejects.toThrow('test error');
});

it('handles already aborted signal', async () => {
	const controller = new AbortController();
	controller.abort();

	const result = promiseRaceWithSignal(
		setTimeout(100, 'too-late'),
		controller.signal,
	);
	await expect(result).rejects.toThrow(DOMException);
});

it('handles already aborted signal with abortRejects', async () => {
	const controller = new AbortController();
	controller.abort();

	await expect(promiseRaceWithSignal(
		setTimeout(100, 'too-late'),
		controller.signal,
		{abortRejects: true},
	)).rejects.toThrow(DOMException);
});
