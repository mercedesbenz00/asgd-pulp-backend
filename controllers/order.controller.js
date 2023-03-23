var moment = require('moment');
const db = require("../models");
const Order = db.order;
const Crypto = require('../utils/cypto');
const Mask = require('../utils/mask');
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
    try {

        if (!req.body.ktp_no || !req.body.name)
            return res.status(404).send({ message: "Invalid request data.", msg_code: "INVALID_REQUEST_DATA" });

        const newOrder = {
            quantity: req.body.quantity,
            unit: req.body.unit,
            order_date: new Date()
        }

        const entity = await Order.create(newOrder);
        res.send({ message: "Order created successfully!", order: entity, msg_code: "ORDER_CREATE_SUCCESS" });

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getAll = async (req, res) => {
    let { page, limit, from, to } = req.query;
    let offset = undefined
    let pagination = undefined
    if (page && limit) {
        page = parseInt(page);
        limit = parseInt(limit);
        offset = page * limit;
        pagination = { page, limit };
    }

    const queryParam = {
        attributes: [ 'id', 'quantity', 'unit', 'order_date' ],
        limit: limit ? limit : undefined,
        offset: offset,
        order: [['order_date', 'DESC']],
    };

    if (from && to) {
        if (!moment(from, "YYYY-MM-DDTHH:mm:ssZ").isValid() || !moment(to, "YYYY-MM-DDTHH:mm:ssZ").isValid()) {
            res.status(402).send({ message: "date param is not valid" });
            return;
        }
        
        queryParam.where.order_date = {
            [Op.between]: [moment(from).toDate(), moment(to).toDate()]
        }
    }

    Order.findAndCountAll(
        queryParam
    ).then(orders => {
        if (!orders) {
            return res.status(404).send({ message: "Orders not found." });
        }

        res.status(200).send(pagination ? { ...orders, pagination } : orders);

    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const objectToUpdate = req.body;

        const result = await Order.update(objectToUpdate, { where: { id: id } });

        if (result[0] == 0)
            res.status(404).send({ message: "Order Not found." });
        else {
            const order = await Order.findOne({ where: { id: id } });
            res.send({ message: "Order updated successfully!", order: order });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Order.findOne({
            where: { id: id },
            // include: [
            //     {
            //         model: Buyer,
            //         as: "buyer"
            //     },
            //     {
            //         model: Retailor,
            //         as: "retailor"
            //     },
            // ]
        });

        if (!result)
            res.status(404).send({ message: "Order not found." });
        else
            res.status(200).send(result);

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Order.destroy({ where: { id: id } });

        if (result == 0)
            res.status(404).send({ message: "Order not found." });
        else
            res.send({ message: "Order deleted successfully!" });

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};