import {promiseRaceWithSignal} from './promise-race-with-signal.js';

await promiseRaceWithSignal(Promise.resolve(), AbortSignal.abort(1));
await promiseRaceWithSignal(Promise.resolve(), AbortSignal.abort(), {abortRejects: true});
await promiseRaceWithSignal(Promise.resolve(), AbortSignal.abort(), {abortRejects: false});
