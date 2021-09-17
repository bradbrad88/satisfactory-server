'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemRecipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ItemRecipe.init({
    qty: DataTypes.FLOAT,
    direction: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ItemRecipe',
  });
  return ItemRecipe;
};