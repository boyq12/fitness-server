"use strict";
var events = require('events');
const event = new events.EventEmitter();
const eventEmitter = {
    register(code, cb) {
        event.on(code, cb);
    },
    invoke(code, data) {
        event.emit(code, data);
    }
};
module.exports = eventEmitter;

//# sourceMappingURL=event-emitter.js.map
