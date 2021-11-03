"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable("ItemRecipes", "RecipeItems");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable("RecipeItems", "ItemRecipes");
  },
};
