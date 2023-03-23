'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('roles', {
      "id": {
          "type": Sequelize.INTEGER,
          "field": "id",
          "autoIncrement": true,
          "primaryKey": true,
          "allowNull": false
      },
      "name": {
          "type": Sequelize.STRING,
          "field": "name",
          "unique": true
      },
      "createdAt": {
          "type": Sequelize.DATE,
          "field": "createdAt",
          "allowNull": false,
          "defaultValue": Sequelize.NOW
      },
      "updatedAt": {
          "type": Sequelize.DATE,
          "field": "updatedAt",
          "allowNull": false,
          "defaultValue": Sequelize.NOW
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('roles');
     */
    await queryInterface.dropTable('roles');
  }
};
