const pulpInfoService = require("../services/pulpInfo.service");

exports.create = async (req, res) => {
    try {

        if (!req.body.name || !req.body.code)
            return res.status(404).send({ message: "Invalid request data.", msg_code: "INVALID_REQUEST_DATA" });

        const entity = await pulpInfoService.create(req.body);
        res.send({ message: "PulpInfo created successfully!", order: entity, msg_code: "PULP_INFO_CREATE_SUCCESS" });

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getAll = (req, res) => {
    pulpInfoService.getPulpInfoList(req.query).then(pulpInfos => {
        if (!pulpInfos) {
            return res.status(404).send({ message: "PulpInfo Not found.", msg_code: "PULP_INFO_NOT_FOUND" });
        }

        res.status(200).send(pagination ? { ...pulpInfos, pagination } : pulpInfos);

    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const result = await pulpInfoService.update(id, data);

        if (!result[0])
            res.status(404).send({ message: "PulpInfo Not found.", msg_code: "PULP_INFO_NOT_FOUND" });
        else {
            const pulpInfo = await pulpInfoService.getById(id);
            res.send({ message: "PulpInfo updated successfully!", pulpInfo: pulpInfo, msg_code: "PULP_INFO_UPDATE_SUCCESS" });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await pulpInfoService.getById(id);

        if (!result)
            res.status(404).send({ message: "PulpInfo Not found.", msg_code: "PULP_INFO_NOT_FOUND" });
        else
            res.status(200).send(result);

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.deleteForce = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await pulpInfoService.deleteForce(id);

        if (!result)
            res.status(404).send({ message: "PulpInfo Not found.", msg_code: "PULP_INFO_NOT_FOUND" });
        else
            res.send({ message: "PulpInfo deleted successfully!", msg_code: "PULP_INFO_DELETE_SUCCESS" });

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.deleteSoft = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await pulpInfoService.deleteSoft(id);

        if (!result[0])
            res.status(404).send({ message: "PulpInfo Not found.", msg_code: "PULP_INFO_NOT_FOUND" });
        else {
            res.send({ message: "PulpInfo deleted successfully!", msg_code: "PULP_INFO_DELETE_SUCCESS" });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};