module.exports = (sequelize, Sequelize) => {
    const FeedingLine = sequelize.define("feeding_lines", {
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
      // machine_code: {
      //   type: Sequelize.STRING,
      // },
      desc: {
        type: Sequelize.STRING,
      },
    });
    return FeedingLine;
  };
  