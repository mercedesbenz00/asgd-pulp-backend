const express = require("express");
const authRoutes = require("./auth.routes.js");
const authKeycloakRoutes = require("./auth.keycloak.routes.js");
const userRoutes = require("./user.routes.js");
const orderRoutes = require("./order.routes.js");
const alarmRoutes = require("./alarm.routes.js");
const brandRoutes = require("./brand.routes.js");
const productRoutes = require("./product.routes.js");
const pulpInfoRoutes = require("./pulpInfo.routes.js");
const feedingLineRoutes = require("./feedingLine.routes.js");
const feedOperationTransactionRoutes = require("./feedOperationTransaction.routes.js");
const mqttPublisherRoutes = require("./mqttPublisher.routes.js");
const router = express.Router();

/**
 * @openapi
 * /healthcheck:
 *  get:
 *     tags:
 *     - Healthcheck
 *     description: Returns API operational status
 *     responses:
 *       200:
 *         description: API is  running
 */
router.get("/healthcheck", (req, res) => {
  res.json({ message: "Welcome to ASGD Pulp application." });
});

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept, x-jwt-auth"
  );
  next();
});

router.use(authKeycloakRoutes);
router.use(authRoutes);
router.use(userRoutes);
router.use(orderRoutes);
router.use(feedingLineRoutes);
router.use(mqttPublisherRoutes);
router.use(brandRoutes);
router.use(productRoutes);
router.use(pulpInfoRoutes);
router.use(feedOperationTransactionRoutes);
router.use(alarmRoutes);

module.exports = router;
