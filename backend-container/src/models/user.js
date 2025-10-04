'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Định nghĩa các mối quan hệ giữa model này với model khác
     */
    static associate(models) {
      // Ví dụ:
      // User.hasMany(models.Container, { foreignKey: 'user_id' });
    }

    /**
     * Hàm so sánh mật khẩu khi đăng nhập
     */
    async comparePassword(password) {
      return await bcrypt.compare(password, this.password);
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 50]
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      fullname: {
        type: DataTypes.STRING,
        allowNull: true
      },
      mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          is: /^[0-9]{9,15}$/i
        }
      },
      role: {
        type: DataTypes.ENUM('admin', 'user', 'manager'),
        defaultValue: 'user'
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      underscored: true,
      hooks: {
        /**
         * Tự động hash mật khẩu trước khi lưu
         */
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed('password')) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        }
      }
    }
  );

  return User;
};
