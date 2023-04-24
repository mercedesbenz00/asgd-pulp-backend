"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("products", "createdBy", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("products", "updatedBy", {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("products", "createdBy");
    await queryInterface.removeColumn("products", "updatedBy");
  },
};
