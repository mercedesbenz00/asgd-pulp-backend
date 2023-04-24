"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "brands",
      [
        {
          code: "金鱼 (HFP)",
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "金鱼 (TFP)",
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "金鱼 (B字头)",
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "诺迪克",
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "骑士",
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "北海",
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          code: "瑞安 (天栢)",
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("brands", null, {});
  },
};
