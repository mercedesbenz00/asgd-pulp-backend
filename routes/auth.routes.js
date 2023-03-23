const express = require("express");
const { authJwt, verifySignUp, rateLimiter } = require("../middleware");
const controller = require("../controllers/auth.controller");


const router = express.Router()

// /**
//  * @openapi
//  * '/api/auth/signup':
//  *  post:
//  *     tags:
//  *     - Auth
//  *     summary: Signup user. phone or email is required to set.
//  *     requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *           schema:
//  *            type: object
//  *            required:
//  *              - roleId
//  *              - password
//  *            properties:
//  *              phone:
//  *                type: string
//  *              email:
//  *                type: string
//  *              password:
//  *                type: string
//  *              roleId:
//  *                type: number
//  *                description: role id. 1-Admin, 2-Distributor, 3-Retailor
//  *                default: 3
//  *              firstName:
//  *                type: string
//  *              lastName:
//  *                type: string
//  *     responses:
//  *      200:
//  *        description: Created user
//  *      402:
//  *        description: request is invalid
//  *      403:
//  *        description: Already exist
//  */
// router.post(
//     "/api/auth/signup",
//     [verifySignUp.checkDuplicatePhoneOrEmail],
//     controller.signup
// );

/**
 * @openapi
 * '/api/auth/signin':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Signin admin/distributor.
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - password
 *              - username
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *     responses:
 *      200:
 *        description: Signin success
 *      402:
 *        description: No admin role
 *      401:
 *        description: Invalid password
 *      404:
 *        description: User not found
 */
router.post("/api/auth/signin", [rateLimiter.loginRateLimiter], controller.signinForWebUser);

/**
 * @openapi
 * '/api/auth/verify':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Verify user by phone sms.
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - phone
 *              - tac_code
 *            properties:
 *              phone:
 *                type: string
 *              tac_code:
 *                type: string
 *     responses:
 *      200:
 *        description: Verification success
 *      403:
 *        description: Verification failed.
 *      404:
 *        description: User not found
 */
router.post("/api/auth/verify", controller.verify);

/**
 * @openapi
 * '/api/auth/reset':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Send SMS Tac code for resetting password.
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - phone
 *            properties:
 *              phone:
 *                type: string
 *     responses:
 *      200:
 *        description: SMS Tac successfully sent
 *      404:
 *        description: User not found
 */
router.post("/api/auth/reset", controller.resetPassword);

// /**
//  * @openapi
//  * '/api/auth/reset/perf':
//  *  post:
//  *     tags:
//  *     - Auth
//  *     summary: Send SMS Tac code for resetting password for pypassing the sms tac, it is only availabe on QA environment.
//  *     requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *           schema:
//  *            type: object
//  *            required:
//  *              - phone
//  *            properties:
//  *              phone:
//  *                type: string
//  *     responses:
//  *      200:
//  *        description: SMS Tac successfully sent
//  *      404:
//  *        description: User not found
//  */
//  router.post("/api/auth/reset/perf", controller.resetPasswordByPassTacPerf);

/**
 * @openapi
 * '/api/auth/updatepassword':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Update password.
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - phone
 *              - password
 *              - tac_code
 *            properties:
 *              phone:
 *                type: string
 *              password:
 *                type: string
 *              tac_code:
 *                type: string
 *     responses:
 *      200:
 *        description: Success
 *      403:
 *        description: Failed to update password
 *      404:
 *        description: User not found
 */
router.post("/api/auth/updatepassword", controller.updatePassword);

module.exports = router