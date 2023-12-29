import {it, expect} from 'vitest';
import {linkControllers} from './link-controllers.js';

it('should abort all controllers when one aborts', () => {
	const controller1 = new AbortController();
	const controller2 = new AbortController();
	const controller3 = new AbortController();
	linkControllers(controller1, controller2, controller3);
	expect(controller1.signal.aborted).toBe(false);
	expect(controller2.signal.aborted).toBe(false);
	expect(controller3.signal.aborted).toBe(false);

	const reason = new Error('foo');
	controller2.abort(reason);
	expect(controller1.signal.reason).toBe(reason);
	expect(controller2.signal.reason).toBe(reason);
	expect(controller3.signal.reason).toBe(reason);
});

it('should abort all controllers when one is already aborted', () => {
	const controller1 = new AbortController();
	const controller2 = new AbortController();
	const controller3 = new AbortController();

	const reason = new Error('bad soup');
	controller2.abort(reason);
	linkControllers(controller1, controller2, controller3);
	expect(controller1.signal.aborted).toBe(true);
	expect(controller2.signal.aborted).toBe(true);
	expect(controller3.signal.aborted).toBe(true);
	expect(controller1.signal.reason).toBe(reason);
	expect(controller2.signal.reason).toBe(reason);
	expect(controller3.signal.reason).toBe(reason);
});

it('should accept and listen to AbortSignals as input', () => {
	const controller1 = new AbortController();
	const controller2 = new AbortController();
	const {signal} = controller2;
	const controller3 = new AbortController();
	linkControllers(controller1, signal, controller3);
	expect(controller1.signal.aborted).toBe(false);
	expect(controller2.signal.aborted).toBe(false);
	expect(controller3.signal.aborted).toBe(false);

	const reason = new Error('foo');
	controller2.abort(reason);
	expect(controller1.signal.reason).toBe(reason);
	expect(controller2.signal.reason).toBe(reason);
	expect(controller3.signal.reason).toBe(reason);
});
