"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "products",
      [
        {
          code: "BPW",
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "BPW-NE",
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "NE",
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "BEKP",
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "BSKP",
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {});
  },
};
