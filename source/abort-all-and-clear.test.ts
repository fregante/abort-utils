import {it, expect} from 'vitest';
import {abortAllAndClear} from './abort-all-and-clear.js';

it('should abort all and clear an array', () => {
	const controller1 = new AbortController();
	const controller2 = new AbortController();
	const controller3 = new AbortController();
	const controllers = [controller1, controller2, controller3];

	abortAllAndClear(controllers);

	expect(controller1.signal.aborted).toBe(true);
	expect(controller2.signal.aborted).toBe(true);
	expect(controller3.signal.aborted).toBe(true);
	expect(controllers).toEqual([]);
});

it('should abort all and clear a set', () => {
	const controller1 = new AbortController();
	const controller2 = new AbortController();
	const controller3 = new AbortController();
	const controllers = new Set([controller1, controller2, controller3]);

	abortAllAndClear(controllers);

	expect(controller1.signal.aborted).toBe(true);
	expect(controller2.signal.aborted).toBe(true);
	expect(controller3.signal.aborted).toBe(true);
	expect(controllers.size).toBe(0);
});
