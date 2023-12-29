# linkControllers(...controllers)

<img src="https://github.com/fregante/abort-utils/assets/1402241/425db147-0feb-4e31-a8a0-0a458426a617" width="300">

It can link multiple controllers so that when one aborts, they all abort with the same reason.

```ts
import {linkControllers} from 'abort-utils';

const controller1 = new AbortController();
const controller2 = new AbortController();
const controller3 = new AbortController();

linkControllers(controller1, controller2, controller3);

// Abort second controller and the others will also be aborted
controller2.abort()
```

## controllers

Type: `AbortController`, `AbortSignal`

The controllers or signals to listen to and abort. `linkControllers` only makes sense if you pass at least one controller because abort signals cannot be aborted by this function.

If you only have signals, prefer [`mergeSignals`](./merge-signals.md) instead.

## [Main page ⏎](../readme.md)
