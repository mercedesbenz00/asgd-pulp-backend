const { USERS_ROLES_ENUM } = require("../../utils/constant");
const USERS = {
  [USERS_ROLES_ENUM.SYSTEM_ADMIN]: {
    isAuthenticated: true,
    id: "5dffcb4c-8c0a-4808-afde-8ef8e8649562",
    name: "sample super admin",
    email: "super_admin@email.biz",
    role: USERS_ROLES_ENUM.SYSTEM_ADMIN,
    group: {
      id: "c38dbb31-d5a6-4bae-a94d-a28314d11b68",
      name: "SYSTEM_ADMIN",
      path: "/ASGD-PULP/SYSTEM_ADMIN",
    },
    modules: ["IS_SUPER_ADMIN"],
  },

  [USERS_ROLES_ENUM.ADMIN]: {
    isAuthenticated: true,
    id: "0c4c5d72-89d1-4114-a893-a6d920a64f63",
    name: "sample admin",
    email: "admin@email.biz",
    role: USERS_ROLES_ENUM.ADMIN,
    group: {
      id: "f1f54f48-33f7-4146-9f31-843d5ee994d7",
      name: "ADMIN",
      path: "/ASGD-PULP/ADMIN",
    },
    modules: ["MANAGE_MASTER_DATA"],
  },

  [USERS_ROLES_ENUM.OPERATOR]: {
    isAuthenticated: true,
    id: "643ea7ca-09c5-494d-bf29-11ee9ec34b97",
    name: "sample operator",
    email: "operator@email.biz",
    role: USERS_ROLES_ENUM.OPERATOR,
    group: {
      id: "05a14d43-0657-4495-8adf-90a15cc492c7",
      name: "OPERATOR",
      path: "/ASGD-PULP/OPERATOR",
    },
    modules: ["MANAGE_DASHBOARD"],
  },
};

module.exports = USERS;
