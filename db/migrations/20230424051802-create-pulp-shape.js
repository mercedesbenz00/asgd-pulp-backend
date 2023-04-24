"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("pulp_shapes", {
      id: {
        type: Sequelize.INTEGER,
        field: "id",
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      code: {
        type: Sequelize.INTEGER,
        unique: true,
        field: "code",
      },
      name: {
        type: Sequelize.STRING,
        field: "name",
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        field: "deleted",
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        field: "createdAt",
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: "updatedAt",
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      createdBy: {
        type: Sequelize.STRING,
        field: "createdBy",
      },
      updatedBy: {
        type: Sequelize.STRING,
        field: "updatedBy",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("pulp_shapes");
  },
};
