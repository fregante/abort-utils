import {promiseFromSignal} from './promise-from-signal.js';

await promiseFromSignal(AbortSignal.timeout(1));
await promiseFromSignal(AbortSignal.abort(), {rejects: true});
await promiseFromSignal(AbortSignal.abort(), {rejects: false});
