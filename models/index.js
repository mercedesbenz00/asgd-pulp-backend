const env       = process.env.NODE_ENV || 'development';
const config = require("../config/db.config.js")[env];

const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//#region Import Models
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.order = require("../models/order.model.js")(sequelize, Sequelize);
db.machine = require("../models/machine.model.js")(sequelize, Sequelize);
db.brand = require("../models/brand.model.js")(sequelize, Sequelize);
db.product = require("../models/product.model.js")(sequelize, Sequelize);
db.pulpType = require("../models/pulpType.model.js")(sequelize, Sequelize);
db.productPulpTypeGroup = require("../models/productPulpTypeGroup.model.js")(sequelize, Sequelize);
db.feedingLine = require("../models/feedingLine.model.js")(sequelize, Sequelize);
db.camera = require("../models/camera.model.js")(sequelize, Sequelize);
db.pulpInfo = require("../models/pulpInfo.model.js")(sequelize, Sequelize);
db.feedOperationTransaction = require("../models/feedOperationTransaction.model.js")(sequelize, Sequelize);
db.alarm = require("../models/alarm.model.js")(sequelize, Sequelize);
db.alarmType = require("../models/alarmType.model.js")(sequelize, Sequelize);

//#region Relationships
db.user.belongsTo(db.role, {
    foreignKey: "roleId",
    as: "roles"
});

db.product.belongsTo(db.brand, {
    foreignKey: "brand_code",
    sourceKey: "code"
});
db.productPulpTypeGroup.belongsTo(db.product, {
    foreignKey: "product_code",
    sourceKey: "code"
});
db.productPulpTypeGroup.belongsTo(db.pulpType, {
    foreignKey: "pulp_type_code",
    sourceKey: "code"
});
db.feedingLine.belongsTo(db.machine, {
    foreignKey: "machine_code",
    sourceKey: "code"
});
db.camera.belongsTo(db.feedingLine, {
    foreignKey: "line_code",
    sourceKey: "code"
});
db.pulpInfo.belongsTo(db.pulpType, {
    foreignKey: "type_code",
    sourceKey: "code"
});
db.pulpInfo.belongsTo(db.brand, {
    foreignKey: "brand_code",
    sourceKey: "code"
});
db.pulpInfo.belongsTo(db.product, {
    foreignKey: "product_code",
    sourceKey: "code"
});
// order
db.order.belongsTo(db.feedingLine, {
    foreignKey: "line_code",
    sourceKey: "code"
});
db.order.belongsTo(db.brand, {
    foreignKey: "a_brand_code",
    sourceKey: "code"
});
db.order.belongsTo(db.brand, {
    foreignKey: "b_brand_code",
    sourceKey: "code"
});
db.order.belongsTo(db.brand, {
    foreignKey: "s_brand_code",
    sourceKey: "code"
});
db.order.belongsTo(db.product, {
    foreignKey: "a_product_code",
    sourceKey: "code"
});
db.order.belongsTo(db.product, {
    foreignKey: "b_product_code",
    sourceKey: "code"
});
db.order.belongsTo(db.product, {
    foreignKey: "s_product_code",
    sourceKey: "code"
});
db.order.belongsTo(db.pulpType, {
    foreignKey: "a_pulp_type_code",
    sourceKey: "code"
});
db.order.belongsTo(db.pulpType, {
    foreignKey: "b_pulp_type_code",
    sourceKey: "code"
});
db.order.belongsTo(db.pulpType, {
    foreignKey: "s_pulp_type_code",
    sourceKey: "code"
});
// feedOperationTransaction
db.feedOperationTransaction.belongsTo(db.feedingLine, {
    foreignKey: "line_code",
    sourceKey: "code"
});
db.feedOperationTransaction.belongsTo(db.product, {
    foreignKey: "product_code",
    sourceKey: "code"
});
db.feedOperationTransaction.belongsTo(db.order, {
    foreignKey: "order_id"
});
// alarm
db.alarm.belongsTo(db.feedOperationTransaction, {
    foreignKey: "feed_transaction_id"
});
db.alarm.belongsTo(db.alarmType, {
    foreignKey: "alarm_type_code",
    sourceKey: "code"
});

db.ROLES = ["admin", "operator"];
//#endregion

module.exports = db;
