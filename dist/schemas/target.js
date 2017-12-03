"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function defineTarget(sequelize, DataTypes) {
    var Target = sequelize.define('Target', {
        time: DataTypes.DATE,
        name: DataTypes.ENUM("GAINWEIGHT", "LOOSEWEIGHT", "MUSCLE"),
        target: DataTypes.FLOAT,
        muscle_ids: DataTypes.ARRAY(DataTypes.INTEGER)
    });
    Target.associate = function (schemas) {
        Target.belongsTo(schemas.User);
    };
    return Target;
}
exports.default = defineTarget;

//# sourceMappingURL=target.js.map
