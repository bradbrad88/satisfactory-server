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
      // define association here
      // this.belongsToMany(models.Item, {through: 'ItemRecipes'})
      console.log(models);
      this.Buildings = this.belongsTo(models.Buildings, {
        foreignKey: "building",
      });
      // this.Items = this.belongsToMany(models.Items, {
      //   through: "ItemRecipes",
      //   uniqueKey: "recipeId",
      // });
      this.ItemRecipes = this.hasMany(models.ItemRecipes, {
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
      alt: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      building: {
        type: DataTypes.INTEGER,
        references: {
          model: "Buildings",
          key: "buildingId",
        },
        onDelete: "SET NULL",
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
