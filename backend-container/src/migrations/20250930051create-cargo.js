'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cargos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      container_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Containers',
          key: 'id'
        },
      },
      description: {
        type: Sequelize.TEXT
      },
      weight: {
        type: Sequelize.DECIMAL
      },
      volume: {
        type: Sequelize.DECIMAL
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cargos');
  }
};