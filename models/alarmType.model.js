module.exports = (sequelize, Sequelize) => {
    const AlarmType = sequelize.define("alarm_types", {
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
    });
    return AlarmType;
  };
  