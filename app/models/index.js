const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

//db configuration
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//requiring models
db.deeds = require("./deeds.model")(sequelize, Sequelize);
db.assetTypes = require("./assetTypes.model")(sequelize, Sequelize);
db.authentications = require("./authentications.model")(sequelize, Sequelize);
db.authTypes = require("./authTypes.model")(sequelize, Sequelize);
db.causes = require("./causes.model")(sequelize, Sequelize);
db.causeType = require("./causeType.model")(sequelize, Sequelize);
db.citizenCauses = require("./citizenCauses.model")(sequelize, Sequelize);
db.citizenNotifications = require("./citizenNotifications.model")(
  sequelize,
  Sequelize
);
db.citizenActivity = require("./citizenActivity.model")(sequelize, Sequelize);
db.citizenNotificationSettings = require("./citizenNotificationSettings.model")(
  sequelize,
  Sequelize
);
db.citizenProfileAssets = require("./citizenProfileAssets.model")(
  sequelize,
  Sequelize
);
db.citizenProfiles = require("./citizenProfiles.model")(sequelize, Sequelize);
db.closeCauseAcceptedInvites = require("./closeCauseAcceptedInvites.model")(
  sequelize,
  Sequelize
);
db.closeCauseInvites = require("./closeCauseInvites.model")(
  sequelize,
  Sequelize
);
db.deedAssets = require("./deedAssets.model")(sequelize, Sequelize);
db.deedComments = require("./deedComments.model")(sequelize, Sequelize);
db.deedLikes = require("./deedLikes.model")(sequelize, Sequelize);
db.deedSentiment = require("./deedSentiment.model")(sequelize, Sequelize);
db.deedShares = require("./deedShares.model")(sequelize, Sequelize);
db.deedTaggedCitizens = require("./deedTaggedCitizens.model")(
  sequelize,
  Sequelize
);
db.deedTags = require("./deedTags.model")(sequelize, Sequelize);
db.earnedPoints = require("./earnedPoints.model")(sequelize, Sequelize);
db.followers = require("./followers.model")(sequelize, Sequelize);
db.notificationGroups = require("./notificationGroups.model")(
  sequelize,
  Sequelize
);
db.notificationTypes = require("./notificationTypes.model")(
  sequelize,
  Sequelize
);
db.openInvites = require("./openInvites.model")(sequelize, Sequelize);
db.pointTitles = require("./pointTitles.model")(sequelize, Sequelize);
db.pointTypes = require("./pointTypes.model")(sequelize, Sequelize);
db.sentimentTypes = require("./sentimentTypes.model")(sequelize, Sequelize);

// Associations
db.closeCauseAcceptedInvites.belongsTo(db.closeCauseInvites, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "closeCauseInviteId",
});
db.closeCauseInvites.hasMany(db.closeCauseAcceptedInvites, {
  foreignKey: "closeCauseInviteId",
  onDelete: "cascade",
  onUpdate: "CASCADE",
  hooks: true,
});

db.closeCauseInvites.belongsTo(db.causes, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "causeId",
});
db.causes.hasMany(db.closeCauseInvites, {
  foreignKey: "causeId",
  onDelete: "cascade",
  onUpdate: "CASCADE",
  hooks: true,
});

db.causes.belongsTo(db.causeType, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "causeTypeId",
});
db.causeType.hasMany(db.causes, {
  foreignKey: "causeTypeId",
  onDelete: "cascade",
  onUpdate: "CASCADE",
  hooks: true,
});

db.deeds.belongsTo(db.causes, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "causeId",
});
db.causes.hasMany(db.deeds, {
  foreignKey: "causeId",
  onUpdate: "CASCADE",
  onDelete: "cascade",
  hooks: true,
});

db.deedTags.belongsTo(db.deeds, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "deedId",
});
db.deeds.hasMany(db.deedTags, {
  foreignKey: "deedId",
  onUpdate: "CASCADE",
  onDelete: "cascade",
  hooks: true,
});

db.deedSentiment.belongsTo(db.deeds, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "deedId",
});
db.deeds.hasMany(db.deedSentiment, {
  foreignKey: "deedId",
  onUpdate: "CASCADE",
  onDelete: "cascade",
  hooks: true,
});

db.deedSentiment.belongsTo(db.sentimentTypes, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "sentimentTypeId",
});
db.sentimentTypes.hasMany(db.deedSentiment, {
  foreignKey: "sentimentTypeId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
  hooks: true,
});

db.deedAssets.belongsTo(db.assetTypes, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "assetTypeId",
});
db.assetTypes.hasMany(db.deedAssets, {
  foreignKey: "assetTypeId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
  hooks: true,
});

db.deedAssets.belongsTo(db.deeds, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "deedId",
});
db.deeds.hasMany(db.deedAssets, {
  foreignKey: "deedId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
  hooks: true,
});

db.deedShares.belongsTo(db.deeds, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "deedId",
});
db.deeds.hasMany(db.deedShares, {
  foreignKey: "deedId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
  hooks: true,
});

db.deedLikes.belongsTo(db.deeds, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "deedId",
});
db.deeds.hasMany(db.deedLikes, {
  foreignKey: "deedId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
  hooks: true,
});

