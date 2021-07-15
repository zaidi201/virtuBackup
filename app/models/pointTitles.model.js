const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return pointTitles.init(sequelize, DataTypes);
};

class pointTitles extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        pointTypeId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "pointTypes",
            key: "id",
          },
        },

        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },

        nameTitle: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        pointStartAt: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        pointEndAt: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        iconUrl: {
          type: DataTypes.TEXT,
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
        tableName: "pointTitles",
        timestamps: true,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }, { name: "pointTypeId" }],
          },
          {
            name: "PK_pointTitles_ID",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "FK_pointTypeId",
            using: "BTREE",
            fields: [{ name: "pointTypeId" }],
          },
        ],
      }
    );
    return pointTitles;
  }
}
