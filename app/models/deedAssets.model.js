const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return deedAssets.init(sequelize, DataTypes);
};

class deedAssets extends Sequelize.Model {
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
        assetTypeId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "assetTypes",
            key: "id",
          },
        },
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        assetTitle: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        assetUrl: {
          type: DataTypes.STRING(500),
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
        tableName: "deedAssets",
        timestamps: true,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
              { name: "id" },
              { name: "deedId" },

              { name: "assetTypeId" },
            ],
          },
          {
            name: "PK_DEEDS_asset_ID",
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
            name: "FK_assetTypeId",
            using: "BTREE",
            fields: [{ name: "assetTypeId" }],
          },
        ],
      }
    );
    return deedAssets;
  }
}
