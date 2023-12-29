export function linkControllers(...controllers: AbortController[]): void {
	const alreadyAborted = controllers.some(controller => controller.signal.aborted);

	const onAbort = ({target}: Event) => {
		for (const controller of controllers) {
			controller.abort(target instanceof AbortSignal ? target.reason : undefined);
		}
	};

	for (const controller of controllers) {
		if (alreadyAborted) {
			controller.abort(controller.signal.reason);
		} else {
			controller.signal.addEventListener('abort', onAbort, {once: true});
		}
	}
}
