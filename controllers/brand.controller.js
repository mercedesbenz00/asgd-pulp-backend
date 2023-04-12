const brandService = require("../services/brand.service");

exports.create = async (req, res) => {
    try {

        if (!req.body.name || !req.body.code)
            return res.status(404).send({ message: "Invalid request data.", msg_code: "INVALID_REQUEST_DATA" });

        const entity = await brandService.create(req.body);
        res.send({ message: "Brand created successfully!", order: entity, msg_code: "BRAND_CREATE_SUCCESS" });

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getAll = (req, res) => {
    brandService.getBrands(req.query).then(brands => {
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
        const data = req.body;

        const result = await brandService.update(id, data);

        if (!result[0])
            res.status(404).send({ message: "Brand Not found.", msg_code: "BRAND_NOT_FOUND" });
        else {
            const brand = await brandService.getById(id);
            res.send({ message: "Brand updated successfully!", brand: brand, msg_code: "BRAND_UPDATE_SUCCESS" });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await brandService.getById(id);

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
        const result = await brandService.deleteForce(id);

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

        const result = await brandService.deleteSoft(id);

        if (!result[0])
            res.status(404).send({ message: "Brand Not found.", msg_code: "BRAND_NOT_FOUND" });
        else {
            res.send({ message: "Brand deleted successfully!", msg_code: "BRAND_DELETE_SUCCESS" });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};