"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.createTable("Buildings", {
        buildingId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        title: {
          type: Sequelize.STRING,
        },
        power: {
          type: Sequelize.FLOAT,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }),
      queryInterface.removeColumn("Recipes", "building"),
      queryInterface.addColumn("Recipes", "building", {
        type: Sequelize.INTEGER,
        references: {
          model: "Buildings",
          key: "buildingId",
        },
        onDelete: "set null",
      }),
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.removeColumn("Recipes", "building"),
      queryInterface.addColumn("Recipes", "building", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.dropTable("Buildings"),
    ]);
  },
};
