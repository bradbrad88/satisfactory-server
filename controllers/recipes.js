const { Recipes, Buildings, ItemRecipes, Items } = require("../models");

const flattenItem = itemRecipe => {
  const flatItem = { ...itemRecipe, ...itemRecipe.Item };
  console.log("item recipe", flatItem);
};

exports.getRecipes = async (req, res, next) => {
  try {
    const result = await Recipes.findAll({
      attributes: ["recipeId", "recipeName"],
      include: [
        {
          model: Buildings,
          attributes: ["title"],
        },
        {
          model: ItemRecipes,
          attributes: ["itemId", "qty", "direction"],
          include: {
            model: Items,
            attributes: ["itemName", "category", "rawMaterial"],
          },
        },
      ],
    });
    res.status(200).json(result);
  } catch (error) {
    console.log("error", error);
    res.status(500).send();
  }
};

// can't see a use for this just yet, probably requires
exports.getRecipe = async (req, res, next) => {
  try {
    const recipeId = req.body.recipeId;
    const result = await Recipes.findByPk(recipeId, {
      include: {
        model: ItemRecipes,
        attributes: ["qty", "direction"],
        include: {
          model: Items,
          attributes: ["itemName", "rawMaterial", "category"],
        },
      },
    });
    console.log("result", result);
    result.dataValues.ItemRecipes.forEach(itemRecipe => {
      console.log("item recipe", itemRecipe);
      flattenItem(itemRecipe);
    });
    if (result) return res.status(200).json(result);
    res.status(404).json({ error: "Item not found with this ID" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.newRecipe = async (req, res, next) => {
  try {
    console.log("req", req.body);
    const result = await Recipes.create(req.body, {
      include: [{ association: Recipes.ItemRecipes }],
    });
    res.status(201).json({});
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.editRecipe = async (req, res, next) => {};

exports.deleteRecipe = async (req, res, next) => {};
