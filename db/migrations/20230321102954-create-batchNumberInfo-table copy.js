'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('batch_number_info', {
      id: {
        type: Sequelize.INTEGER,
        field: "id",
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      number: {
        type: Sequelize.STRING,
        unique: true,
        field: "number",
      },
      unit_weight: {
        type: Sequelize.FLOAT,
      },
      createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
          defaultValue: Sequelize.NOW
      },
      updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
          defaultValue: Sequelize.NOW
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('batch_number_info');
  }
};
