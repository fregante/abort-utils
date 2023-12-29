import {test, expect} from 'vitest';
import {mergeSignals} from './merge-signals.js';

test('aborts returned signal when input signals are aborted', () => {
	const one = new AbortController();
	const two = new AbortController();
	const merged = mergeSignals(one.signal, two.signal);
	expect(merged.aborted).toBe(false);

	one.abort('reason');
	expect(merged.aborted).toBe(true);
	expect(merged.reason).toBe('reason');
});

test('aborts returned signal when input signals are pre-aborted', () => {
	const one = AbortSignal.abort('reason');
	const two = new AbortController();
	const merged = mergeSignals(one, two.signal);
	expect(merged.aborted).toBe(true);
	expect(merged.reason).toBe('reason');
});

test('aborts returned signal when input signals are aborted (with reason, pre-aborted with reason)', () => {
	const one = AbortSignal.abort('reason1');
	const two = AbortSignal.abort('reason2');
	const merged = mergeSignals(one, two);
	expect(merged.aborted).toBe(true);
	expect(merged.reason).toBe('reason1');
});
