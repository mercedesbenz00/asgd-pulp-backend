module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      phone: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      // roleId: {
      //   type: Sequelize.INTEGER,
      // },
      is_tac_verified: {
        type: Sequelize.BOOLEAN
      },
      tac_code: {
        type: Sequelize.STRING
      },
      tac_issued_date: {
        type: Sequelize.DATE
      },
      is_temp_password: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    });
  
    // User.associate = function(models) {

    // }
    return User;
  };
  