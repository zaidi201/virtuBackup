const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return deedShares.init(sequelize, DataTypes);
};

class deedShares extends Sequelize.Model {
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
        toCitizenProfileId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "citizenProfiles",
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
        tableName: "deedShares",
        timestamps: true,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
              { name: "id" },
              { name: "deedId" },
              { name: "toCitizenProfileId" },
              { name: "citizenProfileId" },
            ],
          },
          {
            name: "PK_DEEDS_Share_ID",
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
            name: "FK_toCitizenProfileId",
            using: "BTREE",
            fields: [{ name: "toCitizenProfileId" }],
          },
          {
            name: "FK_citizenProfileId",
            using: "BTREE",
            fields: [{ name: "citizenProfileId" }],
          },
        ],
      }
    );
    return deedShares;
  }
}
