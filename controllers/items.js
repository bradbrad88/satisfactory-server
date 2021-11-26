const Items = require("../models").Items;

function toTitleCase(str) {
  return str.replace(/\b\w+/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

exports.getItems = async (req, res, next) => {
  try {
    const result = await Items.findAll({
      attributes: [
        "itemId",
        "itemName",
        "stackSize",
        "points",
        "category",
        "transportType",
        "rawMaterial",
      ],
    });
    // console.log("result", result);
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.newItem = async (req, res, next) => {
  try {
    const titleCaseName = toTitleCase(req.body.itemName);
    const newItem = { ...req.body, itemName: titleCaseName };
    console.log("new item", newItem);
    const result = await Items.create(newItem);
    res.status(201).json({ data: result });
  } catch (error) {
    console.error("Error adding new item to database", error);
    res.status(400).json({ error });
  }
};

exports.editItem = async (req, res, next) => {
  try {
    const editItem = { ...req.body, itemName: toTitleCase(req.body.itemName) };
    console.log("edit item", editItem);
    const id = editItem.itemId;
    const result = await Items.update(editItem, { where: { itemId: id } });
    if (result[0] === 1) return res.status(201).json({ data: editItem });
    res.status(500).json({ error: "Update unsuccessful" });
  } catch (error) {
    console.error("Error updating item in database", error);
    res.status(400).json({ error });
  }
};

exports.deleteItem = async (req, res, next) => {
  try {
    const { itemId } = req.body;
    const result = await Items.destroy({
      where: {
        itemId,
      },
    });
    if (result === 1) return res.status(200).json({ success: true });
    res.status(404).json({ success: false });
  } catch (error) {
    res.status(500).json({ error });
  }
};
