module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("orders", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.FLOAT,
      },
      // Foreign keys: line_code, a/b/s_brand_code, a/b/s_product_code
      a_batch_number: {
        type: Sequelize.STRING,
      },
      b_batch_number: {
        type: Sequelize.STRING,
      },
      s_batch_number: {
        type: Sequelize.STRING,
      },
      a_actual_quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      b_actual_quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      s_actual_quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      a_cast_quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      b_cast_quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      s_cast_quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      a_ratio: {
        type: Sequelize.FLOAT,
        defaultValue: 1,
      },
      b_ratio: {
        type: Sequelize.FLOAT,
        defaultValue: 1,
      },
      start_time: {
        type: Sequelize.DATE,
      },
      end_time: {
        type: Sequelize.DATE,
      }
    });
  
    return Order;
  };
  