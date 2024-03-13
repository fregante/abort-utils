export class ReusableAbortController {
	private controller = new AbortController();
	get signal(): AbortSignal {
		return this.controller.signal;
	}

	abortAndReset(reason?: any): void {
		this.controller.abort(reason);
		this.controller = new AbortController();
	}
}

/**
 * @deprecated Use `ReusableAbortController` instead.
*/
// eslint-disable-next-line @typescript-eslint/naming-convention -- Class
export const RepeatableAbortController = ReusableAbortController;
