const db = require("../models");
const FeedingLine = db.feedingLine;

// var mqttClient = require("../mqtt/mqttClient");

exports.create = async (req, res) => {
    try {

        if (!req.body.machine_code || !req.body.code)
            return res.status(404).send({ message: "Invalid request data.", msg_code: "INVALID_REQUEST_DATA" });

        const newEntity = {
            ...req.body
        }

        const entity = await FeedingLine.create(newEntity);
        res.send({ message: "Feedingline created successfully!", order: entity, msg_code: "FEED_LINE_CREATE_SUCCESS" });

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getAll = (req, res) => {
    let { page, limit } = req.query;
    let offset = undefined
    let pagination = undefined

    // mqttClient.client.sendMessage("abcde", "kkkkkk")
    if (page && limit) {
        page = parseInt(page);
        limit = parseInt(limit);
        offset = page * limit;
        pagination = { page, limit };
    }
    FeedingLine.findAndCountAll(
        {            
            limit: limit ? limit : undefined,
            offset: offset,
            order: [['updatedAt', 'DESC']]
        }
    ).then(feedingLines => {
        if (!feedingLines) {
            return res.status(404).send({ message: "FeedingLine Not found.", msg_code: "FEED_LINE_NOT_FOUND" });
        }

        res.status(200).send(pagination ? { ...feedingLines, pagination } : feedingLines);

    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const objectToUpdate = {...req.body};

        const result = await FeedingLine.update(objectToUpdate, { where: { id: id } });

        if (result[0] == 0)
            res.status(404).send({ message: "FeedingLine Not found.", msg_code: "FEED_LINE_NOT_FOUND" });
        else {
            const feedingLine = await FeedingLine.findOne({
                where: { id: id },
            });
            res.send({ message: "FeedingLine updated successfully!", feedingLine: feedingLine, msg_code: "FEED_LINE_UPDATE_SUCCESS" });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await FeedingLine.findOne({
            where: { id: id },
        });

        if (!result)
            res.status(404).send({ message: "FeedingLine Not found.", msg_code: "FEED_LINE_NOT_FOUND" });
        else
            res.status(200).send(result);

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await FeedingLine.destroy({ where: { id: id } });

        if (result == 0)
            res.status(404).send({ message: "FeedingLine Not found.", msg_code: "FEED_LINE_NOT_FOUND" });
        else
            res.send({ message: "FeedingLine deleted successfully!", msg_code: "FEED_LINE_DELETE_SUCCESS" });

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};