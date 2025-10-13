import {onAbort} from './on-abort.js';

/**
 * A Map that automatically removes entries when their associated AbortSignal is aborted.
 */
export class AbortMap<K, V> extends Map<K, V> {
	/**
	 * Sets a value in the map with an associated AbortSignal.
	 * When the signal is aborted, the entry is automatically deleted.
	 * @param key - The key to set
	 * @param signal - The AbortSignal to associate with this entry
	 * @param value - The value to set (optional)
	 */
	setAbortable(key: K, signal: AbortSignal, value?: V): this {
		super.set(key, value as V);
		onAbort(signal, () => {
			this.delete(key);
		});
		return this;
	}
}

/**
 * A WeakMap that automatically removes entries when their associated AbortSignal is aborted.
 */
export class AbortWeakMap<K extends Record<string, unknown>, V> extends WeakMap<K, V> {
	/**
	 * Sets a value in the weak map with an associated AbortSignal.
	 * When the signal is aborted, the entry is automatically deleted.
	 * @param key - The key to set
	 * @param signal - The AbortSignal to associate with this entry
	 * @param value - The value to set (optional)
	 */
	setAbortable(key: K, signal: AbortSignal, value?: V): this {
		super.set(key, value as V);
		onAbort(signal, () => {
			this.delete(key);
		});
		return this;
	}
}

/**
 * A Set that automatically removes entries when their associated AbortSignal is aborted.
 */
export class AbortSet<T> extends Set<T> {
	/**
	 * Adds a value to the set with an associated AbortSignal.
	 * When the signal is aborted, the entry is automatically deleted.
	 * @param value - The value to add
	 * @param signal - The AbortSignal to associate with this entry
	 */
	addAbortable(value: T, signal: AbortSignal): this {
		this.add(value);
		onAbort(signal, () => {
			this.delete(value);
		});
		return this;
	}
}
