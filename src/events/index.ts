import * as path from "path";
import {schemas} from "schemas";
import oneSignal from "libs/one_signal";
import socketManager from "sockets/socket_manager";
import eventEmitter = require("./event-emitter");

require('fs').readdirSync(__dirname).filter((file: string) => {
    return path.extname(file) != ".map" && path.basename(file, '.js') != "event-emitter";
}).forEach(function (file) {
    if (file === 'index.js') return;
    console.log("File: ", file)
    let handler = require(path.join(__dirname, file));
  let additionServices = {
        oneSignal,
        socketManager
    };
  handler(eventEmitter, schemas, additionServices);
    // module.exports[path.basename(file, '.js')] = handler;
});
