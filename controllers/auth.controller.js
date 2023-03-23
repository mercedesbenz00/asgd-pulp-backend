const emailvalidator = require("email-validator");
const db = require("../models");
const otpUtil = require("../utils/otp");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  const params = [];
  if (!req.body.phone && !req.body.email) {
    return res
      .status(402)
      .send({
        type: "Error",
        message: "phone or email is required to set.",
        msg_code: "PHONE_EMAIL_REQUIRED"
      });
  }
  if(!emailvalidator.validate(req.body.email)){
    return res
      .status(400)
      .send({
        type: "Error",
        message: "Invalid email.",
        msg_code: "INVALID_EMAIL"
      });
  }
  if (req.body.phone) {
    params.push({ phone: req.body.phone })
  }

  if (req.body.email) {
    params.push({ email: req.body.email })
  }

  if (!req.body.roleId) {
    return res
      .status(402)
      .send({
        type: "Error",
        message: "roleId is required to set.",
        msg_code: "ROLE_REQUIRED"
      });
  }
  if (!req.body.password) {
    return res
      .status(402)
      .send({
        type: "Error",
        message: "Password is required to set.",
        msg_code: "PASSWORD_REQUIRED"
      });
  }
  var existingUser = await User.findOne({
    where: {
      [Op.or]: params,
    },
  });

  if (existingUser) {
    return res
      .status(403)
      .send({
        type: "Error",
        message: "User already exist with this email or phone.",
        msg_code: "USER_ALREADY_EXIST"
      });
  }

  // var tac = otpUtil.generateOTP(6);
  User.create({
    email: req.body.email,
    phone: req.body.phone,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    roleId: req.body.roleId ? req.body.roleId : parseInt(3),
    password: bcrypt.hashSync(req.body.password, 8),
    is_tac_verified: false,
    tac_code: null,
    tac_issued_date: new Date(),
  })
    .then((user) => {
      // otpUtil.twiliosms({
      //   message: tac + " is your verification code for EzGigi",
      //   phone: req.body.phone,
      // });
      var token = jwt.sign({ id: user.id, role: user.roleId }, config.secret, {
        expiresIn: 7200, // 24 hours
      });
      res.status(200).send({
        id: user.id,
        phone: user.phone,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        is_tac_verified: user.is_tac_verified,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ type: "Error", message: err.message });
    });
};

exports.resetPassword = async (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(403).send({ type: "Error", message: "phone is required", msg_code: "PHONE_REQUIRED" });
  }

  var existingUser = await User.findOne({
    where: {
      phone: phone,
    },
  });

  if (!existingUser) {
    return res.status(404).send({ type: "Error", message: "User not found.", msg_code: "USER_NOT_FOUND" });
  }

  var tac = otpUtil.generateOTP(6);

  const objectToUpdate = {
    tac_code: tac,
    tac_issued_date: new Date(),
    is_tac_verified: false
  };

  await User.update(objectToUpdate, {
    where: { id: existingUser.id },
  });
  res.send({ message: "Password Reset SMS Sent Successfully !", msg_code: "PASSWORD_RESET_SMS_SENT" });
};

exports.resetPasswordByPassTacPerf = async (req, res) => {

  if(!process.env.NODE_ENV || process.env.NODE_ENV.toLowerCase()!== "test"){
    return res.status(403).send({
        message: "This API endpoint is Not allowed on this environment",
        msg_code: "NOT_ALLOWED"
    });
  }

  const { phone } = req.body;
  if (!phone) {
    return res.status(403).send({ type: "Error", message: "phone is required", msg_code: "PHONE_REQUIRED" });
  }

  var existingUser = await User.findOne({
    where: {
      phone: phone,
    },
  });

  if (!existingUser) {
    return res.status(404).send({ type: "Error", message: "User not found.", msg_code: "USER_NOT_FOUND" });
  }

  var tac = otpUtil.generateOTP(6);

  const objectToUpdate = {
    tac_code: tac,
    tac_issued_date: new Date(),
    is_tac_verified: false
  };

  await User.update(objectToUpdate, {
    where: { id: existingUser.id },
  });
  
  res.send({ message: "Password Reset SMS Sent Successfully !", msg_code: "PASSWORD_RESET_SMS_SENT", tac_code: tac, phone: existingUser.phone });
};

