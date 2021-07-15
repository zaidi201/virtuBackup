const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return citizenProfiles.init(sequelize, DataTypes);
};

class citizenProfiles extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        firstName: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        lastName: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        citizenName: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        citizenGender: {
          type: DataTypes.STRING(10),
          allowNull: true,
        },
        citizenDOB: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        citizenCurrentCity: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        citizenHomeTown: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        citizenOccupation: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        citizenIntroduction: {
          type: DataTypes.STRING(1000),
          allowNull: true,
        },
        isMarketing: {
          type: DataTypes.TINYINT(1),
          allowNull: true,
        },

        termAgreed: {
          type: DataTypes.TINYINT(1),
          allowNull: true,
        },

        isEnable: {
          type: DataTypes.TINYINT(1),
          allowNull: true,
        },

        isVerified: {
          type: DataTypes.TINYINT(1),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "citizenProfiles",
        timestamps: true,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
        ],
      }
    );
    return citizenProfiles;
  }
}
