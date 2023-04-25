const db = require("../models");
const BatchNumberInfo = db.batchNumberInfo;

exports.create = async (data) => {
  const newEntity = {
    ...data,
  };

  return await BatchNumberInfo.create(newEntity);
};

exports.getBatchNumberInfos = (query) => {
  let { page, limit } = query;
  let offset = undefined;
  let pagination = undefined;

  if (page && limit) {
    page = parseInt(page);
    limit = parseInt(limit);
    offset = page * limit;
    pagination = { page, limit };
  }
  return BatchNumberInfo.findAndCountAll({
    where: { deleted: false },
    limit: limit ? limit : undefined,
    offset: offset,
    order: [["updatedAt", "DESC"]],
  });
};

exports.update = async (id, data) => {
  const objectToUpdate = { ...data };

  return await BatchNumberInfo.update(objectToUpdate, { where: { id: id } });
};

exports.getById = async (id) => {
  return await BatchNumberInfo.findOne({
    where: { id: id },
  });
};

exports.getByBatchNumber = async (number) => {
  return await BatchNumberInfo.findOne({
    where: { number: number },
  });
};

exports.deleteForce = async (id) => {
  return await BatchNumberInfo.destroy({ where: { id: id } });
};
