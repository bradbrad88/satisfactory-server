const { Recipes, Buildings, RecipeItems, Items } = require("../models");

function toTitleCase(str) {
  return str.replace(/\b\w+/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

const flattenItem = itemRecipe => {
  const flatItem = { ...itemRecipe, ...itemRecipe.Item };
  console.log("item recipe", flatItem);
};

exports.getRecipes = async (req, res, next) => {
  try {
    const result = await Recipes.findAll({
      attributes: ["recipeId", "recipeName", "category", "buildingId"],
      include: [
        // {
        //   model: Buildings,
        //   attributes: ["title", "buildingId"],
        // },
        {
          model: RecipeItems,
          attributes: ["itemId", "qty", "direction"],
          include: {
            model: Items,
            attributes: ["itemName", "category", "transportType"],
          },
        },
      ],
    });
    // TODO flatten object to have building: buildingId
    res.status(200).json({ data: result });
  } catch (error) {
    console.log("error", error);
    res.status(500).send();
  }
};

// can't see a use for this just yet, probably requires
exports.getRecipe = async (req, res, next) => {
  try {
    const { recipeId } = req.body;
    const result = await Recipes.findByPk(recipeId, {
      include: {
        model: RecipeItems,
        attributes: ["qty", "direction"],
        include: {
          model: Items,
          attributes: ["itemName", "rawMaterial", "category", "transportType"],
        },
      },
    });
    console.log("result", result);
    result.dataValues.RecipeItems.forEach(itemRecipe => {
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
    // console.log("req", req.body);
    const newRecipe = { ...req.body, recipeName: toTitleCase(req.body.recipeName) };
    const result = await Recipes.create(newRecipe, {
      include: [{ association: Recipes.RecipeItems }],
    });
    res.status(201).json({ data: result });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.editRecipe = async (req, res, next) => {
  try {
    const editRecipe = { ...req.body, recipeName: toTitleCase(req.body.recipeName) };
    const id = editRecipe.recipeId;
    await Recipes.update(editRecipe, {
      where: { recipeId: id },
    });
    const success = await RecipeItems.destroy({ where: { recipeId: id } });
    const recipeItems = editRecipe.RecipeItems.map(item => ({
      ...item,
      recipeId: id,
    }));
    await RecipeItems.bulkCreate(recipeItems);
    res.status(200).json({ data: editRecipe });
  } catch (error) {
    console.log("error", error);
  }
};

exports.deleteRecipe = async (req, res, next) => {
  try {
    const { recipeId } = req.body;
    const result = await Recipes.destroy({
      where: {
        recipeId,
      },
    });
    if (result === 1) return res.status(200).json({ success: true });
    res.status(404).json({ success: false });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error });
  }
};
