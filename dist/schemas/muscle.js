"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function defineMuscle(sequelize, DataTypes) {
    var Muscle = sequelize.define('Muscle', {
        name: DataTypes.STRING
    });
    Muscle.associate = function (schemas) {
    };
    return Muscle;
}
exports.default = defineMuscle;

//# sourceMappingURL=muscle.js.map
