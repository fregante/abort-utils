import {AbortSet} from './abort-set.js';

const stringSet = new AbortSet<string>();

// With signal
stringSet.add('item', AbortSignal.timeout(100));
stringSet.add('item2', AbortSignal.abort());

// Regular usage
stringSet.add('regular');

const set: Set<string> = new AbortSet<string>();

void set;
