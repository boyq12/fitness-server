import * as Sequelize from 'sequelize';

export interface InformationAttributes {
}

export interface InformationInstance extends Sequelize.Instance<InformationAttributes> {
}

export default function defineInformation(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    var Information = <any> sequelize.define('Information', {
        name: DataTypes.STRING,
        value: DataTypes.FLOAT
    });

    Information.associate = function(schemas) {
        Information.belongsTo(schemas.User);
        Information.belongsTo(schemas.Muscle);
    }

    return Information;
}
