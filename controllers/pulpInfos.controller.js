const { Op } = require("sequelize");
const db = require("../models");
const paginate = require("../utils/paginate");

const option = {
  include: [
    {
      model: db.brand,
      as: "brand",
      attributes: ["id", "code", "name"],
    },
    {
      model: db.product,
      as: "product",
      attributes: ["id", "code", "name"],
    },
    {
      model: db.pulpType,
      as: "pulpType",
      attributes: ["id", "code", "name"],
    },
    {
      model: db.pulpShape,
      as: "pulpShape",
      attributes: ["id", "code", "name"],
    },
  ],
  attributes: [
    "id",
    "brand_code",
    "product_code",
    "type_code",
    "pack_num",
    "unit_weight",
    "deleted",
    "trained",
  ],
  order: [["updatedAt", "DESC"]],
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
              "$brand.code$": {
                [Op.iLike]: `%${term}%`,
              },
            },
            {
              "$product.code$": {
                [Op.iLike]: `%${term}%`,
              },
            },
            {
              "$pulpType.code$": {
                [Op.iLike]: `%${term}%`,
              },
            },
            {
              "$pulpType.name$": {
                [Op.iLike]: `%${term}%`,
              },
            },
          ],
        }),
      },
    };

    const data = !!without_paginate
      ? await db.pulpInfo.findAll(newOption)
      : await paginate(db.pulpInfo, req, newOption, true);

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
    const data = await db.pulpInfo.findByPk(req.params["id"], option);

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
    const { brand_code, product_code, ...rest } = req?.body;

    const [brand] = await db.brand.findOrCreate({
      where: {
        code: brand_code,
        deleted: false,
      },
    });

    const [product] = await db.product.findOrCreate({
      where: {
        code: product_code,
        deleted: false,
      },
    });

    const payload = {
      ...rest,
      brand_code: brand?.code,
      product_code: product?.code,
      createdBy: req.userId,
    };

    await db.pulpInfo.create(payload);

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
    const { id, brand_code, product_code, ...rest } = req?.body;

    const data = await db.pulpInfo.findByPk(id);

    if (!data) {
      throw new Error(formatMessage("DATA_NOT_FOUND"));
    }

    const [brand] = await db.brand.findOrCreate({
      where: {
        code: brand_code,
        deleted: false,
      },
    });

    const [product] = await db.product.findOrCreate({
      where: {
        code: product_code,
        deleted: false,
      },
    });

    const payload = {
      ...rest,
      brand_code: brand?.code,
      product_code: product?.code,
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

    const data = await db.pulpInfo.findByPk(id);

    if (!data) {
      return res.sendError([], formatMessage("DATA_NOT_FOUND"));
    }
    await db.pulpInfo.destroy({
      where: {
        id: data?.id,
      },
    });

    res.status(200).send({
      status: true,
      message: "RECORD_DELETED_SUCCESSFULLY",
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
