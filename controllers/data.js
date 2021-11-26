const { Recipes, RecipeItems, Buildings, Items } = require("../models");

exports.getData = async (req, res, next) => {
  try {
    const items = await Items.findAll({
      attributes: ["itemId", "itemName", "transportType", "rawMaterial", "points"],
    });
    const recipes = await Recipes.findAll({
      attributes: ["recipeId", "recipeName", "category"],
      include: [
        {
          model: Buildings,
          attributes: ["buildingId", "title", "power"],
          as: "building",
        },
        {
          model: RecipeItems,
          attributes: ["direction", "qty", "itemId"],
        },
      ],
    });
    const buildings = await Buildings.findAll({});
    res.status(200).json({ data: { items, recipes } });
  } catch (error) {
    console.log("error", error);
    res.end();
  }
};
