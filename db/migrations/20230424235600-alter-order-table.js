"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("orders", "s_time_gap_min", {
      type: Sequelize.INTEGER,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("orders", "s_time_gap_min", {
      type: Sequelize.INTEGER,
    });
  },
};
