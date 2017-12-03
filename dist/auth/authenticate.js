"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../libs/auth");
const response_code_1 = require("enums/response-code");
const index_1 = require("../schemas/index");
const response_template_1 = require("../helpers/common/response-template");
var excludeAuthPaths = [
    "/staff-login",
    "/login",
    "/token/check",
    "/user/forgotpassword",
    "/user/reset-password",
    "/user/active"
];
async function updateViewTime(p_id, role) {
    if (role == "merchant") {
        let profile = await index_1.schemas.UserProfile.findByPrimary(p_id);
        await profile.update({
            last_view: new Date()
        });
    }
}
exports.authenticate = {
    async mIsAuthorized(req, res, next) {
        try {
            let baseUrl = req.originalUrl;
            for (let path of excludeAuthPaths) {
                if (baseUrl.contains(path))
                    return next();
            }
            let token = req.headers.authorization;
            let result = await auth_1.default.verify(token);
            if (req.method == "POST" && baseUrl.endsWith("/user")) {
                req.jwt = !result.error && result || null;
                return next();
            }
            updateViewTime(result.p_id, result.role);
            req.jwt = result;
            return next();
        }
        catch (e) {
            console.error(e);
            return res.send(response_template_1.default.error({
                code: response_code_1.ResponseCode.ACCESS_DENIED,
                message: 'Access denied',
                error: null
            }));
        }
    },
};
exports.default = exports.authenticate;

//# sourceMappingURL=authenticate.js.map
