import {AbortWeakMap} from './abort-weak-map.js';

const weakMap = new AbortWeakMap<Record<string, unknown>, string>();
const key = {};

// With signal
weakMap.set(key, AbortSignal.timeout(100), 'value');
weakMap.set(key, AbortSignal.abort());

// Regular usage
weakMap.set(key, 'regular');

const wMap: WeakMap<Record<string, unknown>, string> = new AbortWeakMap<Record<string, unknown>, string>();

void wMap;
