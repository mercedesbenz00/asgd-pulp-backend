var moment = require("moment");
const db = require("../models");
const Order = db.order;
const Op = db.Sequelize.Op;

exports.create = async (data) => {
  const newEntity = {
    ...data,
  };

  return await Order.create(newEntity);
};

exports.getOrders = async (query) => {
  let { page, limit, from, to, line_code } = query;
  let offset = undefined;
  let pagination = undefined;

  if (page && limit) {
    page = parseInt(page);
    limit = parseInt(limit);
    offset = page * limit;
    pagination = { page, limit };
  }

  const queryParam = {
    attributes: [
      "id",
      "quantity",
      "a_batch_number",
      "b_batch_number",
      "s_batch_number",
      "a_actual_quantity",
      "b_actual_quantity",
      "s_actual_quantity",
      "a_cast_quantity",
      "b_cast_quantity",
      "s_cast_quantity",
      "a_ratio",
      "b_ratio",
      "start_time",
    ],
    limit: limit ? limit : undefined,
    offset: offset,
    order: [["updatedAt", "DESC"]],
  };

  if (from || to || line_code) {
    queryParam.where = {};
  }

  if (from && to) {
    if (
      !moment(from, "YYYY-MM-DDTHH:mm:ssZ").isValid() ||
      !moment(to, "YYYY-MM-DDTHH:mm:ssZ").isValid()
    ) {
      return { success: false, code: 402, message: "date param is not valid" };
    }

    queryParam.where.updatedAt = {
      [Op.between]: [moment(from).toDate(), moment(to).toDate()],
    };
  }

  if (line_code) {
    queryParam.where.line_code = line_code;
  }

  let orders = await Order.findAndCountAll(queryParam);
  return { success: true, orders: orders, pagination };
};

exports.update = async (id, data) => {
  const objectToUpdate = { ...data };

  return await Order.update(objectToUpdate, { where: { id: id } });
};

exports.getById = async (id) => {
  return await Order.findOne({
    where: { id: id },
  });
};

exports.getByLineCode = async (lineCode) => {
  return await Order.findOne({
    where: { line_code: lineCode },
  });
};

exports.deleteForce = async (id) => {
  return await Order.destroy({ where: { id: id } });
};

exports.deleteSoft = async (id) => {
  return await Order.update({ deleted: true }, { where: { id: id } });
};
