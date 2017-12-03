import * as Sequelize from 'sequelize';


export default function defineUserSession(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
  var UserSession = <any> sequelize.define('UserSession', {
    token: DataTypes.STRING,
    expired_at: DataTypes.DATE
  });

  UserSession.associate = function (schemas) {
    UserSession.belongsTo(schemas.User);
  };

  return UserSession;
}
