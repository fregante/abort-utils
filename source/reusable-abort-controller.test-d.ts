import {ReusableAbortController} from './reusable-abort-controller.js';

const controller = new ReusableAbortController();
const signal: AbortSignal = controller.signal; // eslint-disable-line prefer-destructuring

document.addEventListener('click', console.log, {signal});
controller.abortAndReset();

document.addEventListener('click', console.log, {signal});
controller.abortAndReset();
