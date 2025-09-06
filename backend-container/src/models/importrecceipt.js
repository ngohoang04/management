'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class importRecceipt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      importRecceipt.belongsTo(models.container, { foreignKey: 'container_id', as: 'containerData' })
      importRecceipt.belongsTo(models.supplier, { foreignKey: 'supplier_id', as: 'supplierData' })
    }
  }
  importRecceipt.init({
    container_id: DataTypes.INTEGER,
    supplier_id: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'importRecceipt',
    tableName: 'import_recceipts',
    underscored: true
  });
  return importRecceipt;
};