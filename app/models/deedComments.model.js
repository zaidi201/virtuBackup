const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return deedComments.init(sequelize, DataTypes);
};

class deedComments extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        deedId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "deeds",
            key: "id",
          },
        },

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
        comments: {
          type: DataTypes.STRING(1000),
          allowNull: false,
        },
        isApproved: {
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
        tableName: "deedComments",
        timestamps: true,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
              { name: "id" },
              { name: "deedId" },

              { name: "citizenProfileId" },
            ],
          },
          {
            name: "PK_DEEDS_comments_ID",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "FK_deedId",
            using: "BTREE",
            fields: [{ name: "deedId" }],
          },

          {
            name: "FK_citizenProfileId",
            using: "BTREE",
            fields: [{ name: "citizenProfileId" }],
          },
        ],
      }
    );
    return deedComments;
  }
}
