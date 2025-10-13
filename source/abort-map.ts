import {onAbort} from './on-abort.js';

/**
 * A Map that automatically removes entries when their associated AbortSignal is aborted.
 */
export class AbortMap<K, V> extends Map<K, V> {
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
			// Otherwise, second parameter is the value (standard Map behavior)
			super.set(key, signalOrValue);
		}

		return this;
	}
}
