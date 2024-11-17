export function abortAll(iterable: Iterable<AbortController>) {
	for (const controller of iterable) {
		controller.abort();
	}
}

/**
 * Aborts all controllers in an Array/Set and empties it.
 * @param list - The Array/Set of controllers to abort and clear.
 */
export function abortAllAndClear(list: AbortController[] | Set<AbortController>) {
	abortAll(list);

	if (Array.isArray(list)) {
		list.length = 0;
	} else {
		list.clear();
	}
}
