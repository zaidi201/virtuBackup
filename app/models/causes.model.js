const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return causes.init(sequelize, DataTypes);
};

class causes extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        causeTypeId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "causeType",
            key: "id",
          },
        },
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        causeName: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        causeDetail: {
          type: DataTypes.STRING(600),
          allowNull: false,
        },
        causeIconUrl: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        causeColor: {
          type: DataTypes.STRING(50),
          allowNull: true,
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
        tableName: "causes",
        timestamps: true,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }, { name: "causeTypeId" }],
          },
          {
            name: "PK_Cause_ID",
            unique: true,
            using: "BTREE",
            fields: [{ name: "id" }],
          },
          {
            name: "FK_causetype",
            using: "BTREE",
            fields: [{ name: "causeTypeId" }],
          },
        ],
      }
    );
    return causes;
  }
}
