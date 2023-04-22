const db = require("../models");
const Order = db.order;
const orderService = require("../services/order.service");

exports.create = async (req, res) => {
  try {
    if (!req.body.line_code)
      return res.status(404).send({
        message: "Invalid request data.",
        msg_code: "INVALID_REQUEST_DATA",
      });

    const newOrder = {
      ...req.body,
    };

    const entity = await orderService.create(newOrder);
    res.send({
      message: "Order created successfully!",
      order: entity,
      msg_code: "ORDER_CREATE_SUCCESS",
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  orderService
    .getOrders(req.query)
    .then((result) => {
      if (!result.success) {
        return res.status(result.code).send({ message: result.message });
      }
      const { orders, pagination } = result;
      if (!orders) {
        return res.status(404).send({ message: "Orders not found." });
      }

      res.status(200).send(pagination ? { ...orders, pagination } : orders);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const objectToUpdate = req.body;

    const result = await orderService.update(id, objectToUpdate);

    if (result[0] == 0) res.status(404).send({ message: "Order Not found." });
    else {
      const order = await Order.findOne({ where: { id: id } });
      res.send({ message: "Order updated successfully!", order: order });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await orderService.getById(id);

    if (!result) res.status(404).send({ message: "Order not found." });
    else res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getByLineCode = async (req, res) => {
  try {
    const line_code = req.params.line_code;
    const result = await orderService.getByLineCode(line_code);

    if (!result) res.status(404).send({ message: "Order not found." });
    else res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await orderService.deleteForce(id);

    if (result == 0) res.status(404).send({ message: "Order not found." });
    else res.send({ message: "Order deleted successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
