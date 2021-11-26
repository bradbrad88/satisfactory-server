"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("Recipes", "building", "buildingId");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("Recipes", "buildingId", "building");
  },
};
