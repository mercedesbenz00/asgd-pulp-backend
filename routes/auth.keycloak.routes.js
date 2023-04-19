const express = require("express");
const controller = require("../controllers/auth.keycloak.controller");

const router = express.Router();

router.post(
  "/api/v1/login",
  process.env.BYPASS_KEYCLOAK === "true"
    ? controller.mocklogin
    : controller.keyCloakLogin
);

module.exports = router;
