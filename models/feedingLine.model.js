module.exports = (sequelize, Sequelize) => {
  const FeedingLine = sequelize.define(
    "feeding_lines",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      machineId: {
        type: Sequelize.INTEGER,
      },
      code: {
        type: Sequelize.STRING,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      password: {
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
      underscored: true,
      timestamps: true,
    }
  );
  return FeedingLine;
};
