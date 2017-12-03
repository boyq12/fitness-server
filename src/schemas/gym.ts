import * as Sequelize from 'sequelize';

export interface GymAttributes {
}

export interface GymInstance extends Sequelize.Instance<GymAttributes> {
}

export default function defineGym(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    var Gym = <any> sequelize.define('Gym', {
        name: DataTypes.STRING,
        video_link: DataTypes.STRING,
        image_link: DataTypes.STRING,
        description: DataTypes.TEXT,
        guide: DataTypes.TEXT,
        met_1: DataTypes.FLOAT,
        met_2: DataTypes.FLOAT,
        met_3:DataTypes.FLOAT
    });

    Gym.associate = function(schemas) {
        Gym.belongsTo(schemas.Muscle)
    }
    


    return Gym;
}
