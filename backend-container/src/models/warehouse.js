'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Warehouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Warehouse.hasMany(models.Container, {
        foreignKey: "warehouse_id",
        as: "containers",
      });

    }
  }
  Warehouse.init({
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    current_occupancy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: "Warehouse",
    tableName: "Warehouses",
    timestamps: true, // createdAt, updatedAt
  });
  return Warehouse;
};