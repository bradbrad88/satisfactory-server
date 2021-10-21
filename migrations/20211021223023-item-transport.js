"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Items", "transportType", {
      type: Sequelize.STRING,
      defaultValue: "conveyor",
      validate: {
        isIn: ["conveyor", "pipe"],
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Items", "transportType");
  },
};
