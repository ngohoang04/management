'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // 1 location có nhiều container đang ở đó
      this.hasMany(models.Container, { foreignKey: 'locationId' });
      // 1 location có thể là điểm đi của nhiều booking
      this.hasMany(models.Booking, { foreignKey: 'originId', as: 'OriginBookings' });
      // 1 location có thể là điểm đến của nhiều booking
      this.hasMany(models.Booking, { foreignKey: 'destinationId', as: 'DestinationBookings' });
      // 1 location có thể là điểm đi của nhiều movement
      this.hasMany(models.Movement, { foreignKey: 'fromLocationId', as: 'FromMovements' });
      // 1 location có thể là điểm đến của nhiều movement
      this.hasMany(models.Movement, { foreignKey: 'toLocationId', as: 'ToMovements' });
    }

  }
  Location.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Location',
  });
  return Location;
};