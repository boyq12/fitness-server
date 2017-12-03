import ResponseTemplate from "../helpers/common/response-template";

export class PermissionModel {
    permission ?: string;
    permissions ?: Array<string>;
    role?: string;
    roles?: Array<string>;
    afterValid?: (jwt: any) => void;
}

export function requirePermission(require:PermissionModel) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        const {role, roles, permission, permissions} = require;
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
                return res.send(ResponseTemplate.accessDenied());
            }

            if (typeof require.afterValid == 'function') {
                let is = require.afterValid(jwt);
                if (!is) {
                    return res.send(ResponseTemplate.accessDenied());
                }
            }

            return originalMethod.apply(this, args);
        };

        return descriptor;
    }
}
