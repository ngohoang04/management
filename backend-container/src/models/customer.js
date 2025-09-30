'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Container, {
        foreignKey: "customer_id",
        as: "containers",
      });
      Customer.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });

    }
  }
  Customer.init({
    name: DataTypes.STRING,
    contact_person: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: "Customer",
    tableName: "Customers",
    timestamps: true,
  });
  return Customer;
};