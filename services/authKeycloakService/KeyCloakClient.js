const KeycloakAdmin = require("@keycloak/keycloak-admin-client/lib/client");

async function KeyCLockClient() {
  this.kcAdminClientObj = new KeycloakAdmin.KeycloakAdminClient({
    baseUrl: process.env.KEYCLOAK_ENDPOINT,
    realmName: process.env.KEYCLOAK_REALM,
  });

  await kcAdminClientObj.auth({
    grantType: "client_credentials",
    clientId: process.env.KEYCLOAK_CLIENT_ID,
    clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
  });

  return {
    findUser: async (email) => {
      return await this.kcAdminClientObj.users.findOne({
        email: email,
      });
    },

    getGroup: async (groupName) => {
      // return await this.kcAdminClientObj.groups.find({
      //   search: groupName,
      // });

      return await this.kcAdminClientObj.groups.find();
    },

    assignUserToGroup: async (userId, Groupid) => {
      return await this.kcAdminClientObj.users.addToGroup({
        groupId: Groupid,
        id: userId,
      });
    },

    getUserGroups: async (userId) => {
      return await this.kcAdminClientObj.users.listGroups({ id: userId });
    },

    getGroupInfoById: async (groupId) => {
      return await this.kcAdminClientObj.groups.findOne({
        id: groupId,
      });
    },

    findUserSessions: async (id) => {
      return await this.kcAdminClientObj.users.listSessions({ id });
    },

    findUserByEmail: async (email) => {
      return await this.kcAdminClientObj.users.find({ email });
    },

    findUserByAttribute: async (attribute) => {
      return await this.kcAdminClientObj.users.find(attribute);
    },

    createUser: async (data) => {
      return await this.kcAdminClientObj.users.create({
        username: data?.name,
        email: data?.email,
        emailVerified: true,
        enabled: true,
        // attributes: {
        //   un: data?.name,
        //   em: data?.email,
        // },
      });
    },

    updateUser: async (id, data) => {
      return await this.kcAdminClientObj.users.update(
        { id },
        {
          username: data?.name,
          email: data?.email,
          emailVerified: true,
          enabled: true,
          // attributes: {
          //   un: data?.name,
          //   em: data?.email,
          // },
        }
      );
    },
  };
}

module.exports = KeyCLockClient;
