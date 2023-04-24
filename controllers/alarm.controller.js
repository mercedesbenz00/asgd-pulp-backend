const db = require("../models");
const Alarm = db.alarm;
const alarmService = require("../services/alarm.service");

exports.getLastAlarm = async (req, res) => {
  try {
    if (!req.body.line_code)
      return res.status(404).send({
        message: "Invalid request data.",
        msg_code: "INVALID_REQUEST_DATA",
      });

    const lineCode = req.body.line_code;

    const entity = await alarmService.getLatestAlarm(lineCode);
    res.send({
      message: "Latest alarm",
      alarm: entity,
      msg_code: "ORDER_CREATE_SUCCESS",
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.stopAlarm = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await alarmService.stopAlarm(id);

    if (result[0] == 0)
      res.status(404).send({ success: false, message: "Alarm Not found." });
    else {
      res.send({
        success: true,
        message: "Alarm stopped successfully!",
      });
    }
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
};
