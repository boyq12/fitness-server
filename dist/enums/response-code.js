"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseCode;
(function (ResponseCode) {
    ResponseCode[ResponseCode["ACCESS_DENIED"] = 100] = "ACCESS_DENIED";
    ResponseCode[ResponseCode["LOGIN_WRONG_PASSWORD"] = 101] = "LOGIN_WRONG_PASSWORD";
    ResponseCode[ResponseCode["PERMISSION_IMPLICIT"] = 103] = "PERMISSION_IMPLICIT";
    ResponseCode[ResponseCode["TOKEN_NOT_VALID"] = 104] = "TOKEN_NOT_VALID";
    ResponseCode[ResponseCode["SESSION_TIMEOUT"] = 105] = "SESSION_TIMEOUT";
    ResponseCode[ResponseCode["SUCCESS"] = 200] = "SUCCESS";
    ResponseCode[ResponseCode["REQUEST_ACCEPTED"] = 201] = "REQUEST_ACCEPTED";
    ResponseCode[ResponseCode["REQUEST_REFUSED"] = 202] = "REQUEST_REFUSED";
    ResponseCode[ResponseCode["INPUT_DATA_NULL"] = 300] = "INPUT_DATA_NULL";
    ResponseCode[ResponseCode["INPUT_DATA_WRONG_FORMAT"] = 301] = "INPUT_DATA_WRONG_FORMAT";
    ResponseCode[ResponseCode["DATA_UNIQUE_IMPLICIT"] = 400] = "DATA_UNIQUE_IMPLICIT";
    ResponseCode[ResponseCode["DATA_NOT_FOUND"] = 401] = "DATA_NOT_FOUND";
    ResponseCode[ResponseCode["DATA_NOT_AVAILABLE"] = 402] = "DATA_NOT_AVAILABLE";
    ResponseCode[ResponseCode["DATA_IMPLICIT"] = 403] = "DATA_IMPLICIT";
    ResponseCode[ResponseCode["DATA_CONTRAINT_VIOLATED"] = 404] = "DATA_CONTRAINT_VIOLATED";
    ResponseCode[ResponseCode["SERVER_INTERNAL_ERROR"] = 500] = "SERVER_INTERNAL_ERROR";
})(ResponseCode = exports.ResponseCode || (exports.ResponseCode = {}));

//# sourceMappingURL=response-code.js.map
