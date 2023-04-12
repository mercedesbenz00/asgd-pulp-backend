const express = require("express");

const { authJwt } = require("../middleware");
const controller = require("../controllers/pulpInfo.controller");

const router = express.Router()

/**
 * @openapi
 * '/api/pulpInfo':
 *  post:
 *     tags:
 *     - PulpInfo
 *     summary: Create pulpInfo.
 *     security:
 *	     - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - type_code
 *              - product_code
 *            properties:
 *              type_code:
 *                type: string
 *              brand_code:
 *                type: string
 *              product_code:
 *                type: string
 *              pack_num:
 *                type: number
 *              unit_weight:
 *                type: number
 *              trained:
 *                type: boolean
 *     responses:
 *      200:
 *        description: Created pulpInfo
 *      402:
 *        description: request is invalid
 */
 router.post(
    "/api/pulpInfo",
    [authJwt.verifyToken, authJwt.hasAtLeastOneRole(['Admin'])],
    controller.create
);

/**
 * @openapi
 * '/api/pulpInfo':
 *  get:
 *     tags:
 *     - PulpInfo
 *     summary: Get pulpInfo list
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *      - name: page
 *        in: query
 *        type: number
 *        description: Page index of pagination. Starts from 0.
 *      - name: limit
 *        in: query
 *        type: number
 *        description: Page count of pagination.
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                count:
 *                  type: number
 *                rows:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                         id:
 *                          type: number
 *                         type_code:
 *                          type: string
 *                         brand_code:
 *                          type: string
 *                         product_code:
 *                          type: string
 *       500:
 *           description: Bad request
 */
router.get(
    "/api/pulpInfo",
    [authJwt.verifyToken, authJwt.hasAtLeastOneRole(['Admin'])],
    controller.getAll
);

/**
 * @openapi
 * '/api/pulpInfo/{id}':
 *  get:
 *     tags:
 *     - PulpInfo
 *     summary: Get pulpInfo by id
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        type: number
 *        required: true
 *        description: pulpInfo id
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: number
 *                type_code:
 *                  type: string
 *                brand_code:
 *                  type: string
 *                product_code:
 *                  type: string
 *                pack_num:
 *                  type: number
 *                unit_weight:
 *                  type: number
 *                trained:
 *                  type: boolean
 *       404:
 *           description: PulpInfo not found
 *       500:
 *           description: Bad request
 */
router.get(
    "/api/pulpInfo/:id",
    [authJwt.verifyToken, authJwt.hasAtLeastOneRole(['Admin'])],
    controller.getById
); 

/**
 * @openapi
 * '/api/pulpInfo/{id}':
 *  put:
 *     tags:
 *     - PulpInfo
 *     summary: Modify a pulpInfo
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        type: number
 *        required: true
 *        description: pulpInfo id
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            properties:
 *              type_code:
 *                type: string
 *              brand_code:
 *                type: string
 *              product_code:
 *                type: string
 *     responses:
 *      200:
 *        description: Modified
 *      500:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */
router.put(
    "/api/pulpInfo/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.update
);

/**
 * @openapi
 * '/api/pulpInfo/{id}':
 *  delete:
 *     tags:
 *     - PulpInfo
 *     summary: Remove pulpInfo by id
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The unique id of the pulpInfo
 *        required: true
 *     responses:
 *      200:
 *        description: Removed
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not Found
 */
router.delete(
    "/api/pulpInfo/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteForce
);

module.exports = router
