import * as Sequelize from 'sequelize';

export default function defineUser(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
  var User: any = sequelize.define('User', {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    fullname: DataTypes.STRING,
    role: DataTypes.ENUM("user", "admin"),
    gender: DataTypes.INTEGER
  }, {
    defaultScope: {}, scopes: {all: {}}
  });

  User.associate = function (schemas) {
    User.hasMany(schemas.UserSession);
    User.hasMany(schemas.Information);
  };

  return User;
}
