const db = require("../models");

exports.getMachines = async (req, res) => {
  try {
    const data = await db.machine.findAll({
      attributes: ["id", "code", "name"],
    });

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

exports.getBrands = async (req, res) => {
  try {
    const data = await db.brand.findAll({
      attributes: ["code", "name"],
    });

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

exports.getProducts = async (req, res) => {
  try {
    const data = await db.product.findAll({
      attributes: ["code", "name"],
    });

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

exports.getTypes = async (req, res) => {
  try {
    const data = await db.pulpType.findAll({
      attributes: ["code", "name"],
    });

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

exports.getShapes = async (req, res) => {
  try {
    const data = await db.pulpShape.findAll({
      attributes: ["code", "name"],
    });

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
