const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return closeCauseAcceptedInvites.init(sequelize, DataTypes);
};

class closeCauseAcceptedInvites extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        closeCauseInviteId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "closeCauseInvites",
            key: "id",
          },
        },
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
      },
      {
        sequelize,
        tableName: "closeCauseAcceptedInvites",
        timestamps: true,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }, { name: "closeCauseInviteId" }],
          },
          {
            name: "PK_Close_Cause_Accepted_invites_ID",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "FK_close_causes_invites",
            using: "BTREE",
            fields: [{ name: "closeCauseInviteId" }],
          },
        ],
      }
    );
    return closeCauseAcceptedInvites;
  }
}
