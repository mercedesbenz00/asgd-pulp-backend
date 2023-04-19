const jwt_decode = require("jwt-decode");

const { TOKEN_KEY } = require("../utils/constant");

const verifyToken = (token) => {
  const decoded = jwt_decode(token);
  const expiry = decoded.exp;
  return Math.floor(new Date().getTime() / 1000) < expiry;
};

const authValidator = (req, res, next) => {
  const token = req.headers?.[TOKEN_KEY];

  const isTokenVerified =
    process.env.BYPASS_KEYCLOAK === "true"
      ? req?.session?.user
      : token && verifyToken(token) && req?.session?.user;

  if (isTokenVerified) {
    req.userId = req.session.user?.id;
    next();
  } else {
    return res.status(403).send({
      status: false,
      message: "INVALID_TOKEN",
      errors: [],
      data: null,
    });
  }
};

module.exports = authValidator;
