import {signalFromPromise} from './signal-from-promise.js';

globalThis.addEventListener('keydown', console.log, {
	signal: signalFromPromise(fetch('a')),
});
