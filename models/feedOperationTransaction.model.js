module.exports = (sequelize, Sequelize) => {
  const FeedOperationTransaction = sequelize.define(
    "feed_operation_transactions",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      //Foreign keys: line_code, brand_code, product_code, order_id
      pack_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      mode: {
        type: Sequelize.STRING,
      },
      actual_weight: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      input_source: {
        type: Sequelize.STRING,
      },
      order_type: {
        type: Sequelize.STRING,
      },
      transaction_time: {
        type: Sequelize.DATE,
      },
    }
  );
  return FeedOperationTransaction;
};
