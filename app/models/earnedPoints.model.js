const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return earnedPoints.init(sequelize, DataTypes);
};

class earnedPoints extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        citizenProfileId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "citizenProfiles",
            key: "id",
          },
        },
        pointTitleId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "pointTitles",
            key: "id",
          },
        },
        pointValue: {
          type: DataTypes.INTEGER,
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
        tableName: "earnedPoints",
        timestamps: true,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
              { name: "id" },
              { name: "pointTitleId" },
              { name: "citizenProfileId" },
            ],
          },
          {
            name: "PK_earnedPoints_ID",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "FK_pointTitleId",
            using: "BTREE",
            fields: [{ name: "pointTitleId" }],
          },
          {
            name: "FK_citizenProfileId",
            using: "BTREE",
            fields: [{ name: "citizenProfileId" }],
          },
        ],
      }
    );
    return earnedPoints;
  }
}
