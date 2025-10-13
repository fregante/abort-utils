import {setTimeout} from 'node:timers/promises';
import {it, expect} from 'vitest';
import {AbortMap, AbortWeakMap, AbortSet} from './abort-map.js';

it('AbortMap should remove entries when signal is aborted', async () => {
	const map = new AbortMap<string, number>();
	const controller = new AbortController();

	map.setAbortable('key1', controller.signal, 42);
	expect(map.has('key1')).toBe(true);
	expect(map.get('key1')).toBe(42);

	controller.abort();
	// Use setTimeout to allow the event loop to process the abort event
	await setTimeout(0);

	expect(map.has('key1')).toBe(false);
	expect(map.get('key1')).toBe(undefined);
});

it('AbortMap should handle timeout signal', async () => {
	const map = new AbortMap<string, string>();

	map.setAbortable('timeout-key', AbortSignal.timeout(50), 'value');
	expect(map.has('timeout-key')).toBe(true);

	await setTimeout(100);

	expect(map.has('timeout-key')).toBe(false);
});

it('AbortMap should handle already aborted signal', async () => {
	const map = new AbortMap<string, string>();
	const signal = AbortSignal.abort();

	map.setAbortable('aborted-key', signal, 'value');

	// The entry is removed immediately since the signal is already aborted
	// Use setTimeout to allow the event loop to process
	await setTimeout(0);

	expect(map.has('aborted-key')).toBe(false);
});

it('AbortMap should allow using regular set method', () => {
	const map = new AbortMap<string, number>();

	map.set('regular-key', 100);
	expect(map.has('regular-key')).toBe(true);
	expect(map.get('regular-key')).toBe(100);

	// Regular entries are not removed automatically
	map.set('regular-key', 200);
	expect(map.get('regular-key')).toBe(200);
});

it('AbortMap should handle multiple entries with different signals', async () => {
	const map = new AbortMap<string, number>();
	const controller1 = new AbortController();
	const controller2 = new AbortController();

	map.setAbortable('key1', controller1.signal, 1);
	map.setAbortable('key2', controller2.signal, 2);
	expect(map.size).toBe(2);

	controller1.abort();
	await setTimeout(0);

	expect(map.has('key1')).toBe(false);
	expect(map.has('key2')).toBe(true);
	expect(map.size).toBe(1);

	controller2.abort();
	await setTimeout(0);

	expect(map.has('key2')).toBe(false);
	expect(map.size).toBe(0);
});

it('AbortWeakMap should remove entries when signal is aborted', async () => {
	const weakMap = new AbortWeakMap<Record<string, unknown>, string>();
	const controller = new AbortController();
	const key = {};

	weakMap.setAbortable(key, controller.signal, 'test-value');
	expect(weakMap.has(key)).toBe(true);
	expect(weakMap.get(key)).toBe('test-value');

	controller.abort();
	await setTimeout(0);

	expect(weakMap.has(key)).toBe(false);
	expect(weakMap.get(key)).toBe(undefined);
});

it('AbortWeakMap should handle timeout signal', async () => {
	const weakMap = new AbortWeakMap<Record<string, unknown>, number>();
	const key = {};

	weakMap.setAbortable(key, AbortSignal.timeout(50), 42);
	expect(weakMap.has(key)).toBe(true);

	await setTimeout(100);

	expect(weakMap.has(key)).toBe(false);
});

it('AbortWeakMap should allow using regular set method', () => {
	const weakMap = new AbortWeakMap<Record<string, unknown>, string>();
	const key = {};

	weakMap.set(key, 'regular-value');
	expect(weakMap.has(key)).toBe(true);
	expect(weakMap.get(key)).toBe('regular-value');
});

it('AbortSet should remove entries when signal is aborted', async () => {
	const set = new AbortSet<string>();
	const controller = new AbortController();

	set.addAbortable('item1', controller.signal);
	expect(set.has('item1')).toBe(true);
	expect(set.size).toBe(1);

	controller.abort();
	await setTimeout(0);

	expect(set.has('item1')).toBe(false);
	expect(set.size).toBe(0);
});

it('AbortSet should handle timeout signal', async () => {
	const set = new AbortSet<string>();

	set.addAbortable('timeout-item', AbortSignal.timeout(50));
	expect(set.has('timeout-item')).toBe(true);

	await setTimeout(100);

	expect(set.has('timeout-item')).toBe(false);
});

it('AbortSet should handle already aborted signal', async () => {
	const set = new AbortSet<number>();
	const signal = AbortSignal.abort();

	set.addAbortable(123, signal);

	// The entry is removed immediately since the signal is already aborted
	await setTimeout(0);

	expect(set.has(123)).toBe(false);
});

it('AbortSet should allow using regular add method', () => {
	const set = new AbortSet<string>();

	set.add('regular-item');
	expect(set.has('regular-item')).toBe(true);
	expect(set.size).toBe(1);
});

it('AbortSet should handle multiple entries with different signals', async () => {
	const set = new AbortSet<number>();
	const controller1 = new AbortController();
	const controller2 = new AbortController();

	set.addAbortable(1, controller1.signal);
	set.addAbortable(2, controller2.signal);
	expect(set.size).toBe(2);

	controller1.abort();
	await setTimeout(0);

	expect(set.has(1)).toBe(false);
	expect(set.has(2)).toBe(true);
	expect(set.size).toBe(1);

	controller2.abort();
	await setTimeout(0);

	expect(set.has(2)).toBe(false);
	expect(set.size).toBe(0);
});
