'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('cameras', {
      id: {
        type: Sequelize.INTEGER,
        field: "id",
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      ip_address: {
        type: Sequelize.STRING,
        unique: true,
        field: "ip_address",
      },
      line_code: {
        type: Sequelize.STRING,
        field: "line_code",
        references: {
          model: 'feeding_lines',
          key: 'code'
        },
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
    await queryInterface.dropTable('cameras');
  }
};
