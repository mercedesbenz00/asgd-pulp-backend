const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

const { TokenExpiredError } = jwt;
const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        return res.status(401).send({ message: "Unauthorized! Access Token was expired!", msg_code: "UNAUTHORIZED" });
    }
    return res.sendStatus(401).send({ message: "Unauthorized!", msg_code: "UNAUTHORIZED" });
}

const verifyToken = (req, res, next) => {
    if (!req.headers.authorization || req.headers.authorization.indexOf('Bearer ') < 0) {
        return res.status(403).send({
            type: "Error",
            message: "No token provided!",
            msg_code: "UNAUTHORIZED"
        });
    }

    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return catchError(err, res);
        }
        req.userId = decoded.id;
        next();
    });
};


const isAdmin = (req, res, next) => {
    User.findByPk(req.userId, {
        include: [
            {
                model: Role,
                as: "roles",
                attributes: ["name"],
            },
        ]
    }).then(user => {
        if (!user) {
            res.status(404).send({
                message: "No exist user", msg_code: "USER_NOT_FOUND"
            });
        }
        if (user.roles && user.roles.name.toLowerCase() === "admin") {
            next();
            return;
        }

        res.status(403).send({
            message: "Require Admin Role!", msg_code: "ADMIN_ROLE_REQUIRED"
        });
        return;
    });
};

const hasAtLeastOneRole = (roles) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }
    return (req, res, next) => {
        User.findByPk(req.userId, {
            include: [
                {
                    model: Role,
                    as: "roles",
                    attributes: ["name"],
                },
            ]
        }).then(user => {
            if (!user) {
                res.status(404).send({
                    message: "No exist user", msg_code: "USER_NOT_FOUND"
                });
                return;
            }
            if (!user.isActive) {
                return res.status(401).json({ message: 'User is inactive', msg_code: "INACTIVE_USER" });
            }
            else if (roles.length && user.roles && roles.includes(user.roles.name)) {
                req.user_role = user.roles.name;
                next();
                return;
            } else {
                // user's role is not authorized
                return res.status(401).json({ message: 'Unauthorized', msg_code: "UNAUTHORIZED" });
            }
        });
    }

};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    hasAtLeastOneRole: hasAtLeastOneRole
};
module.exports = authJwt;
