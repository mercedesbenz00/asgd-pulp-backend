const feedOperationTransactionService = require("../services/feedOperationTransaction.service");
const orderService = require("../services/order.service");
const alarmService = require("../services/alarm.service");
const { AI_UNKNOWN, ALARM_TYPES, TOPICS } = require("../utils/constant");

var mqttClient = require("../mqtt/mqttClient");

exports.create = async (req, res) => {
  try {
    if (!req.body.line_code || !req.body.product_code)
      return res.status(404).send({
        message: "Invalid request data.",
        msg_code: "INVALID_REQUEST_DATA",
      });

    const entity = await feedOperationTransactionService.create(req.body);
    res.send({
      message: "FeedOperationTransaction created successfully!",
      order: entity,
      msg_code: "FEED_OPERATION_TRANSACTION_CREATE_SUCCESS",
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.createFromAI = async (req, res) => {
  try {
    if (!req.body.Date || !req.body.Feeding_line || !req.body.Product) {
      return res.status(404).send({
        message: "Invalid request data.",
        msg_code: "INVALID_REQUEST_DATA",
      });
    }
    const lineCode = req.body.Feeding_line;

    if (
      (req.body.Brand &&
        req.body.Brand.toLowerCase() === AI_UNKNOWN.toLowerCase()) ||
      (req.body.Product &&
        req.body.Product.toLowerCase() === AI_UNKNOWN.toLowerCase())
    ) {
      // Need to trigger alarm and saves to alarm history

      await alarmService.create({
        alarm_type_code: ALARM_TYPES.UNKNOWN_FEED,
        alarm_message: `${lineCode}: Wrong pulp feeding`,
        start_at: new Date(),
      });
      if (mqttClient.clientMap[lineCode]) {
        mqttClient.clientMap[lineCode].sendJsonData(TOPICS.IoT, {
          Type: "Alarm",
          Action: true,
        });
      }

      return res
        .status(400)
        .send({ success: false, message: ALARM_TYPES.UNKNOWN_FEED });
    }
    const currentOrder = await orderService.getByLineCode(lineCode);
    if (!currentOrder) {
      return res.status(404).send({ message: "Not found order" });
    }

    // Compare AI info with order information

    // Trigger alarm if mismatch for A and B or time gap is not satisfied for S

    // If correct, then calculate weight
    // - First check batch number's weight from batch number weight table.
    // - If not exist in batch number weight table, then get from pulp type information

    const entity = await feedOperationTransactionService.create(req.body);
    res.send({
      message: "FeedOperationTransaction created successfully!",
      order: entity,
      msg_code: "FEED_OPERATION_TRANSACTION_CREATE_SUCCESS",
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getAll = (req, res) => {
  feedOperationTransactionService
    .getFeedOperationTransactionList(req.query)
    .then((feedOperationTransactions) => {
      if (!feedOperationTransactions) {
        return res.status(404).send({
          message: "FeedOperationTransaction Not found.",
          msg_code: "FEED_OPERATION_TRANSACTION_NOT_FOUND",
        });
      }

      res
        .status(200)
        .send(
          pagination
            ? { ...feedOperationTransactions, pagination }
            : feedOperationTransactions
        );
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const result = await feedOperationTransactionService.update(id, data);

    if (!result[0])
      res.status(404).send({
        message: "FeedOperationTransaction Not found.",
        msg_code: "FEED_OPERATION_TRANSACTION_NOT_FOUND",
      });
    else {
      const feedOperationTransaction =
        await feedOperationTransactionService.getById(id);
      res.send({
        message: "FeedOperationTransaction updated successfully!",
        feedOperationTransaction: feedOperationTransaction,
        msg_code: "FEED_OPERATION_TRANSACTION_UPDATE_SUCCESS",
      });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await feedOperationTransactionService.getById(id);

    if (!result)
      res.status(404).send({
        message: "FeedOperationTransaction Not found.",
        msg_code: "FEED_OPERATION_TRANSACTION_NOT_FOUND",
      });
    else res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.deleteForce = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await feedOperationTransactionService.deleteForce(id);

    if (!result)
      res.status(404).send({
        message: "FeedOperationTransaction Not found.",
        msg_code: "FEED_OPERATION_TRANSACTION_NOT_FOUND",
      });
    else
      res.send({
        message: "FeedOperationTransaction deleted successfully!",
        msg_code: "FEED_OPERATION_TRANSACTION_DELETE_SUCCESS",
      });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
