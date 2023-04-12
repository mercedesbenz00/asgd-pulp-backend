const db = require("../models");
const Brand = db.brand;

// var mqttClient = require("../mqtt/mqttClient");

exports.create = async (req, res) => {
    try {

        if (!req.body.name || !req.body.code)
            return res.status(404).send({ message: "Invalid request data.", msg_code: "INVALID_REQUEST_DATA" });

        const newEntity = {
            ...req.body
        }

        const entity = await Brand.create(newEntity);
        res.send({ message: "Brand created successfully!", order: entity, msg_code: "BRAND_CREATE_SUCCESS" });

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
    Brand.findAndCountAll(
        {
            where: { deleted: false },
            limit: limit ? limit : undefined,
            offset: offset,
            order: [['updatedAt', 'DESC']]
        }
    ).then(brands => {
        if (!brands) {
            return res.status(404).send({ message: "Brand Not found.", msg_code: "BRAND_NOT_FOUND" });
        }

        res.status(200).send(pagination ? { ...brands, pagination } : brands);

    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const objectToUpdate = {...req.body};

        const result = await Brand.update(objectToUpdate, { where: { id: id } });

        if (!result[0])
            res.status(404).send({ message: "Brand Not found.", msg_code: "BRAND_NOT_FOUND" });
        else {
            const brand = await Brand.findOne({
                where: { id: id },
            });
            res.send({ message: "Brand updated successfully!", brand: brand, msg_code: "BRAND_UPDATE_SUCCESS" });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Brand.findOne({
            where: { id: id },
        });

        if (!result)
            res.status(404).send({ message: "Brand Not found.", msg_code: "BRAND_NOT_FOUND" });
        else
            res.status(200).send(result);

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.deleteForce = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Brand.destroy({ where: { id: id } });

        if (!result)
            res.status(404).send({ message: "Brand Not found.", msg_code: "BRAND_NOT_FOUND" });
        else
            res.send({ message: "Brand deleted successfully!", msg_code: "BRAND_DELETE_SUCCESS" });

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.deleteSoft = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await Brand.update({ deleted: true }, { where: { id: id } });

        if (!result[0])
            res.status(404).send({ message: "Brand Not found.", msg_code: "BRAND_NOT_FOUND" });
        else {
            res.send({ message: "Brand deleted successfully!", msg_code: "BRAND_DELETE_SUCCESS" });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};