const express = require("express");
const { authJwt } = require("../middleware");
const controller = require("../controllers/alarm.controller");

const router = express.Router();
/**
 * @openapi
 * '/api/alarms/lastAlarm':
 *  post:
 *     tags:
 *     - Alarm
 *     summary: Get last alarm from feeding line
 *     security:
 *	     - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            properties:
 *              line_code:
 *                type: string
 *     responses:
 *      200:
 *        description: returns latest alarm
 *      500:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */
router.post(
  "/api/alarms/lastAlarm",
  [authJwt.verifyToken, authJwt.hasAtLeastOneRole(["Operator", "Admin"])],
  controller.getLastAlarm
);

/**
 * @openapi
 * '/api/alarms/{id}/stop':
 *  post:
 *     tags:
 *     - Alarm
 *     summary: Stop a alarm
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        type: number
 *        required: true
 *        description: alarm id
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            properties:
 *     responses:
 *      200:
 *        description: Modified
 *      500:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */
router.put(
  "/api/alarms/:id/stop",
  [authJwt.verifyToken, authJwt.hasAtLeastOneRole(["Operator", "Admin"])],
  controller.stopAlarm
);

module.exports = router;
