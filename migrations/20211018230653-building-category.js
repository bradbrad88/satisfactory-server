"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Buildings", "category", {
      type: Sequelize.STRING,
      defaultValue: "production",
      validate: {
        isIn: [["extractors", "production", "generators"]],
      },
    });
    await queryInterface.addConstraint("Buildings", {
      name: "building_category_check",
      fields: ["category"],
      type: "check",
      where: {
        category: ["extractors", "production", "generators"],
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Buildings", "category");
  },
};
