'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('users', {
      "id": {
          "type": Sequelize.INTEGER,
          "field": "id",
          "autoIncrement": true,
          "primaryKey": true,
          "allowNull": false
      },
      "email": {
          "type": Sequelize.STRING,
          "field": "email",
          "unique": true
      },
      "phone": {
        "type": Sequelize.STRING,
        "field": "phone",
        "unique": true
      },
      "password": {
        "type": Sequelize.STRING,
        "field": "password"
      },
      "firstName": {
        "type": Sequelize.STRING,
        "field": "firstName"
      },
      "lastName": {
        "type": Sequelize.STRING,
        "field": "lastName"
      },
      "roleId": {
        "type": Sequelize.INTEGER,
        "field": "roleId",
        "references": {
          "model": 'roles',
          "key": 'id'
        },
        "allowNull": false
      },
      "isActive": {
        "type": Sequelize.BOOLEAN,
        "field": "isActive",
        "defaultValue": true
      },
      "deleted": {
        "type": Sequelize.BOOLEAN,
        "field": "deleted",
        "defaultValue": false
      },
      "is_tac_verified": {
        "type": Sequelize.BOOLEAN,
        "field": "is_tac_verified",
        "defaultValue": false
      },
      "tac_code": {
        "type": Sequelize.STRING,
        "field": "tac_code"
      },
      "tac_issued_date": {
        "type": Sequelize.DATE,
        "field": "tac_issued_date"
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
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('users');
  }
};
