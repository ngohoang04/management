'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class cargo extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            cargo.belongsTo(models.container, { foreignKey: 'container_id', as: 'containerData' })
        }
    }
    cargo.init({
        container_id: DataTypes.INTEGER,
        description: DataTypes.TEXT,
        weight: DataTypes.INTEGER,
        volume: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'cargo',
        tableName: 'cargos',
        underscored: true
    });
    return cargo;
};