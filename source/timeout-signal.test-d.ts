import {timeoutSignal} from './timeout-signal.js';

export const signal: AbortSignal = timeoutSignal(1000);
timeoutSignal(1000, 'timeout expired');
