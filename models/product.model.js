module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("products", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING,
        unique: true,
      },
      // brand_code: {
      //   type: Sequelize.STRING,
      // },
      name: {
        type: Sequelize.STRING,
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
    });
    return Product;
  };
  