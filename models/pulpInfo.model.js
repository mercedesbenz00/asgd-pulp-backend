module.exports = (sequelize, Sequelize) => {
  const PulpInfo = sequelize.define(
    "pulp_info",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      type_code: {
        type: Sequelize.STRING,
      },
      brand_code: {
        type: Sequelize.STRING,
      },
      product_code: {
        type: Sequelize.STRING,
      },
      pack_num: {
        type: Sequelize.INTEGER,
      },
      unit_weight: {
        type: Sequelize.FLOAT,
      },
      trained: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdBy: {
        type: Sequelize.STRING,
      },
      updatedBy: {
        type: Sequelize.STRING,
      },
    },
    {
      freezeTableName: true,
    }
  );
  return PulpInfo;
};
