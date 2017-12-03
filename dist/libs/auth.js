"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const config = require("./config");
const JWT_SECRET = config.app.jwt_secret;
async function verify(token) {
    try {
        if (!token) {
            return {
                error: "missing_token"
            };
        }
        let verifyResult = await jwt.verify(token, JWT_SECRET);
        return verifyResult;
    }
    catch (e) {
        console.log(e);
        return {
            error: e.message
        };
    }
}
async function createToken(obj) {
    let NOW = Date.now() / 1000;
    let payload = Object.assign({ exp: NOW + 86400, iat: NOW, iss: "eye-solution.vn" }, obj);
    let token = jwt.sign(payload, JWT_SECRET);
    return { token, payload };
}
exports.default = {
    verify,
    createToken
};

//# sourceMappingURL=auth.js.map
