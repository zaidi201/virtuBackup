const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return causeType.init(sequelize, DataTypes);
};

class causeType extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        causeTypeName: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },

        isEnable: {
          type: DataTypes.TINYINT,
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
        tableName: "causeType",
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
    return causeType;
  }
}
