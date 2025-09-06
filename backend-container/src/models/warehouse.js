'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class warehouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      warehouse.hasMany(models.container, { foreignKey: 'warehouse_id', as: 'containerData' })
    }
  }
  warehouse.init({
    warehouse_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    current_occupancy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'warehouse',
    tableName: 'warehouses',
    underscored: true

  });
  return warehouse;
};