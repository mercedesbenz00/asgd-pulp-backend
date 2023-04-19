const axios = require("axios");
const { USERS_ROLES_ENUM } = require("../../utils/constant");

class KeycloakAuth {
  API_END_POINT = process.env.KEYCLOAK_ENDPOINT;
  REALM = process.env.KEYCLOAK_REALM;
  KeyClockClient = null;

  constructor(token) {
    this.__TOKEN = token.trim();
  }

  __getRequestInstance() {
    const instance = axios.create({
      baseURL: this.API_END_POINT,
    });
    instance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${this.__TOKEN}`;

    return instance;
  }

  setKeyClockClient(instance) {
    this.KeyClockClient = instance;
  }

  getUserInfo = async () => {
    const userInfo = await this.__getRequestInstance().get(
      `/realms/${this.REALM}/protocol/openid-connect/userinfo`
    );
    return userInfo?.data;
  };

  getUserRoles = (groupData) => {
    return groupData.map(({ name }) => {
      return USERS_ROLES_ENUM.getRole(name)?.value;
    });
  };

  getRolePermission = async (currentGroup) => {
    const info = await this.KeyClockClient.getGroupInfoById(currentGroup?.id);

    return info?.attributes;
  };
}

module.exports = KeycloakAuth;
