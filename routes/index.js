const express = require("express");
const authRoutes = require("./auth.routes.js");
const userRoutes = require("./user.routes.js");
const orderRoutes = require("./order.routes.js");
const feedingLineRoutes = require("./feedingLine.routes.js");
const mqttPublisherRoutes = require("./mqttPublisher.routes.js");
const router = express.Router()

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
router.get('/healthcheck', (req, res) => {
    res.json({ message: "Welcome to ASGD Pulp application." });
})

router.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.use(authRoutes)
router.use(userRoutes)
router.use(orderRoutes)
router.use(feedingLineRoutes)
router.use(mqttPublisherRoutes)

module.exports = router