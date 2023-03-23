'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('product_pulp_type_group', {
      id: {
        type: Sequelize.INTEGER,
        field: "id",
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      product_code: {
        type: Sequelize.STRING,
        field: "product_code",
        references: {
          model: 'products',
          key: 'code'
        },
      },
      pulp_type_code: {
        type: Sequelize.STRING,
        field: "pulp_type_code",
        references: {
          model: 'pulp_types',
          key: 'code'
        },
      },
      createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
          defaultValue: Sequelize.NOW
      },
      updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
          defaultValue: Sequelize.NOW
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('product_pulp_type_group');
  }
};