db.citizenProfileAssets.belongsTo(db.assetTypes, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "assetTypeId",
});
db.assetTypes.hasMany(db.citizenProfileAssets, {
  foreignKey: "assetTypeId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
  hooks: true,
});
db.deedComments.belongsTo(db.deeds, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "deedId",
});
db.deeds.hasMany(db.deedComments, {
  foreignKey: "deedId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
  hooks: true,
});
db.deedTaggedCitizens.belongsTo(db.deeds, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "deedId",
});
db.deeds.hasMany(db.deedTaggedCitizens, {
  foreignKey: "deedId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
  hooks: true,
});

db.deeds.belongsTo(db.citizenProfiles, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "citizenProfileId",
});
db.citizenProfiles.hasMany(db.deeds, {
  foreignKey: "citizenProfileId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
  hooks: true,
});
db.citizenCauses.belongsTo(db.causes, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "causeId",
});
db.causes.hasMany(db.citizenCauses, {
  foreignKey: "causeId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
  hooks: true,
});
db.deedSentiment.belongsTo(db.citizenProfiles, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "citizenProfileId",
});
db.citizenProfiles.hasMany(db.deedSentiment, {
  foreignKey: "citizenProfileId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
  hooks: true,
});

db.followers.belongsTo(db.citizenProfiles, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "citizenProfileId",
});
db.citizenProfiles.hasMany(db.followers, {
  foreignKey: "citizenProfileId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
  hooks: true,
});
db.notificationTypes.belongsTo(db.notificationGroups, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "notification_group_id",
});
db.notificationGroups.hasMany(db.notificationTypes, {
  foreignKey: "notification_group_id",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
  hooks: true,
});
db.citizenNotificationSettings.belongsTo(db.notificationTypes, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "notificationsTypeId",
});
db.notificationTypes.hasMany(db.citizenNotificationSettings, {
  foreignKey: "notificationsTypeId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
  hooks: true,
});
db.citizenNotificationSettings.belongsTo(db.citizenProfiles, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "citizenProfileId",
});
db.citizenProfiles.hasMany(db.citizenNotificationSettings, {
  foreignKey: "citizenProfileId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
  hooks: true,
});
db.citizenNotifications.belongsTo(db.citizenProfiles, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "citizenProfileId",
});
db.citizenProfiles.hasMany(db.citizenNotifications, {
  foreignKey: "citizenProfileId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
  hooks: true,
});
db.openInvites.belongsTo(db.citizenProfiles, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "citizenProfileId",
});
db.citizenProfiles.hasMany(db.openInvites, {
  foreignKey: "citizenProfileId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
  hooks: true,
});
db.authentications.belongsTo(db.authTypes, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "authTypeId",
});
db.authTypes.hasMany(db.authentications, {
  foreignKey: "authTypeId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
  hooks: true,
});
db.authentications.belongsTo(db.citizenProfiles, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "citizenProfileId",
});
db.citizenProfiles.hasMany(db.authentications, {
  foreignKey: "citizenProfileId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
  hooks: true,
});
db.pointTitles.belongsTo(db.pointTypes, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "pointTypeId",
});
db.pointTypes.hasMany(db.pointTitles, {
  foreignKey: "pointTypeId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
  hooks: true,
});
db.earnedPoints.belongsTo(db.pointTitles, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "pointTitleId",
});
db.pointTitles.hasMany(db.earnedPoints, {
  foreignKey: "pointTitleId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
  hooks: true,
});
db.earnedPoints.belongsTo(db.citizenProfiles, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "citizenProfileId",
});
db.citizenProfiles.hasMany(db.earnedPoints, {
  foreignKey: "citizenProfileId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
  hooks: true,
});
db.citizenProfileAssets.belongsTo(db.citizenProfiles, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "citizenProfileId",
});
db.citizenProfiles.hasMany(db.citizenProfileAssets, {
  foreignKey: "citizenProfileId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
  hooks: true,
});
db.deedLikes.belongsTo(db.citizenProfiles, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "citizenProfileId",
});
db.citizenProfiles.hasMany(db.deedLikes, {
  foreignKey: "citizenProfileId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
  hooks: true,
});
db.deedShares.belongsTo(db.citizenProfiles, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "toCitizenProfileId",
});
db.citizenProfiles.hasMany(db.deedShares, {
  foreignKey: "toCitizenProfileId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
  hooks: true,
});
db.deedShares.belongsTo(db.citizenProfiles, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "citizenProfileId",
});
db.citizenProfiles.hasMany(db.deedShares, {
  foreignKey: "citizenProfileId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
  hooks: true,
});
db.deedTaggedCitizens.belongsTo(db.citizenProfiles, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "citizenProfileId",
});
db.citizenProfiles.hasMany(db.deedTaggedCitizens, {
  foreignKey: "citizenProfileId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
  hooks: true,
});
db.deedComments.belongsTo(db.citizenProfiles, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "citizenProfileId",
});
db.citizenProfiles.hasMany(db.deedComments, {
  foreignKey: "citizenProfileId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
  hooks: true,
});
db.citizenCauses.belongsTo(db.citizenProfiles, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "citizenProfileId",
});
db.citizenProfiles.hasMany(db.citizenCauses, {
  foreignKey: "citizenProfileId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
  hooks: true,
});

module.exports = db;
