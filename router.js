const Item = require("./models").Item;

function toTitleCase(str) {
  return str.replace(/\b\w+/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

const getItems = async (req, res, next) => {
  // const { dataValues } = await Item.findAll();
  console.log("res", res);
  const items = await Item.findAll();
  res.json({ data: items });
};

const newItem = async (req, res, next) => {
  console.log("req", req.body);
  const { itemName, stackSize, points, category } = req.body;
  try {
    const titleCaseName = toTitleCase(itemName);
    const newItem = await Item.create({
      itemName: titleCaseName,
      stackSize,
      points,
      category,
    });
    res.status(201).json({ data: newItem });
  } catch (error) {
    console.error("Error adding new item to database", error);
    res.status(400).json({ error });
  }
};

const editItem = async (req, res, next) => {
  console.log("edit item", req.body);
  const { itemId, itemName, category, stackSize, points } = req.body;
  try {
    const titleCaseName = toTitleCase(itemName);
    const editItem = await Item.update(
      { itemName: titleCaseName, category, stackSize, points },
      { where: { itemId }, returning: true, plain: true }
    );
    res.status(201).json({ data: editItem });
  } catch (error) {
    console.error("Error updating item in database", error);
    res.status(400).json({ error });
  }
};

const deleteItem = (req, res, next) => {
  console.log("body", req.body);
};

module.exports = app => {
  app.get("/item", getItems);
  app.post("/item/new", newItem);
  app.put("/item/edit", editItem);
  app.delete("/item/delete", deleteItem);
};
