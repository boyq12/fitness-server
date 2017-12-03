"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_template_1 = require("../helpers/common/response-template");
class PermissionModel {
}
exports.PermissionModel = PermissionModel;
function requirePermission(require) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        const { role, roles, permission, permissions } = require;
        descriptor.value = function (...args) {
            let [req, res] = args;
            let jwt = req.jwt;
            if (!jwt || ['admin'].contains(jwt.role)) {
                return originalMethod.apply(this, args);
            }
            let notValid = false;
            notValid = (role && role != jwt.role)
                || (roles && Array.isArray(roles) && !roles.contains(jwt.role)
                    || ((permissions || permission) && !jwt.permissions)
                    || (permission && !jwt.permissions.contains(permission)));
            if (permissions && Array.isArray(permissions) && !notValid) {
                for (let p of permissions) {
                    notValid = jwt.permissions.contains(p) || notValid;
                }
            }
            if (notValid) {
                return res.send(response_template_1.default.accessDenied());
            }
            if (typeof require.afterValid == 'function') {
                let is = require.afterValid(jwt);
                if (!is) {
                    return res.send(response_template_1.default.accessDenied());
                }
            }
            return originalMethod.apply(this, args);
        };
        return descriptor;
    };
}
exports.requirePermission = requirePermission;

//# sourceMappingURL=authorization.js.map
