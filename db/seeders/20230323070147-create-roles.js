"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.bulkInsert('roles', [
    //   {
    //     id: 1,
    //     name: "Admin",
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     id: 2,
    //     name: "Operator",
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    // ], {});
  },

  async down(queryInterface, Sequelize) {
    // return queryInterface.bulkDelete('roles', {}, {});
  },
};
