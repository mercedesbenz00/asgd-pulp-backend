"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "pulp_types",
      [
        {
          code: "SF",
          name: "短纤 Short Fibre",
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "LF",
          name: "长纤 Long fibre",
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "BTCMP",
          name: "化机浆 BCTMP",
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("pulp_types", null, {});
  },
};
