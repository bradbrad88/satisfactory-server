"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Buildings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // console.log("models", models);
      this.BuildingInputs = this.hasMany(models.BuildingInputs, {
        foreignKey: "building",
      });
    }
  }
  Buildings.init(
    {
      buildingId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: DataTypes.STRING,
      power: DataTypes.FLOAT,
      category: {
        type: DataTypes.STRING,
        validate: { isIn: [["extractors", "production", "generators"]] },
      },
    },
    {
      sequelize,
      modelName: "Buildings",
      freezeTableName: true,
    }
  );
  return Buildings;
};
