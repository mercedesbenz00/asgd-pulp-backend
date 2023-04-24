const db = require("../models");

exports.getMachines = async (req, res) => {
  try {
    const data = await db.machine.findAll({
      attributes: ["id", "code", "name"],
    });

    res.status(200).send({
      status: true,
      message: "SUCCESS",
      errors: [],
      data,
    });
  } catch (e) {
    console.error(e?.message);
    res.status(500).send({
      status: false,
      message: "ERROR_WHILE_FETCHING",
      errors: [],
      data: null,
    });
  }
};
