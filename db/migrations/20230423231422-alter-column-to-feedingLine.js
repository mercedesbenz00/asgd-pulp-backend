"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("feeding_lines", "machine_id", {
      type: Sequelize.INTEGER,
      field: "machine_id",
      references: {
        model: "machines",
        key: "id",
      },
    });

    await queryInterface.addColumn("feeding_lines", "password", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("feeding_lines", "created_by", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("feeding_lines", "updated_by", {
      type: Sequelize.STRING,
    });
    await queryInterface.renameColumn("feeding_lines", "desc", "name");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("feeding_lines", "machine_id", {
      type: Sequelize.INTEGER,
      field: "machine_id",
      references: {
        model: "machines",
        key: "id",
      },
    });
    await queryInterface.removeColumn("feeding_lines", "password");
    await queryInterface.removeColumn("feeding_lines", "created_by");
    await queryInterface.removeColumn("feeding_lines", "updated_by");
    await queryInterface.renameColumn("feeding_lines", "name", "desc");
  },
};
