const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return closeCauseInvites.init(sequelize, DataTypes);
};

class closeCauseInvites extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        causeId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "causes",
            key: "id",
          },
        },
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        inviteHash: {
          type: DataTypes.STRING(200),
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
        tableName: "closeCauseInvites",
        timestamps: true,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }, { name: "causeId" }],
          },
          {
            name: "PK_Close_Cause_invites_ID",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "FK_causes",
            using: "BTREE",
            fields: [{ name: "causeId" }],
          },
        ],
      }
    );
    return closeCauseInvites;
  }
}
