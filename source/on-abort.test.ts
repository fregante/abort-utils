import process from 'node:process';
import {test, expect, vi} from 'vitest';
import {onAbort} from './on-abort.js';

process.setUncaughtExceptionCaptureCallback(() => {
	// .idk wtf is up with Vitest, can't find a way to handle the mocked errors
});

test('it calls the callback when the AbortSignal is aborted', () => {
	const controller = new AbortController();
	const callback = vi.fn();
	onAbort(controller.signal, callback);

	expect(callback).not.toHaveBeenCalled();
	controller.abort();
	expect(callback).toHaveBeenCalledTimes(1);
});

test('it calls the callback immediately if the AbortSignal is already aborted', () => {
	const controller = new AbortController();
	controller.abort();
	const callback = vi.fn();
	onAbort(controller.signal, callback);

	expect(callback).toHaveBeenCalledTimes(1);
});

test('it accepts multiple handles', () => {
	const controller = new AbortController();
	const callback1 = vi.fn();
	const callback2 = {disconnect: vi.fn(), otherData: 1};
	onAbort(controller.signal, callback1, callback2);

	expect(callback1).not.toHaveBeenCalled();
	expect(callback2.disconnect).not.toHaveBeenCalled();
	controller.abort();
	expect(callback1).toHaveBeenCalledTimes(1);
	expect(callback2.disconnect).toHaveBeenCalledTimes(1);
});

test('it binds the object handles', () => {
	const signal = AbortSignal.abort();
	const callback1 = {disconnect: vi.fn(), otherData: 1};
	const callback2 = {abort: vi.fn(), otherData: 2};
	const callback3 = {abortAndReset: vi.fn(), otherData: 3};
	onAbort(signal, callback1, callback2, callback3);
	expect(callback1.disconnect).toHaveBeenCalledTimes(1);
	expect(callback1.disconnect.mock.instances[0]).toBe(callback1);
	expect(callback2.abort).toHaveBeenCalledTimes(1);
	expect(callback2.abort.mock.instances[0]).toBe(callback2);
	expect(callback3.abortAndReset).toHaveBeenCalledTimes(1);
	expect(callback3.abortAndReset.mock.instances[0]).toBe(callback3);
});

test('it will run all the handlers even if one throws', () => {
	expect.hasAssertions();

	const controller = new AbortController();
	const callback1 = vi.fn(() => {
		throw new Error('error');
	});
	const callback2 = vi.fn();
	onAbort(controller.signal, callback1, callback2);

	expect(callback1).not.toHaveBeenCalled();
	expect(callback2).not.toHaveBeenCalled();
	controller.abort();
	expect(callback1).toHaveBeenCalledTimes(1);
	expect(callback2).toHaveBeenCalledTimes(1);
	expect(callback1).throws('error');
});

test('it will run all the handlers even if one throws (pre-aborted)', () => {
	const signal = AbortSignal.abort();
	const callback1 = vi.fn(() => {
		throw new Error('error');
	});
	const callback2 = vi.fn();
	onAbort(signal, callback1, callback2);
	expect(callback1).toHaveBeenCalledTimes(1);
	expect(callback2).toHaveBeenCalledTimes(1);
});

test('it will run all the handlers even if one throws (passing in a controller instead of a signal)', () => {
	const controller = new AbortController();
	const callback1 = vi.fn(() => {
		throw new Error('error');
	});
	const callback2 = vi.fn();
	onAbort(controller, callback1, callback2);

	expect(callback1).not.toHaveBeenCalled();
	expect(callback2).not.toHaveBeenCalled();
	controller.abort();
	expect(callback1).toHaveBeenCalledTimes(1);
	expect(callback2).toHaveBeenCalledTimes(1);
});

test('it passes reason to abort/abortAndReset methods but not to functions or disconnect', () => {
	const reason = 'test-reason';
	const controller = new AbortController();

	const functionCallback = vi.fn();
	const disconnectHandle = {disconnect: vi.fn()};
	const abortHandle = {abort: vi.fn()};
	const abortAndResetHandle = {abortAndReset: vi.fn()};

	onAbort(controller.signal, functionCallback, disconnectHandle, abortHandle, abortAndResetHandle);

	controller.abort(reason);

	expect(functionCallback).toHaveBeenCalledWith();
	expect(disconnectHandle.disconnect).toHaveBeenCalledWith();
	expect(abortHandle.abort).toHaveBeenCalledWith(reason);
	expect(abortAndResetHandle.abortAndReset).toHaveBeenCalledWith(reason);
});
