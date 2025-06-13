/** Like AbortSignal.any(), except it accepts `undefined` as well, so you can pass in optional signals without further logic */
export function mergeSignals(...signals: Array<AbortSignal | {signal: AbortSignal} | undefined>): AbortSignal {
	const adjusted = signals
		.filter(Boolean)
		.map(signal =>
			signal instanceof AbortSignal
				? signal
				// @ts-expect-error idk what you're talking about, signal is not undefined
				: signal.signal);
	return AbortSignal.any(adjusted);
}
