const db = require("../models");
const Brand = db.brand;

exports.create = async (data) => {
    const newEntity = {
        ...data
    }

    return await Brand.create(newEntity);
};

exports.getBrands = (query) => {
    let { page, limit } = query;
    let offset = undefined
    let pagination = undefined

    if (page && limit) {
        page = parseInt(page);
        limit = parseInt(limit);
        offset = page * limit;
        pagination = { page, limit };
    }
    return Brand.findAndCountAll(
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

    return await Brand.update(objectToUpdate, { where: { id: id } });
};

exports.getById = async (id) => {
    return await Brand.findOne({
        where: { id: id },
    });
};

exports.deleteForce = async (id) => {
    return await Brand.destroy({ where: { id: id } });
};

exports.deleteSoft = async (id) => {
    return await Brand.update({ deleted: true }, { where: { id: id } });
};