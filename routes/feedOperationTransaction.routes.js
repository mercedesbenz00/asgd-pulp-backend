const express = require("express");

const { authJwt } = require("../middleware");
const controller = require("../controllers/feedOperationTransaction.controller");

const router = express.Router();

/**
 * @openapi
 * '/api/feedOperationTransactions':
 *  post:
 *     tags:
 *     - FeedOperationTransaction
 *     summary: Create feedOperationTransaction.
 *     security:
 *	     - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - line_code
 *              - product_code
 *            properties:
 *              line_code:
 *                type: string
 *              brand_code:
 *                type: string
 *              product_code:
 *                type: string
 *              order_id:
 *                type: number
 *              pack_count:
 *                type: number
 *              mode:
 *                type: string
 *              actual_weight:
 *                type: number
 *              input_source:
 *                type: string
 *     responses:
 *      200:
 *        description: Created feedOperationTransaction
 *      402:
 *        description: request is invalid
 */
router.post("/api/feedOperationTransactions", controller.create);

/**
 * @openapi
 * '/api/feedOperationTransactions':
 *  post:
 *     tags:
 *     - FeedOperationTransaction
 *     summary: Create feedOperationTransaction.
 *     security:
 *	     - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - Date
 *              - Feeding_line
 *              - Brand
 *            properties:
 *              Date:
 *                type: string
 *              Feeding_line:
 *                type: string
 *              Brand:
 *                type: string
 *              Product:
 *                type: string
 *     responses:
 *      200:
 *        description: Created feedOperationTransaction from AI
 *      402:
 *        description: request is invalid
 */
router.post("/api/publishAIResult", controller.createFromAI);

/**
 * @openapi
 * '/api/feedOperationTransactions':
 *  get:
 *     tags:
 *     - FeedOperationTransaction
 *     summary: Get feedOperationTransaction list
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
 *                         line_code:
 *                          type: string
 *                         brand_code:
 *                          type: string
 *                         product_code:
 *                          type: string
 *                         order_id:
 *                          type: number
 *                         pack_count:
 *                          type: number
 *                         mode:
 *                          type: string
 *                         actual_weight:
 *                          type: number
 *                         input_source:
 *                          type: string
 *                         transaction_time:
 *                          type: date
 *       500:
 *           description: Bad request
 */
router.get(
  "/api/feedOperationTransactions",
  [authJwt.verifyToken, authJwt.hasAtLeastOneRole(["Admin"])],
  controller.getAll
);

/**
 * @openapi
 * '/api/feedOperationTransactions/{id}':
 *  get:
 *     tags:
 *     - FeedOperationTransaction
 *     summary: Get feedOperationTransaction by id
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        type: number
 *        required: true
 *        description: feedOperationTransaction id
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
 *                line_code:
 *                  type: string
 *                brand_code:
 *                  type: string
 *                product_code:
 *                  type: string
 *                order_id:
 *                   type: number
 *                pack_count:
 *                   type: number
 *                mode:
 *                   type: string
 *                actual_weight:
 *                   type: number
 *                input_source:
 *                   type: string
 *                transaction_time:
 *                   type: date
 *       404:
 *           description: FeedOperationTransaction not found
 *       500:
 *           description: Bad request
 */
router.get(
  "/api/feedOperationTransactions/:id",
  [authJwt.verifyToken, authJwt.hasAtLeastOneRole(["Admin"])],
  controller.getById
);

/**
 * @openapi
 * '/api/feedOperationTransactions/{id}':
 *  put:
 *     tags:
 *     - FeedOperationTransaction
 *     summary: Modify a feedOperationTransaction
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        type: number
 *        required: true
 *        description: feedOperationTransaction id
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            properties:
 *              pack_count:
 *                type: number
 *              mode:
 *                type: string
 *              actual_weight:
 *                type: number
 *              input_source:
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
  "/api/feedOperationTransactions/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.update
);

/**
 * @openapi
 * '/api/feedOperationTransactions/{id}':
 *  delete:
 *     tags:
 *     - FeedOperationTransaction
 *     summary: Remove feedOperationTransaction by id
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The unique id of the feedOperationTransaction
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
  "/api/feedOperationTransactions/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.deleteForce
);

module.exports = router;
