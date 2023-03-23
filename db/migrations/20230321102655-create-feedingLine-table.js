'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('feeding_lines', {
      id: {
        type: Sequelize.INTEGER,
        field: "id",
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING,
        unique: true,
        field: "code",
      },
      desc: {
        type: Sequelize.STRING,
        field: "desc",
      },
      machine_code: {
        type: Sequelize.STRING,
        field: "machine_code",
        references: {
          model: 'machines',
          key: 'code'
        },
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        field: "deleted",
        defaultValue: false
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
    await queryInterface.dropTable('feeding_lines');
  }
};
