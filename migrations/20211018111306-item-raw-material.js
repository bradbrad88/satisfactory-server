"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Items", "rawMaterial", {
      type: Sequelize.BOOLEAN,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Items", "rawMaterial");
  },
};
