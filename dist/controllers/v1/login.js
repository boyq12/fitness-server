"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AController_1 = require("../interfaces/AController");
const schemas_1 = require("../../schemas");
const misc_1 = require("../../libs/misc");
const auth_1 = require("../../libs/auth");
const response_code_1 = require("enums/response-code");
const response_template_1 = require("../../helpers/common/response-template");
class Login extends AController_1.AController {
    async create(req, res) {
        try {
            let { email, password } = req.body;
            let user = await schemas_1.schemas.User.scope("all").findOne({ where: { email } });
            if (!user) {
                return res.send(response_template_1.default.error({
                    code: response_code_1.ResponseCode.DATA_NOT_FOUND,
                    message: "Email is not found",
                    error: { message: "Email is not found", key: 'email', data: email }
                }));
            }
            if (user.password != misc_1.default.sha256(password)) {
                return res.send(response_template_1.default.error({
                    code: response_code_1.ResponseCode.LOGIN_WRONG_PASSWORD,
                    message: "Wrong password",
                    error: { message: "Wrong password", key: 'password', data: password }
                }));
            }
            let session = await schemas_1.schemas.UserSession.create({});
            let j_user = user.toJSON();
            delete j_user.password;
            let jwt = await auth_1.default.createToken({
                id: j_user.id,
                username: j_user.username,
                role: j_user.role
            });
            console.log(jwt);
            await session.update({ token: jwt.token, expired_at: new Date(jwt.payload.exp * 1000) });
            return res.send(response_template_1.default.success({ token: jwt.token, data: j_user }));
        }
        catch (e) {
            console.error(e);
            return res.send(response_template_1.default.error({
                code: response_code_1.ResponseCode.SERVER_INTERNAL_ERROR,
                message: 'Server internal error',
                error: e
            }));
        }
    }
}
const login = new Login();
module.exports = login;

//# sourceMappingURL=login.js.map
