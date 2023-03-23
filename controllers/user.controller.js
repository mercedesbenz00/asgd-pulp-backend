const db = require("../models");
const User = db.user;
const Role = db.role;
const Auth = require("../utils/auth");


exports.checkUserExists = async (req, res) => {
    try {
        const { email, phone } = req.query;
        
        if (email || phone) {

            if (await Auth.isUserExist(email,phone)) {
                return res.send({ message: "User already exist", isFound: true, msg_code: "USER_INFO_DUPLICATE" });
            }

            return res.send({ message: "User Not found", isFound: false, msg_code: "USER_NOT_FOUND" });
        }

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.getAll = (req, res) => {
    let { page, limit } = req.query;
    let offset = undefined
    let pagination = undefined

    if (page && limit) {
        page = parseInt(page);
        limit = parseInt(limit);
        offset = page * limit;
        pagination = { page, limit };
    }
    User.findAndCountAll(
        {
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Role,
                    as: "roles",
                    attributes: ["name"],
                },
            ],
            limit: limit ? limit : undefined,
            offset: offset,
            order: [['updatedAt', 'DESC']]
        }
    ).then(users => {
        if (!users) {
            return res.status(404).send({ message: "Users Not found.", msg_code: "USER_NOT_FOUND" });
        }

        res.status(200).send(pagination ? { ...users, pagination } : users);

    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const { username, firstName, lastName, isActive, phone, password } = req.body;
        const objectToUpdate = {};

        if (password) {
            objectToUpdate.password = bcrypt.hashSync(password, 8);
        }
        if (phone) {
            objectToUpdate.phone = phone;
        }
        if (username !== undefined) {
            objectToUpdate.username = username;
        }
        // if (email !== undefined) {
        //     objectToUpdate.username = email;
        // }
        if (firstName !== undefined) {
            objectToUpdate.firstName = firstName;
        }
        if (lastName !== undefined) {
            objectToUpdate.lastName = lastName;
        }
        if (isActive !== undefined) {
            objectToUpdate.isActive = isActive;
        }

        const result = await User.update(objectToUpdate, { where: { id: id } });

        // let roles = await Role.findAll({ where: { name: req.body.role } });
        // user.setRoles(roles);

        if (result[0] == 0)
            res.status(404).send({ message: "User Not found.", msg_code: "USER_NOT_FOUND" });
        else {
            const user = await User.findOne({
                where: { id: id },
                attributes: { exclude: ['password'] },
            });
            res.send({ message: "User updated successfully!", user: user, msg_code: "USER_UPDATE_SUCCESS" });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await User.findOne({
            where: { id: id },
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Role,
                    as: "roles",
                    attributes: ["name"],
                },
            ],
        });

        if (!result)
            res.status(404).send({ message: "User Not found.", msg_code: "USER_NOT_FOUND" });
        else
            res.status(200).send(result);

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await User.destroy({ where: { id: id } });

        if (result == 0)
            res.status(404).send({ message: "User Not found.", msg_code: "USER_NOT_FOUND" });
        else
            res.send({ message: "User deleted successfully!", msg_code: "USER_DELETE_SUCCESS" });

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};