'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lectores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Lectores.init({
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
    roll: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Lectores',
  });
  return Lectores;
};