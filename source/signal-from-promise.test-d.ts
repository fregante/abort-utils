import {signalFromPromise} from './signal-from-promise.js';

window.addEventListener('keydown', console.log, {
	signal: signalFromPromise(fetch('a')),
});
