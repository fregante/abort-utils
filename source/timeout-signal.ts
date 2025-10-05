export class TimeoutError extends Error {
	override name = 'TimeoutError';
}

/** Like `AbortSignal.timeout`, but it throws a `TimeoutError` with an optional custom message. */
export function timeoutSignal(milliseconds: number, reason = 'The operation timed out'): AbortSignal {
	const controller = new AbortController();
	setTimeout(() => {
		controller.abort(new TimeoutError(reason));
	}, milliseconds);
	return controller.signal;
}
