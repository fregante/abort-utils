function getSignal(controller: AbortController | AbortSignal): AbortSignal {
	return controller instanceof AbortController ? controller.signal : controller;
}

/**
 * Link multiple controllers so that when one aborts, they all abort with the same reason.
 * @param controllers The controllers to link.
 */
export function linkControllers(...controllers: Array<AbortController | AbortSignal>): void {
	const alreadyAborted = controllers.find(controller => getSignal(controller).aborted);

	const onAbort = ({target}: Event) => {
		for (const controller of controllers) {
			if (controller instanceof AbortController) {
				controller.abort(target instanceof AbortSignal ? target.reason : undefined);
			}
		}
	};

	for (const controller of controllers) {
		if (!alreadyAborted) {
			getSignal(controller).addEventListener('abort', onAbort, {once: true});
		} else if (controller instanceof AbortController) {
			controller.abort(getSignal(alreadyAborted).reason);
		}
	}
}
