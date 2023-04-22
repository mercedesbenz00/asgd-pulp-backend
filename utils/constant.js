const InputSource = {
  AI: "AI",
  OPERATOR: "Operator",
};

const OperationMode = {
  NORMAL: "Normal",
  MANUAL: "Manual",
  LEARNING: "Learning",
};

const AI_UNKNOWN = "Unknown";

const ALARM_TYPES = {
  UNKNOWN_FEED: "UNKNOWN_FEED",
  WRONG_FEED: "WRONG_FEED",
  WRONG_RATIO: "WRONG_RATIO",
};

const TOPICS = {
  IoT: "IoT",
  APP: "App",
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

module.exports = {
  InputSource,
  OperationMode,
  USERS_ROLES_ENUM,
  TOKEN_KEY,
  AI_UNKNOWN,
  ALARM_TYPES,
  TOPICS,
};
