module.exports = (sequelize, Sequelize) => {
  const Alarm = sequelize.define("alarms", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    // foreign keys: feed_transaction_id, alarm_type_code, line_code
    alarm_message: {
      type: Sequelize.STRING,
    },
    severity: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    start_at: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    },
    end_at: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    },
  });
  return Alarm;
};
