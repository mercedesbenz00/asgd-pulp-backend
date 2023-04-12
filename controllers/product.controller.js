const productService = require("../services/product.service");

exports.create = async (req, res) => {
    try {

        if (!req.body.name || !req.body.code)
            return res.status(404).send({ message: "Invalid request data.", msg_code: "INVALID_REQUEST_DATA" });

        const entity = await productService.create(req.body);
        res.send({ message: "Product created successfully!", order: entity, msg_code: "PRODUCT_CREATE_SUCCESS" });

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getAll = (req, res) => {
    productService.getProducts(req.query).then(products => {
        if (!products) {
            return res.status(404).send({ message: "Product Not found.", msg_code: "PRODUCT_NOT_FOUND" });
        }

        res.status(200).send(pagination ? { ...products, pagination } : products);

    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const result = await productService.update(id, data);

        if (!result[0])
            res.status(404).send({ message: "Product Not found.", msg_code: "PRODUCT_NOT_FOUND" });
        else {
            const product = await productService.getById(id);
            res.send({ message: "Product updated successfully!", product: product, msg_code: "PRODUCT_UPDATE_SUCCESS" });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await productService.getById(id);

        if (!result)
            res.status(404).send({ message: "Product Not found.", msg_code: "PRODUCT_NOT_FOUND" });
        else
            res.status(200).send(result);

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.deleteForce = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await productService.deleteForce(id);

        if (!result)
            res.status(404).send({ message: "Product Not found.", msg_code: "PRODUCT_NOT_FOUND" });
        else
            res.send({ message: "Product deleted successfully!", msg_code: "PRODUCT_DELETE_SUCCESS" });

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.deleteSoft = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await productService.deleteSoft(id);

        if (!result[0])
            res.status(404).send({ message: "Product Not found.", msg_code: "PRODUCT_NOT_FOUND" });
        else {
            res.send({ message: "Product deleted successfully!", msg_code: "PRODUCT_DELETE_SUCCESS" });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};