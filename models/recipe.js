"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  recipe.init(
    {
      recipeName: { type: DataTypes.STRING, allowNull: false },
      alt: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      building: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "recipe",
    }
  );
  return recipe;
};
