# timeoutSignal(milliseconds, reason?)

Like `AbortSignal.timeout`, but it throws a `TimeoutError` with an optional custom message.

```ts
import {timeoutSignal} from 'abort-utils';

const signalWithError = timeoutSignal(5000, 'timeout expired');

signal.addEventListener('abort', () => {
  console.log('Because of', signal.reason);
  // Because of TimeoutError: timeout expired
});
```

## milliseconds

Type: `number`

The number of milliseconds before the signal aborts.

## reason

Type: `string`
Default: `'The operation timed out'`

The error message to provide when aborting.

## `TimeoutError`

The package also exports a `TimeoutError` class that extends the built-in `Error` class and can be used as a standalone error type.

```ts
import {TimeoutError} from 'abort-utils';

throw new TimeoutError('timeout expired');
```

## [Main page ⎀](../readme.md)
