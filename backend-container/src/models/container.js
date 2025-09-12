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
      this.belongsTo(models.Customer, { foreignKey: 'ownerId' });
      // Container đang ở 1 location
      this.belongsTo(models.Location, { foreignKey: 'locationId' });
      // Container có nhiều movement (lịch trình)
      this.hasMany(models.Movement, { foreignKey: 'containerId' });
      // Container có thể thuộc nhiều booking thông qua bảng trung gian
      this.belongsToMany(models.Booking, {
        through: models.BookingContainer,
        foreignKey: 'containerId',
        otherKey: 'bookingId'
      });
    }
  }
  Container.init({
    code: DataTypes.STRING,
    type: DataTypes.STRING,
    size: DataTypes.STRING,
    weight: DataTypes.DECIMAL,
    status: DataTypes.STRING,
    locationId: DataTypes.INTEGER,
    ownerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Container',
  });
  return Container;
};