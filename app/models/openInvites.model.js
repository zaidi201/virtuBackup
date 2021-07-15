const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return openInvites.init(sequelize, DataTypes);
};

class openInvites extends Sequelize.Model {
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
        inviteEmail: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        inviteCode: {
          type: DataTypes.STRING(255),
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
        tableName: "openInvites",
        timestamps: true,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }, { name: "citizenProfileId" }],
          },
          {
            name: "PK_openInvites_ID",
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
    return openInvites;
  }
}
