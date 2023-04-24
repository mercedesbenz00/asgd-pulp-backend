const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const db = require("../models");
const paginate = require("../utils/paginate");

const option = {
  include: [
    {
      model: db.machine,
      as: "machine",
      attributes: ["id", "code", "name"],
    },
  ],
  attributes: ["id", "machineId", "code", "name", "deleted"],
  order: [["updated_at", "DESC"]],
};

exports.getAll = async (req, res) => {
  try {
    const { without_paginate, term } = req?.query || {};

    const newOption = {
      ...option,
      where: {
        ...(!!term && {
          [Op.or]: [
            {
              "$machine.code$": {
                [Op.iLike]: `%${term}%`,
              },
            },
            {
              code: {
                [Op.iLike]: `%${term}%`,
              },
            },
            {
              name: {
                [Op.iLike]: `%${term}%`,
              },
            },
          ],
        }),
      },
    };

    const data = !!without_paginate
      ? await db.feedingLine.findAll(newOption)
      : await paginate(db.feedingLine, req, newOption, true);

    res.status(200).send({
      status: true,
      message: "SUCCESS",
      data,
    });
  } catch (e) {
    console.error(e?.message);
    res.status(500).send({
      status: false,
      message: "ERROR_WHILE_FETCHING",
      data: null,
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await db.feedingLine.findByPk(req.params["id"], option);

    res.status(200).send({
      status: true,
      message: "SUCCESS",
      data,
    });
  } catch (e) {
    console.error(e?.message);
    res.status(500).send({
      status: false,
      message: "ERROR_WHILE_FETCHING",
      data: null,
    });
  }
};

exports.create = async (req, res) => {
  try {
    const { machineId, code, name, password, deleted } = req.body;

    const payload = {
      machineId,
      code,
      name,
      deleted,
      password: bcrypt.hashSync(password, 8),
      createdBy: req.userId,
    };

    await db.feedingLine.create(payload);

    res.status(200).send({
      status: true,
      message: "SUCCESS",
      data: req.body,
    });
  } catch (e) {
    console.error(e?.message);
    res.status(500).send({
      status: false,
      message: "ERROR_WHILE_SAVING",
      data: null,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id, machineId, code, name, password, deleted } = req?.body;

    const data = await db.feedingLine.findByPk(id);

    if (!data) {
      throw new Error(formatMessage("DATA_NOT_FOUND"));
    }
    const payload = {
      machineId,
      code,
      name,
      deleted,
      ...(!!password && { password: bcrypt.hashSync(password, 8) }),
      updatedBy: req.userId,
    };

    await data.update(payload);

    res.status(200).send({
      status: true,
      message: "SUCCESS",
      data: req.body,
    });
  } catch (e) {
    console.error(e?.message);
    res.status(500).send({
      status: false,
      message: "ERROR_WHILE_SAVING",
      data: null,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req?.body;

    const data = await db.feedingLine.findByPk(id);

    if (!data) {
      return res.sendError([], formatMessage("DATA_NOT_FOUND"));
    }
    await db.feedingLine.destroy({
      where: {
        id: data?.id,
      },
    });

    res.status(200).send({
      status: true,
      message: "SUCCESS",
      data: req.body,
    });
  } catch (e) {
    console.error(e?.message);
    res.status(500).send({
      status: false,
      message: "ERROR_WHILE_DELETING",
      data: null,
    });
  }
};
