"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("Recipes", "Recipes_building_fkey");
    await queryInterface.addConstraint("Recipes", {
      type: "foreign key",
      name: "Recipes_building_fkey",
      fields: ["building"],
      references: {
        table: "Buildings",
        field: "buildingId",
      },
      onDelete: "restrict",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("Recipes", "Recipes_building_fkey");
    await queryInterface.addConstraint("Recipes", {
      type: "foreign key",
      name: "Recipes_building_fkey",
      fields: ["building"],
      references: {
        table: "Buildings",
        field: "buildingId",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },
};
