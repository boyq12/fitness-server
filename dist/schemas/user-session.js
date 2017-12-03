"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function defineUserSession(sequelize, DataTypes) {
    var UserSession = sequelize.define('UserSession', {
        token: DataTypes.STRING,
        expired_at: DataTypes.DATE
    });
    UserSession.associate = function (schemas) {
        UserSession.belongsTo(schemas.User);
    };
    return UserSession;
}
exports.default = defineUserSession;

//# sourceMappingURL=user-session.js.map
