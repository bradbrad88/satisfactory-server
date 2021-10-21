"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Recipes", "category", {
      type: Sequelize.STRING,
      defaultValue: "standard",
      validate: {
        isIn: ["standard", "alt recipe"],
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Recipes", "category");
  },
};
