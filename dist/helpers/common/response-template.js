"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_code_1 = require("enums/response-code");
class ResponseTemplate {
    success(obj) {
        return Object.assign({ success: true }, obj);
    }
    error({ code, message, error }) {
        return {
            success: false,
            error: {
                code,
                message,
                data: error
            }
        };
    }
    accessDenied(message, data) {
        return {
            success: false,
            error: {
                code: response_code_1.ResponseCode.PERMISSION_IMPLICIT,
                message: message || 'Access denied',
                data: data
            }
        };
    }
    dataNotFound(name, data = null) {
        return {
            success: false,
            error: {
                message: `Không tìm thấy ${name}`,
                code: response_code_1.ResponseCode.DATA_NOT_FOUND,
                error: data
            }
        };
    }
    inputNullImplicit(field) {
        return {
            success: false,
            error: {
                message: `${field} không được bỏ trống`,
                code: response_code_1.ResponseCode.INPUT_DATA_NULL,
                error: null
            }
        };
    }
    internalError(message, data) {
        return {
            success: false,
            error: {
                code: response_code_1.ResponseCode.SERVER_INTERNAL_ERROR,
                message: message || 'Server internal error',
                data: data
            }
        };
    }
}
exports.ResponseTemplate = ResponseTemplate;
const responseTemplate = new ResponseTemplate();
exports.default = responseTemplate;

//# sourceMappingURL=response-template.js.map
