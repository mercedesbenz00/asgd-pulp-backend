const express = require("express");

const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

const router = express.Router()

/**
 * openapi
 * '/api/users':
 *  get:
 *     tags:
 *     - User
 *     summary: Get user list
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
 *                         email:
 *                          type: string
 *       500:
 *           description: Bad request
 */
router.get(
    "/api/users",
    [authJwt.verifyToken, authJwt.hasAtLeastOneRole(['Admin'])],
    controller.getAll
);

/**
 * openapi
 * '/api/users/{id}':
 *  get:
 *     tags:
 *     - User
 *     summary: Get user by id
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        type: number
 *        required: true
 *        description: user id
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
 *                email:
 *                  type: string
 *       404:
 *           description: User not found
 *       500:
 *           description: Bad request
 */
router.get(
    "/api/users/:id",
    [authJwt.verifyToken, authJwt.hasAtLeastOneRole(['Admin'])],
    controller.getById
); 

/**
 * @openapi
 * '/api/users/exists':
 *  get:
 *     tags:
 *     - User
 *     summary: Check if user exists
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *      - name: email
 *        in: query
 *        type: string
 *        description: email of user
 *      - name: phone
 *        in: query
 *        type: string
 *        description: phone of user
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                isFound:
 *                  type: boolean
 *       500:
 *           description: Bad request
 */
 router.get(
    "/api/users/exists",
    [authJwt.verifyToken, authJwt.hasAtLeastOneRole(['Admin'])],
    controller.checkUserExists
); 

/**
 * openapi
 * '/api/users/{id}':
 *  put:
 *     tags:
 *     - User
 *     summary: Modify a user
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        type: number
 *        required: true
 *        description: user id
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            properties:
 *              firstName:
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
    "/api/users/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.update
);

/**
 * @openapi
 * '/api/users/{id}':
 *  delete:
 *     tags:
 *     - User
 *     summary: Remove user by id
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The unique id of the user
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
    "/api/users/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.delete
);

module.exports = router
