const KeyCloakAuth = require("./KeyCloakAuth");
const KeycloakClient = require("./KeyCloakClient");

const authHelper = {
  validateUser: async function (keyClockToken) {
    const keyCloakAuthObj = new KeyCloakAuth(keyClockToken.trim());
    const userData = await keyCloakAuthObj.getUserInfo();
    if (!!userData?.email) {
      return userData;
    }

    return false;
  },
  getAuthUserData: async function (keyClockToken, keyClockId) {
    const keyCloakAuthObj = new KeyCloakAuth(keyClockToken.trim());
    const keycloakClient = await KeycloakClient();
    keyCloakAuthObj.setKeyClockClient(keycloakClient);
    const userGroups = await keycloakClient.getUserGroups(keyClockId);
    const userRoles = keyCloakAuthObj.getUserRoles(userGroups);

    const userPermission = await keyCloakAuthObj.getRolePermission(
      userGroups?.[0]
    );

    const userRecordData = {
      role: userRoles?.[0],
      group: userGroups?.[0],
      modules: userPermission ? Object.keys(userPermission) : [],
    };

    return userRecordData;
  },
};

module.exports = authHelper;
