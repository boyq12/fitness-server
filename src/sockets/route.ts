import auth from "libs/auth";
import socketManager from "sockets/socket_manager";
import {ResponseCode} from "enums/response-code";

var controller = require("sockets/controllers");
var eventEmitter = require("events/event-emitter");


var fn = function (socket) {

  console.log("Socket connected", socket.id);

  socket.use(async function (s, next) {
    console.log(s);
    try {
      s[1] = JSON.parse(s[1]);
    } catch (e) {
    }
    let token = socket.token || s[1].token || null;
    let response = {};
    let result = await auth.verify(token);
    if (result && !(result as any).error) {
      socket.jwt = result;
      socket.token = token;
      s[1].jwt = result;
      response = {
        success: true,
        data: null
      };
      socket.uid = (result as any).id;
      socketManager.registerClient((result as any).id, socket);
      next();
    } else {
      socketManager.removeClient(socket.uid, socket.id);
      response = {
        success: false,
        error: {
          code: ResponseCode.SESSION_TIMEOUT,
          message: "Token is expired",
          data: {
            token: token
          }
        }
      };
      if (s[2]) {
        s[2](response);
      } else {

      }
    }
  });

  socket.on('login', async function (data, cb) {
    let token = data.token;
    let response = {};
    let result = await auth.verify(token);
    if (result && !(result as any).error) {
      socket.jwt = result;
      socket.uid = (result as any).id;
      socket.token = token;
      socketManager.registerClient((result as any).id, socket);
      response = {
        success: true,
        data: null
      }
    } else {
      response = {
        success: false,
        error: {
          code: ResponseCode.SESSION_TIMEOUT,
          message: "Token is expired",
          data: {
            token
          }
        }
      }
    }
    cb(response);
  });
  socket.on('connection', function () {
    console.log("on connection");
  });
  socket.on('disconnect', function () {
    socketManager.removeClient(socket.uid, socket.id);
  });

  socket.on("test", function (data, cb) {
    console.log(data, cb);
    cb({
      success: true,
      message: "connect successful"
    });
  });

};

export = fn;
