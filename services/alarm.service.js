const db = require("../models");
const Alarm = db.alarm;

exports.create = async (data) => {
  const newEntity = {
    ...data,
  };

  return await Alarm.create(newEntity);
};

exports.getAlarms = (query) => {
  let { page, limit } = query;
  let offset = undefined;
  let pagination = undefined;

  if (page && limit) {
    page = parseInt(page);
    limit = parseInt(limit);
    offset = page * limit;
    pagination = { page, limit };
  }
  return Alarm.findAndCountAll({
    where: { deleted: false },
    limit: limit ? limit : undefined,
    offset: offset,
    order: [["updatedAt", "DESC"]],
  });
};

exports.getLatestAlarm = async (lineCode) => {
  const entries = await Alarm.findAll({
    where: {
      line_code: lineCode,
      end_at: {
        [Op.eq]: null,
      },
    },
    limit: 1,
    order: [["start_at", "DESC"]],
  });

  if (entries && entries.length) {
    return entries[0];
  } else {
    return null;
  }
};

exports.update = async (id, data) => {
  const objectToUpdate = { ...data };

  return await Alarm.update(objectToUpdate, { where: { id: id } });
};

exports.stopAlarm = async (id) => {
  return await Alarm.update({ end_at: new Date() }, { where: { id: id } });
};

exports.getById = async (id) => {
  return await Alarm.findOne({
    where: { id: id },
  });
};

exports.deleteForce = async (id) => {
  return await Alarm.destroy({ where: { id: id } });
};
