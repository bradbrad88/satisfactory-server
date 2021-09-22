"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.createTable("BuildingInputs", {
        buildingInputId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        building: {
          type: Sequelize.INTEGER,
          references: {
            model: "Buildings",
            key: "buildingId",
          },
          onDelete: "SET NULL",
        },
        direction: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        type: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        amount: {
          type: Sequelize.INTEGER,
          allowNull: false,
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
      queryInterface.dropTable("BuildingInputs"),
    ]);
  },
};
