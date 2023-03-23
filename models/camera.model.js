module.exports = (sequelize, Sequelize) => {
    const Camera = sequelize.define("cameras", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      ip_address: {
        type: Sequelize.STRING,
        unique: true,
      },
      // line_code: {
      //   type: Sequelize.STRING,
      // },
    });
    return Camera;
  };
  