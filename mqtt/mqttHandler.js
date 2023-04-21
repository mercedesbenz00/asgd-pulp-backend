const mqtt = require("mqtt");
const dotenv = require("dotenv");
dotenv.config();

class MqttHandler {
  constructor(ipAddress, lineCode) {
    this.lineCode = lineCode;
    this.mqttClient = null;
    this.host = `mqtt://${ipAddress}:${process.env.MQTT_PORT}`;
    this.username = process.env.MQTT_USER; // mqtt credentials if these are needed to connect
    this.password = process.env.MQTT_PASSWORD;
  }

  connect() {
    console.log(`connecting to ${this.host}...`);
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    if (this.username && this.password) {
      this.mqttClient = mqtt.connect(this.host, {
        username: this.username,
        password: this.password,
      });
    } else {
      this.mqttClient = mqtt.connect(this.host);
    }

    // Mqtt error callback
    this.mqttClient.on("error", (err) => {
      console.log(err);
      // this.mqttClient.end();
    });

    // Connection callback
    this.mqttClient.on("connect", () => {
      console.log(`mqtt client connected to ${this.host}`);
    });

    // mqtt subscriptions
    // this.mqttClient.subscribe('mytopic', {qos: 0});

    // When a message arrives, console.log it
    this.mqttClient.on("message", function (topic, message) {
      console.log(`Received: ${message.toString()} \nOn topic: ${topic}`);
    });

    this.mqttClient.on("close", () => {
      console.log(`mqtt client disconnected from ${this.host}`);
    });
  }

  // Sends a mqtt message to topic: mytopic
  sendMessage(topic, message) {
    this.mqttClient.publish(topic, message);
  }

  sendJsonData(topic, jsonData) {
    this.mqttClient.publish(topic, JSON.stringify(jsonData));
  }

  // Subscribe to MQTT Message
  subscribe(topic, options) {
    this.mqttClient.subscribe(topic, options);
  }

  // Unsubscribe to MQTT Message
  unsubscribe(topic, options) {
    this.mqttClient.unsubscribe(topic, options);
  }

  disconnect() {
    this.mqttClient.end();
  }
}

module.exports = MqttHandler;
