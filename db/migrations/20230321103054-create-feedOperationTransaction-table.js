'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('feed_operation_transactions', {
      id: {
        type: Sequelize.INTEGER,
        field: "id",
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      line_code: {
        type: Sequelize.STRING,
        field: "line_code",
        references: {
          model: 'feeding_lines',
          key: 'code'
        },
      },
      order_id: {
        type: Sequelize.INTEGER,
        field: "order_id",
        references: {
          model: 'orders',
          key: 'id'
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
      pack_count: {
        type: Sequelize.INTEGER,
        field: "pack_count",
        defaultValue: 0,
      },
      mode: {
        type: Sequelize.STRING,
        field: "mode",
      },
      actual_weight: {
        type: Sequelize.FLOAT,
        field: "actual_weight",
        defaultValue: 0,
      },
      input_source: {
        type: Sequelize.STRING,
        field: "input_source",
      },
      transaction_time: {
          type: Sequelize.DATE,
          field: "transaction_time",
          allowNull: false,
          defaultValue: Sequelize.NOW
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
    await queryInterface.dropTable('feed_operation_transactions');
  }
};
