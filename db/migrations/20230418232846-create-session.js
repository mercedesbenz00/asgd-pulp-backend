"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Sessions", {
      sid: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      userId: Sequelize.STRING,
      expires: Sequelize.DATE,
      data: Sequelize.TEXT,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Sessions");
  },
};
