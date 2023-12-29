import {onAbort} from './on-abort.js';

onAbort(undefined);
onAbort(AbortSignal.abort());
onAbort(AbortSignal.abort(), new AbortController());
onAbort(new AbortController());
onAbort(new AbortController(), new AbortController());

onAbort(AbortSignal.abort(), new MutationObserver(console.log));
onAbort(AbortSignal.abort(), new IntersectionObserver(console.log));
onAbort(AbortSignal.abort(), () => {
	// All good
});
