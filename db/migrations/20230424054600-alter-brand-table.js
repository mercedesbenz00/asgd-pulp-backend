"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("brands", "createdBy", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("brands", "updatedBy", {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("brands", "createdBy");
    await queryInterface.removeColumn("brands", "updatedBy");
  },
};
