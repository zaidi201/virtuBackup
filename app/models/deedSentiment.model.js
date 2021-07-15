const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return deedSentiment.init(sequelize, DataTypes);
};

class deedSentiment extends Sequelize.Model {
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
        sentimentTypeId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "sentimentTypes",
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
        tableName: "deedSentiment",
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
              { name: "sentimentTypeId" },
            ],
          },
          {
            name: "PK_DEEDS_sentimental_ID",
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
          {
            name: "FK_sentimentTypeId",
            using: "BTREE",
            fields: [{ name: "sentimentTypeId" }],
          },
        ],
      }
    );
    return deedSentiment;
  }
}
