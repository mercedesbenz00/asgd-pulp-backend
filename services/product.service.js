const db = require("../models");
const Product = db.product;

exports.create = async (data) => {
    const newEntity = {
        ...data
    }

    return await Product.create(newEntity);
};

exports.getProducts = (query) => {
    let { page, limit } = query;
    let offset = undefined
    let pagination = undefined

    if (page && limit) {
        page = parseInt(page);
        limit = parseInt(limit);
        offset = page * limit;
        pagination = { page, limit };
    }
    return Product.findAndCountAll(
        {
            where: { deleted: false },
            limit: limit ? limit : undefined,
            offset: offset,
            order: [['updatedAt', 'DESC']]
        }
    )
};

exports.update = async (id, data) => {
    const objectToUpdate = {...data};

    return await Product.update(objectToUpdate, { where: { id: id } });
};

exports.getById = async (id) => {
    return await Product.findOne({
        where: { id: id },
    });
};

exports.deleteForce = async (id) => {
    return await Product.destroy({ where: { id: id } });
};

exports.deleteSoft = async (id) => {
    return await Product.update({ deleted: true }, { where: { id: id } });
};