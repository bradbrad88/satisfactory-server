const Items = require("./controllers/items");
const Buildings = require("./controllers/buildings");
const Recipes = require("./controllers/recipes");

module.exports = app => {
  app.get("/items", Items.getItems);
  app.post("/item/new", Items.newItem);
  app.put("/item/edit", Items.editItem);
  app.delete("/item/delete", Items.deleteItem);

  app.get("/building/:buildingId", Buildings.getBuilding);
  app.get("/buildings", Buildings.getBuildings);
  app.post("/building/new", Buildings.newBuilding);
  app.put("/building/edit", Buildings.editBuilding);
  app.delete("/building/delete", Buildings.deleteBuilding);

  app.get("/recipe", Recipes.getRecipe);
  app.get("/recipes", Recipes.getRecipes);
  app.post("/recipe/new", Recipes.newRecipe);
  app.put("/recipe/edit", Recipes.editRecipe);
  app.delete("/recipe/delete", Recipes.deleteRecipe);
};
