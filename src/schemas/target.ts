import * as Sequelize from 'sequelize';

export interface TargetAttributes {
}

export interface TargetInstance extends Sequelize.Instance<TargetAttributes> {
}

export default function defineTarget(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    var Target = <any> sequelize.define('Target', {
        time: DataTypes.DATE,
        name: DataTypes.ENUM("GAINWEIGHT", "LOOSEWEIGHT", "MUSCLE"),
        target: DataTypes.FLOAT,
        muscle_ids: DataTypes.ARRAY(DataTypes.INTEGER)
    });

    Target.associate = function(schemas) {
        Target.belongsTo(schemas.User);
    }

    return Target;
}
