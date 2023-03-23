module.exports = (sequelize, Sequelize) => {
    const BatchNumberInfo = sequelize.define("batch_number_info", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      number: {
        type: Sequelize.STRING,
        unique: true,
      },
      unit_weight: {
        type: Sequelize.FLOAT,
      },
    });
    return BatchNumberInfo;
  };
  