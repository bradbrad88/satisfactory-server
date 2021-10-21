"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.Recipes = this.belongsToMany(models.Recipes, {
      //   through: "ItemRecipes",
      //   uniqueKey: "itemId",
      // });
      this.hasMany(models.ItemRecipes, { foreignKey: "itemId" });
    }
  }
  Items.init(
    {
      itemId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      itemName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stackSize: DataTypes.INTEGER,
      points: DataTypes.INTEGER,
      category: DataTypes.STRING,
      rawMaterial: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Items",
      freezeTableName: true,
    }
  );
  return Items;
};
