'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Report.belongsTo(models.User, {
        foreignKey: "created_by",
        as: "author",
      });
    }
  }
  Report.init({
    report_type: DataTypes.STRING,
    content: DataTypes.TEXT,
    created_by: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: "Report",
    tableName: "Reports",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updatedAt",
  });
  return Report;
};