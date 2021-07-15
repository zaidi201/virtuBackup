const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return citizenNotificationSettings.init(sequelize, DataTypes);
};

class citizenNotificationSettings extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        citizenProfileId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "citizenProfiles",
            key: "id",
          },
        },
        notificationsTypeId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "notificationTypes",
            key: "id",
          },
        },

        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },

        isEnable: {
          type: DataTypes.TINYINT(1),
          allowNull: false,
        },
        isSettingEnable: {
          type: DataTypes.TINYINT(1),
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "citizenNotificationSettings",
        timestamps: true,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
              { name: "id" },
              { name: "citizenProfileId" },
              { name: "notificationsTypeId" },
            ],
          },
          {
            name: "PK_citizenNotificationSettings_ID",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "FK_by_citizen_Profile_id",
            using: "BTREE",
            fields: [{ name: "citizenProfileId" }],
          },
          {
            name: "FK_notificationsTypeId",
            using: "BTREE",
            fields: [{ name: "notificationsTypeId" }],
          },
        ],
      }
    );
    return citizenNotificationSettings;
  }
}
