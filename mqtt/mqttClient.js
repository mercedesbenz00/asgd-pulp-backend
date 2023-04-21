var mqttHandler = require("./mqttHandler");
const zeroPad = function (num, length) {
  length = length || 2; // defaults to 2 if no parameter is passed
  return (new Array(length).join("0") + num).slice(length * -1);
};
function mqttClient() {
  let strHost = process.env.MQTT_HOST_IPS;
  if (strHost) {
    mqttClient.clientMap = {};
    let ipAddressList = strHost.split(",").map((address) => address.trim());
    let i = 0;
    for (const ipAddress of ipAddressList) {
      i++;
      let lineCode = `FL-${zeroPad(i, 2)}`;
      mqttClient.clientMap[lineCode] = new mqttHandler(ipAddress, lineCode);
      mqttClient.clientMap[lineCode].connect();
      // mqttClient.clientMap[lineCode].subscribe("FL-01", { qos: 0 });
    }
    // mqttClient.client = new mqttHandler();
    // mqttClient.client.connect();
  } else {
    console.log("No MQTT configuration");
  }
}

module.exports = mqttClient;
