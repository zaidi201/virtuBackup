const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return sentimentTypes.init(sequelize, DataTypes);
};

class sentimentTypes extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        sentimentName: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },

        sentimentIconUrl: {
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
        tableName: "sentimentTypes",
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
    return sentimentTypes;
  }
}
