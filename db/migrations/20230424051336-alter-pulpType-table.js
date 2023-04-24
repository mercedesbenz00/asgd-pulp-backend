"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("pulp_types", "createdBy", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("pulp_types", "updatedBy", {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("pulp_types", "createdBy");
    await queryInterface.removeColumn("pulp_types", "updatedBy");
  },
};
