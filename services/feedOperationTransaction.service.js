const db = require("../models");
const FeedOperationTransaction = db.feedOperationTransaction;

exports.create = async (data) => {
    const newEntity = {
        ...data
    }

    return await FeedOperationTransaction.create(newEntity);
};

exports.getFeedOperationTransactionList = (query) => {
    let { page, limit } = query;
    let offset = undefined
    let pagination = undefined

    if (page && limit) {
        page = parseInt(page);
        limit = parseInt(limit);
        offset = page * limit;
        pagination = { page, limit };
    }
    return FeedOperationTransaction.findAndCountAll(
        {
            limit: limit ? limit : undefined,
            offset: offset,
            order: [['updatedAt', 'DESC']]
        }
    )
};

exports.update = async (id, data) => {
    const objectToUpdate = {...data};

    return await FeedOperationTransaction.update(objectToUpdate, { where: { id: id } });
};

exports.getById = async (id) => {
    return await FeedOperationTransaction.findOne({
        where: { id: id },
    });
};

exports.deleteForce = async (id) => {
    return await FeedOperationTransaction.destroy({ where: { id: id } });
};