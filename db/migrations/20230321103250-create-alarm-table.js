"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("alarms", {
      id: {
        type: Sequelize.INTEGER,
        field: "id",
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      feed_transaction_id: {
        type: Sequelize.INTEGER,
        field: "feed_transaction_id",
        references: {
          model: "feed_operation_transactions",
          key: "id",
        },
        allowNull: true,
      },
      line_code: {
        type: Sequelize.STRING,
        field: "line_code",
        references: {
          model: "feeding_lines",
          key: "code",
        },
      },
      alarm_type_code: {
        type: Sequelize.STRING,
        field: "alarm_type_code",
        references: {
          model: "alarm_types",
          key: "code",
        },
      },
      alarm_message: {
        type: Sequelize.STRING,
        field: "alarm_message",
      },
      severity: {
        type: Sequelize.INTEGER,
        field: "severity",
        defaultValue: 0,
      },
      start_at: {
        type: Sequelize.DATE,
        field: "start_at",
        allowNull: true,
        defaultValue: null,
      },
      end_at: {
        type: Sequelize.DATE,
        field: "end_at",
        allowNull: true,
        defaultValue: null,
      },
      createdAt: {
        type: Sequelize.DATE,
        field: "createdAt",
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        field: "updatedAt",
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("alarms");
  },
};
