import {AbortMap, AbortWeakMap, AbortSet} from './abort-map.js';

// AbortMap tests
const stringNumberMap = new AbortMap<string, number>();
stringNumberMap.setAbortable('key', AbortSignal.timeout(100), 42);
stringNumberMap.setAbortable('key2', AbortSignal.abort());
stringNumberMap.set('regular', 100);

// AbortWeakMap tests
const weakMap = new AbortWeakMap<Record<string, unknown>, string>();
const key = {};
weakMap.setAbortable(key, AbortSignal.timeout(100), 'value');
weakMap.setAbortable(key, AbortSignal.abort());
weakMap.set(key, 'regular');

// AbortSet tests
const stringSet = new AbortSet<string>();
stringSet.addAbortable('item', AbortSignal.timeout(100));
stringSet.addAbortable('item2', AbortSignal.abort());
stringSet.add('regular');

// Verify they extend the native types
const map: Map<string, number> = new AbortMap<string, number>();
const wMap: WeakMap<Record<string, unknown>, string> = new AbortWeakMap<Record<string, unknown>, string>();
const set: Set<string> = new AbortSet<string>();

void map;
void wMap;
void set;
