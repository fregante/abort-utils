import {AbortMap, AbortWeakMap, AbortSet} from './index.js';

// AbortMap tests - with signals
const stringNumberMap = new AbortMap<string, number>();
stringNumberMap.set('key', AbortSignal.timeout(100), 42);
stringNumberMap.set('key2', AbortSignal.abort());

// AbortMap tests - regular usage
stringNumberMap.set('regular', 100);

// AbortWeakMap tests - with signals
const weakMap = new AbortWeakMap<Record<string, unknown>, string>();
const key = {};
weakMap.set(key, AbortSignal.timeout(100), 'value');
weakMap.set(key, AbortSignal.abort());

// AbortWeakMap tests - regular usage
weakMap.set(key, 'regular');

// AbortSet tests - with signals
const stringSet = new AbortSet<string>();
stringSet.add('item', AbortSignal.timeout(100));
stringSet.add('item2', AbortSignal.abort());

// AbortSet tests - regular usage
stringSet.add('regular');

// Verify they extend the native types
const map: Map<string, number> = new AbortMap<string, number>();
const wMap: WeakMap<Record<string, unknown>, string> = new AbortWeakMap<Record<string, unknown>, string>();
const set: Set<string> = new AbortSet<string>();

void map;
void wMap;
void set;
