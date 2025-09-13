'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookingContainer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Booking, { foreignKey: 'bookingId' });
      this.belongsTo(models.Container, { foreignKey: 'containerId' });
    }

  }
  BookingContainer.init({
    bookingId: DataTypes.INTEGER,
    containerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BookingContainer',
  });
  return BookingContainer;
};