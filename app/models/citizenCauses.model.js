const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return citizenCauses.init(sequelize, DataTypes);
};

class citizenCauses extends Sequelize.Model {
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
        tableName: "citizenCauses",
        timestamps: true,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
              { name: "id" },
              { name: "causeId" },

              { name: "citizenProfileId" },
            ],
          },
          {
            name: "PK_citizen_causes_ID",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "FK_causeId",
            using: "BTREE",
            fields: [{ name: "causeId" }],
          },

          {
            name: "FK_citizenProfileId",
            using: "BTREE",
            fields: [{ name: "citizenProfileId" }],
          },
        ],
      }
    );
    return citizenCauses;
  }
}
