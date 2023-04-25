var moment = require("moment");
const feedOperationTransactionService = require("../services/feedOperationTransaction.service");
const orderService = require("../services/order.service");
const alarmService = require("../services/alarm.service");
const batchNumberInfoService = require("../services/batchNumberInfo.service");
const pulpInfoService = require("../services/pulpInfo.service");

const {
  AI_UNKNOWN,
  ALARM_TYPES,
  TOPICS,
  OperationMode,
  InputSource,
} = require("../utils/constant");

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

const isEqualStrValue = (v1, v2) => {
  // if both are empty or undefined, then consider as same.
  if (!v1 && !v2) {
    return true;
  }

  if (!v1 || !v2) {
    return false;
  }

  if (v1.trim().toLowerCase() === v2.trim().toLowerCase()) {
    return true;
  }

  return false;
};

const triggerAlarm = async (lineCode, alarmTypeCode, alarmMsg) => {
  await alarmService.create({
    alarm_type_code: alarmTypeCode,
    alarm_message: alarmMsg,
    start_at: new Date(),
  });
  if (mqttClient.clientMap[lineCode]) {
    mqttClient.clientMap[lineCode].sendJsonData(TOPICS.IoT, {
      Type: "Alarm",
      Action: true,
    });
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
    const recogBrand = req.body.Brand;
    const recogProduct = req.body.Product;
    const recogStrDate = req.body.Date;

    if (
      (req.body.Brand &&
        req.body.Brand.toLowerCase() === AI_UNKNOWN.toLowerCase()) ||
      (req.body.Product &&
        req.body.Product.toLowerCase() === AI_UNKNOWN.toLowerCase())
    ) {
      // Need to trigger alarm and saves to alarm history

      await triggerAlarm(
        lineCode,
        ALARM_TYPES.UNKNOWN_FEED,
        `${lineCode}: Unknown pulp feeding`
      );

      return res.status(400).send({
        success: false,
        message: ALARM_TYPES.UNKNOWN_FEED,
        msg_code: ALARM_TYPES.UNKNOWN_FEED,
      });
    }
    const currentOrder = await orderService.getByLineCode(lineCode);
    if (!currentOrder) {
      return res.status(404).send({ message: "Not found order" });
    }

    // Compare AI info with order information
    let subOrders = [];
    subOrders.push({
      type: "A",
      batch_number: currentOrder.a_batch_number,
      quantity: currentOrder.a_actual_quantity,
      brand_code: currentOrder.a_brand_code,
      product_code: currentOrder.a_product_code,
    });

    subOrders.push({
      type: "B",
      batch_number: currentOrder.b_batch_number,
      quantity: currentOrder.b_actual_quantity,
      brand_code: currentOrder.b_brand_code,
      product_code: currentOrder.b_product_code,
    });

    subOrders.push({
      type: "S",
      batch_number: currentOrder.s_batch_number,
      quantity: currentOrder.s_actual_quantity,
      brand_code: currentOrder.s_brand_code,
      product_code: currentOrder.s_product_code,
    });

    const foundOrder = subOrders.find((subOrder) => {
      return (
        isEqualStrValue(subOrder.brand_code, recogBrand) &&
        isEqualStrValue(subOrder.product_code, recogProduct)
      );
    });
    // Trigger alarm if mismatch for A and B or time gap is not satisfied for S
    if (!foundOrder) {
      // mismatch
      await triggerAlarm(
        lineCode,
        ALARM_TYPES.WRONG_FEED,
        `${lineCode}: Wrong pulp feeding`
      );

      return res.status(400).send({
        success: false,
        message: ALARM_TYPES.WRONG_FEED,
        msg_code: ALARM_TYPES.WRONG_FEED,
      });
    }

    let recogMomentDate = moment(recogStrDate, "YYYYMMDD_HHmmss");
    if (
      foundOrder &&
      foundOrder.type === "S" &&
      currentOrder.s_time_gap_min > 0
    ) {
      // check time gap
      let latestTransaction =
        feedOperationTransactionService.getLatestTransaction(lineCode, "S");
      if (latestTransaction) {
        let lastTranMomentDate = moment(latestTransaction.transaction_time);
        let minutesDiff = recogMomentDate.diff(lastTranMomentDate, "minutes");
        if (minutesDiff < foundOrder.s_time_gap_min) {
          await triggerAlarm(
            lineCode,
            ALARM_TYPES.BEFORE_TIME_SET,
            `${lineCode}: fed before time set`
          );

          return res.status(400).send({
            success: false,
            message: ALARM_TYPES.BEFORE_TIME_SET,
            msg_code: ALARM_TYPES.BEFORE_TIME_SET,
          });
        }
      }
    } else if (foundOrder.type != "S") {
      if (!currentOrder.a_brand_code && !currentOrder.b_brand_code) {
        // Need to check ratio
        let aQuantity = currentOrder.a_actual_quantity || 0;
        let bQuantity = currentOrder.b_actual_quantity || 0;

        let aRatio = currentOrder.a_ratio || 1;
        let bRatio = currentOrder.b_ratio || 1;
        if (foundOrder.type === "A") {
          if (aQuantity + 1 > aRatio && bQuantity < bRatio) {
            await triggerAlarm(
              lineCode,
              ALARM_TYPES.WRONG_RATIO,
              `${lineCode}: wrong ratio`
            );

            return res.status(400).send({
              success: false,
              message: ALARM_TYPES.WRONG_RATIO,
              msg_code: ALARM_TYPES.WRONG_RATIO,
            });
          }

          foundOrder.quantity = (aQuantity + 1) % aRatio;
        } else if (foundOrder.type === "B") {
          if (bQuantity + 1 > bRatio && aQuantity < aRatio) {
            await triggerAlarm(
              lineCode,
              ALARM_TYPES.WRONG_RATIO,
              `${lineCode}: wrong ratio`
            );

            return res.status(400).send({
              success: false,
              message: ALARM_TYPES.WRONG_RATIO,
              msg_code: ALARM_TYPES.WRONG_RATIO,
            });
          }

          foundOrder.quantity = (bQuantity + 1) % bRatio;
        }
      }
    }

    // If correct, then calculate weight
    // - First check batch number's weight from batch number weight table.
    // - If not exist in batch number weight table, then get from pulp type information
    // batchNumberInfoService
    let batchNumberField = `${foundOrder.type}_batch_number`;
    batchNumberField = batchNumberField.toLowerCase();
    let actualWeight = null;
    const batchNumber = foundOrder[batchNumberField];
    if (batchNumber) {
      let weightInfo = await batchNumberInfoService.getByBatchNumber(
        batchNumber
      );
      if (weightInfo) {
        actualWeight = batchNumber.unit_weight;
      }
    }
    if (!actualWeight) {
      // get theriotical weight
      let pulpInfo = await pulpInfoService.getByBrandAndProduct(
        foundOrder.brand_code,
        foundOrder.product_code
      );
      if (pulpInfo) {
        actualWeight = pulpInfo.unit_weight;
      }
    }

    const entity = await feedOperationTransactionService.create({
      line_code: lineCode,
      brand_code: foundOrder.brand_code,
      product_code: foundOrder.product_code,
      pack_count: 1,
      mode: OperationMode.NORMAL,
      input_source: InputSource.AI,
      order_type: foundOrder.type,
      actual_weight: actualWeight,
      transaction_time: recogMomentDate.toDate(),
    });
    if (foundOrder.type !== "S") {
      let actualQuantityField = `${foundOrder.type}_actual_quantity`;
      actualQuantityField = actualQuantityField.toLowerCase();
      await orderService.update(currentOrder.id, {
        [actualQuantityField]: foundOrder.quantity,
      });
    }
    res.send({
      message: "FeedOperationTransaction created successfully!",
      transaction: entity,
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
