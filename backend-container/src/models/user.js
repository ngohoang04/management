'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Report, {
        foreignKey: "created_by",
        as: "reports",
      });
      User.hasMany(models.ContainerHistory, {
        foreignKey: "updated_by",
        as: "containerHistories",
      });
      User.hasOne(models.Supplier, { foreignKey: "user_id", as: "supplierProfile" });
      User.hasOne(models.Customer, { foreignKey: "user_id", as: "customerProfile" });

    }
  }
  User.init({
    username: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    full_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    sequelize,
    modelName: "User",
    tableName: "Users",
    timestamps: true, // dùng createdAt, updatedAt mặc định

  });
  return User;
};