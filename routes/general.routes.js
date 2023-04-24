const express = require("express");
const controller = require("../controllers/general.controller");
const authValidator = require("../middleware/authValidator");

const router = express.Router();

router.get("/api/machines", authValidator, controller.getMachines);
router.get("/api/pulp-brands", authValidator, controller.getBrands);
router.get("/api/pulp-products", authValidator, controller.getProducts);
router.get("/api/pulp-types", authValidator, controller.getTypes);
router.get("/api/pulp-shapes", authValidator, controller.getShapes);

module.exports = router;
