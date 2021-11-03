const { Buildings, BuildingInputs } = require("../models");

const example = {
  buildingId: 62,
  title: "testNew",
  power: 100,
  BuildingInputs: [
    {
      direction: "input",
      amount: 20,
      type: "pipe",
    },
  ],
};

exports.getBuilding = async (req, res, next) => {
  try {
    const { buildingId } = req.params;
    const building = await Buildings.findByPk(buildingId, {
      include: {
        model: BuildingInputs,
        attributes: ["direction", "type", "amount"],
      },
    });
    console.log("building", building);
    res.status(200).json({ data: building });
  } catch (error) {}
};

exports.getBuildings = async (req, res, next) => {
  try {
    const buildings = await Buildings.findAll({
      include: { all: true },
      order: [["updatedAt", "DESC"]],
    });
    res.status(200).json({ data: buildings });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error });
  }
};

exports.newBuilding = async (req, res, next) => {
  try {
    const newBuilding = { ...req.body, title: toTitleCase(req.body.title) };
    const result = await Buildings.create(newBuilding, {
      include: [
        {
          association: Buildings.BuildingInputs,
        },
      ],
    });
    res.status(201).json({ data: result });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.editBuilding = async (req, res, next) => {
  try {
    const editBuilding = { ...req.body, title: toTitleCase(req.body.title) };
    const id = editBuilding.buildingId;
    const success = await BuildingInputs.destroy({
      where: {
        building: id,
      },
    });

    const result = await Buildings.update(editBuilding, {
      where: { buildingId: id },
    });
    const buildingInputs = editBuilding.BuildingInputs.map(input => ({
      ...input,
      building: id,
    }));
    await BuildingInputs.bulkCreate(buildingInputs);
    console.log("result", result);
    if (result[0] === 1) return res.status(201).json({ data: editBuilding });
    res.status(500).json({ error: "Update unsuccessful" });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.deleteBuilding = async (req, res, next) => {
  try {
    const { buildingId } = req.body;
    const result = await Buildings.destroy({
      where: {
        buildingId,
      },
    });
    if (result === 1) return res.status(200).json({ success: true });
    res.status(404).json({ success: false });
  } catch (error) {
    res.status(500).json({ error });
  }
};
