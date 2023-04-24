"use strict";

const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "feeding_lines",
      [
        {
          machine_code: "PM11",
          code: "PM11-1#",
          name: "Feeding Line 1",
          password: bcrypt.hashSync(process.env.DEFAULT_USER_PASSWORD, 8),
          deleted: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          machine_code: "PM11",
          code: "PM11-2#",
          name: "Feeding Line 2",
          password: bcrypt.hashSync(process.env.DEFAULT_USER_PASSWORD, 8),
          deleted: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          machine_code: "PM11",
          code: "PM11-3#",
          name: "Feeding Line 3",
          password: bcrypt.hashSync(process.env.DEFAULT_USER_PASSWORD, 8),
          deleted: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          machine_code: "PM12",
          code: "PM12-1#",
          name: "Feeding Line 4",
          password: bcrypt.hashSync(process.env.DEFAULT_USER_PASSWORD, 8),
          deleted: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          machine_code: "PM12",
          code: "PM12-2#",
          name: "Feeding Line 5",
          password: bcrypt.hashSync(process.env.DEFAULT_USER_PASSWORD, 8),
          deleted: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          machine_code: "PM13",
          code: "PM13-1#",
          name: "Feeding Line 6",
          password: bcrypt.hashSync(process.env.DEFAULT_USER_PASSWORD, 8),
          deleted: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          machine_code: "PM13",
          code: "PM13-2#",
          name: "Feeding Line 7",
          password: bcrypt.hashSync(process.env.DEFAULT_USER_PASSWORD, 8),
          deleted: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("feeding_lines", null, {});
  },
};
