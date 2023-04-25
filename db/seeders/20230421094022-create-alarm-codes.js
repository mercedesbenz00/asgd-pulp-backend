"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "alarm_types",
      [
        {
          id: 1,
          code: "UNKNOWN_FEED",
          name: "Unkown feed",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          code: "WRONG_FEED",
          name: "Wrong feed",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          code: "WRONG_RATIO",
          name: "Wrong ratio",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          code: "BEFORE_TIME_SET",
          name: "Fed before time set",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("alarm_types", {}, {});
  },
};
