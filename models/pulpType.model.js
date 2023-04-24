module.exports = (sequelize, Sequelize) => {
  const PulpType = sequelize.define(
    "pulp_types",
    {
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
      name: {
        type: Sequelize.STRING,
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
      defaultScope: {
        where: {
          deleted: false,
        },
      },
    }
  );

  return PulpType;
};
