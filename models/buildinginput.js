"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BuildingInput extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BuildingInput.init(
    {
      buildingInputId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      building: {
        type: DataTypes.INTEGER,
        references: {
          model: "Buildings",
          key: "buildingId",
        },
        onDelete: "CASCADE",
      },
      direction: DataTypes.STRING,
      type: DataTypes.STRING,
      amount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "BuildingInput",
    }
  );
  return BuildingInput;
};
