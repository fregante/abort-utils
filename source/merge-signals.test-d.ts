import {mergeSignals} from './merge-signals.js';

const signal: AbortSignal = mergeSignals(new AbortSignal(), AbortSignal.abort(), AbortSignal.timeout(1000));
mergeSignals(signal, new AbortController().signal);
mergeSignals(undefined);
