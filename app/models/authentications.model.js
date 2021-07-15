const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return authentications.init(sequelize, DataTypes);
};

class authentications extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        citizenProfileId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "citizenProfiles",
            key: "id",
          },
        },
        authTypeId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "authTypes",
            key: "id",
          },
        },

        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },

        valueName: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        valueSecret: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        isEnable: {
          type: DataTypes.TINYINT(1),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "authentications",
        timestamps: true,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
              { name: "id" },
              { name: "citizenProfileId" },
              { name: "authTypeId" },
            ],
          },
          {
            name: "PK_authentications_ID",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "FK_by_citizen_Profile_id",
            using: "BTREE",
            fields: [{ name: "citizenProfileId" }],
          },
          {
            name: "FK_authTypeId",
            using: "BTREE",
            fields: [{ name: "authTypeId" }],
          },
        ],
      }
    );
    return authentications;
  }
}
