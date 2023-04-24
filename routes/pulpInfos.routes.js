const express = require("express");
const {
  authValidator,
  validateModuleAccess,
  schemaValidator,
} = require("../middleware");
const controller = require("../controllers/pulpInfos.controller");
const { MODULES_ENUM } = require("../utils/constant");

const {
  createValidator,
  updateValidator,
} = require("../validator/pulpInfo.validator");

const router = express.Router();

router.get(
  "/api/pulp-infos",
  authValidator,
  validateModuleAccess(MODULES_ENUM.MANAGE_MASTER_DATA),
  controller.getAll
);

router.get(
  "/api/pulp-infos/:id",
  authValidator,
  validateModuleAccess(MODULES_ENUM.MANAGE_MASTER_DATA),
  controller.getById
);

router.post(
  "/api/pulp-infos",
  authValidator,
  validateModuleAccess(MODULES_ENUM.MANAGE_MASTER_DATA),
  schemaValidator(createValidator),
  controller.create
);

router.put(
  "/api/pulp-infos",
  authValidator,
  validateModuleAccess(MODULES_ENUM.MANAGE_MASTER_DATA),
  schemaValidator(updateValidator),
  controller.update
);

router.delete(
  "/api/pulp-infos",
  authValidator,
  validateModuleAccess(MODULES_ENUM.MANAGE_MASTER_DATA),
  controller.delete
);

module.exports = router;
