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
