var mqttHandler = require('./mqttHandler');
function mqttClient() {
    mqttClient.client = new mqttHandler();
    mqttClient.client.connect();
}


module.exports = mqttClient;