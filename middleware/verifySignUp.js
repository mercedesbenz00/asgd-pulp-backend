const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

const checkDuplicatePhoneOrEmail = (req, res, next) => {
    const params = [];
    if (req.body.phone) {
        params.push({ phone: req.body.phone })
      }
    
    if (req.body.email) {
    params.push({ email: { [Op.iLike]: req.body.username } })
    }
    User.findOne({
        where: {
            [Op.or]: params
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Email or Phone is already in use!",
                msg_code: "USER_INFO_DUPLICATE"
            });
            return;
        }

        next();
    });
};

const verifySignUp = {
    checkDuplicatePhoneOrEmail: checkDuplicatePhoneOrEmail
};

module.exports = verifySignUp;
