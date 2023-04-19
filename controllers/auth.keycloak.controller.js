const USERS = require("../services/authKeycloakService/mockUser");
const authHelper = require("../services/authKeycloakService/authHelper");

exports.mocklogin = async (req, res) => {
  try {
    const userRole = req?.body?.userRole || "SYSTEM_ADMIN";
    const userData = USERS?.[userRole] || {};

    req.session.user = {
      ...userData,
    };

    res.status(200).send({
      status: true,
      message: "LOGIN_SUCCESS",
      errors: [],
      data: userData,
    });
  } catch (e) {
    console.error("LOGIN_FAILED : ", e?.message);
    res
      .status(500)
      .send({ status: false, message: "LOGIN_FAILED", errors: [], data: null });
  }
};

exports.keyCloakLogin = async (req, res) => {
  try {
    const token = req?.headers?.["x-jwt-auth"] || "";

    const validUser = await authHelper.validateUser(token);

    if (!validUser) {
      throw new Error("Invalid User");
    }

    const userPermission = await authHelper.getAuthUserData(
      token,
      validUser?.sub
    );

    const userData = {
      id: validUser?.sub,
      name: validUser?.preferred_username,
      email: validUser?.email,
      ...userPermission,
    };

    req.session.user = {
      ...userData,
    };

    res.status(200).send({
      status: true,
      message: "LOGIN_SUCCESS",
      errors: [],
      data: userData,
    });
  } catch (e) {
    console.error("LOGIN_FAILED : ", e?.message);
    res
      .status(500)
      .send({ status: false, message: "LOGIN_FAILED", errors: [], data: null });
  }
};
