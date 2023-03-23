const rateLimit = require("express-rate-limit");
const dotenv = require('dotenv');
dotenv.config();

const windowSize = Number(process.env.RATE_WINDOW_SIZE_IN_MINUTES || 15)
const loginLimitRate = Number(process.env.RATE_LOGIN_LIMIT || 5)
const apiLimitRate = Number(process.env.RATE_API_CALL_LIMIT || 300)

const loginRateLimiter = rateLimit({
  windowMs: windowSize * 60 * 1000, // windowSize min in milliseconds
  max: loginLimitRate,
  message: `Login error, you have reached maximum retries. Please try again after ${windowSize} minutes`, 
  standardHeaders: true,
  legacyHeaders: false,
  handler: (request, response, next, options) =>
		response.status(options.statusCode).send({message: options.message, ip: request.ip, msg_code: "REQUEST_RATE_LIMIT" }),
});

const apiLimiter = rateLimit({
	windowMs: windowSize * 60 * 1000, // windowSize minutes
	max: apiLimitRate, // Limit each IP to apiLimitRate requests per `window`
    message: 'Too many requests from this ip', 
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false,
    handler: (request, response, next, options) =>
          response.status(options.statusCode).send({message: options.message, ip: request.ip, msg_code: "REQUEST_RATE_LIMIT" }),
})

const rateLimiter = {
    apiLimiter,
    loginRateLimiter
};
module.exports = rateLimiter;
