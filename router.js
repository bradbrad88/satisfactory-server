const Item = require("./models").Item;

function toTitleCase(str) {
  return str.replace(/\b\w+/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

const getItems = async (req, res, next) => {
  try {
    const items = await Item.findAll();
    res.status(200).json({ data: items });
  } catch (error) {
    res.status(500).json({ error: error });
  }
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

const deleteItem = async (req, res, next) => {
  console.log("body", req.body);
  const { itemId } = req.body;
  try {
    const deleteItem = await Item.destroy({
      where: {
        itemId,
      },
      returning: true,
      plain: true,
    });
    res.status(200).json({ data: deleteItem });
  } catch (error) {}
};

module.exports = app => {
  app.get("/item", getItems);
  app.post("/item/new", newItem);
  app.put("/item/edit", editItem);
  app.delete("/item/delete", deleteItem);
};
