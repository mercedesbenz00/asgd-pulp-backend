module.exports = (sequelize, Sequelize) => {
    const ProductPulpTypeGroup = sequelize.define("product_pulp_type_group", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
    });
  
    return ProductPulpTypeGroup;
  };
  