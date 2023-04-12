const feedOperationTransactionService = require("../services/feedOperationTransaction.service");

exports.create = async (req, res) => {
    try {

        if (!req.body.line_code || !req.body.product_code)
            return res.status(404).send({ message: "Invalid request data.", msg_code: "INVALID_REQUEST_DATA" });

        const entity = await feedOperationTransactionService.create(req.body);
        res.send({ message: "FeedOperationTransaction created successfully!", order: entity, msg_code: "FEED_OPERATION_TRANSACTION_CREATE_SUCCESS" });

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getAll = (req, res) => {
    feedOperationTransactionService.getFeedOperationTransactionList(req.query).then(feedOperationTransactions => {
        if (!feedOperationTransactions) {
            return res.status(404).send({ message: "FeedOperationTransaction Not found.", msg_code: "FEED_OPERATION_TRANSACTION_NOT_FOUND" });
        }

        res.status(200).send(pagination ? { ...feedOperationTransactions, pagination } : feedOperationTransactions);

    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const result = await feedOperationTransactionService.update(id, data);

        if (!result[0])
            res.status(404).send({ message: "FeedOperationTransaction Not found.", msg_code: "FEED_OPERATION_TRANSACTION_NOT_FOUND" });
        else {
            const feedOperationTransaction = await feedOperationTransactionService.getById(id);
            res.send({ message: "FeedOperationTransaction updated successfully!", feedOperationTransaction: feedOperationTransaction, msg_code: "FEED_OPERATION_TRANSACTION_UPDATE_SUCCESS" });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await feedOperationTransactionService.getById(id);

        if (!result)
            res.status(404).send({ message: "FeedOperationTransaction Not found.", msg_code: "FEED_OPERATION_TRANSACTION_NOT_FOUND" });
        else
            res.status(200).send(result);

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.deleteForce = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await feedOperationTransactionService.deleteForce(id);

        if (!result)
            res.status(404).send({ message: "FeedOperationTransaction Not found.", msg_code: "FEED_OPERATION_TRANSACTION_NOT_FOUND" });
        else
            res.send({ message: "FeedOperationTransaction deleted successfully!", msg_code: "FEED_OPERATION_TRANSACTION_DELETE_SUCCESS" });

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
