"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ControllerHelper {
    checkNull(obj) {
        for (let key of Object.keys(obj)) {
            if (!obj[key])
                return {
                    error: true,
                    field: key
                };
        }
        return {
            error: false,
            field: null
        };
    }
}
exports.ControllerHelper = ControllerHelper;
const helper = new ControllerHelper();
exports.default = helper;

//# sourceMappingURL=controller-helper.js.map
