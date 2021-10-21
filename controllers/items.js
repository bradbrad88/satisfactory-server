const Items = require("../models").Items;

function toTitleCase(str) {
  return str.replace(/\b\w+/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

exports.getItems = async (req, res, next) => {
  try {
    const result = await Items.findAll();
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.newItem = async (req, res, next) => {
  try {
    const titleCaseName = toTitleCase(req.body.itemName);
    const newItem = { ...req.body, itemName: titleCaseName };
    const result = await Items.create(newItem);
    res.status(201).json({ data: result });
  } catch (error) {
    console.error("Error adding new item to database", error);
    res.status(400).json({ error });
  }
};

exports.editItem = async (req, res, next) => {
  const { itemId, itemName, category, stackSize, points } = req.body;
  try {
    const titleCaseName = toTitleCase(itemName);
    const editItem = await Items.update(
      { itemName: titleCaseName, category, stackSize, points },
      { where: { itemId }, returning: true, plain: true }
    );
    res.status(201).json({ data: editItem });
  } catch (error) {
    console.error("Error updating item in database", error);
    res.status(400).json({ error });
  }
};

exports.deleteItem = async (req, res, next) => {
  console.log("body", req.body);
  const { itemId } = req.body;
  try {
    const deleteItem = await Items.destroy({
      where: {
        itemId,
      },
      returning: true,
      plain: true,
    });
    res.status(200).json({ data: deleteItem });
  } catch (error) {}
};
