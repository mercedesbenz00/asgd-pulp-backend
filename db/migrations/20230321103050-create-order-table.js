'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
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
      a_brand_code: {
        type: Sequelize.STRING,
        field: "a_brand_code",
        references: {
          model: 'brands',
          key: 'code'
        },
      },
      b_brand_code: {
        type: Sequelize.STRING,
        field: "b_brand_code",
        references: {
          model: 'brands',
          key: 'code'
        },
      },
      s_brand_code: {
        type: Sequelize.STRING,
        field: "s_brand_code",
        references: {
          model: 'brands',
          key: 'code'
        },
      },
      a_product_code: {
        type: Sequelize.STRING,
        field: "a_product_code",
        references: {
          model: 'products',
          key: 'code'
        },
      },
      b_product_code: {
        type: Sequelize.STRING,
        field: "b_product_code",
        references: {
          model: 'products',
          key: 'code'
        },
      },
      s_product_code: {
        type: Sequelize.STRING,
        field: "s_product_code",
        references: {
          model: 'products',
          key: 'code'
        },
      },
      a_pulp_type_code: {
        type: Sequelize.STRING,
        field: "a_pulp_type_code",
        references: {
          model: 'pulp_types',
          key: 'code'
        },
      },
      b_pulp_type_code: {
        type: Sequelize.STRING,
        field: "b_pulp_type_code",
        references: {
          model: 'pulp_types',
          key: 'code'
        },
      },
      s_pulp_type_code: {
        type: Sequelize.STRING,
        field: "s_pulp_type_code",
        references: {
          model: 'pulp_types',
          key: 'code'
        },
      },
      a_batch_number: {
        type: Sequelize.STRING,
        field: "a_batch_number",
      },
      b_batch_number: {
        type: Sequelize.STRING,
        field: "b_batch_number",
      },
      s_batch_number: {
        type: Sequelize.STRING,
        field: "s_batch_number",
      },
      a_actual_quantity: {
        type: Sequelize.INTEGER,
        field: "a_actual_quantity",
        defaultValue: 0
      },
      b_actual_quantity: {
        type: Sequelize.INTEGER,
        field: "b_actual_quantity",
        defaultValue: 0
      },
      s_actual_quantity: {
        type: Sequelize.INTEGER,
        field: "s_actual_quantity",
        defaultValue: 0
      },
      a_cast_quantity: {
        type: Sequelize.INTEGER,
        field: "a_cast_quantity",
        defaultValue: 0
      },
      b_cast_quantity: {
        type: Sequelize.INTEGER,
        field: "b_cast_quantity",
        defaultValue: 0
      },
      s_cast_quantity: {
        type: Sequelize.INTEGER,
        field: "s_cast_quantity",
        defaultValue: 0
      },
      a_ratio: {
        type: Sequelize.FLOAT,
        field: "a_ratio",
        defaultValue: 1
      },
      b_ratio: {
        type: Sequelize.FLOAT,
        field: "b_ratio",
        defaultValue: 1
      },
      start_time: {
        type: Sequelize.DATE,
        field: "start_time",
      },
      end_time: {
        type: Sequelize.DATE,
        field: "end_time",
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
    await queryInterface.dropTable('orders');
  }
};
