'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class containerstatushistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      containerstatushistory.belongsTo(models.container, { foreignKey: 'container_id', as: 'containerData' })
    }
  }
  containerstatushistory.init({
    container_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    updated_by: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'containerstatushistory',
    tableName: 'container_status_histories',
    underscored: true
  });
  return containerstatushistory;
};