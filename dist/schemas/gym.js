"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function defineGym(sequelize, DataTypes) {
    var Gym = sequelize.define('Gym', {
        name: DataTypes.STRING,
        video_link: DataTypes.STRING,
        image_link: DataTypes.STRING,
        description: DataTypes.TEXT,
        guide: DataTypes.TEXT,
        met_1: DataTypes.FLOAT,
        met_2: DataTypes.FLOAT,
        met_3: DataTypes.FLOAT
    });
    Gym.associate = function (schemas) {
        Gym.belongsTo(schemas.Muscle);
    };
    return Gym;
}
exports.default = defineGym;

//# sourceMappingURL=gym.js.map
