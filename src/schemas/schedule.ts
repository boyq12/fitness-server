import * as Sequelize from 'sequelize';

export interface ScheduleAttributes {
}

export interface ScheduleInstance extends Sequelize.Instance<ScheduleAttributes> {
}

export default function defineSchedule(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    var Schedule = <any> sequelize.define('Schedule', {
        status: DataTypes.INTEGER,
        time: DataTypes.DATE
    });

    Schedule.associate = function(schemas) {
        Schedule.belongsTo(schemas.User);
        Schedule.belongsTo(schemas.Gym);
    }

    return Schedule;
}
