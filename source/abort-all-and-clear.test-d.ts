import {abortAllAndClear} from './abort-all-and-clear.js';

abortAllAndClear([new AbortController(), new AbortController(), new AbortController()]);
abortAllAndClear(new Set([new AbortController(), new AbortController(), new AbortController()]));
