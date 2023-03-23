const express = require("express");
const { authJwt } = require("../middleware");
const controller = require("../controllers/order.controller");

const router = express.Router()

/**
 * @openapi
 * '/api/orders':
 *  post:
 *     tags:
 *     - Order
 *     summary: Create order.
 *     security:
 *	     - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - ktp_no
 *              - name
 *              - unit (KG or L)
 *              - quantity
 *            properties:
 *              ktp_no:
 *                type: number
 *              name:
 *                type: number
 *              quantity:
 *                type: number
 *              unit:
 *                type: string
 *     responses:
 *      200:
 *        description: Created order
 *      402:
 *        description: request is invalid
 */
router.post(
    "/api/orders",
    [authJwt.verifyToken, authJwt.hasAtLeastOneRole(['Admin, Operator'])],
    controller.create
);

/**
 * @openapi
 * '/api/orders':
 *  get:
 *     tags:
 *     - Order
 *     summary: Get orders
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
 *      - name: buyer_id
 *        in: query
 *        type: number
 *        description: get orders by buyer id.
 *      - name: from
 *        in: query
 *        type: string
 *        description: get orders which created from. ISO_8601 string date
 *      - name: to
 *        in: query
 *        type: string
 *        description: get orders which created by. ISO_8601 string date.
 *                     from and to are should to use together. If missed one, then ignored.
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
 *                         quantity:
 *                          type: number
 *                         unit:
 *                          type: string
 *                         buyer_id:
 *                          type: number
 *                         buyer:
 *                           type: object
 *                           properties:
 *                              ktp_no:
 *                                type: string
 *                              name:
 *                                type: string
 *                         retailor_id:
 *                          type: number
 *                         retailor:
 *                           type: object
 *                           properties:
 *                              company_name:
 *                                type: string
 *                              npwp_no:
 *                                type: string
 *       500:
 *           description: Bad request
 */
router.get(
    "/api/orders",
    [authJwt.verifyToken, authJwt.hasAtLeastOneRole(['Operator','Admin'])],
    controller.getAll
);

/**
 * @openapi
 * '/api/orders/{id}':
 *  get:
 *     tags:
 *     - Order
 *     summary: Get order by id
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        type: number
 *        required: true
 *        description: order id
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
 *                quantity:
 *                  type: number
 *                unit:
 *                  type: string
 *                buyer_id:
 *                  type: number
 *                buyer:
 *                  type: object
 *                  properties:
 *                    name:
 *                      type: string
 *                retailor_id:
 *                  type: number
 *                retailor:
 *                  type: object
 *                  properties:
 *                    company_name:
 *                      type: string
 *       404:
 *           description: User not found
 *       500:
 *           description: Bad request
 */
router.get(
    "/api/orders/:id",
    [authJwt.verifyToken, authJwt.hasAtLeastOneRole(['Admin', 'Operator'])],
    controller.getById
); 

/**
 * @openapi
 * '/api/orders/{id}':
 *  put:
 *     tags:
 *     - Order
 *     summary: Modify a order
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        type: number
 *        required: true
 *        description: order id
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            properties:
 *              quantity:
 *                type: number
 *              unit:
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
    "/api/orders/:id",
    [authJwt.verifyToken, authJwt.hasAtLeastOneRole(['Operator', 'Admin'])],
    controller.update
);

/**
 * @openapi
 * '/api/orders/{id}':
 *  delete:
 *     tags:
 *     - Order
 *     summary: Remove order by id
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The unique id of the order
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
    "/api/orders/:id",
    [authJwt.verifyToken, authJwt.hasAtLeastOneRole(['Admin'])],
    controller.delete
);

module.exports = router
