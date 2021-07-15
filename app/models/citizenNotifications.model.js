const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return citizenNotifications.init(sequelize, DataTypes);
};

class citizenNotifications extends Sequelize.Model {
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

        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        notificationEntityId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        notificationText: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        isRead: {
          type: DataTypes.TINYINT(1),
          allowNull: false,
        },

        isEnable: {
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
        tableName: "citizenNotifications",
        timestamps: true,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }, { name: "citizenProfileId" }],
          },
          {
            name: "PK_citizenNotifications_ID",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "FK_by_citizen_Profile_id",
            using: "BTREE",
            fields: [{ name: "citizenProfileId" }],
          },
        ],
      }
    );
    return citizenNotifications;
  }
}
