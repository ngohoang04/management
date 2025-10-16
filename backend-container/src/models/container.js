'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Container extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Container.belongsTo(models.Warehouse, {
        foreignKey: "warehouse_id",
        as: "warehouse",
      });
      Container.belongsTo(models.Supplier, {
        foreignKey: "supplier_id",
        as: "supplier",
      });
      Container.hasMany(models.Cargo, {
        foreignKey: "container_id",
        as: "cargos",
      });
      Container.hasMany(models.ContainerHistory, {
        foreignKey: "container_id",
        as: "histories",
      });
      Container.belongsTo(models.Customer, {
        foreignKey: "customer_id",
        as: "customer",
      });// Thêm quan hệ với Customer

    }
  }
  Container.init({
    container_code: DataTypes.STRING,
    type: DataTypes.STRING,
    size: DataTypes.STRING,
    status: DataTypes.STRING,
    warehouse_id: DataTypes.INTEGER,
    supplier_id: DataTypes.INTEGER,
    customer_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: "Container",
    tableName: "Containers",
    timestamps: false,
  });
  return Container;
};