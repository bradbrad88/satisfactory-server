"use strict";

const { sequelize } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Recipes", "alt");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Recipes", "alt", {
      type: Sequelize.BOOLEAN,
      default: false,
      allowNull: false,
    });
  },
};
