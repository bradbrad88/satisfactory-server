"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.addConstraint("Items", {
        fields: ["itemName"],
        type: "unique",
        name: "item_name_unique_constraint",
      }),
      queryInterface.addConstraint("Items", {
        name: "item_category_check",
        fields: ["category"],
        type: "check",
        where: {
          category: [
            "ore",
            "liquid",
            "gas",
            "material",
            "component",
            "fuel",
            "ammo",
            "special",
            "waste",
          ],
        },
      }),
    ]);
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.removeConstraint("Items", "item_name_unique_constraint"),
      queryInterface.removeConstraint("Items", "item_category_check"),
    ]);
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
