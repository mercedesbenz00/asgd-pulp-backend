const db = require("../models");
const PulpInfo = db.pulpInfo;

exports.create = async (data) => {
    const newEntity = {
        ...data
    }

    return await PulpInfo.create(newEntity);
};

exports.getPulpInfoList = (query) => {
    let { page, limit } = query;
    let offset = undefined
    let pagination = undefined

    if (page && limit) {
        page = parseInt(page);
        limit = parseInt(limit);
        offset = page * limit;
        pagination = { page, limit };
    }
    return PulpInfo.findAndCountAll(
        {
            limit: limit ? limit : undefined,
            offset: offset,
            order: [['updatedAt', 'DESC']]
        }
    )
};

exports.update = async (id, data) => {
    const objectToUpdate = {...data};

    return await PulpInfo.update(objectToUpdate, { where: { id: id } });
};

exports.getById = async (id) => {
    return await PulpInfo.findOne({
        where: { id: id },
    });
};

exports.deleteForce = async (id) => {
    return await PulpInfo.destroy({ where: { id: id } });
};