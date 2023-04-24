const express = require("express");
const controller = require("../controllers/machine.controller");
const authValidator = require("../middleware/authValidator");

const router = express.Router();

router.get("/api/machines", authValidator, controller.getMachines);

module.exports = router;
