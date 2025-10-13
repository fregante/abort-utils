import {onAbort} from './on-abort.js';

/**
 * A WeakMap that automatically removes entries when their associated AbortSignal is aborted.
 */
export class AbortWeakMap<K extends Record<string, unknown>, V> extends WeakMap<K, V> {
	override set(key: K, signal: AbortSignal, value?: V): this;
	override set(key: K, value: V): this;
	override set(key: K, signalOrValue: AbortSignal | V, value?: V): this {
		// If second parameter is an AbortSignal, third parameter is the value
		if (signalOrValue instanceof AbortSignal) {
			super.set(key, value!);
			onAbort(signalOrValue, () => {
				this.delete(key);
			});
		} else {
			// Otherwise, second parameter is the value (standard WeakMap behavior)
			super.set(key, signalOrValue);
		}

		return this;
	}
}
