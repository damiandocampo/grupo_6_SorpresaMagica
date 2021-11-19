'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.belongsTo(models.rols,{
        as: 'rols',
      })
    }
  };
  users.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING(100),
    email: DataTypes.STRING(100),
    password: DataTypes.STRING(100),
    image: DataTypes.STRING(100),
    rolId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};