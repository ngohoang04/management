'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Warehouse extends Model {
    /**
     * Định nghĩa mối quan hệ giữa Warehouse và các model khác
     */
    static associate(models) {
      // Ví dụ: một kho chứa nhiều container
      // Warehouse.hasMany(models.Container, { foreignKey: 'warehouse_id', as: 'containers' });
    }
  }

  Warehouse.init(
    {
      // ID kho (primary key)
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      // Tên kho
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 100]
        }
      },

      // Địa chỉ hoặc vị trí của kho
      location: {
        type: DataTypes.STRING,
        allowNull: false
      },

      // Sức chứa tối đa (tổng số container/khoang)
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0
        }
      },

      // Số lượng hiện tại đang chứa
      current_occupancy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0
        }
      }
    },
    {
      sequelize,
      modelName: 'Warehouse',
      tableName: 'warehouses',
      underscored: true, // Chuyển tên cột sang snake_case
      timestamps: true // Tự động thêm created_at, updated_at
    }
  );

  return Warehouse;
};
