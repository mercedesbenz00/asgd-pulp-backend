"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "pulp_shapes",
      [
        {
          code: 4,
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: 6,
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: 8,
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("pulp_shapes", null, {});
  },
};
