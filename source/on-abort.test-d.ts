import {onAbort} from './on-abort.js';

onAbort(undefined);
onAbort(new AbortSignal());
onAbort(new AbortSignal(), new AbortController());
onAbort(new AbortController());
onAbort(new AbortController(), new AbortController());

onAbort(new AbortSignal(), new MutationObserver(console.log));
onAbort(new AbortSignal(), new IntersectionObserver(console.log));
onAbort(new AbortSignal(), () => {
	// All good
});
