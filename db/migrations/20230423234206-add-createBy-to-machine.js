"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("machines", "createdAt", "created_at");
    await queryInterface.renameColumn("machines", "updatedAt", "updated_at");
    await queryInterface.renameColumn("machines", "createdBy", "created_by");
    await queryInterface.renameColumn("machines", "updatedBy", "updated_by");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("machines", "created_at", "createdAt");
    await queryInterface.renameColumn("machines", "updated_at", "updatedAt");
    await queryInterface.renameColumn("machines", "created_by", "createdBy");
    await queryInterface.renameColumn("machines", "updated_by", "updatedBy");
  },
};
