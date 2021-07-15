const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return citizenProfileAssets.init(sequelize, DataTypes);
};

class citizenProfileAssets extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        assetTypeId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "assetTypes",
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
        titleAsset: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        urlAsset: {
          type: DataTypes.STRING(600),
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
        tableName: "citizenProfileAssets",
        timestamps: true,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
              { name: "id" },
              { name: "assetTypeId" },
              { name: "citizenProfileId" },
            ],
          },
          {
            name: "PK_citizen_profile_asset_ID",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "FK_assetTypeId",
            using: "BTREE",
            fields: [{ name: "assetTypeId" }],
          },
          {
            name: "FK_citizenProfileId",
            using: "BTREE",
            fields: [{ name: "citizenProfileId" }],
          },
        ],
      }
    );
    return citizenProfileAssets;
  }
}
