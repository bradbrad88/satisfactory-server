"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ItemRecipes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      qty: {
        type: Sequelize.FLOAT,
      },
      direction: {
        type: Sequelize.STRING,
      },
      recipeId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Recipes",
          key: "recipeId",
        },
        onDelete: "restrict",
      },
      itemId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Items",
          key: "itemId",
        },
        onDelete: "restrict",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ItemRecipes");
  },
};
