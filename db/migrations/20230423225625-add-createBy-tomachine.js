"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("machines", "createdBy", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("machines", "updatedBy", {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("machines", "createdBy");
    await queryInterface.removeColumn("machines", "createdBy");
  },
};
