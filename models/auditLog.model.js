module.exports = (sequelize, Sequelize) => {
    const AuditLog = sequelize.define("audit_logs", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      audit_type: {
        type: Sequelize.STRING,
      },
      msg: {
        type: Sequelize.STRING,
      },
    });
    return AuditLog;
  };
  