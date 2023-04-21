var mqttClient = require("../mqtt/mqttClient");

exports.publishMQTTMessage = async function (req, res) {
  try {
    const topic = req.body.topic;
    const message = req.body.message;
    const lineCode = req.body.line_code;
    if (!topic || !message || !lineCode) {
      return res
        .status(400)
        .json({ status: 400, message: "Invalid request params" });
    }

    if (mqttClient.clientMap && mqttClient.clientMap[lineCode]) {
      mqttClient.clientMap[lineCode].sendJsonData(topic, message);
      res
        .status(200)
        .json({ status: "200", message: "Sucessfully published MQTT Message" });
    } else {
      return res
        .status(404)
        .json({ status: 404, message: "MQTT client not found" });
    }
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
