"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Recipes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.Buildings = this.belongsTo(models.Buildings, {
        foreignKey: "buildingId",
        as: "building",
      });
      this.RecipeItems = this.hasMany(models.RecipeItems, {
        foreignKey: "recipeId",
      });
    }
  }
  Recipes.init(
    {
      recipeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      recipeName: { type: DataTypes.STRING, allowNull: false },
      // alt: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      category: {
        type: DataTypes.STRING,
        validate: { isIn: [["standard", "alt recipe"]] },
      },
      buildingId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Buildings",
          key: "buildingId",
        },
        onDelete: "RESTRICT",
      },
    },
    {
      sequelize,
      modelName: "Recipes",
      freezeTableName: true,
    }
  );
  return Recipes;
};
