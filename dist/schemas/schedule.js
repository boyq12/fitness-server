"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function defineSchedule(sequelize, DataTypes) {
    var Schedule = sequelize.define('Schedule', {
        status: DataTypes.INTEGER,
        time: DataTypes.DATE
    });
    Schedule.associate = function (schemas) {
        Schedule.belongsTo(schemas.User);
        Schedule.belongsTo(schemas.Gym);
    };
    return Schedule;
}
exports.default = defineSchedule;

//# sourceMappingURL=schedule.js.map
