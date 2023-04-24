const InputSource = {
  AI: "AI",
  OPERATOR: "Operator",
};

const OperationMode = {
  NORMAL: "Normal",
  MANUAL: "Manual",
  LEARNING: "Learning",
};

const USERS_ROLES_ENUM = {
  SYSTEM_ADMIN: "SYSTEM_ADMIN",
  ADMIN: "ADMIN",
  OPERATOR: "OPERATOR",
  get List() {
    return [
      {
        label: "System Admin",
        value: this.SYSTEM_ADMIN,
      },
      {
        label: "Admin",
        value: this.ADMIN,
      },
      {
        label: "Operator",
        value: this.OPERATOR,
      },
    ];
  },
  getRole(role) {
    return this.List?.find((item) => item?.value === role);
  },
};

const TOKEN_KEY = "x-jwt-auth";

const MODULES_ENUM = {
  MANAGE_MASTER_DATA: "MANAGE_MASTER_DATA",
  MANAGE_DASHBOARD: "MANAGE_DASHBOARD",
  OPERATOR_DASHBOARD: "OPERATOR_DASHBOARD",
};

module.exports = {
  InputSource,
  OperationMode,
  USERS_ROLES_ENUM,
  TOKEN_KEY,
  MODULES_ENUM,
};
