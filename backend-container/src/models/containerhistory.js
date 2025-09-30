'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContainerHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ContainerHistory.belongsTo(models.Container, {
        foreignKey: "container_id",
        as: "container",
      });
      ContainerHistory.belongsTo(models.User, {
        foreignKey: "updated_by",
        as: "updatedBy",
      });
    }
  }
  ContainerHistory.init({
    container_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    updated_by: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: "ContainerHistory",
    tableName: "ContainerHistories",
    timestamps: true,
  });
  return ContainerHistory;
};