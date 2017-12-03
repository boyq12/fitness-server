"use strict";
const auth_1 = require("libs/auth");
const socket_manager_1 = require("sockets/socket_manager");
const response_code_1 = require("enums/response-code");
var controller = require("sockets/controllers");
var eventEmitter = require("events/event-emitter");
var fn = function (socket) {
    console.log("Socket connected", socket.id);
    socket.use(async function (s, next) {
        console.log(s);
        try {
            s[1] = JSON.parse(s[1]);
        }
        catch (e) {
        }
        let token = socket.token || s[1].token || null;
        let response = {};
        let result = await auth_1.default.verify(token);
        if (result && !result.error) {
            socket.jwt = result;
            socket.token = token;
            s[1].jwt = result;
            response = {
                success: true,
                data: null
            };
            socket.uid = result.id;
            socket_manager_1.default.registerClient(result.id, socket);
            next();
        }
        else {
            socket_manager_1.default.removeClient(socket.uid, socket.id);
            response = {
                success: false,
                error: {
                    code: response_code_1.ResponseCode.SESSION_TIMEOUT,
                    message: "Token is expired",
                    data: {
                        token: token
                    }
                }
            };
            if (s[2]) {
                s[2](response);
            }
            else {
            }
        }
    });
    socket.on('login', async function (data, cb) {
        let token = data.token;
        let response = {};
        let result = await auth_1.default.verify(token);
        if (result && !result.error) {
            socket.jwt = result;
            socket.uid = result.id;
            socket.token = token;
            socket_manager_1.default.registerClient(result.id, socket);
            response = {
                success: true,
                data: null
            };
        }
        else {
            response = {
                success: false,
                error: {
                    code: response_code_1.ResponseCode.SESSION_TIMEOUT,
                    message: "Token is expired",
                    data: {
                        token
                    }
                }
            };
        }
        cb(response);
    });
    socket.on('connection', function () {
        console.log("on connection");
    });
    socket.on('disconnect', function () {
        socket_manager_1.default.removeClient(socket.uid, socket.id);
    });
    socket.on("test", function (data, cb) {
        console.log(data, cb);
        cb({
            success: true,
            message: "connect successful"
        });
    });
};
module.exports = fn;

//# sourceMappingURL=route.js.map
