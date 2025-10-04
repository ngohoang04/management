'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Supplier extends Model {
    /**
     * Định nghĩa các mối quan hệ giữa Supplier và các model khác
     */
    static associate(models) {
      // Ví dụ: Supplier có thể cung cấp nhiều Container hoặc Product
      // Supplier.hasMany(models.Container, { foreignKey: 'supplier_id', as: 'containers' });
    }
  }

  Supplier.init(
    {
      // ID nhà cung cấp (khóa chính)
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      // Tên nhà cung cấp
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 100]
        }
      },

      // Người liên hệ chính
      contact_person: {
        type: DataTypes.STRING,
        allowNull: true
      },

      // Số điện thoại
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[0-9]{9,15}$/i
        }
      },

      // Email liên hệ
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },

      // Địa chỉ nhà cung cấp
      address: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      modelName: 'Supplier',
      tableName: 'suppliers',
      underscored: true, // dùng snake_case trong DB
      timestamps: true // tự thêm created_at, updated_at
    }
  );

  return Supplier;
};
