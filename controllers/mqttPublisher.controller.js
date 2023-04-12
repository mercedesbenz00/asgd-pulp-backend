var mqttClient = require("../mqtt/mqttClient");

exports.publishMQTTMessage = async function (req, res) {
    try {
      const topic = req.body.topic;
      const message = req.body.message;
  
      mqttClient.client.sendJsonData(topic, message, {});
      res
        .status(200)
        .json({ status: "200", message: "Sucessfully published MQTT Message" });
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  };