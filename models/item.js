"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Item.init(
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
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};
