import {promiseRaceWithSignal} from './promise-race-with-signal.js';

const signal = AbortSignal.abort(new Error('test'));
const promise = Promise.resolve(2);

export const a: number = await promiseRaceWithSignal(promise, signal);
export const b: number = await promiseRaceWithSignal(promise, signal, {abortRejects: true});
export const c: unknown = await promiseRaceWithSignal(promise, signal, {abortRejects: false});
