const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

exports.isUserExist = async (email, phone) => {
    const params = [];

    if (phone) {
        params.push({ phone: phone })
    }

    if (email) {
        params.push({ email: email })
    }

    if (params.length) {
        const existingUser = await User.findOne({
            where: {
                [Op.or]: params,
            },
        });

        return existingUser ? true : false;

    }

    return false;
}

/**
 * Find user
 * @param {*} email user email to find
 * @param {*} phone user phone to find
 * @param {*} excludeUserId user id to exclude
 * @returns 
 */
exports.FindUser = async (email, phone, excludeUserId) => {
    const params = [];

    if (phone) {
        params.push({ phone: phone })
    }

    if (email) {
        params.push({ email: email })
    }

    if (params.length) {
        let whereFilter = {
            [Op.or]: params,
        };
        if (excludeUserId) {
            whereFilter.id = { [Op.ne]: excludeUserId }
        }
        const existingUser = await User.findOne({
            where: whereFilter,
        });

        return existingUser;
    }

    return null;
}