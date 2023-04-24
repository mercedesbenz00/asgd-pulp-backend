"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("pulp_info", "createdBy", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("pulp_info", "updatedBy", {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn("pulp_info", "deleted", {
      type: Sequelize.BOOLEAN,
      field: "deleted",
      defaultValue: false,
    });
    await queryInterface.changeColumn("pulp_info", "pack_num", {
      type: Sequelize.INTEGER,
      field: "pack_num",
      references: {
        model: "pulp_shapes",
        key: "code",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("pulp_info", "createdBy");
    await queryInterface.removeColumn("pulp_info", "updatedBy");
    await queryInterface.removeColumn("pulp_info", "deleted");
    await queryInterface.changeColumn("pulp_info", "pack_num", {
      type: Sequelize.INTEGER,
      field: "pack_num",
    });
  },
};
