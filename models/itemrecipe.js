"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ItemRecipes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Recipes, { foreignKey: "recipeId" });
      this.belongsTo(models.Items, { foreignKey: "itemId" });
    }
  }
  ItemRecipes.init(
    {
      recipeId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Recipes",
          key: "recipeId",
        },
      },
      itemId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Items",
          key: "itemId",
        },
      },
      qty: DataTypes.FLOAT,
      direction: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ItemRecipes",
      freezeTableName: true,
    }
  );
  return ItemRecipes;
};
