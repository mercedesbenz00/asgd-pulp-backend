'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('pulp_info', {
      id: {
        type: Sequelize.INTEGER,
        field: "id",
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      type_code: {
        type: Sequelize.STRING,
        field: "type_code",
        references: {
          model: 'pulp_types',
          key: 'code'
        },
      },
      brand_code: {
        type: Sequelize.STRING,
        field: "brand_code",
        references: {
          model: 'brands',
          key: 'code'
        },
      },
      product_code: {
        type: Sequelize.STRING,
        field: "product_code",
        references: {
          model: 'products',
          key: 'code'
        },
      },
      pack_num: {
        type: Sequelize.INTEGER,
        field: "pack_num",
      },
      unit_weight: {
        type: Sequelize.FLOAT,
        field: "unit_weight",
      },
      trained: {
        type: Sequelize.BOOLEAN,
        field: "trained",
        defaultValue: false
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
    await queryInterface.dropTable('pulp_info');
  }
};