exports.updatePassword = async (req, res) => {
  const { phone, password, tac_code } = req.body;
  if (!phone || !password || !tac_code) {
    return res.status(403).send({ 
      type: "Error", 
      message: "phone, password and tac_code are required",
      msg_code: "MISSED_REQUIRED_FIELDS" });
  }

  var existingUser = await User.findOne({
    where: {
      phone: phone,
    },
  });

  if (!existingUser) {
    return res.status(404).send({ type: "Error", message: "User not found.", msg_code: "USER_NOT_FOUND" });
  }

  if (existingUser.is_tac_verified == true) {
    var diff = Math.abs(new Date() - new Date(existingUser.tac_issued_date));
    if (Math.floor(diff / 1000 / 60) > 15) {
      return res
        .status(403)
        .send({ type: "Error", message: "SMS Tac code has expired.", msg_code: "SMS_CODE_EXPIRED" });
    }
    if (existingUser.tac_code !== tac_code) {
      return res
        .status(403)
        .send({ type: "Error", message: "SMS Tac code is not correct.", msg_code: "SMS_CODE_INCORRECT" });
    }

    const objectToUpdate = {
      password: bcrypt.hashSync(password, 8),
      is_temp_password: false
    };

    const result = await User.update(objectToUpdate, {
      where: { id: existingUser.id },
    });

    res.send({ message: "Password updated successfully !", msg_code: "PASSWORD_UPDATE_SUCCESS" });
  } else {
    return res
        .status(403)
        .send({ type: "Error", message: "Tac code was not verified.", msg_code: "TAC_CODE_NO_VERIFIED" });
  }
};

const signInForRole = async (req, res, roles) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(403).send({
      type: "Error",
      message: "username, password are required",
      msg_code: "USERNAME_PASSWORD_REQUIRED"
    });
  }

  User.findOne({
    where: {
      [Op.or]: [{ phone: username }, { email: { [Op.iLike]: username } }],
    },
    include: [
      {
          model: Role,
          as: "roles",
          attributes: ["name"],
      },
    ]
  })
    .then(async (user) => {
      if (!user) {
        return res
          .status(404)
          .send({ type: "Error", message: "User not found.", msg_code: "USER_NOT_FOUND" });
      }

      if (!user.roles || (roles &&  !roles.includes(user.roles.name))) {
        return res
          .status(401)
          .send({ type: "Error", message: "User is not allowed.", msg_code: "USER_UNAUTHORIZED" });
      }

      if (!user.isActive) {
        return res
          .status(401)
          .send({ type: "Error", message: "User is inactive.", msg_code: "INACTIVE_USER" });
      }

      var passwordIsValid = bcrypt.compareSync(
        password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          type: "Error",
          message: "Invalid password!",
          msg_code: "PASSWORD_INCORRECT"
        });
      }

      var token = jwt.sign({ id: user.id, role: user.roleId }, config.secret, {
        expiresIn: user.roles.name === 'Retailor' ? '24h' : '15m' ,
      });

      const result = {
        id: user.id,
        phone: user.phone,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        is_tac_verified: user.is_tac_verified,
        is_temp_password: user.is_temp_password,
        accessToken: token,
        is_active: user.isActive
      };
  
      Role.findOne({
        where: {
          id: user.roleId,
        },
      }).then((roleObj) => {
        if (roleObj)
          result.roles = roleObj.name;
        res.status(200).send(result);
      });
    })
    .catch((err) => {
      res.status(500).send({ type: "Error", message: err.message });
    });
}

exports.signinForWebUser = (req, res) => {
  signInForRole(req, res, ["Admin", "Operator"])
};
