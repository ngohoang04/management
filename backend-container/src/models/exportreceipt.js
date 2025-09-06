'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class exportreceipt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      exportreceipt.belongsTo(models.container, { foreignKey: 'container_id', as: 'containerData' })
      exportreceipt.belongsTo(models.customer, { foreignKey: 'customer_id', as: 'customerData' })
    }
  }
  exportreceipt.init({
    container_id: DataTypes.INTEGER,
    customer_id: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'exportreceipt',
    tableName: 'export_receipts',
    underscored: true
  });
  return exportreceipt;
};