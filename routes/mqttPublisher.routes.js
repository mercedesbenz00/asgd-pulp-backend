const express = require("express");

const { authJwt } = require("../middleware");
const controller = require("../controllers/mqttPublisher.controller");

const router = express.Router()

/**
 * @openapi
 * '/api/mqtt/publish':
 *  post:
 *     tags:
 *     - Mqtt
 *     summary: publish mqtt message.
 *     security:
 *	     - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - topic
 *              - message
 *            properties:
 *              topic:
 *                type: string
 *              message:
 *                type: object
 *     responses:
 *      200:
 *        description: Publish mqtt message
 *      402:
 *        description: request is invalid
 */
 router.post(
    "/api/mqtt/publish",
    controller.publishMQTTMessage
);

module.exports = router
