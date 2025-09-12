'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Booking thuộc về 1 khách hàng
      this.belongsTo(models.Customer, { foreignKey: 'customerId' });
      // Booking có điểm đi (origin location)
      this.belongsTo(models.Location, { foreignKey: 'originId', as: 'Origin' });
      // Booking có điểm đến (destination location)
      this.belongsTo(models.Location, { foreignKey: 'destinationId', as: 'Destination' });
      // Booking có nhiều container thông qua bảng trung gian
      this.belongsToMany(models.Container, {
        through: models.BookingContainer,
        foreignKey: 'bookingId',
        otherKey: 'containerId'
      });
    }

  }
  Booking.init({
    customerId: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    originId: DataTypes.INTEGER,
    destinationId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};