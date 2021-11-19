'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rols extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      rols.hasMany(models.users, {
        as :'users',
        //foreignKey : "rol_id"
      })
    }
  };
  rols.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'rols',
  });
  return rols;
};