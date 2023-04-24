"use strict";
var bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.bulkInsert('users', [{
    //   id: 1,
    //   email: process.env.DEFAULT_USER_EMAIL,
    //   password: bcrypt.hashSync(process.env.DEFAULT_USER_PASSWORD, 8),
    //   roleId: 1,
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // }], {});
  },

  async down(queryInterface, Sequelize) {
    // return queryInterface.bulkDelete('users', { email: process.env.DEFAULT_USER_EMAIL }, {});
  },
};
