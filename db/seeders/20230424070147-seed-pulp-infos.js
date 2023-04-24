"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "pulp_info",
      [
        {
          brand_code: "金鱼 (HFP)",
          product_code: "BPW",
          type_code: "SF",
          pack_num: 4,
          unit_weight: 20,
          deleted: false,
          trained: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          brand_code: "金鱼 (TFP)",
          product_code: "BPW",
          type_code: "LF",
          pack_num: 8,
          unit_weight: 20,
          deleted: false,
          trained: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          brand_code: "金鱼 (B字头)",
          product_code: "NE",
          type_code: "BTCMP",
          pack_num: 6,
          unit_weight: 20,
          deleted: false,
          trained: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          brand_code: "诺迪克",
          product_code: "BPW-NE",
          type_code: "SF",
          pack_num: 4,
          unit_weight: 20,
          deleted: false,
          trained: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          brand_code: "骑士",
          product_code: "BEKP",
          type_code: "LF",
          pack_num: 6,
          unit_weight: 20,
          deleted: false,
          trained: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          brand_code: "北海",
          product_code: "BSKP",
          type_code: "BTCMP",
          pack_num: 4,
          unit_weight: 20,
          deleted: true,
          trained: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          brand_code: "瑞安 (天栢)",
          product_code: "BEKP",
          type_code: "SF",
          pack_num: 8,
          unit_weight: 20,
          deleted: false,
          trained: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("pulp_info", null, {});
  },
};
