const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return notificationTypes.init(sequelize, DataTypes);
};

class notificationTypes extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        notification_group_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "notificationGroups",
            key: "id",
          },
        },

        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        notificationTypeName: {
          type: DataTypes.STRING(100),
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
        tableName: "notificationTypes",
        timestamps: true,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }, { name: "notification_group_id" }],
          },
          {
            name: "PK_notificationTypes_ID",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "FK_notification_group_id",
            using: "BTREE",
            fields: [{ name: "notification_group_id" }],
          },
        ],
      }
    );
    return notificationTypes;
  }
}
