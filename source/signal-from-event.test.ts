// @vitest-environment happy-dom

import {it, expect} from 'vitest';
import {signalFromEvent} from './signal-from-event.js';

it('aborts when the event is dispatched', async () => {
	const target = new EventTarget();
	const signal = signalFromEvent(target, 'event');
	expect(signal.aborted).toBe(false);
	target.dispatchEvent(new Event('event'));
	expect(signal.aborted).toBe(true);
});

it('aborts when the event is dispatched with filter', async () => {
	const target = new EventTarget();
	const signal = signalFromEvent(target, 'click', {
		filter: event => event.button === 3,
	});
	expect(signal.aborted).toBe(false);
	target.dispatchEvent(new MouseEvent('click', {button: 2}));
	expect(signal.aborted).toBe(false);
	target.dispatchEvent(new MouseEvent('click', {button: 3}));
	expect(signal.aborted).toBe(true);
});
