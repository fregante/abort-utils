import {signalFromEvent} from './signal-from-event.js';

void fetch('https://example.com', {signal: signalFromEvent(document, 'click')});
