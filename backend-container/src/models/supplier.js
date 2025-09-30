'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Supplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Supplier.hasMany(models.Container, {
        foreignKey: "supplier_id",
        as: "containers",
      });
      Supplier.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  Supplier.init({
    name: DataTypes.STRING,
    contact_person: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: "Supplier",
    tableName: "Suppliers",
    timestamps: true,
  });
  return Supplier;
};