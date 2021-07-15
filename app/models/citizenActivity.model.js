const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return citizenActivity.init(sequelize, DataTypes);
};

class citizenActivity extends Sequelize.Model {
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
        },
        entityId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        log: {
          type: DataTypes.STRING(1000),
          allowNull: false,
        },
        isDeed: {
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
        tableName: "citizenActivity",
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
    return citizenActivity;
  }
}
