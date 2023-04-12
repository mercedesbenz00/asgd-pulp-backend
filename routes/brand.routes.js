const express = require("express");

const { authJwt } = require("../middleware");
const controller = require("../controllers/brand.controller");

const router = express.Router()

/**
 * @openapi
 * '/api/brands':
 *  post:
 *     tags:
 *     - Brand
 *     summary: Create feedingline.
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
 *              name:
 *                type: string
 *     responses:
 *      200:
 *        description: Created feedling line
 *      402:
 *        description: request is invalid
 */
 router.post(
    "/api/brands",
    [authJwt.verifyToken, authJwt.hasAtLeastOneRole(['Admin'])],
    controller.create
);

/**
 * @openapi
 * '/api/brands':
 *  get:
 *     tags:
 *     - Brand
 *     summary: Get brand list
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
    "/api/brands",
    [authJwt.verifyToken, authJwt.hasAtLeastOneRole(['Admin'])],
    controller.getAll
);

/**
 * @openapi
 * '/api/brands/{id}':
 *  get:
 *     tags:
 *     - Brand
 *     summary: Get brand by id
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        type: number
 *        required: true
 *        description: brand id
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
 *           description: Brand not found
 *       500:
 *           description: Bad request
 */
router.get(
    "/api/brands/:id",
    [authJwt.verifyToken, authJwt.hasAtLeastOneRole(['Admin'])],
    controller.getById
); 

/**
 * @openapi
 * '/api/brands/{id}':
 *  put:
 *     tags:
 *     - Brand
 *     summary: Modify a brand
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        type: number
 *        required: true
 *        description: brand id
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            properties:
 *              code:
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
    "/api/brands/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.update
);

/**
 * @openapi
 * '/api/brands/{id}':
 *  delete:
 *     tags:
 *     - Brand
 *     summary: Remove brand by id
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The unique id of the brand
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
    "/api/brands/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteSoft
);

module.exports = router
