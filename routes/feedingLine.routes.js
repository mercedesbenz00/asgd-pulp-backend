const express = require("express");

const { authJwt } = require("../middleware");
const controller = require("../controllers/feedingLine.controller");

const router = express.Router()

/**
 * @openapi
 * '/api/feedingLines':
 *  post:
 *     tags:
 *     - FeedingLine
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
 *              - machine_code
 *            properties:
 *              code:
 *                type: string
 *              machine_code:
 *                type: string
 *     responses:
 *      200:
 *        description: Created feedling line
 *      402:
 *        description: request is invalid
 */
 router.post(
    "/api/feedingLines",
    [authJwt.verifyToken, authJwt.hasAtLeastOneRole(['Admin'])],
    controller.create
);

/**
 * @openapi
 * '/api/feedingLines':
 *  get:
 *     tags:
 *     - FeedingLine
 *     summary: Get feedingLine list
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
    "/api/feedingLines",
    [authJwt.verifyToken, authJwt.hasAtLeastOneRole(['Admin'])],
    controller.getAll
);

/**
 * @openapi
 * '/api/feedingLines/{id}':
 *  get:
 *     tags:
 *     - FeedingLine
 *     summary: Get feedingLine by id
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        type: number
 *        required: true
 *        description: feedingLine id
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
 *           description: FeedingLine not found
 *       500:
 *           description: Bad request
 */
router.get(
    "/api/feedingLines/:id",
    [authJwt.verifyToken, authJwt.hasAtLeastOneRole(['Admin'])],
    controller.getById
); 

/**
 * @openapi
 * '/api/feedingLines/{id}':
 *  put:
 *     tags:
 *     - FeedingLine
 *     summary: Modify a feedingLine
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        type: number
 *        required: true
 *        description: feedingLine id
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            properties:
 *              machine_code:
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
    "/api/feedingLines/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.update
);

/**
 * @openapi
 * '/api/feedingLines/{id}':
 *  delete:
 *     tags:
 *     - FeedingLine
 *     summary: Remove feedingLine by id
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The unique id of the feedingLine
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
    "/api/feedingLines/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.delete
);

module.exports = router
