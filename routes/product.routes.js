const express = require("express");

const { authJwt } = require("../middleware");
const controller = require("../controllers/product.controller");

const router = express.Router()

/**
 * @openapi
 * '/api/products':
 *  post:
 *     tags:
 *     - Product
 *     summary: Create product.
 *     security:
 *	     - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - code
 *            properties:
 *              code:
 *                type: string
 *              brand_code:
 *                type: string
 *              name:
 *                type: string
 *     responses:
 *      200:
 *        description: Created product
 *      402:
 *        description: request is invalid
 */
 router.post(
    "/api/products",
    [authJwt.verifyToken, authJwt.hasAtLeastOneRole(['Admin'])],
    controller.create
);

/**
 * @openapi
 * '/api/products':
 *  get:
 *     tags:
 *     - Product
 *     summary: Get product list
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
 *                         code:
 *                          type: string
 *       500:
 *           description: Bad request
 */
router.get(
    "/api/products",
    [authJwt.verifyToken, authJwt.hasAtLeastOneRole(['Admin'])],
    controller.getAll
);

/**
 * @openapi
 * '/api/products/{id}':
 *  get:
 *     tags:
 *     - Product
 *     summary: Get product by id
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        type: number
 *        required: true
 *        description: product id
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
 *                code:
 *                  type: string
 *       404:
 *           description: Product not found
 *       500:
 *           description: Bad request
 */
router.get(
    "/api/products/:id",
    [authJwt.verifyToken, authJwt.hasAtLeastOneRole(['Admin'])],
    controller.getById
); 

/**
 * @openapi
 * '/api/products/{id}':
 *  put:
 *     tags:
 *     - Product
 *     summary: Modify a product
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        type: number
 *        required: true
 *        description: product id
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            properties:
 *              code:
 *                type: string
 *              brand_code:
 *                type: string
 *              name:
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
    "/api/products/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.update
);

/**
 * @openapi
 * '/api/products/{id}':
 *  delete:
 *     tags:
 *     - Product
 *     summary: Remove product by id
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The unique id of the product
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
    "/api/products/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteSoft
);

module.exports = router
