import EventCode from "enums/event-code";

var events = require('events');
const event = new events.EventEmitter();

const eventEmitter =  {
  register(code: EventCode, cb) {
      event.on(code, cb)
  },

  invoke(code: EventCode, data) {
      event.emit(code, data);
  }
};

export = eventEmitter;
