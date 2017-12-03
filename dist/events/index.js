"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const schemas_1 = require("schemas");
const one_signal_1 = require("libs/one_signal");
const socket_manager_1 = require("sockets/socket_manager");
const eventEmitter = require("./event-emitter");
require('fs').readdirSync(__dirname).filter((file) => {
    return path.extname(file) != ".map" && path.basename(file, '.js') != "event-emitter";
}).forEach(function (file) {
    if (file === 'index.js')
        return;
    console.log("File: ", file);
    let handler = require(path.join(__dirname, file));
    let additionServices = {
        oneSignal: one_signal_1.default,
        socketManager: socket_manager_1.default
    };
    handler(eventEmitter, schemas_1.schemas, additionServices);
    // module.exports[path.basename(file, '.js')] = handler;
});

//# sourceMappingURL=index.js.map
