"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function defineUser(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        email: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        fullname: DataTypes.STRING,
        role: DataTypes.ENUM("user", "admin"),
        gender: DataTypes.INTEGER
    }, {
        defaultScope: {}, scopes: { all: {} }
    });
    User.associate = function (schemas) {
        User.hasMany(schemas.UserSession);
        User.hasMany(schemas.Information);
    };
    return User;
}
exports.default = defineUser;

//# sourceMappingURL=user.js.map
