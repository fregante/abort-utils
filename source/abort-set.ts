import {onAbort} from './on-abort.js';

/**
 * A Set that automatically removes entries when their associated AbortSignal is aborted.
 */
export class AbortSet<T> extends Set<T> {
	override add(value: T, signal?: AbortSignal): this {
		super.add(value);

		if (signal) {
			onAbort(signal, () => {
				this.delete(value);
			});
		}

		return this;
	}
}
