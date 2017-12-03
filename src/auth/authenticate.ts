import auth from "../libs/auth";
import helper from "helpers/common/controller-helper";
import {ResponseCode} from "enums/response-code";
import {schemas} from "../schemas/index";
import responseTemplate from "../helpers/common/response-template";

var excludeAuthPaths = [
    "/staff-login",
    "/login",
    "/token/check",
    "/user/forgotpassword",
    "/user/reset-password",
    "/user/active"
];

async function updateViewTime(p_id, role) {
    if(role == "merchant") {
        let profile = await schemas.UserProfile.findByPrimary(p_id);
        await profile.update({
            last_view: new Date()
        });
    }
}

export const authenticate = {
    async mIsAuthorized(req, res, next) {
        try {
            let baseUrl = req.originalUrl;

            for (let path of excludeAuthPaths) {
                if (baseUrl.contains(path))
                    return next();
            }

            let token = req.headers.authorization;
            let result = await auth.verify(token);

            if (req.method == "POST" && baseUrl.endsWith("/user")) {
                req.jwt = !(result as any).error && result || null;
                return next();
            }

            updateViewTime((result as any).p_id, (result as any).role);

            req.jwt = result;
            return next();
        } catch (e) {
            console.error(e);
            return res.send(responseTemplate.error({
              code: ResponseCode.ACCESS_DENIED,
              message: 'Access denied',
              error: null
            }));
        }
    },
};

export default authenticate;
