const { Sequelize, DataTypes, Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return deeds.init(sequelize, DataTypes);
};

class deeds extends Sequelize.Model {
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

        deedTitle: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
        deedDetail: {
          type: DataTypes.STRING(1000),
          allowNull: false,
        },
        deedLocationCity: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        deedLocationCountry: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        isDraft: {
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
        tableName: "deeds",
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
            name: "PK_DEEDS_ID",
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
    return deeds;
  }
}

// const { DataTypes } = require("sequelize/types");

// module.exports = (sequelize, Sequelize) => {
//   const deeds = sequelize.define("deeds", {
//     id: {
//       autoIncrement: true,
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//     },
//     causeId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: "causes",
//         key: "id",
//       },
//     },
//     citizenProfileId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: "citizenProfiles",
//         key: "id",
//       },
//     },
//     deedTitle: {
//       type: DataTypes.STRING(200),
//       allowNull: false,
//     },
//     deedDetail: {
//       type: DataTypes.STRING(1000),
//       allowNull: false,
//     },
//     deedLocationCity: {
//       type: DataTypes.STRING(50),
//       allowNull: false,
//     },
//     deedLocationCountry: {
//       type: DataTypes.STRING(100),
//       allowNull: false,
//     },
//     isDraft: {
//       type: DataTypes.TINYINT(1),
//       allowNull: false,
//     },
//     isEnable: {
//       type: DataTypes.TINYINT(1),
//       allowNull: false,
//     },
//   });

//   return deeds;
// };
