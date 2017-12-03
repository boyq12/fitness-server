import * as Sequelize from 'sequelize';

export interface MuscleAttributes {
}

export interface MuscleInstance extends Sequelize.Instance<MuscleAttributes> {
}

export default function defineMuscle(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    var Muscle = <any> sequelize.define('Muscle', {
        name: DataTypes.STRING
    });

    Muscle.associate = function(schemas) {
        
    }
    

    return Muscle;
}
