'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cargo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cargo.belongsTo(models.Container, {
        foreignKey: "container_id",
        as: "container",
      });
    }
  }
  Cargo.init({
    container_id: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    weight: DataTypes.DECIMAL,
    volume: DataTypes.DECIMAL,
  }, {
    sequelize,
    modelName: "Cargo",
    tableName: "Cargos",
    timestamps: false, // chỉ có created_at, không cần updatedAt

  });
  return Cargo;
};