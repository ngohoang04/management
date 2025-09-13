'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Movement thuộc về 1 container
      this.belongsTo(models.Container, { foreignKey: 'containerId' });
      // Movement có location xuất phát
      this.belongsTo(models.Location, { foreignKey: 'fromLocationId', as: 'FromLocation' });
      // Movement có location đích
      this.belongsTo(models.Location, { foreignKey: 'toLocationId', as: 'ToLocation' });
    }

  }
  Movement.init({
    containerId: DataTypes.INTEGER,
    fromLocationId: DataTypes.INTEGER,
    toLocationId: DataTypes.INTEGER,
    departureTime: DataTypes.DATE,
    arrivalTime: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Movement',
  });
  return Movement;
};