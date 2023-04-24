"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "machines",
      [
        {
          code: "PM11",
          name: "Paper Machine 11",
          deleted: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          code: "PM12",
          name: "Paper Machine 12",
          deleted: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          code: "PM13",
          name: "Paper Machine 13",
          deleted: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("machines", null, {});
  },
};
