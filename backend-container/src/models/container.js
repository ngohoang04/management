'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class container extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  container.init({
    container_code: DataTypes.STRING,
    type: DataTypes.STRING,
    size: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'container',
  });
  return container;
};