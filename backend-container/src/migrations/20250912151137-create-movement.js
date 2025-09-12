'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Movements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      containerId: {
        type: Sequelize.INTEGER
      },
      fromLocationId: {
        type: Sequelize.INTEGER
      },
      toLocationId: {
        type: Sequelize.INTEGER
      },
      departureTime: {
        type: Sequelize.DATE
      },
      arrivalTime: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.ENUM('Planned', 'In Transit', 'Arrived', 'Delayed'),
        defaultValue: 'Planned'
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
    await queryInterface.dropTable('Movements');
  }
};