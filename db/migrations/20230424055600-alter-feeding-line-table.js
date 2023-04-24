"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("feeding_lines", "machine_id", {
      type: Sequelize.INTEGER,
      field: "machine_id",
      references: {
        model: "machines",
        key: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("feeding_lines", "machine_id", {
      type: Sequelize.INTEGER,
      field: "machine_id",
      references: {
        model: "machines",
        key: "id",
      },
    });
  },
};
