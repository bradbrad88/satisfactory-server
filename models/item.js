"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    static associate(models) {
      this.hasMany(models.RecipeItems, { foreignKey: "itemId" });
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
      transportType: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Items",
      freezeTableName: true,
    }
  );
  return Items;
};
