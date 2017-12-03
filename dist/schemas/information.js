"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function defineInformation(sequelize, DataTypes) {
    var Information = sequelize.define('Information', {
        name: DataTypes.STRING,
        value: DataTypes.FLOAT
    });
    Information.associate = function (schemas) {
        Information.belongsTo(schemas.User);
        Information.belongsTo(schemas.Muscle);
    };
    return Information;
}
exports.default = defineInformation;

//# sourceMappingURL=information.js.map
